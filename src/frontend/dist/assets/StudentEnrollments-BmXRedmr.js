import { f as useAuthStore, r as reactExports, j as jsxRuntimeExports, B as Badge, l as Skeleton, b as BookOpen, a as Button, C as ChevronRight } from "./index-BESvdAtP.js";
import { C as Card, a as CardContent } from "./card-BILcuGgo.js";
import { P as Progress } from "./progress-C0gUBxOj.js";
import { S as Sheet, a as SheetContent, b as SheetHeader, c as SheetTitle } from "./sheet-D7i-KW7k.js";
import { T as Tabs, a as TabsList, b as TabsTrigger } from "./tabs-BWRNkXzI.js";
import { l as useGetEnrollmentsByStudent, c as useGetCourses } from "./useBackend-DY9BrSjM.js";
import { C as Calendar } from "./calendar-BU_hupJ9.js";
import "./index-2uff8Ysi.js";
import "./index-DHKM-vaf.js";
import "./index-BWNgSiJ4.js";
import "./index-C0RboPBm.js";
import "./index-2V6FtwJL.js";
const STATUS_TABS = ["all", "active", "completed", "dropped"];
const STATUS_BADGE = {
  active: "bg-green-100 text-green-800 border-green-300",
  enrolled: "bg-blue-100 text-blue-800 border-blue-300",
  completed: "bg-primary/10 text-primary border-primary/30",
  dropped: "bg-destructive/10 text-destructive border-destructive/30"
};
function formatDate(ts) {
  return new Date(Number(ts) / 1e6).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}
function EnrollmentCard({ enrollment, course, onOpen }) {
  const statusCls = STATUS_BADGE[enrollment.status] ?? "bg-muted text-muted-foreground border-border";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Card,
    {
      className: "hover:shadow-md transition-shadow cursor-pointer",
      onClick: onOpen,
      "data-ocid": `enrollment-card-${enrollment.id}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground truncate", children: course.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: course.category }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: `text-xs ${statusCls}`, children: enrollment.status })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ChevronRight,
            {
              size: 16,
              className: "text-muted-foreground shrink-0 mt-1"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Progress" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              Number(enrollment.progressPercent),
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Progress,
            {
              value: Number(enrollment.progressPercent),
              className: "h-1.5"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-4 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 11 }),
            "Enrolled: ",
            formatDate(enrollment.enrolledAt)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            formatDate(course.startDate),
            " – ",
            formatDate(course.endDate)
          ] })
        ] })
      ] })
    }
  );
}
function StudentEnrollments() {
  const { user } = useAuthStore();
  const userId = (user == null ? void 0 : user.id) ?? "";
  const { data: enrollments = [], isLoading: loadingEnrollments } = useGetEnrollmentsByStudent(userId);
  const { data: courses = [], isLoading: loadingCourses } = useGetCourses();
  const [filter, setFilter] = reactExports.useState("all");
  const [selectedEnrollment, setSelectedEnrollment] = reactExports.useState(null);
  const enriched = enrollments.map((e) => ({
    enrollment: e,
    course: courses.find((c) => c.id === e.courseId)
  })).filter(({ course }) => !!course);
  const filtered = enriched.filter(
    ({ enrollment }) => {
      if (filter === "all") return true;
      if (filter === "active")
        return enrollment.status === "active" || enrollment.status === "enrolled";
      return enrollment.status === filter;
    }
  );
  const isLoading = loadingEnrollments || loadingCourses;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "student-enrollments", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "My Enrollments" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Track your course progress and status" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-sm px-3 py-1", children: [
        enrollments.length,
        " total"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Tabs,
      {
        value: filter,
        onValueChange: (v) => setFilter(v),
        "data-ocid": "enrollment-filter-tabs",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(TabsList, { children: STATUS_TABS.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: tab, className: "capitalize", children: tab }, tab)) })
      }
    ),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: ["sk-0", "sk-1", "sk-2", "sk-3"].map((key) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-36 rounded-lg" }, key)) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-dashed", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "py-16 flex flex-col items-center text-muted-foreground gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { size: 40, className: "opacity-30" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium", children: [
        "No ",
        filter === "all" ? "" : filter,
        " enrollments"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: filter === "all" ? "You haven't enrolled in any courses yet." : `No ${filter} courses found.` })
    ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: filtered.map(
      ({
        enrollment,
        course
      }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        EnrollmentCard,
        {
          enrollment,
          course,
          onOpen: () => setSelectedEnrollment({ enrollment, course })
        },
        enrollment.id
      )
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Sheet,
      {
        open: !!selectedEnrollment,
        onOpenChange: (open) => !open && setSelectedEnrollment(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(SheetContent, { children: selectedEnrollment && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SheetHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTitle, { className: "font-display text-lg", children: selectedEnrollment.course.title }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: selectedEnrollment.course.category }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: STATUS_BADGE[selectedEnrollment.enrollment.status] ?? "bg-muted text-muted-foreground",
                  children: selectedEnrollment.enrollment.status
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: selectedEnrollment.course.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Progress" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold", children: [
                  Number(selectedEnrollment.enrollment.progressPercent),
                  "%"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Progress,
                {
                  value: Number(
                    selectedEnrollment.enrollment.progressPercent
                  ),
                  className: "h-2"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 text-sm", children: [
              {
                label: "Enrolled On",
                value: formatDate(
                  selectedEnrollment.enrollment.enrolledAt
                )
              },
              {
                label: "Start Date",
                value: formatDate(selectedEnrollment.course.startDate)
              },
              {
                label: "End Date",
                value: formatDate(selectedEnrollment.course.endDate)
              },
              {
                label: "Duration",
                value: `${selectedEnrollment.course.durationWeeks} weeks`
              },
              {
                label: "Capacity",
                value: `${selectedEnrollment.course.enrolledCount}/${selectedEnrollment.course.capacity}`
              }
            ].map(({ label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: String(value) })
            ] }, label)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                className: "w-full mt-2",
                onClick: () => setSelectedEnrollment(null),
                children: "Close"
              }
            )
          ] })
        ] }) })
      }
    )
  ] });
}
export {
  StudentEnrollments as default
};
