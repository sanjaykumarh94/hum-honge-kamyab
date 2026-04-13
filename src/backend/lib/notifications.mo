import Types "../types/common";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Iter "mo:core/Iter";

module {
  public type NotificationMap = Map.Map<Text, Types.Notification>;
  public type Counter = { var val : Nat };

  func genNotifId(counter : Counter) : Text {
    counter.val += 1;
    "n" # debug_show(counter.val);
  };

  public func getNotifications(
    notifications : NotificationMap,
    userId : Text,
  ) : [Types.Notification] {
    notifications.values().filter<Types.Notification>(
      func(n) { n.userId == userId },
    ).toArray();
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
