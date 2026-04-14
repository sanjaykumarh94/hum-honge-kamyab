import Types "../types/common";
import NotifLib "../lib/notifications";

mixin (notifications : NotifLib.NotificationMap, notifCounter : NotifLib.Counter) {

  /// Returns all notifications for a user, sorted newest first.
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

  /// Poll-friendly endpoint: returns all notifications for a user plus the unread count.
  /// Frontend should call this on an interval (e.g. every 15 s) instead of WebSockets.
  public func getNotificationsWithCount(userId : Text) : async { notifications : [Types.Notification]; unreadCount : Nat } {
    let notifs = NotifLib.getNotifications(notifications, userId);
    var unread : Nat = 0;
    for (n in notifs.vals()) {
      if (not n.isRead) { unread += 1 };
    };
    { notifications = notifs; unreadCount = unread };
  };

  /// Lightweight badge-poll endpoint: returns only the unread count for a user.
  /// Call on a short interval (e.g. every 10 s) to keep notification badges up to date.
  public query func getUnreadCount(userId : Text) : async Nat {
    var unread : Nat = 0;
    for (n in notifications.values()) {
      if (n.userId == userId and not n.isRead) { unread += 1 };
    };
    unread;
  };
};
