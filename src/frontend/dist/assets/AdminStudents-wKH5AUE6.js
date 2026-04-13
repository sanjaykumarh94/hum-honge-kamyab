import { r as reactExports, j as jsxRuntimeExports, l as Skeleton, B as Badge, a as Button } from "./index-BESvdAtP.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogFooter } from "./dialog-De3pM8re.js";
import { I as Input } from "./input-BzQTN1iz.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-Bb1Qu6H-.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-Cfj2csP-.js";
import { b as useGetAllStudents, c as useGetCourses, d as useGetCenters, k as useGetStudentProfile, l as useGetEnrollmentsByStudent } from "./useBackend-DY9BrSjM.js";
import { S as Search } from "./search-DMmwE063.js";
import { E as Eye } from "./eye-B99VGKid.js";
import "./index-2uff8Ysi.js";
import "./index-DHKM-vaf.js";
import "./index-BWNgSiJ4.js";
import "./index-C0RboPBm.js";
import "./index-2V6FtwJL.js";
const STATUS_CONFIG = {
  not_started: { label: "Not Started", variant: "secondary" },
  in_progress: { label: "In Progress", variant: "default" },
  placed: { label: "Placed", variant: "outline" }
};
function StudentDetailDialog({
  student,
  onClose
}) {
  var _a;
  const { data: profile } = useGetStudentProfile(student.id);
  const { data: enrollments = [] } = useGetEnrollmentsByStudent(student.id);
  const { data: courses = [] } = useGetCourses();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: true, onOpenChange: (o) => !o && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-lg", "data-ocid": "student-view-dialog", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { children: [
      student.firstName,
      " ",
      student.lastName
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 py-2 max-h-[65vh] overflow-y-auto pr-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-semibold mb-2 text-primary uppercase tracking-wide", children: "Personal Info" }),
        [
          ["Email", student.email],
          ["Phone", student.phone ?? "—"],
          ["Role", student.role],
          [
            "Joined",
            new Date(Number(student.createdAt)).toLocaleDateString("en-IN")
          ]
        ].map(([label, val]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex justify-between py-1.5 border-b border-border last:border-0",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: val })
            ]
          },
          label
        ))
      ] }),
      profile && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-semibold mb-2 text-primary uppercase tracking-wide", children: "Profile" }),
        [
          ["Education Level", profile.educationLevel ?? "—"],
          ["Qualification", profile.qualification ?? "—"],
          ["Family Income", profile.familyIncome ?? "—"],
          ["Address", profile.address ?? "—"],
          [
            "Placement Status",
            ((_a = STATUS_CONFIG[profile.placementStatus]) == null ? void 0 : _a.label) ?? profile.placementStatus
          ]
        ].map(([label, val]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex justify-between py-1.5 border-b border-border last:border-0",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: val })
            ]
          },
          label
        ))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-xs font-semibold mb-2 text-primary uppercase tracking-wide", children: [
          "Enrollments (",
          enrollments.length,
          ")"
        ] }),
        enrollments.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No enrollments yet" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: enrollments.map((e) => {
          const course = courses.find((c) => c.id === e.courseId);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center justify-between p-2 rounded bg-muted/40",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: (course == null ? void 0 : course.title) ?? e.courseId }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: e.status })
              ]
            },
            e.id
          );
        }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", onClick: onClose, children: "Close" }) })
  ] }) });
}
function AdminStudents() {
  const { data: students = [], isLoading } = useGetAllStudents();
  const { data: courses = [] } = useGetCourses();
  const { data: centers = [] } = useGetCenters();
  const [search, setSearch] = reactExports.useState("");
  const [courseFilter, setCourseFilter] = reactExports.useState("all");
  const [centerFilter, setCenterFilter] = reactExports.useState("all");
  const [sortField, setSortField] = reactExports.useState(
    "firstName"
  );
  const [sortAsc, setSortAsc] = reactExports.useState(true);
  const [viewStudent, setViewStudent] = reactExports.useState(null);
  const filtered = students.filter((s) => {
    const fullName = `${s.firstName} ${s.lastName}`.toLowerCase();
    return fullName.includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase());
  }).sort((a, b) => {
    const va = a[sortField].toLowerCase();
    const vb = b[sortField].toLowerCase();
    if (va < vb) return sortAsc ? -1 : 1;
    if (va > vb) return sortAsc ? 1 : -1;
    return 0;
  });
  function toggleSort(field) {
    if (sortField === field) setSortAsc((p) => !p);
    else {
      setSortField(field);
      setSortAsc(true);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold font-display", children: "Student Records" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
        students.length,
        " students registered"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 items-center flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Search students…",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            className: "pl-9 w-64",
            "data-ocid": "students-search"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: courseFilter, onValueChange: setCourseFilter, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-48", "data-ocid": "students-course-filter", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Filter by Course" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Courses" }),
          courses.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c.id, children: c.title }, c.id))
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: centerFilter, onValueChange: setCenterFilter, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-48", "data-ocid": "students-center-filter", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Filter by Center" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Centers" }),
          centers.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c.id, children: c.name }, c.id))
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-border overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "bg-muted/40", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "w-10", children: "#" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TableHead,
          {
            className: "cursor-pointer hover:text-primary",
            onClick: () => toggleSort("firstName"),
            children: [
              "Student Name",
              " ",
              sortField === "firstName" ? sortAsc ? "↑" : "↓" : ""
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TableHead,
          {
            className: "cursor-pointer hover:text-primary",
            onClick: () => toggleSort("email"),
            children: [
              "Email ",
              sortField === "email" ? sortAsc ? "↑" : "↓" : ""
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Phone" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-center", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: isLoading ? ["r1", "r2", "r3", "r4", "r5"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: ["c1", "c2", "c3", "c4", "c5", "c6"].map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-full" }) }, c)) }, k)) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        TableCell,
        {
          colSpan: 6,
          className: "text-center py-12 text-muted-foreground",
          children: search ? "No students match your search" : "No students registered yet"
        }
      ) }) : filtered.map((student, idx) => {
        const statusInfo = STATUS_CONFIG.not_started;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { "data-ocid": "student-row", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground text-sm", children: idx + 1 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-bold text-primary", children: [
              student.firstName[0],
              student.lastName[0]
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
              student.firstName,
              " ",
              student.lastName
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm text-muted-foreground", children: student.email }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm", children: student.phone ?? "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: statusInfo.variant, children: statusInfo.label }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              onClick: () => setViewStudent(student),
              "data-ocid": "student-view-btn",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" })
            }
          ) }) })
        ] }, student.id);
      }) })
    ] }) }),
    viewStudent && /* @__PURE__ */ jsxRuntimeExports.jsx(
      StudentDetailDialog,
      {
        student: viewStudent,
        onClose: () => setViewStudent(null)
      }
    )
  ] });
}
export {
  AdminStudents as default
};
