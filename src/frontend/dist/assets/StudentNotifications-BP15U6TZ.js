import { c as createLucideIcon, f as useAuthStore, r as reactExports, j as jsxRuntimeExports, a as Button, B as Badge, l as Skeleton, p as Bell, d as Briefcase, b as BookOpen } from "./index-BESvdAtP.js";
import { C as Card, a as CardContent } from "./card-BILcuGgo.js";
import { T as Tabs, a as TabsList, b as TabsTrigger } from "./tabs-BWRNkXzI.js";
import { u as ue } from "./index-B6STimMY.js";
import { o as useGetNotifications, s as useMarkNotificationRead } from "./useBackend-DY9BrSjM.js";
import { C as Calendar } from "./calendar-BU_hupJ9.js";
import "./index-DHKM-vaf.js";
import "./index-2V6FtwJL.js";
import "./index-C0RboPBm.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M18 6 7 17l-5-5", key: "116fxf" }],
  ["path", { d: "m22 10-7.5 7.5L13 16", key: "ke71qq" }]
];
const CheckCheck = createLucideIcon("check-check", __iconNode);
const FILTER_TABS = [
  "all",
  "job_alert",
  "course_update",
  "event_reminder"
];
const TAB_LABELS = {
  all: "All",
  job_alert: "Job Alerts",
  course_update: "Course Updates",
  event_reminder: "Events"
};
function notifIcon(type) {
  if (type === "job_alert")
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { size: 16, className: "text-accent" });
  if (type === "course_update")
    return /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { size: 16, className: "text-primary" });
  if (type === "event_reminder")
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 16, className: "text-chart-2" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { size: 16, className: "text-muted-foreground" });
}
function notifTypeLabel(type) {
  if (type === "job_alert") return "Job Alert";
  if (type === "course_update") return "Course Update";
  if (type === "event_reminder") return "Event Reminder";
  return type;
}
function notifTypeCls(type) {
  if (type === "job_alert") return "bg-accent/10 text-accent border-accent/30";
  if (type === "course_update")
    return "bg-primary/10 text-primary border-primary/30";
  if (type === "event_reminder")
    return "bg-muted text-foreground border-border";
  return "bg-muted text-muted-foreground border-border";
}
function formatRelativeTime(ts) {
  const ms = Number(ts) / 1e6;
  const diff = Date.now() - ms;
  if (diff < 6e4) return "Just now";
  if (diff < 36e5) return `${Math.floor(diff / 6e4)}m ago`;
  if (diff < 864e5) return `${Math.floor(diff / 36e5)}h ago`;
  if (diff < 7 * 864e5) return `${Math.floor(diff / 864e5)}d ago`;
  return new Date(ms).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short"
  });
}
function StudentNotifications() {
  const { user } = useAuthStore();
  const userId = (user == null ? void 0 : user.id) ?? "";
  const { data: notifications = [], isLoading } = useGetNotifications(userId);
  const markRead = useMarkNotificationRead();
  const [filter, setFilter] = reactExports.useState("all");
  const filtered = notifications.filter((n) => {
    if (filter === "all") return true;
    return n.notifType === filter;
  });
  const unreadCount = notifications.filter(
    (n) => !n.isRead
  ).length;
  const handleMarkRead = async (notif) => {
    if (notif.isRead) return;
    try {
      await markRead.mutateAsync({ notifId: notif.id, userId });
    } catch {
      ue.error("Failed to mark notification as read.");
    }
  };
  const handleMarkAllRead = async () => {
    const unread = notifications.filter((n) => !n.isRead);
    try {
      await Promise.all(
        unread.map(
          (n) => markRead.mutateAsync({ notifId: n.id, userId })
        )
      );
      ue.success("All notifications marked as read.");
    } catch {
      ue.error("Some notifications could not be marked as read.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "student-notifications", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "Notifications" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: unreadCount > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "You have",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-semibold", children: unreadCount }),
          " ",
          "unread notification",
          unreadCount !== 1 ? "s" : ""
        ] }) : "All caught up!" })
      ] }),
      unreadCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          onClick: handleMarkAllRead,
          disabled: markRead.isPending,
          "data-ocid": "mark-all-read-btn",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCheck, { size: 14, className: "mr-1.5" }),
            "Mark All Read"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Tabs,
      {
        value: filter,
        onValueChange: (v) => setFilter(v),
        "data-ocid": "notif-filter-tabs",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(TabsList, { children: FILTER_TABS.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: tab, children: [
          TAB_LABELS[tab],
          tab === "all" && unreadCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "secondary",
              className: "ml-1.5 text-xs px-1.5 py-0 h-4 min-w-4 bg-primary text-primary-foreground",
              children: unreadCount
            }
          )
        ] }, tab)) })
      }
    ),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: ["sk-0", "sk-1", "sk-2", "sk-3"].map((key) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 rounded-lg" }, key)) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-dashed", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "py-16 flex flex-col items-center text-muted-foreground gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { size: 40, className: "opacity-30" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium", children: [
        "No ",
        filter === "all" ? "" : TAB_LABELS[filter],
        " notifications"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: filter === "all" ? "You're all caught up! No notifications yet." : `No ${TAB_LABELS[filter].toLowerCase()} to show.` })
    ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: filtered.map((notif) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => handleMarkRead(notif),
        className: `relative w-full text-left flex items-start gap-3 p-4 rounded-lg border transition-all cursor-pointer select-none ${notif.isRead ? "bg-card border-border" : "bg-primary/5 border-primary/20 hover:bg-primary/10"}`,
        "data-ocid": `notification-item-${notif.id}`,
        children: [
          !notif.isRead && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-4 right-4 w-2 h-2 rounded-full bg-primary shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${notif.isRead ? "bg-muted" : "bg-primary/10"}`,
              children: notifIcon(notif.notifType)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 pr-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: `text-xs ${notifTypeCls(notif.notifType)}`,
                  children: notifTypeLabel(notif.notifType)
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: formatRelativeTime(notif.createdAt) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: `text-sm leading-relaxed ${notif.isRead ? "text-muted-foreground" : "text-foreground font-medium"}`,
                children: notif.message
              }
            ),
            notif.link && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: notif.link,
                className: "text-xs text-primary hover:underline mt-1 inline-block",
                onClick: (e) => e.stopPropagation(),
                children: "View Details →"
              }
            )
          ] })
        ]
      },
      notif.id
    )) })
  ] });
}
export {
  StudentNotifications as default
};
