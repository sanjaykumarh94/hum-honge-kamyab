import Types "../types/common";
import OtpLib "../lib/otp";
import AuthLib "../lib/auth";
import Debug "mo:core/Debug";
import Text "mo:core/Text";
import Nat "mo:core/Nat";

// ─────────────────────────────────────────────────────────────────────────────
// SMS delivery via IC management canister HTTP outcalls.
//
// IMPORTANT: Replace the placeholder API key below with your actual MSG91 key
// before deploying to production. Keep this secret — do not commit real keys.
//
//   MSG91 API (recommended for India):
//     POST https://api.msg91.com/api/v5/otp
//     Headers: { "authkey": "<YOUR_MSG91_AUTHKEY>", "Content-Type": "application/json" }
//     Body: { "mobile": "<phone>", "otp": "<code>", "template_id": "<TEMPLATE_ID>" }
//
//   Twilio (alternative):
//     POST https://api.twilio.com/2010-04-01/Accounts/<ACCOUNT_SID>/Messages.json
//     Headers: { "Authorization": "Basic <base64(ACCOUNT_SID:AUTH_TOKEN)>" }
//     Body (form-encoded): From=<TWILIO_NUMBER>&To=<phone>&Body=<message>
//
// SIMULATION FALLBACK:
//   When the API key is a placeholder or SMS outcall fails, the OTP code is
//   printed to the replica logs via Debug.print so developers can read it
//   without needing a real SMS provider during testing.
// ─────────────────────────────────────────────────────────────────────────────

mixin (otpSessions : OtpLib.OtpSessionMap, otpCounter : OtpLib.Counter, users : AuthLib.UserMap) {

  // REPLACE THIS with your real MSG91 auth key before production deployment
  let SMS_API_KEY : Text = "REPLACE_WITH_YOUR_MSG91_AUTHKEY";
  // REPLACE THIS with your MSG91 template ID
  let SMS_TEMPLATE_ID : Text = "REPLACE_WITH_YOUR_TEMPLATE_ID";
  // MSG91 OTP API endpoint
  let SMS_API_URL : Text = "https://api.msg91.com/api/v5/otp";

  // IC management canister actor type for HTTP outcalls
  type HttpHeader = { name : Text; value : Text };
  type HttpMethod = { #get; #head; #post };
  type HttpRequestArgs = {
    url : Text;
    max_response_bytes : ?Nat64;
    method : HttpMethod;
    headers : [HttpHeader];
    body : ?Blob;
    transform : ?{
      function : shared query ({ response : HttpRequestResult; context : Blob }) -> async HttpRequestResult;
      context : Blob;
    };
    is_replicated : ?Bool;
  };
  type HttpRequestResult = {
    status : Nat;
    headers : [HttpHeader];
    body : Blob;
  };

  let ic = actor "aaaaa-aa" : actor {
    http_request : HttpRequestArgs -> async HttpRequestResult;
  };

  /// Send an OTP to the given phone number.
  /// Validates phone format, checks rate limits, generates and hashes the OTP,
  /// dispatches SMS via IC HTTP outcalls, and stores the session.
  /// If SMS delivery fails or API key is a placeholder, OTP is printed to
  /// replica logs for developer testing (simulation fallback).
  /// Returns the sessionId for subsequent verification.
  public func sendOtp(phone : Text) : async { ok : Bool; sessionId : Nat; error : ?Text } {
    // Validate phone format: must be non-empty, start with +, 7-15 digits
    if (not isValidPhone(phone)) {
      return { ok = false; sessionId = 0; error = ?("Invalid phone number format. Use international format e.g. +919876543210") };
    };

    // Rate-limit check: gather existing sessions for this phone
    let phoneSessions = otpSessions.values()
      .filter(func(s) { s.phone == phone })
      .toArray();

    if (not OtpLib.canSendOtp(phoneSessions)) {
      return { ok = false; sessionId = 0; error = ?("Too many OTP requests. Please wait 15 minutes before requesting again.") };
    };

    // Generate OTP code and hash it
    let code = OtpLib.generateOtpCode();
    let hashedCode = OtpLib.hashOtp(code, phone);

    // Allocate session ID
    otpCounter.val += 1;
    let sessionId = otpCounter.val;

    // Create and store the OTP session
    let session = OtpLib.createOtpSession(sessionId, phone, hashedCode);
    otpSessions.add(sessionId, session);

    // Check if using placeholder key — use simulation mode
    let isPlaceholder = SMS_API_KEY == "REPLACE_WITH_YOUR_MSG91_AUTHKEY";

    if (isPlaceholder) {
      // Simulation mode: print OTP to replica logs so developers can test without SMS
      Debug.print("[OTP SIMULATION] Phone: " # phone # " | OTP Code: " # code # " | SessionId: " # sessionId.toText());
      return { ok = true; sessionId; error = ?("SMS simulation mode — OTP printed to replica logs. Set a real MSG91 API key for production.") };
    };

    // Build SMS message
    let message = "Your verification code for Hum Honge Kamyab is: " # code # ". Valid for 5 minutes. Do not share.";

    // Attempt to send SMS via MSG91 HTTP outcall
    let smsResult = await sendSmsViaMsg91(phone, code, message);
    switch (smsResult) {
      case (#ok(_)) {
        { ok = true; sessionId; error = null };
      };
      case (#err(e)) {
        // SMS outcall failed — fallback to simulation: log OTP for developer use
        Debug.print("[OTP FALLBACK] SMS delivery failed. Phone: " # phone # " | OTP Code: " # code # " | SessionId: " # sessionId.toText() # " | Error: " # e);
        { ok = true; sessionId; error = ?("Session created but SMS delivery failed: " # e # ". OTP printed to replica logs.") };
      };
    };
  };

  /// Verify the OTP code for a given session.
  /// Increments verifyAttempts on each attempt (even failed ones) to enforce max-attempts.
  /// On success, marks the session verified and sets User.phoneVerified = true.
  public func verifyOtp(sessionId : Nat, code : Text) : async { ok : Bool; userId : ?Nat; error : ?Text } {
    // Look up the session
    switch (otpSessions.get(sessionId)) {
      case null {
        { ok = false; userId = null; error = ?("OTP session not found") };
      };
      case (?session) {
        // Check expiry first (before consuming an attempt)
        if (OtpLib.isOtpExpired(session)) {
          { ok = false; userId = null; error = ?("OTP has expired. Please request a new one.") };
        } else if (session.verifyAttempts >= 5) {
          { ok = false; userId = null; error = ?("Maximum verification attempts exceeded. Please request a new OTP.") };
        } else if (session.verified) {
          { ok = false; userId = null; error = ?("This OTP has already been used.") };
        } else {
          // Hash the submitted code with the session's phone
          let hashedCode = OtpLib.hashOtp(code, session.phone);

          // Increment attempt count regardless of outcome
          let updatedSession : Types.OtpSession = {
            session with
            verifyAttempts = session.verifyAttempts + 1;
          };

          if (OtpLib.verifyOtpSession(session, hashedCode)) {
            // Mark session as verified
            let verifiedSession : Types.OtpSession = {
              updatedSession with
              verified = true;
            };
            otpSessions.add(sessionId, verifiedSession);

            // Find the user with this phone and mark phoneVerified = true
            let matchedUser = users.entries().find(
              func((_, u)) { u.phone == session.phone }
            );
            switch (matchedUser) {
              case (?(userId, user)) {
                let updatedUser : Types.User = { user with phoneVerified = true };
                users.add(userId, updatedUser);
                // Return the numeric portion of the user ID
                let numId = extractUserId(userId);
                { ok = true; userId = numId; error = null };
              };
              case null {
                // No user found with this phone — OTP still valid, phone not yet linked
                { ok = true; userId = null; error = null };
              };
            };
          } else {
            otpSessions.add(sessionId, updatedSession);
            let attemptsLeft = 5 - updatedSession.verifyAttempts;
            { ok = false; userId = null; error = ?("Invalid OTP code. " # attemptsLeft.toText() # " attempt(s) remaining.") };
          };
        };
      };
    };
  };

  /// Return the current status of an OTP session (for polling / UI feedback).
  public func getOtpStatus(sessionId : Nat) : async { valid : Bool; expired : Bool; attemptsLeft : Nat } {
    switch (otpSessions.get(sessionId)) {
      case null {
        { valid = false; expired = true; attemptsLeft = 0 };
      };
      case (?session) {
        let expired = OtpLib.isOtpExpired(session);
        let attemptsLeft = if (session.verifyAttempts >= 5) { 0 } else { 5 - session.verifyAttempts };
        let valid = not expired and attemptsLeft > 0 and not session.verified;
        { valid; expired; attemptsLeft };
      };
    };
  };

  // ── Private helpers ──────────────────────────────────────────────────────

  /// Validate phone number: must start with + and contain 7-15 digits after.
  func isValidPhone(phone : Text) : Bool {
    if (phone.size() < 8 or phone.size() > 16) { return false };
    let chars = phone.toArray();
    if (chars[0] != '+') { return false };
    var i = 1;
    while (i < chars.size()) {
      let c = chars[i];
      if (c < '0' or c > '9') { return false };
      i += 1;
    };
    true;
  };

  /// Extract numeric userId from a Text ID like "u42" → ?42
  func extractUserId(id : Text) : ?Nat {
    // IDs are prefixed with "u" — strip prefix and parse
    if (id.size() < 2) { return null };
    let numPart = id.trimStart(#char 'u');
    Nat.fromText(numPart);
  };

  /// Send SMS via MSG91 OTP API using IC management canister HTTP outcall.
  /// Returns #ok on HTTP 2xx, #err with message otherwise.
  func sendSmsViaMsg91(phone : Text, code : Text, _message : Text) : async Types.Result<(), Text> {
    // Strip leading '+' for MSG91 (it expects digits only)
    let mobileNum = phone.trimStart(#char '+');

    let bodyJson = "{"
      # "\"mobile\":\"" # mobileNum # "\","
      # "\"otp\":\"" # code # "\","
      # "\"template_id\":\"" # SMS_TEMPLATE_ID # "\""
      # "}";

    let bodyBlob = bodyJson.encodeUtf8();

    let request : HttpRequestArgs = {
      url = SMS_API_URL;
      max_response_bytes = ?(2048 : Nat64);
      method = #post;
      headers = [
        { name = "authkey"; value = SMS_API_KEY },
        { name = "Content-Type"; value = "application/json" },
      ];
      body = ?bodyBlob;
      transform = null;
      is_replicated = ?false;
    };

    try {
      let response = await ic.http_request(request);
      if (response.status >= 200 and response.status < 300) {
        #ok(());
      } else {
        #err("SMS API returned status " # response.status.toText());
      };
    } catch (_) {
      #err("HTTP outcall to SMS provider failed");
    };
  };
};
