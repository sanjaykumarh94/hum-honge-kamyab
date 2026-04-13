import Types "../types/common";
import CentersLib "../lib/centers";

mixin (centers : CentersLib.CenterMap, centerCounter : CentersLib.Counter) {
  public func addCenter(
    name : Text,
    location : Text,
    capacity : Nat,
    managerName : Text,
    managerContact : Text,
  ) : async Types.Center {
    CentersLib.createCenter(centers, centerCounter, name, location, capacity, managerName, managerContact);
  };

  public func listCenters() : async [Types.Center] {
    CentersLib.getCenters(centers);
  };

  public func getCenter(id : Text) : async ?Types.Center {
    CentersLib.getCenterById(centers, id);
  };

  public func updateCenter(
    id : Text,
    name : Text,
    location : Text,
    capacity : Nat,
    managerName : Text,
    managerContact : Text,
  ) : async Types.Result<Types.Center, Text> {
    CentersLib.updateCenter(centers, id, name, location, capacity, managerName, managerContact);
  };

  public func deleteCenter(id : Text) : async Types.Result<(), Text> {
    CentersLib.deleteCenter(centers, id);
  };
};
