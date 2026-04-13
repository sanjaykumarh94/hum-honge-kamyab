import Types "../types/common";
import PlacementsLib "../lib/placements";

mixin (
  drives : PlacementsLib.DriveMap,
  placementRecords : PlacementsLib.PlacementRecordMap,
  driveCounter : PlacementsLib.Counter,
  recordCounter : PlacementsLib.Counter,
) {
  public func listPlacementDrives() : async [Types.PlacementDrive] {
    PlacementsLib.getPlacementDrives(drives);
  };

  public func addPlacementDrive(
    companyName : Text,
    location : Text,
    driveDate : Types.Timestamp,
    positions : Nat,
    description : Text,
  ) : async Types.PlacementDrive {
    PlacementsLib.createPlacementDrive(drives, driveCounter, companyName, location, driveDate, positions, description);
  };

  public func getMyPlacementRecord(studentId : Text) : async [Types.PlacementRecord] {
    PlacementsLib.getPlacementDrivesByStudent(placementRecords, studentId);
  };
};
