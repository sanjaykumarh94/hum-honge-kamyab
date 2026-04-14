import { c as createLucideIcon, m as useNavigate, f as useAuthStore, j as jsxRuntimeExports, a as Button, U as Users, b as BookOpen, e as Building2, G as GraduationCap, n as Skeleton, B as Badge } from "./index-BFdoklgf.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-CIs8rJlK.js";
import { d as useGetAllStudents, e as useGetCourses, f as useGetCenters, g as useGetPlacementDrives } from "./useBackend-Dhw_nMAY.js";
import { T as TrendingUp } from "./trending-up-DlL2fkss.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M8 12h8", key: "1wcyev" }],
  ["path", { d: "M12 8v8", key: "napkw2" }]
];
const CirclePlus = createLucideIcon("circle-plus", __iconNode);
const COURSE_CATEGORIES = [
  "IT",
  "Healthcare",
  "Automotive",
  "Construction",
  "Retail"
];
function StatCard({
  title,
  value,
  icon: Icon,
  color,
  loading
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { "data-ocid": "stat-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-muted-foreground", children: title }),
      loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-20" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold font-display", children: value })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `p-3 rounded-xl ${color}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5 text-primary-foreground" }) })
  ] }) }) });
}
function AdminOverview() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { data: students = [], isLoading: loadStudents } = useGetAllStudents();
  const { data: courses = [], isLoading: loadCourses } = useGetCourses();
  const { data: centers = [], isLoading: loadCenters } = useGetCenters();
  const { data: drives = [], isLoading: loadDrives } = useGetPlacementDrives();
  const now = Date.now();
  const upcoming = drives.filter((d) => Number(d.driveDate) > now).sort((a, b) => Number(a.driveDate) - Number(b.driveDate)).slice(0, 3);
  const recentStudents = [...students].sort((a, b) => Number(b.createdAt) - Number(a.createdAt)).slice(0, 5);
  const categoryCounts = COURSE_CATEGORIES.map((cat) => ({
    label: cat,
    count: courses.filter((c) => c.category === cat).length
  }));
  const maxCount = Math.max(...categoryCounts.map((c) => c.count), 1);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold font-display text-foreground", children: "Hum Honge Kamyab — Dashboard" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mt-1", children: [
          "Welcome back,",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-primary", children: user ? `${user.firstName} ${user.lastName}` : "Administrator" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            size: "sm",
            variant: "outline",
            onClick: () => navigate({ to: "/admin/centers" }),
            "data-ocid": "quick-add-center",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "h-4 w-4 mr-1" }),
              "Add Center"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            size: "sm",
            variant: "outline",
            onClick: () => navigate({ to: "/admin/courses" }),
            "data-ocid": "quick-add-course",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "h-4 w-4 mr-1" }),
              "Add Course"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            size: "sm",
            onClick: () => navigate({ to: "/admin/students" }),
            "data-ocid": "quick-add-student",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "h-4 w-4 mr-1" }),
              "Students"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          title: "Total Students",
          value: students.length,
          icon: Users,
          color: "bg-primary",
          loading: loadStudents
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          title: "Total Courses",
          value: courses.length,
          icon: BookOpen,
          color: "bg-accent",
          loading: loadCourses
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          title: "Total Centers",
          value: centers.length,
          icon: Building2,
          color: "bg-primary/80",
          loading: loadCenters
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          title: "Placement Drives",
          value: drives.length,
          icon: TrendingUp,
          color: "bg-accent/80",
          loading: loadDrives
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "lg:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base font-semibold flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "h-4 w-4 text-primary" }),
          "Courses by Category"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: loadCourses ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3 h-32 items-end", children: ["c1", "c2", "c3", "c4", "c5"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "flex-1 h-full" }, k)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3 items-end h-32", children: categoryCounts.map((cat) => {
          const pct = Math.round(cat.count / maxCount * 100);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex-1 flex flex-col items-center gap-1",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-primary", children: cat.count }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-muted rounded-t overflow-hidden h-20 flex items-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-full bg-primary/70 rounded-t transition-all duration-500",
                    style: { height: `${Math.max(pct, 4)}%` }
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground truncate w-full text-center", children: cat.label })
              ]
            },
            cat.label
          );
        }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base font-semibold", children: "Upcoming Placement Drives" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-3", children: loadDrives ? ["d1", "d2", "d3"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14" }, k)) : upcoming.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground py-4 text-center", children: "No upcoming drives scheduled" }) : upcoming.map((drive) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-start justify-between p-3 rounded-lg bg-muted/40 border border-border",
            "data-ocid": "drive-item",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium truncate", children: drive.companyName }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: drive.location }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: new Date(Number(drive.driveDate)).toLocaleDateString(
                  "en-IN"
                ) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "ml-2 shrink-0", children: [
                drive.positions.toString(),
                " posts"
              ] })
            ]
          },
          drive.id
        )) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base font-semibold flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4 text-primary" }),
        "Recent Students"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: loadStudents ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: ["s1", "s2", "s3", "s4", "s5"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10" }, k)) }) : recentStudents.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground py-4 text-center", children: "No students enrolled yet" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: recentStudents.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center justify-between py-3",
          "data-ocid": "student-row",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-bold text-primary", children: [
                s.firstName[0],
                s.lastName[0]
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium truncate", children: [
                  s.firstName,
                  " ",
                  s.lastName
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: s.email })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "ml-2 shrink-0", children: s.role })
          ]
        },
        s.id
      )) }) })
    ] })
  ] });
}
export {
  AdminOverview as default
};
