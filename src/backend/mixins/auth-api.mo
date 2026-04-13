import Types "../types/common";
import AuthLib "../lib/auth";

mixin (users : AuthLib.UserMap, userCounter : AuthLib.Counter) {
  public func register(
    email : Text,
    passwordHash : Text,
    firstName : Text,
    lastName : Text,
    role : Types.UserRole,
  ) : async Types.Result<Types.User, Text> {
    AuthLib.register(users, userCounter, email, passwordHash, firstName, lastName, role);
  };

  public func login(
    email : Text,
    passwordHash : Text,
  ) : async Types.Result<Types.User, Text> {
    AuthLib.login(users, email, passwordHash);
  };

  public func getUserById(id : Text) : async Types.Result<Types.User, Text> {
    AuthLib.getUserById(users, id);
  };

  public func updateUser(
    id : Text,
    firstName : Text,
    lastName : Text,
    phone : ?Text,
  ) : async Types.Result<Types.User, Text> {
    AuthLib.updateUser(users, id, firstName, lastName, phone);
  };

  public func getAllStudents() : async [Types.User] {
    let all = AuthLib.getAllUsers(users);
    all.vals().filter<Types.User>(func(u) { u.role == #Student }).toArray();
  };
};
