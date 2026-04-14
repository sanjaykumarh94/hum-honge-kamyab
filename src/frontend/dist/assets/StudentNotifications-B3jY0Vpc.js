import { c as createLucideIcon, w as useNotificationContext, r as reactExports, j as jsxRuntimeExports, a as Button, B as Badge, n as Skeleton, s as Bell, d as Briefcase, b as BookOpen, T as Trophy } from "./index-BFdoklgf.js";
import { C as Card, a as CardContent } from "./card-CIs8rJlK.js";
import { T as Tabs, a as TabsList, b as TabsTrigger } from "./tabs-B2JPa7zl.js";
import { u as ue } from "./index-t444bNAk.js";
import { C as Calendar } from "./calendar-SYG9NX0d.js";
import "./index-q7D4Kz4T.js";
import "./index-BaLXypA6.js";
import "./index-XioNHgJQ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M18 6 7 17l-5-5", key: "116fxf" }],
  ["path", { d: "m22 10-7.5 7.5L13 16", key: "ke71qq" }]
];
const CheckCheck = createLucideIcon("check-check", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
];
const CircleCheckBig = createLucideIcon("circle-check-big", __iconNode);
const FILTER_TABS = [
  "all",
  "job_alert",
  "course_update",
  "event_reminder",
  "placement_drive",
  "application_status"
];
const TAB_LABELS = {
  all: "All",
  job_alert: "Job Alerts",
  course_update: "Courses",
  event_reminder: "Events",
  placement_drive: "Placement",
  application_status: "Applications"
};
function notifIcon(type) {
  if (type === "job_alert")
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { size: 18, className: "text-accent flex-shrink-0" });
  if (type === "course_update")
    return /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { size: 18, className: "text-primary flex-shrink-0" });
  if (type === "event_reminder")
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 18, className: "text-chart-2 flex-shrink-0" });
  if (type === "placement_drive")
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { size: 18, className: "text-chart-5 flex-shrink-0" });
  if (type === "application_status")
    return /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 18, className: "text-chart-3 flex-shrink-0" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { size: 18, className: "text-muted-foreground flex-shrink-0" });
}
function notifTypeLabel(type) {
  const map = {
    job_alert: "Job Alert",
    course_update: "Course Update",
    event_reminder: "Event",
    placement_drive: "Placement Drive",
    application_status: "Application"
  };
  return map[type] ?? type;
}
function notifTypeCls(type) {
  const map = {
    job_alert: "bg-accent/10 text-accent border-accent/30",
    course_update: "bg-primary/10 text-primary border-primary/30",
    event_reminder: "bg-chart-2/10 text-chart-2 border-chart-2/30",
    placement_drive: "bg-chart-5/10 text-chart-5 border-chart-5/30",
    application_status: "bg-chart-3/10 text-chart-3 border-chart-3/30"
  };
  return map[type] ?? "bg-muted text-muted-foreground border-border";
}
function notifIconBg(type) {
  const map = {
    job_alert: "bg-accent/10",
    course_update: "bg-primary/10",
    event_reminder: "bg-chart-2/10",
    placement_drive: "bg-chart-5/10",
    application_status: "bg-chart-3/10"
  };
  return map[type] ?? "bg-muted";
}
function formatRelativeTime(ts) {
  const ms = Number(ts) / 1e6;
  const diff = Date.now() - ms;
  if (diff < 6e4) return "Just now";
  if (diff < 36e5) {
    const mins = Math.floor(diff / 6e4);
    return `${mins} min${mins !== 1 ? "s" : ""} ago`;
  }
  if (diff < 864e5) {
    const hours = Math.floor(diff / 36e5);
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  }
  if (diff < 2 * 864e5) return "Yesterday";
  if (diff < 7 * 864e5) return `${Math.floor(diff / 864e5)} days ago`;
  return new Date(ms).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short"
  });
}
function StudentNotifications() {
  const { notifications, unreadCount, isLoading, markRead } = useNotificationContext();
  const [filter, setFilter] = reactExports.useState("all");
  const [markingAll, setMarkingAll] = reactExports.useState(false);
  const filtered = notifications.filter(
    (n) => filter === "all" ? true : n.notifType === filter
  );
  const handleMarkRead = async (notif) => {
    if (notif.isRead) return;
    try {
      await markRead(notif.id);
    } catch {
      ue.error("Could not mark notification as read.");
    }
  };
  const handleMarkAllRead = async () => {
    const unread = notifications.filter((n) => !n.isRead);
    if (unread.length === 0) return;
    setMarkingAll(true);
    try {
      await Promise.all(unread.map((n) => markRead(n.id)));
      ue.success("All notifications marked as read.");
    } catch {
      ue.error("Some notifications could not be marked as read.");
    } finally {
      setMarkingAll(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "student-notifications", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "Notifications" }),
          unreadCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "notification-badge",
              "data-ocid": "notif-unread-badge",
              children: unreadCount > 99 ? "99+" : unreadCount
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: unreadCount > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          "You have",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-semibold", children: unreadCount }),
          " ",
          "unread notification",
          unreadCount !== 1 ? "s" : ""
        ] }) : "All caught up! You're up to date." })
      ] }),
      unreadCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          onClick: handleMarkAllRead,
          disabled: markingAll,
          className: "shrink-0",
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
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(TabsList, { className: "flex-wrap h-auto gap-1 p-1", children: FILTER_TABS.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            value: tab,
            className: "text-xs sm:text-sm",
            "data-ocid": `notif-filter-${tab}`,
            children: [
              TAB_LABELS[tab],
              tab === "all" && unreadCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "secondary",
                  className: "ml-1.5 text-xs px-1.5 py-0 h-4 min-w-[1rem] bg-primary text-primary-foreground",
                  children: unreadCount
                }
              )
            ]
          },
          tab
        )) })
      }
    ),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "notif-loading", children: ["sk-0", "sk-1", "sk-2", "sk-3"].map((key) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 rounded-lg" }, key)) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-dashed bg-card", "data-ocid": "notif-empty-state", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "py-16 flex flex-col items-center text-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { size: 28, className: "text-muted-foreground opacity-50" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground text-lg", children: "No notifications yet" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1 max-w-xs mx-auto", children: filter === "all" ? "When you get notifications they'll appear here. Check back soon!" : `No ${TAB_LABELS[filter].toLowerCase()} notifications at the moment.` })
      ] })
    ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", "data-ocid": "notif-list", children: filtered.map((notif) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => handleMarkRead(notif),
        className: `relative w-full text-left flex items-start gap-3 p-4 rounded-lg border transition-smooth select-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none ${notif.isRead ? "bg-card border-border hover:bg-muted/40 cursor-default" : "bg-primary/5 border-primary/20 hover:bg-primary/10 cursor-pointer"}`,
        "data-ocid": `notification-item-${notif.id}`,
        children: [
          !notif.isRead && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-4 right-4 w-2 h-2 rounded-full bg-primary shrink-0 transition-pulse" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${notif.isRead ? "bg-muted" : notifIconBg(notif.notifType)}`,
              children: notifIcon(notif.notifType)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 pr-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1.5 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: `text-xs px-1.5 py-0 h-5 ${notifTypeCls(notif.notifType)}`,
                  children: notifTypeLabel(notif.notifType)
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: formatRelativeTime(notif.createdAt) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: `text-sm leading-relaxed break-words ${notif.isRead ? "notification-read" : "notification-unread"}`,
                children: notif.message
              }
            ),
            notif.link && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: notif.link,
                className: "text-xs text-primary hover:underline mt-2 inline-flex items-center gap-1 font-medium",
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
