import Types "../types/common";
import NotifLib "../lib/notifications";

mixin (notifications : NotifLib.NotificationMap, notifCounter : NotifLib.Counter) {
  public func getNotifications(userId : Text) : async [Types.Notification] {
    NotifLib.getNotifications(notifications, userId);
  };

  public func markNotificationRead(notifId : Text) : async Types.Result<(), Text> {
    NotifLib.markNotificationRead(notifications, notifId);
  };

  public func sendNotification(
    userId : Text,
    notifType : Text,
    message : Text,
    link : ?Text,
  ) : async Types.Notification {
    NotifLib.createNotification(notifications, notifCounter, userId, notifType, message, link);
  };
};
