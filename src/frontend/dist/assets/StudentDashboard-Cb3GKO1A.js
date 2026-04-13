import { f as useAuthStore, j as jsxRuntimeExports, B as Badge, T as Trophy, l as Skeleton, b as BookOpen, G as GraduationCap, p as Bell, d as Briefcase, L as Link, a as Button } from "./index-BESvdAtP.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-BILcuGgo.js";
import { P as Progress } from "./progress-C0gUBxOj.js";
import { l as useGetEnrollmentsByStudent, c as useGetCourses, o as useGetNotifications, k as useGetStudentProfile } from "./useBackend-DY9BrSjM.js";
function StatCard({
  icon,
  label,
  value,
  accent
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: accent ? "border-primary/40 bg-primary/5" : "", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex items-center gap-4 p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${accent ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`,
        children: icon
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-display font-bold text-foreground leading-none", children: value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: label })
    ] })
  ] }) });
}
function NotifTypeBadge({ type }) {
  const map = {
    job_alert: {
      label: "Job Alert",
      cls: "bg-accent/15 text-accent border-accent/30"
    },
    course_update: {
      label: "Course",
      cls: "bg-primary/15 text-primary border-primary/30"
    },
    event_reminder: {
      label: "Event",
      cls: "bg-chart-3/20 text-foreground border-border"
    }
  };
  const cfg = map[type] ?? {
    label: type,
    cls: "bg-muted text-muted-foreground"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: `text-xs ${cfg.cls}`, children: cfg.label });
}
function StudentDashboard() {
  const { user } = useAuthStore();
  const userId = (user == null ? void 0 : user.id) ?? "";
  const { data: enrollments = [], isLoading: loadingEnrollments } = useGetEnrollmentsByStudent(userId);
  const { data: courses = [], isLoading: loadingCourses } = useGetCourses();
  const { data: notifications = [], isLoading: loadingNotifs } = useGetNotifications(userId);
  const { data: profile } = useGetStudentProfile(userId);
  const now = BigInt(Date.now()) * BigInt(1e6);
  const thirtyDaysNs = BigInt(30) * BigInt(24) * BigInt(36e11);
  const enrolledCourseIds = new Set(
    enrollments.map((e) => e.courseId)
  );
  const activeEnrollments = enrollments.filter(
    (e) => e.status === "active" || e.status === "enrolled"
  );
  const completedEnrollments = enrollments.filter(
    (e) => e.status === "completed"
  );
  const unreadNotifs = notifications.filter((n) => !n.isRead);
  const upcomingCourses = courses.filter(
    (c) => c.startDate > now && c.startDate <= now + thirtyDaysNs && !enrolledCourseIds.has(c.id)
  ).slice(0, 4);
  const ongoingWithCourse = activeEnrollments.map((e) => ({
    enrollment: e,
    course: courses.find((c) => c.id === e.courseId)
  })).filter(({ course }) => !!course).slice(0, 4);
  const latestNotifs = unreadNotifs.slice(0, 3);
  const placementStatus = (profile == null ? void 0 : profile.placementStatus) ?? "Not Started";
  const placementColor = placementStatus === "Placed" ? "bg-green-100 text-green-800 border-green-300" : placementStatus === "In Progress" ? "bg-amber-100 text-amber-800 border-amber-300" : "bg-muted text-muted-foreground border-border";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", "data-ocid": "student-dashboard", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-2xl font-bold", children: [
          "नमस्ते, ",
          (user == null ? void 0 : user.firstName) ?? "Student",
          "!"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-primary-foreground/80 mt-1 text-sm", children: [
          "Namaste ",
          user == null ? void 0 : user.firstName,
          " ",
          user == null ? void 0 : user.lastName,
          "! Welcome back to हम होंगे कामयाब."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Badge,
        {
          variant: "outline",
          className: `self-start sm:self-center border text-sm px-3 py-1 ${placementColor}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { size: 13, className: "mr-1.5 inline" }),
            placementStatus
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: loadingEnrollments ? Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Skeleton,
      {
        className: "h-24 rounded-lg"
      },
      `stat-sk-${String(i)}`
    )) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { size: 18 }),
          label: "Courses Enrolled",
          value: enrollments.length,
          accent: true
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { size: 18 }),
          label: "Completed",
          value: completedEnrollments.length
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { size: 18 }),
          label: "Notifications",
          value: unreadNotifs.length
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { size: 18 }),
          label: "Placement Status",
          value: placementStatus
        }
      )
    ] }) }),
    !loadingNotifs && latestNotifs.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-accent/30 bg-accent/5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3 pt-4 px-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-semibold flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { size: 15, className: "text-accent" }),
        "Latest Notifications",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/student/notifications",
            className: "ml-auto text-xs text-primary hover:underline font-normal",
            children: "View All"
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "px-5 pb-4 space-y-2", children: latestNotifs.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-start gap-3 py-2 border-b border-border last:border-0",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(NotifTypeBadge, { type: n.notifType }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground flex-1 min-w-0", children: n.message })
          ]
        },
        n.id
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-lg text-foreground", children: "Ongoing Courses" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/student/enrollments", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "ghost",
            size: "sm",
            className: "text-primary",
            children: "View All"
          }
        ) })
      ] }),
      loadingEnrollments || loadingCourses ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: ["oc-0", "oc-1"].map((key) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-36 rounded-lg" }, key)) }) : ongoingWithCourse.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-dashed", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "py-10 text-center text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { size: 36, className: "mx-auto mb-3 opacity-40" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No ongoing courses. Browse and enroll below." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/student/courses", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", size: "sm", className: "mt-3", children: "Browse Courses" }) })
      ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: ongoingWithCourse.map(
        ({
          enrollment,
          course
        }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Card,
          {
            className: "hover:shadow-md transition-shadow",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground truncate", children: course.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs mt-1", children: course.category })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Badge,
                  {
                    variant: "outline",
                    className: "text-xs shrink-0 border-primary/30 text-primary",
                    children: [
                      Number(enrollment.progressPercent),
                      "%"
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Progress,
                {
                  value: Number(enrollment.progressPercent),
                  className: "h-2"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  new Date(
                    Number(course.startDate) / 1e6
                  ).toLocaleDateString(),
                  " ",
                  "–",
                  " ",
                  new Date(
                    Number(course.endDate) / 1e6
                  ).toLocaleDateString()
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/student/enrollments", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    size: "sm",
                    variant: "outline",
                    className: "text-xs h-7",
                    children: "Continue"
                  }
                ) })
              ] })
            ] })
          },
          enrollment.id
        )
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-lg text-foreground", children: "Upcoming Courses" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/student/courses", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "ghost",
            size: "sm",
            className: "text-primary",
            children: "Browse All Courses"
          }
        ) })
      ] }),
      loadingCourses ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: ["up-0", "up-1"].map((key) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 rounded-lg" }, key)) }) : upcomingCourses.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-dashed", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "py-8 text-center text-muted-foreground text-sm", children: "No upcoming courses in the next 30 days." }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: upcomingCourses.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "hover:shadow-md transition-shadow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground truncate", children: c.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: c.category }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
              "Starts",
              " ",
              new Date(
                Number(c.startDate) / 1e6
              ).toLocaleDateString()
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
            Number(c.enrolledCount),
            "/",
            Number(c.capacity),
            " enrolled"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/student/courses", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            size: "sm",
            className: "shrink-0 bg-primary text-primary-foreground hover:bg-primary/90",
            children: "Enroll"
          }
        ) })
      ] }) }) }, c.id)) })
    ] })
  ] });
}
export {
  StudentDashboard as default
};
