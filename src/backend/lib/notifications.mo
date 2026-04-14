import Types "../types/common";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Int "mo:core/Int";

module {
  public type NotificationMap = Map.Map<Text, Types.Notification>;
  public type Counter = { var val : Nat };

  func genNotifId(counter : Counter) : Text {
    counter.val += 1;
    "n" # debug_show(counter.val);
  };

  /// Returns all notifications for a user, sorted by newest first (descending createdAt).
  public func getNotifications(
    notifications : NotificationMap,
    userId : Text,
  ) : [Types.Notification] {
    let filtered = notifications.values().filter(
      func(n : Types.Notification) : Bool { n.userId == userId },
    ).toArray();
    // Sort by createdAt descending (newest first)
    filtered.sort(func(a, b) { Int.compare(b.createdAt, a.createdAt) });
  };

  public func markNotificationRead(
    notifications : NotificationMap,
    notifId : Text,
  ) : Types.Result<(), Text> {
    switch (notifications.get(notifId)) {
      case (?notif) {
        let updated : Types.Notification = { notif with isRead = true };
        notifications.add(notifId, updated);
        #ok(());
      };
      case null { #err("Notification not found") };
    };
  };

  public func createNotification(
    notifications : NotificationMap,
    counter : Counter,
    userId : Text,
    notifType : Text,
    message : Text,
    link : ?Text,
  ) : Types.Notification {
    let id = genNotifId(counter);
    let notif : Types.Notification = {
      id;
      userId;
      notifType;
      message;
      link;
      isRead = false;
      createdAt = Time.now();
    };
    notifications.add(id, notif);
    notif;
  };
};
