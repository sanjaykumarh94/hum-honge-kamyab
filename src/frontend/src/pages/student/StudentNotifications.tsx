import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bell,
  BookOpen,
  Briefcase,
  Calendar,
  CheckCheck,
  CheckCircle,
  Trophy,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useNotificationContext } from "../../context/NotificationContext";
import type { Notification } from "../../types";

// ─── Filter config ────────────────────────────────────────────────
const FILTER_TABS = [
  "all",
  "job_alert",
  "course_update",
  "event_reminder",
  "placement_drive",
  "application_status",
] as const;

type NotifFilter = (typeof FILTER_TABS)[number];

const TAB_LABELS: Record<NotifFilter, string> = {
  all: "All",
  job_alert: "Job Alerts",
  course_update: "Courses",
  event_reminder: "Events",
  placement_drive: "Placement",
  application_status: "Applications",
};

// ─── Helpers ──────────────────────────────────────────────────────
function notifIcon(type: string) {
  if (type === "job_alert")
    return <Briefcase size={18} className="text-accent flex-shrink-0" />;
  if (type === "course_update")
    return <BookOpen size={18} className="text-primary flex-shrink-0" />;
  if (type === "event_reminder")
    return <Calendar size={18} className="text-chart-2 flex-shrink-0" />;
  if (type === "placement_drive")
    return <Trophy size={18} className="text-chart-5 flex-shrink-0" />;
  if (type === "application_status")
    return <CheckCircle size={18} className="text-chart-3 flex-shrink-0" />;
  return <Bell size={18} className="text-muted-foreground flex-shrink-0" />;
}

function notifTypeLabel(type: string): string {
  const map: Record<string, string> = {
    job_alert: "Job Alert",
    course_update: "Course Update",
    event_reminder: "Event",
    placement_drive: "Placement Drive",
    application_status: "Application",
  };
  return map[type] ?? type;
}

function notifTypeCls(type: string): string {
  const map: Record<string, string> = {
    job_alert: "bg-accent/10 text-accent border-accent/30",
    course_update: "bg-primary/10 text-primary border-primary/30",
    event_reminder: "bg-chart-2/10 text-chart-2 border-chart-2/30",
    placement_drive: "bg-chart-5/10 text-chart-5 border-chart-5/30",
    application_status: "bg-chart-3/10 text-chart-3 border-chart-3/30",
  };
  return map[type] ?? "bg-muted text-muted-foreground border-border";
}

function notifIconBg(type: string): string {
  const map: Record<string, string> = {
    job_alert: "bg-accent/10",
    course_update: "bg-primary/10",
    event_reminder: "bg-chart-2/10",
    placement_drive: "bg-chart-5/10",
    application_status: "bg-chart-3/10",
  };
  return map[type] ?? "bg-muted";
}

function formatRelativeTime(ts: bigint): string {
  const ms = Number(ts) / 1_000_000;
  const diff = Date.now() - ms;
  if (diff < 60_000) return "Just now";
  if (diff < 3_600_000) {
    const mins = Math.floor(diff / 60_000);
    return `${mins} min${mins !== 1 ? "s" : ""} ago`;
  }
  if (diff < 86_400_000) {
    const hours = Math.floor(diff / 3_600_000);
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  }
  if (diff < 2 * 86_400_000) return "Yesterday";
  if (diff < 7 * 86_400_000) return `${Math.floor(diff / 86_400_000)} days ago`;
  return new Date(ms).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
  });
}

// ─── Component ────────────────────────────────────────────────────
export default function StudentNotifications() {
  const { notifications, unreadCount, isLoading, markRead } =
    useNotificationContext();

  const [filter, setFilter] = useState<NotifFilter>("all");
  const [markingAll, setMarkingAll] = useState(false);

  const filtered = notifications.filter((n: Notification) =>
    filter === "all" ? true : n.notifType === filter,
  );

  const handleMarkRead = async (notif: Notification) => {
    if (notif.isRead) return;
    try {
      await markRead(notif.id);
    } catch {
      toast.error("Could not mark notification as read.");
    }
  };

  const handleMarkAllRead = async () => {
    const unread = notifications.filter((n: Notification) => !n.isRead);
    if (unread.length === 0) return;
    setMarkingAll(true);
    try {
      await Promise.all(unread.map((n: Notification) => markRead(n.id)));
      toast.success("All notifications marked as read.");
    } catch {
      toast.error("Some notifications could not be marked as read.");
    } finally {
      setMarkingAll(false);
    }
  };

  return (
    <div className="space-y-6" data-ocid="student-notifications">
      {/* ── Header ── */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-display text-2xl font-bold text-foreground">
              Notifications
            </h1>
            {unreadCount > 0 && (
              <span
                className="notification-badge"
                data-ocid="notif-unread-badge"
              >
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </div>
          <p className="text-muted-foreground text-sm mt-1">
            {unreadCount > 0 ? (
              <>
                You have{" "}
                <span className="text-primary font-semibold">
                  {unreadCount}
                </span>{" "}
                unread notification{unreadCount !== 1 ? "s" : ""}
              </>
            ) : (
              "All caught up! You're up to date."
            )}
          </p>
        </div>

        {unreadCount > 0 && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleMarkAllRead}
            disabled={markingAll}
            className="shrink-0"
            data-ocid="mark-all-read-btn"
          >
            <CheckCheck size={14} className="mr-1.5" />
            Mark All Read
          </Button>
        )}
      </div>

      {/* ── Filter Tabs ── */}
      <Tabs
        value={filter}
        onValueChange={(v) => setFilter(v as NotifFilter)}
        data-ocid="notif-filter-tabs"
      >
        <TabsList className="flex-wrap h-auto gap-1 p-1">
          {FILTER_TABS.map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className="text-xs sm:text-sm"
              data-ocid={`notif-filter-${tab}`}
            >
              {TAB_LABELS[tab]}
              {tab === "all" && unreadCount > 0 && (
                <Badge
                  variant="secondary"
                  className="ml-1.5 text-xs px-1.5 py-0 h-4 min-w-[1rem] bg-primary text-primary-foreground"
                >
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* ── Content ── */}
      {isLoading ? (
        <div className="space-y-3" data-ocid="notif-loading">
          {["sk-0", "sk-1", "sk-2", "sk-3"].map((key) => (
            <Skeleton key={key} className="h-24 rounded-lg" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <Card className="border-dashed bg-card" data-ocid="notif-empty-state">
          <CardContent className="py-16 flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
              <Bell size={28} className="text-muted-foreground opacity-50" />
            </div>
            <div>
              <p className="font-display font-semibold text-foreground text-lg">
                No notifications yet
              </p>
              <p className="text-muted-foreground text-sm mt-1 max-w-xs mx-auto">
                {filter === "all"
                  ? "When you get notifications they'll appear here. Check back soon!"
                  : `No ${TAB_LABELS[filter].toLowerCase()} notifications at the moment.`}
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2" data-ocid="notif-list">
          {filtered.map((notif: Notification) => (
            <button
              type="button"
              key={notif.id}
              onClick={() => handleMarkRead(notif)}
              className={`relative w-full text-left flex items-start gap-3 p-4 rounded-lg border transition-smooth select-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none ${
                notif.isRead
                  ? "bg-card border-border hover:bg-muted/40 cursor-default"
                  : "bg-primary/5 border-primary/20 hover:bg-primary/10 cursor-pointer"
              }`}
              data-ocid={`notification-item-${notif.id}`}
            >
              {/* Unread dot */}
              {!notif.isRead && (
                <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary shrink-0 transition-pulse" />
              )}

              {/* Icon */}
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                  notif.isRead ? "bg-muted" : notifIconBg(notif.notifType)
                }`}
              >
                {notifIcon(notif.notifType)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 pr-6">
                {/* Type badge + timestamp */}
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <Badge
                    variant="outline"
                    className={`text-xs px-1.5 py-0 h-5 ${notifTypeCls(notif.notifType)}`}
                  >
                    {notifTypeLabel(notif.notifType)}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {formatRelativeTime(notif.createdAt)}
                  </span>
                </div>

                {/* Message — acts as title+body since backend has single field */}
                <p
                  className={`text-sm leading-relaxed break-words ${
                    notif.isRead ? "notification-read" : "notification-unread"
                  }`}
                >
                  {notif.message}
                </p>

                {/* Link CTA */}
                {notif.link && (
                  <a
                    href={notif.link}
                    className="text-xs text-primary hover:underline mt-2 inline-flex items-center gap-1 font-medium"
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
