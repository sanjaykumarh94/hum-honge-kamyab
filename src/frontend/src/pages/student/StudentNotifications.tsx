import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, BookOpen, Briefcase, Calendar, CheckCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  useGetNotifications,
  useMarkNotificationRead,
} from "../../hooks/useBackend";
import { useAuthStore } from "../../store/auth";
import type { Notification } from "../../types";

const FILTER_TABS = [
  "all",
  "job_alert",
  "course_update",
  "event_reminder",
] as const;
type NotifFilter = (typeof FILTER_TABS)[number];

const TAB_LABELS: Record<NotifFilter, string> = {
  all: "All",
  job_alert: "Job Alerts",
  course_update: "Course Updates",
  event_reminder: "Events",
};

function notifIcon(type: string) {
  if (type === "job_alert")
    return <Briefcase size={16} className="text-accent" />;
  if (type === "course_update")
    return <BookOpen size={16} className="text-primary" />;
  if (type === "event_reminder")
    return <Calendar size={16} className="text-chart-2" />;
  return <Bell size={16} className="text-muted-foreground" />;
}

function notifTypeLabel(type: string) {
  if (type === "job_alert") return "Job Alert";
  if (type === "course_update") return "Course Update";
  if (type === "event_reminder") return "Event Reminder";
  return type;
}

function notifTypeCls(type: string) {
  if (type === "job_alert") return "bg-accent/10 text-accent border-accent/30";
  if (type === "course_update")
    return "bg-primary/10 text-primary border-primary/30";
  if (type === "event_reminder")
    return "bg-muted text-foreground border-border";
  return "bg-muted text-muted-foreground border-border";
}

function formatRelativeTime(ts: bigint) {
  const ms = Number(ts) / 1_000_000;
  const diff = Date.now() - ms;
  if (diff < 60_000) return "Just now";
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`;
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`;
  if (diff < 7 * 86_400_000) return `${Math.floor(diff / 86_400_000)}d ago`;
  return new Date(ms).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
  });
}

export default function StudentNotifications() {
  const { user } = useAuthStore();
  const userId = user?.id ?? "";

  const { data: notifications = [], isLoading } = useGetNotifications(userId);
  const markRead = useMarkNotificationRead();

  const [filter, setFilter] = useState<NotifFilter>("all");

  const filtered = notifications.filter((n: Notification) => {
    if (filter === "all") return true;
    return n.notifType === filter;
  });

  const unreadCount = notifications.filter(
    (n: Notification) => !n.isRead,
  ).length;

  const handleMarkRead = async (notif: Notification) => {
    if (notif.isRead) return;
    try {
      await markRead.mutateAsync({ notifId: notif.id, userId });
    } catch {
      toast.error("Failed to mark notification as read.");
    }
  };

  const handleMarkAllRead = async () => {
    const unread = notifications.filter((n: Notification) => !n.isRead);
    try {
      await Promise.all(
        unread.map((n: Notification) =>
          markRead.mutateAsync({ notifId: n.id, userId }),
        ),
      );
      toast.success("All notifications marked as read.");
    } catch {
      toast.error("Some notifications could not be marked as read.");
    }
  };

  return (
    <div className="space-y-6" data-ocid="student-notifications">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Notifications
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {unreadCount > 0 ? (
              <span>
                You have{" "}
                <span className="text-primary font-semibold">
                  {unreadCount}
                </span>{" "}
                unread notification{unreadCount !== 1 ? "s" : ""}
              </span>
            ) : (
              "All caught up!"
            )}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleMarkAllRead}
            disabled={markRead.isPending}
            data-ocid="mark-all-read-btn"
          >
            <CheckCheck size={14} className="mr-1.5" />
            Mark All Read
          </Button>
        )}
      </div>

      <Tabs
        value={filter}
        onValueChange={(v) => setFilter(v as NotifFilter)}
        data-ocid="notif-filter-tabs"
      >
        <TabsList>
          {FILTER_TABS.map((tab) => (
            <TabsTrigger key={tab} value={tab}>
              {TAB_LABELS[tab]}
              {tab === "all" && unreadCount > 0 && (
                <Badge
                  variant="secondary"
                  className="ml-1.5 text-xs px-1.5 py-0 h-4 min-w-4 bg-primary text-primary-foreground"
                >
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {isLoading ? (
        <div className="space-y-3">
          {["sk-0", "sk-1", "sk-2", "sk-3"].map((key) => (
            <Skeleton key={key} className="h-20 rounded-lg" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="py-16 flex flex-col items-center text-muted-foreground gap-3">
            <Bell size={40} className="opacity-30" />
            <p className="font-medium">
              No {filter === "all" ? "" : TAB_LABELS[filter]} notifications
            </p>
            <p className="text-sm">
              {filter === "all"
                ? "You're all caught up! No notifications yet."
                : `No ${TAB_LABELS[filter].toLowerCase()} to show.`}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {filtered.map((notif: Notification) => (
            <button
              type="button"
              key={notif.id}
              onClick={() => handleMarkRead(notif)}
              className={`relative w-full text-left flex items-start gap-3 p-4 rounded-lg border transition-all cursor-pointer select-none ${
                notif.isRead
                  ? "bg-card border-border"
                  : "bg-primary/5 border-primary/20 hover:bg-primary/10"
              }`}
              data-ocid={`notification-item-${notif.id}`}
            >
              {!notif.isRead && (
                <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary shrink-0" />
              )}
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                  notif.isRead ? "bg-muted" : "bg-primary/10"
                }`}
              >
                {notifIcon(notif.notifType)}
              </div>
              <div className="flex-1 min-w-0 pr-5">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <Badge
                    variant="outline"
                    className={`text-xs ${notifTypeCls(notif.notifType)}`}
                  >
                    {notifTypeLabel(notif.notifType)}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {formatRelativeTime(notif.createdAt)}
                  </span>
                </div>
                <p
                  className={`text-sm leading-relaxed ${
                    notif.isRead
                      ? "text-muted-foreground"
                      : "text-foreground font-medium"
                  }`}
                >
                  {notif.message}
                </p>
                {notif.link && (
                  <a
                    href={notif.link}
                    className="text-xs text-primary hover:underline mt-1 inline-block"
                    onClick={(e) => e.stopPropagation()}
                  >
                    View Details →
                  </a>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
