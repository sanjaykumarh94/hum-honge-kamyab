import Types "../types/common";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Int "mo:core/Int";

module {
  public type OtpSessionMap = Map.Map<Nat, Types.OtpSession>;
  public type Counter = { var val : Nat };

  // OTP expiry: 5 minutes in nanoseconds
  let OTP_TTL_NS : Int = 300_000_000_000;
  // Max verify attempts per session
  let MAX_VERIFY_ATTEMPTS : Nat = 5;
  // Max OTP sends per phone in 15-minute window (across sessions)
  let MAX_SENDS_15MIN : Nat = 3;
  // 15 minutes in nanoseconds
  let WINDOW_15MIN_NS : Int = 900_000_000_000;

  /// Generate a 6-digit OTP code as Text using a pseudo-random seed from Time.now().
  /// Note: Not cryptographically secure — suitable for low-stakes OTP in this context.
  public func generateOtpCode() : Text {
    let now = Time.now();
    // Derive a 6-digit number from time nanoseconds
    let seed = Int.abs(now);
    let code = seed % 1_000_000;
    // Zero-pad to 6 digits
    let raw = code.toText();
    let rawLen = raw.size();
    let padding = if (rawLen < 6) { 6 - rawLen } else { 0 };
    var padded = "";
    var i = 0;
    while (i < padding) {
      padded := padded # "0";
      i += 1;
    };
    padded # raw;
  };

  /// Hash an OTP code combined with the phone number for storage.
  /// Uses a djb2-style string hash, encoded as hexadecimal Text.
  /// This ensures no plaintext OTP is ever stored.
  public func hashOtp(code : Text, phone : Text) : Text {
    let combined = code # ":" # phone;
    var h : Nat = 5381;
    for (c in combined.toIter()) {
      let cv = c.toNat32().toNat();
      h := (h * 33 + cv) % 0xFFFF_FFFF;
    };
    // Encode as 8-char hex string
    natToHex(h, 8);
  };

  /// Convert a Nat to a fixed-width hex string (right-aligned, zero-padded).
  func natToHex(n : Nat, width : Nat) : Text {
    let digits = "0123456789abcdef";
    let chars = digits.toArray();
    var result = "";
    var remaining = n;
    var len = 0;
    while (remaining > 0 or len < 1) {
      let digit = remaining % 16;
      result := Text.fromChar(chars[digit]) # result;
      remaining := remaining / 16;
      len += 1;
    };
    // Pad to fixed width
    while (result.size() < width) {
      result := "0" # result;
    };
    result;
  };

  /// Create a new OtpSession record (does NOT persist — caller must store to map).
  public func createOtpSession(id : Nat, phone : Text, hashedCode : Text) : Types.OtpSession {
    let now = Time.now();
    {
      id;
      phone;
      hashedCode;
      createdAt = now;
      expiresAt = now + OTP_TTL_NS;
      sendCount = 1;
      verifyAttempts = 0;
      verified = false;
    };
  };

  /// Return true if the provided hashedCode matches and the session is still valid.
  /// Checks: hash match, not expired, verifyAttempts < MAX_VERIFY_ATTEMPTS.
  public func verifyOtpSession(session : Types.OtpSession, hashedCode : Text) : Bool {
    if (session.verified) { return false };
    if (isOtpExpired(session)) { return false };
    if (session.verifyAttempts >= MAX_VERIFY_ATTEMPTS) { return false };
    session.hashedCode == hashedCode;
  };

  /// Return true if the session has passed its expiry timestamp.
  public func isOtpExpired(session : Types.OtpSession) : Bool {
    Time.now() > session.expiresAt;
  };

  /// Return true if the phone is allowed to request a new OTP.
  /// Rate-limit: at most MAX_SENDS_15MIN sends per phone in the last 15 minutes.
  /// `sessions` is the slice of recent sessions for the same phone number.
  public func canSendOtp(sessions : [Types.OtpSession]) : Bool {
    let cutoff = Time.now() - WINDOW_15MIN_NS;
    var recentCount = 0;
    for (s in sessions.vals()) {
      if (s.createdAt >= cutoff) {
        recentCount += 1;
      };
    };
    recentCount < MAX_SENDS_15MIN;
  };
};
