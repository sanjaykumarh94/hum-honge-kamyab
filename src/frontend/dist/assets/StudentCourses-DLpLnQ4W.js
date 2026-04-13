import { c as createLucideIcon, f as useAuthStore, r as reactExports, j as jsxRuntimeExports, l as Skeleton, b as BookOpen, a as Button, B as Badge, U as Users } from "./index-BESvdAtP.js";
import { C as Card, a as CardContent } from "./card-BILcuGgo.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogFooter } from "./dialog-De3pM8re.js";
import { I as Input } from "./input-BzQTN1iz.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-Bb1Qu6H-.js";
import { u as ue } from "./index-B6STimMY.js";
import { c as useGetCourses, l as useGetEnrollmentsByStudent, d as useGetCenters, q as useEnrollInCourse } from "./useBackend-DY9BrSjM.js";
import { S as Search } from "./search-DMmwE063.js";
import { C as Calendar } from "./calendar-BU_hupJ9.js";
import "./index-2uff8Ysi.js";
import "./index-DHKM-vaf.js";
import "./index-BWNgSiJ4.js";
import "./index-C0RboPBm.js";
import "./index-2V6FtwJL.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const TriangleAlert = createLucideIcon("triangle-alert", __iconNode);
function formatDate(ts) {
  return new Date(Number(ts) / 1e6).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}
function CourseCard({
  course,
  isEnrolled,
  onEnroll
}) {
  const capacity = Number(course.capacity);
  const enrolled = Number(course.enrolledCount);
  const isFull = enrolled >= capacity;
  const isNearFull = !isFull && capacity > 0 && enrolled / capacity > 0.85;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Card,
    {
      className: "flex flex-col hover:shadow-md transition-shadow",
      "data-ocid": `course-card-${course.id}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 flex flex-col flex-1 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground leading-snug line-clamp-2 flex-1 min-w-0", children: course.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs shrink-0", children: course.category })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-2 flex-1", children: course.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 11 }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              formatDate(course.startDate),
              " – ",
              formatDate(course.endDate)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 11 }),
              enrolled,
              "/",
              capacity,
              " enrolled"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              Number(course.durationWeeks),
              "w"
            ] })
          ] })
        ] }),
        isNearFull && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-amber-600 flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 11 }),
          "Only ",
          capacity - enrolled,
          " spots left"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-auto pt-2", children: isEnrolled ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          Badge,
          {
            variant: "outline",
            className: "w-full justify-center py-1.5 border-primary/40 text-primary bg-primary/5",
            children: "✓ Enrolled"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            size: "sm",
            className: "w-full",
            disabled: isFull,
            onClick: () => onEnroll(course),
            "data-ocid": `enroll-btn-${course.id}`,
            children: isFull ? "Course Full" : "Enroll Now"
          }
        ) })
      ] })
    }
  );
}
function StudentCourses() {
  const { user } = useAuthStore();
  const userId = (user == null ? void 0 : user.id) ?? "";
  const { data: courses = [], isLoading: loadingCourses } = useGetCourses();
  const { data: enrollments = [], isLoading: loadingEnrollments } = useGetEnrollmentsByStudent(userId);
  const { data: centers = [] } = useGetCenters();
  const enrollInCourse = useEnrollInCourse();
  const [search, setSearch] = reactExports.useState("");
  const [categoryFilter, setCategoryFilter] = reactExports.useState("all");
  const [centerFilter, setCenterFilter] = reactExports.useState("all");
  const [sortBy, setSortBy] = reactExports.useState("startDate");
  const [confirmCourse, setConfirmCourse] = reactExports.useState(null);
  const enrolledCourseIds = new Set(
    enrollments.map((e) => e.courseId)
  );
  const categories = reactExports.useMemo(() => {
    const cats = new Set(courses.map((c) => c.category));
    return Array.from(cats);
  }, [courses]);
  const filtered = reactExports.useMemo(() => {
    let list = courses.filter((c) => {
      const matchesSearch = !search || c.title.toLowerCase().includes(search.toLowerCase()) || c.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = categoryFilter === "all" || c.category === categoryFilter;
      const matchesCenter = centerFilter === "all" || (c.centerId ?? "") === centerFilter || !c.centerId && centerFilter === "none";
      return matchesSearch && matchesCategory && matchesCenter;
    });
    if (sortBy === "startDate") {
      list = [...list].sort(
        (a, b) => Number(a.startDate) - Number(b.startDate)
      );
    } else if (sortBy === "duration") {
      list = [...list].sort(
        (a, b) => Number(a.durationWeeks) - Number(b.durationWeeks)
      );
    }
    return list;
  }, [courses, search, categoryFilter, centerFilter, sortBy]);
  const handleEnroll = async () => {
    if (!confirmCourse) return;
    try {
      const result = await enrollInCourse.mutateAsync({
        studentId: userId,
        courseId: confirmCourse.id
      });
      if (result.__kind__ === "err") {
        ue.error(result.err);
      } else {
        ue.success(`Enrolled in "${confirmCourse.title}"!`);
        setConfirmCourse(null);
      }
    } catch {
      ue.error("Enrollment failed. Please try again.");
    }
  };
  const isLoading = loadingCourses || loadingEnrollments;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "student-courses", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "Available Courses" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Browse and enroll in vocational training courses" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", "data-ocid": "courses-filter-bar", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-[200px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Search,
          {
            size: 14,
            className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Search courses...",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            className: "pl-9",
            "data-ocid": "courses-search"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: categoryFilter, onValueChange: setCategoryFilter, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-44", "data-ocid": "courses-category-filter", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Category" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Categories" }),
          categories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: cat, children: cat }, cat))
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: centerFilter, onValueChange: setCenterFilter, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-44", "data-ocid": "courses-center-filter", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Center" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Centers" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "none", children: "No Center" }),
          centers.map((center) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: center.id, children: center.name }, center.id))
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: sortBy, onValueChange: setSortBy, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-40", "data-ocid": "courses-sort", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Sort by" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "startDate", children: "Start Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "duration", children: "Duration" })
        ] })
      ] })
    ] }),
    !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
      "Showing ",
      filtered.length,
      " of ",
      courses.length,
      " courses"
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: ["sk-0", "sk-1", "sk-2", "sk-3", "sk-4", "sk-5"].map((key) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-56 rounded-lg" }, key)) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-dashed", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "py-16 flex flex-col items-center text-muted-foreground gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { size: 40, className: "opacity-30" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "No courses found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "Try adjusting your filters or search term." })
    ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: filtered.map((course) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      CourseCard,
      {
        course,
        isEnrolled: enrolledCourseIds.has(course.id),
        onEnroll: setConfirmCourse
      },
      course.id
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: !!confirmCourse,
        onOpenChange: (open) => !open && setConfirmCourse(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Confirm Enrollment" }) }),
          confirmCourse && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-base", children: confirmCourse.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                "Category: ",
                confirmCourse.category
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                "Dates: ",
                formatDate(confirmCourse.startDate),
                " –",
                " ",
                formatDate(confirmCourse.endDate)
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                "Seats: ",
                Number(confirmCourse.enrolledCount),
                "/",
                Number(confirmCourse.capacity)
              ] }),
              Number(confirmCourse.capacity) > 0 && Number(confirmCourse.enrolledCount) / Number(confirmCourse.capacity) > 0.85 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-amber-600 flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 13 }),
                "Nearly full — enroll soon!"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                onClick: () => setConfirmCourse(null),
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                onClick: handleEnroll,
                disabled: enrollInCourse.isPending,
                "data-ocid": "confirm-enroll-btn",
                children: enrollInCourse.isPending ? "Enrolling..." : "Confirm Enrollment"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
export {
  StudentCourses as default
};
