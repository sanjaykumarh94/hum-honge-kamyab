import Map "mo:core/Map";
import Types "types/common";

module {
  // Old OtpSession had verifyCount instead of verifyAttempts
  type OldOtpSession = {
    id : Nat;
    phone : Text;
    hashedCode : Text;
    createdAt : Int;
    expiresAt : Int;
    sendCount : Nat;
    verifyCount : Nat;
    verified : Bool;
  };

  type OldActor = {
    otpSessions : Map.Map<Nat, OldOtpSession>;
  };

  type NewActor = {
    otpSessions : Map.Map<Nat, Types.OtpSession>;
  };

  public func run(old : OldActor) : NewActor {
    let otpSessions = old.otpSessions.map<Nat, OldOtpSession, Types.OtpSession>(
      func(_id, s) {
        {
          s with
          verifyAttempts = s.verifyCount;
        };
      }
    );
    { otpSessions };
  };
};
