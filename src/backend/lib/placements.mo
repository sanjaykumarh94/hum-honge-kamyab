import Types "../types/common";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Iter "mo:core/Iter";

module {
  public type DriveMap = Map.Map<Text, Types.PlacementDrive>;
  public type PlacementRecordMap = Map.Map<Text, Types.PlacementRecord>;
  public type Counter = { var val : Nat };

  func genDriveId(counter : Counter) : Text {
    counter.val += 1;
    "d" # debug_show(counter.val);
  };

  func genRecordId(counter : Counter) : Text {
    counter.val += 1;
    "pr" # debug_show(counter.val);
  };

  public func createPlacementDrive(
    drives : DriveMap,
    counter : Counter,
    companyName : Text,
    location : Text,
    driveDate : Types.Timestamp,
    positions : Nat,
    description : Text,
  ) : Types.PlacementDrive {
    let id = genDriveId(counter);
    let drive : Types.PlacementDrive = {
      id;
      companyName;
      location;
      driveDate;
      positions;
      description;
      status = "upcoming";
      createdAt = Time.now();
    };
    drives.add(id, drive);
    drive;
  };

  public func getPlacementDrives(drives : DriveMap) : [Types.PlacementDrive] {
    drives.values().toArray();
  };

  public func getPlacementDrivesByStudent(
    placementRecords : PlacementRecordMap,
    studentId : Text,
  ) : [Types.PlacementRecord] {
    placementRecords.values().filter<Types.PlacementRecord>(
      func(r) { r.studentId == studentId },
    ).toArray();
  };

  public func createPlacementRecord(
    placementRecords : PlacementRecordMap,
    counter : Counter,
    studentId : Text,
    driveId : Text,
  ) : Types.PlacementRecord {
    let id = genRecordId(counter);
    let record : Types.PlacementRecord = {
      id;
      studentId;
      driveId;
      testResult = null;
      offerStatus = "pending";
      offerDetails = null;
      createdAt = Time.now();
    };
    placementRecords.add(id, record);
    record;
  };
};
