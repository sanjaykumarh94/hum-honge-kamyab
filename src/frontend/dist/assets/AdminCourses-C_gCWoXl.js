import { r as reactExports, j as jsxRuntimeExports, a as Button, l as Skeleton, B as Badge } from "./index-BESvdAtP.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogFooter } from "./dialog-De3pM8re.js";
import { I as Input } from "./input-BzQTN1iz.js";
import { L as Label } from "./label-PjA3JIae.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-Bb1Qu6H-.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-Cfj2csP-.js";
import { T as Textarea } from "./textarea-C0z7fU2h.js";
import { u as ue } from "./index-B6STimMY.js";
import { c as useGetCourses, d as useGetCenters, i as useCreateCourse, j as useUpdateCourse } from "./useBackend-DY9BrSjM.js";
import { P as Plus } from "./plus-NrIWEBjb.js";
import { S as Search } from "./search-DMmwE063.js";
import { E as Eye } from "./eye-B99VGKid.js";
import { P as Pencil } from "./pencil-DJeDbJIp.js";
import "./index-2uff8Ysi.js";
import "./index-DHKM-vaf.js";
import "./index-BWNgSiJ4.js";
import "./index-C0RboPBm.js";
import "./index-2V6FtwJL.js";
const CATEGORIES = ["IT", "Healthcare", "Automotive", "Construction", "Retail"];
const EMPTY_FORM = {
  title: "",
  description: "",
  category: "",
  durationWeeks: "",
  startDate: "",
  endDate: "",
  capacity: "",
  centerId: ""
};
function AdminCourses() {
  const { data: courses = [], isLoading } = useGetCourses();
  const { data: centers = [] } = useGetCenters();
  const createCourse = useCreateCourse();
  const updateCourse = useUpdateCourse();
  const [search, setSearch] = reactExports.useState("");
  const [catFilter, setCatFilter] = reactExports.useState("all");
  const [sortField, setSortField] = reactExports.useState("title");
  const [sortAsc, setSortAsc] = reactExports.useState(true);
  const [dialogMode, setDialogMode] = reactExports.useState(null);
  const [selected, setSelected] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState(EMPTY_FORM);
  const filtered = courses.filter((c) => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.category.toLowerCase().includes(search.toLowerCase());
    const matchCat = catFilter === "all" || c.category === catFilter;
    return matchSearch && matchCat;
  }).sort((a, b) => {
    const va = String(a[sortField]).toLowerCase();
    const vb = String(b[sortField]).toLowerCase();
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
  function sortLabel(field) {
    return sortField === field ? sortAsc ? " ↑" : " ↓" : "";
  }
  function openAdd() {
    setForm(EMPTY_FORM);
    setSelected(null);
    setDialogMode("add");
  }
  function openEdit(c) {
    setSelected(c);
    setForm({
      title: c.title,
      description: c.description,
      category: c.category,
      durationWeeks: c.durationWeeks.toString(),
      startDate: new Date(Number(c.startDate)).toISOString().split("T")[0],
      endDate: new Date(Number(c.endDate)).toISOString().split("T")[0],
      capacity: c.capacity.toString(),
      centerId: c.centerId ?? ""
    });
    setDialogMode("edit");
  }
  async function handleSave() {
    const startMs = BigInt(new Date(form.startDate).getTime());
    const endMs = BigInt(new Date(form.endDate).getTime());
    const cap = BigInt(Number(form.capacity));
    const dur = BigInt(Number(form.durationWeeks));
    const cId = form.centerId || null;
    if (dialogMode === "add") {
      await createCourse.mutateAsync({
        title: form.title,
        description: form.description,
        category: form.category,
        durationWeeks: dur,
        startDate: startMs,
        endDate: endMs,
        capacity: cap,
        centerId: cId
      });
      ue.success("Course created successfully");
    } else if (dialogMode === "edit" && selected) {
      await updateCourse.mutateAsync({
        id: selected.id,
        title: form.title,
        description: form.description,
        category: form.category,
        durationWeeks: dur,
        startDate: startMs,
        endDate: endMs,
        capacity: cap
      });
      ue.success("Course updated successfully");
    }
    setDialogMode(null);
  }
  const isSaving = createCourse.isPending || updateCourse.isPending;
  const formValid = form.title && form.category && form.durationWeeks && form.startDate && form.endDate && form.capacity;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold font-display", children: "Manage Courses" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
          courses.length,
          " courses available"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", onClick: openAdd, "data-ocid": "add-course-btn", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
        "Add Course"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 items-center flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Search courses…",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            className: "pl-9 w-64",
            "data-ocid": "courses-search"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: catFilter, onValueChange: setCatFilter, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-44", "data-ocid": "courses-category-filter", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Categories" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Categories" }),
          CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c, children: c }, c))
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
            onClick: () => toggleSort("title"),
            children: [
              "Course Title",
              sortLabel("title")
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TableHead,
          {
            className: "cursor-pointer hover:text-primary",
            onClick: () => toggleSort("category"),
            children: [
              "Category",
              sortLabel("category")
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Weeks" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Start Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "End Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Capacity" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Enrolled" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-center", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: isLoading ? ["r1", "r2", "r3", "r4"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: ["c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9"].map(
        (c) => /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-full" }) }, c)
      ) }, k)) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        TableCell,
        {
          colSpan: 9,
          className: "text-center py-12 text-muted-foreground",
          children: search || catFilter !== "all" ? "No courses match your filters" : "No courses created yet"
        }
      ) }) : filtered.map((course, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { "data-ocid": "course-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground text-sm", children: idx + 1 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: course.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: course.category }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right font-mono", children: course.durationWeeks.toString() }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm", children: new Date(Number(course.startDate)).toLocaleDateString(
          "en-IN"
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm", children: new Date(Number(course.endDate)).toLocaleDateString(
          "en-IN"
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right font-mono", children: course.capacity.toString() }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right font-mono", children: course.enrolledCount.toString() }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              onClick: () => {
                setSelected(course);
                setDialogMode("view");
              },
              "data-ocid": "course-view-btn",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              onClick: () => openEdit(course),
              "data-ocid": "course-edit-btn",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" })
            }
          )
        ] }) })
      ] }, course.id)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: dialogMode === "add" || dialogMode === "edit",
        onOpenChange: (o) => !o && setDialogMode(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-lg", "data-ocid": "course-form-dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: dialogMode === "add" ? "Add New Course" : "Edit Course" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 py-2 max-h-[60vh] overflow-y-auto pr-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "cf-title", children: "Course Title *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "cf-title",
                  placeholder: "e.g. Web Development Fundamentals",
                  value: form.title,
                  onChange: (e) => setForm((p) => ({ ...p, title: e.target.value })),
                  "data-ocid": "course-field-title"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "cf-description", children: "Description *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  id: "cf-description",
                  placeholder: "Brief course description…",
                  value: form.description,
                  onChange: (e) => setForm((p) => ({ ...p, description: e.target.value })),
                  rows: 3,
                  "data-ocid": "course-field-description"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Category *" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Select,
                  {
                    value: form.category,
                    onValueChange: (v) => setForm((p) => ({ ...p, category: v })),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "course-field-category", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select…" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c, children: c }, c)) })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "cf-weeks", children: "Duration (weeks) *" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "cf-weeks",
                    type: "number",
                    placeholder: "e.g. 12",
                    value: form.durationWeeks,
                    onChange: (e) => setForm((p) => ({ ...p, durationWeeks: e.target.value })),
                    "data-ocid": "course-field-weeks"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "cf-start", children: "Start Date *" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "cf-start",
                    type: "date",
                    value: form.startDate,
                    onChange: (e) => setForm((p) => ({ ...p, startDate: e.target.value })),
                    "data-ocid": "course-field-startdate"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "cf-end", children: "End Date *" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "cf-end",
                    type: "date",
                    value: form.endDate,
                    onChange: (e) => setForm((p) => ({ ...p, endDate: e.target.value })),
                    "data-ocid": "course-field-enddate"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "cf-cap", children: "Capacity *" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "cf-cap",
                    type: "number",
                    placeholder: "e.g. 50",
                    value: form.capacity,
                    onChange: (e) => setForm((p) => ({ ...p, capacity: e.target.value })),
                    "data-ocid": "course-field-capacity"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Center" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Select,
                  {
                    value: form.centerId || "none",
                    onValueChange: (v) => setForm((p) => ({ ...p, centerId: v === "none" ? "" : v })),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "course-field-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select center…" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "none", children: "No specific center" }),
                        centers.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c.id, children: c.name }, c.id))
                      ] })
                    ]
                  }
                )
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                onClick: () => setDialogMode(null),
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                onClick: handleSave,
                disabled: isSaving || !formValid,
                "data-ocid": "course-save-btn",
                children: isSaving ? "Saving…" : "Save Course"
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: dialogMode === "view",
        onOpenChange: (o) => !o && setDialogMode(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "course-view-dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Course Details" }) }),
          selected && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1 py-2", children: [
            ["Title", selected.title],
            ["Category", selected.category],
            ["Description", selected.description],
            ["Duration", `${selected.durationWeeks} weeks`],
            [
              "Start Date",
              new Date(Number(selected.startDate)).toLocaleDateString(
                "en-IN"
              )
            ],
            [
              "End Date",
              new Date(Number(selected.endDate)).toLocaleDateString(
                "en-IN"
              )
            ],
            ["Capacity", selected.capacity.toString()],
            ["Enrolled", selected.enrolledCount.toString()]
          ].map(([label, val]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex justify-between py-2 border-b border-border last:border-0",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium max-w-xs text-right", children: val })
              ]
            },
            label
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", onClick: () => setDialogMode(null), children: "Close" }) })
        ] })
      }
    )
  ] });
}
export {
  AdminCourses as default
};
