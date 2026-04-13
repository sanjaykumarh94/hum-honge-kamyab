import Types "../types/common";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Iter "mo:core/Iter";

module {
  public type UserMap = Map.Map<Text, Types.User>;
  public type Counter = { var val : Nat };

  func genId(counter : Counter, prefix : Text) : Text {
    counter.val += 1;
    prefix # debug_show(counter.val);
  };

  public func register(
    users : UserMap,
    counter : Counter,
    email : Text,
    passwordHash : Text,
    firstName : Text,
    lastName : Text,
    role : Types.UserRole,
  ) : Types.Result<Types.User, Text> {
    let existing = users.entries().find(
      func((_, u)) { u.email == email },
    );
    switch (existing) {
      case (?(_, _)) { return #err("Email already registered") };
      case null {};
    };
    let id = genId(counter, "u");
    let user : Types.User = {
      id;
      email;
      passwordHash;
      firstName;
      lastName;
      phone = null;
      role;
      createdAt = Time.now();
      lastLogin = null;
      isActive = true;
    };
    users.add(id, user);
    #ok(user);
  };

  public func login(
    users : UserMap,
    email : Text,
    passwordHash : Text,
  ) : Types.Result<Types.User, Text> {
    let found = users.entries().find(
      func((_, u)) { u.email == email and u.passwordHash == passwordHash },
    );
    switch (found) {
      case (?(_, user)) {
        if (not user.isActive) { return #err("Account is inactive") };
        #ok(user);
      };
      case null { #err("Invalid email or password") };
    };
  };

  public func getUserById(
    users : UserMap,
    id : Text,
  ) : Types.Result<Types.User, Text> {
    switch (users.get(id)) {
      case (?user) { #ok(user) };
      case null { #err("User not found") };
    };
  };

  public func updateUser(
    users : UserMap,
    id : Text,
    firstName : Text,
    lastName : Text,
    phone : ?Text,
  ) : Types.Result<Types.User, Text> {
    switch (users.get(id)) {
      case (?user) {
        let updated : Types.User = {
          user with
          firstName;
          lastName;
          phone;
        };
        users.add(id, updated);
        #ok(updated);
      };
      case null { #err("User not found") };
    };
  };

  public func getAllUsers(users : UserMap) : [Types.User] {
    users.values().toArray();
  };
};
