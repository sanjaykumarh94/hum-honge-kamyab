import Types "../types/common";
import PlacementsLib "../lib/placements";
import AuthLib "../lib/auth";
import NotifLib "../lib/notifications";

mixin (
  drives : PlacementsLib.DriveMap,
  placementRecords : PlacementsLib.PlacementRecordMap,
  driveCounter : PlacementsLib.Counter,
  recordCounter : PlacementsLib.Counter,
  users : AuthLib.UserMap,
  notifications : NotifLib.NotificationMap,
  notifCounter : NotifLib.Counter,
) {
  public func listPlacementDrives() : async [Types.PlacementDrive] {
    PlacementsLib.getPlacementDrives(drives);
  };

  /// Create a placement drive and auto-send a placement_drive notification to all students.
  public func addPlacementDrive(
    companyName : Text,
    location : Text,
    driveDate : Types.Timestamp,
    positions : Nat,
    description : Text,
  ) : async Types.PlacementDrive {
    let drive = PlacementsLib.createPlacementDrive(drives, driveCounter, companyName, location, driveDate, positions, description);
    // Notify all students about the new placement drive
    let msg = "New placement drive announced: " # companyName # " in " # location # " — " # positions.toText() # " position(s) available.";
    for ((_, user) in users.entries()) {
      if (user.role == #Student) {
        let _ = NotifLib.createNotification(
          notifications,
          notifCounter,
          user.id,
          "placement_drive",
          msg,
          ?("drive:" # drive.id),
        );
      };
    };
    drive;
  };

  public func getMyPlacementRecord(studentId : Text) : async [Types.PlacementRecord] {
    PlacementsLib.getPlacementDrivesByStudent(placementRecords, studentId);
  };
};
