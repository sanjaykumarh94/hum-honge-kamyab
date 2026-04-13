import Types "../types/common";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Iter "mo:core/Iter";

module {
  public type CenterMap = Map.Map<Text, Types.Center>;
  public type Counter = { var val : Nat };

  func genId(counter : Counter) : Text {
    counter.val += 1;
    "c" # debug_show(counter.val);
  };

  public func createCenter(
    centers : CenterMap,
    counter : Counter,
    name : Text,
    location : Text,
    capacity : Nat,
    managerName : Text,
    managerContact : Text,
  ) : Types.Center {
    let id = genId(counter);
    let center : Types.Center = {
      id;
      name;
      location;
      capacity;
      managerName;
      managerContact;
      createdAt = Time.now();
    };
    centers.add(id, center);
    center;
  };

  public func getCenters(centers : CenterMap) : [Types.Center] {
    centers.values().toArray();
  };

  public func getCenterById(centers : CenterMap, id : Text) : ?Types.Center {
    centers.get(id);
  };

  public func updateCenter(
    centers : CenterMap,
    id : Text,
    name : Text,
    location : Text,
    capacity : Nat,
    managerName : Text,
    managerContact : Text,
  ) : Types.Result<Types.Center, Text> {
    switch (centers.get(id)) {
      case (?center) {
        let updated : Types.Center = {
          center with
          name;
          location;
          capacity;
          managerName;
          managerContact;
        };
        centers.add(id, updated);
        #ok(updated);
      };
      case null { #err("Center not found") };
    };
  };

  public func deleteCenter(
    centers : CenterMap,
    id : Text,
  ) : Types.Result<(), Text> {
    switch (centers.get(id)) {
      case (?_) {
        centers.remove(id);
        #ok(());
      };
      case null { #err("Center not found") };
    };
  };
};
