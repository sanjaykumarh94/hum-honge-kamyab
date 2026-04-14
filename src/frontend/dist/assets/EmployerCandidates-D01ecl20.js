import { c as createLucideIcon, f as useAuthStore, r as reactExports, j as jsxRuntimeExports, n as Skeleton, U as Users, a as Button, B as Badge, S as Separator } from "./index-BFdoklgf.js";
import { I as Input } from "./input-Dt9GIaMX.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-BdpOzEfG.js";
import { S as Sheet, a as SheetContent, b as SheetHeader, c as SheetTitle } from "./sheet-DnOz5FVI.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-DQJaxcj7.js";
import { u as ue } from "./index-t444bNAk.js";
import { G as useGetJobsByEmployer, I as useGetApplicationsByJob, K as useUpdateApplicationStatus } from "./useBackend-Dhw_nMAY.js";
import { S as Search } from "./search-DCgqmb4O.js";
import { C as Calendar } from "./calendar-SYG9NX0d.js";
import { F as FileText } from "./file-text-CLkxibPS.js";
import { E as Eye } from "./eye-DkXKaTg1.js";
import { C as CircleCheck } from "./circle-check-D8ywH8eM.js";
import "./index-q7D4Kz4T.js";
import "./index-BaLXypA6.js";
import "./index-CG7nvONz.js";
import "./index-BCWFByZy.js";
import "./index-XioNHgJQ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }],
  ["path", { d: "M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662", key: "154egf" }]
];
const CircleUser = createLucideIcon("circle-user", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
const CircleX = createLucideIcon("circle-x", __iconNode);
function fmtDate(ts) {
  return new Date(Number(ts)).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}
function StatusBadge({ status }) {
  if (status === "shortlisted")
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-accent/10 text-accent border-0 text-xs", children: "Shortlisted" });
  if (status === "rejected")
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "destructive", className: "text-xs", children: "Rejected" });
  if (status === "accepted")
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary/10 text-primary border-0 text-xs", children: "Accepted" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: "Applied" });
}
function CandidateSheet({
  app,
  jobTitle,
  onClose,
  onUpdateStatus,
  isUpdating
}) {
  if (!app) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Sheet, { open: !!app, onOpenChange: (o) => !o && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    SheetContent,
    {
      side: "right",
      className: "w-full sm:max-w-md overflow-y-auto",
      "data-ocid": "candidate-detail-sheet",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SheetHeader, { className: "pb-4 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleUser, { size: 22, className: "text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTitle, { className: "font-display text-base", children: "Candidate Details" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: app.applicantId })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-5 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-md p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Applied For" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground mt-0.5", children: jobTitle })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-md p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Application Date" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-foreground mt-0.5 flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 12 }),
                fmtDate(app.appliedAt)
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2", children: "Current Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: app.status })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2", children: "Resume" }),
            app.resumeUrl ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: app.resumeUrl,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "flex items-center gap-2 text-sm text-primary hover:underline",
                "data-ocid": "candidate-resume-link",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { size: 14 }),
                  " Download Resume"
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { size: 14, className: "opacity-40" }),
              " No resume uploaded"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3", children: "Update Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  size: "sm",
                  className: "gap-1.5 bg-accent/10 text-accent hover:bg-accent/20 border-0",
                  disabled: isUpdating || app.status === "shortlisted",
                  onClick: () => onUpdateStatus(app.id, "shortlisted", app.jobId),
                  "data-ocid": "shortlist-candidate",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 13 }),
                    " Shortlist"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  size: "sm",
                  variant: "outline",
                  className: "gap-1.5 text-destructive hover:bg-destructive/10 hover:text-destructive border-destructive/30",
                  disabled: isUpdating || app.status === "rejected",
                  onClick: () => onUpdateStatus(app.id, "rejected", app.jobId),
                  "data-ocid": "reject-candidate",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { size: 13 }),
                    " Reject"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  size: "sm",
                  className: "gap-1.5 btn-primary",
                  disabled: isUpdating || app.status === "accepted",
                  onClick: () => onUpdateStatus(app.id, "accepted", app.jobId),
                  "data-ocid": "accept-candidate",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 13 }),
                    " Accept"
                  ]
                }
              )
            ] })
          ] })
        ] })
      ]
    }
  ) });
}
function EmployerCandidates() {
  const { user } = useAuthStore();
  const { data: jobs } = useGetJobsByEmployer((user == null ? void 0 : user.id) ?? "");
  const [search, setSearch] = reactExports.useState("");
  const [selectedJobId, setSelectedJobId] = reactExports.useState("all");
  const [detailApp, setDetailApp] = reactExports.useState(null);
  const { data: applications, isLoading } = useGetApplicationsByJob(
    selectedJobId !== "all" ? selectedJobId : ""
  );
  const { mutateAsync: updateStatus, isPending: isUpdating } = useUpdateApplicationStatus();
  const currentJobTitle = reactExports.useMemo(() => {
    var _a;
    if (!selectedJobId || selectedJobId === "all") return "";
    return ((_a = (jobs ?? []).find((j) => j.id === selectedJobId)) == null ? void 0 : _a.title) ?? "";
  }, [jobs, selectedJobId]);
  const detailJobTitle = reactExports.useMemo(() => {
    var _a;
    if (!detailApp) return "";
    return ((_a = (jobs ?? []).find((j) => j.id === detailApp.jobId)) == null ? void 0 : _a.title) ?? detailApp.jobId;
  }, [jobs, detailApp]);
  const filtered = reactExports.useMemo(
    () => (applications ?? []).filter(
      (a) => !search || a.applicantId.toLowerCase().includes(search.toLowerCase())
    ),
    [applications, search]
  );
  const handleUpdateStatus = async (id, status, jobId) => {
    const res = await updateStatus({ applicationId: id, status, jobId });
    if (res.__kind__ === "ok") {
      ue.success(`Candidate ${status} successfully`);
      setDetailApp(null);
    } else {
      ue.error(res.err ?? "Failed to update status");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", "data-ocid": "employer-candidates", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "Candidate List" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Review and manage job applications" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-48", children: [
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
            value: search,
            onChange: (e) => setSearch(e.target.value),
            placeholder: "Search by applicant ID...",
            className: "pl-8 h-9",
            "data-ocid": "candidates-search"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: selectedJobId, onValueChange: setSelectedJobId, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SelectTrigger,
          {
            className: "w-56 h-9 text-xs",
            "data-ocid": "candidates-job-filter",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Filter by job" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Jobs" }),
          (jobs ?? []).map((j) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: j.id, children: j.title }, j.id))
        ] })
      ] })
    ] }),
    selectedJobId !== "all" && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: filtered.length }),
      " candidate",
      filtered.length !== 1 ? "s" : "",
      " for",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: currentJobTitle })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-elevated overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "bg-muted/30", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs", children: "Application Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs", children: "Resume" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs", children: "Candidate ID" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs", children: "Job Title" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs text-right", children: "Action" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: isLoading ? ["r1", "r2", "r3"].map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: ["c1", "c2", "c3", "c4", "c5", "c6"].map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }) }, c)) }, r)) : selectedJobId === "all" ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        TableCell,
        {
          colSpan: 6,
          className: "text-center py-14 text-muted-foreground",
          "data-ocid": "candidates-empty-select",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 28, className: "mx-auto mb-3 opacity-30" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "Select a job to view candidates" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-1", children: "Use the filter above to choose a job posting" })
          ]
        }
      ) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        TableCell,
        {
          colSpan: 6,
          className: "text-center py-14 text-muted-foreground",
          "data-ocid": "candidates-empty",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 28, className: "mx-auto mb-3 opacity-30" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "No applications yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-1", children: "Share this job posting to attract candidates" })
          ]
        }
      ) }) : filtered.map((app) => {
        var _a;
        const jobName = ((_a = (jobs ?? []).find((j) => j.id === app.jobId)) == null ? void 0 : _a.title) ?? app.jobId;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TableRow,
          {
            className: "hover:bg-muted/20 cursor-pointer",
            onClick: () => setDetailApp(app),
            "data-ocid": `candidate-row-${app.id}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 10 }),
                " ",
                fmtDate(app.appliedAt)
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: app.resumeUrl ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-primary", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { size: 12 }),
                " Resumes.pdf"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { size: 12, className: "opacity-40" }),
                " No resume"
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium text-xs max-w-32 truncate", children: app.applicantId }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs text-muted-foreground max-w-40 truncate", children: jobName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: app.status }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "sm",
                  className: "h-7 w-7 p-0 text-muted-foreground hover:text-foreground",
                  onClick: (e) => {
                    e.stopPropagation();
                    setDetailApp(app);
                  },
                  "aria-label": "View candidate",
                  "data-ocid": `view-candidate-${app.id}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 13 })
                }
              ) })
            ]
          },
          app.id
        );
      }) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      CandidateSheet,
      {
        app: detailApp,
        jobTitle: detailJobTitle,
        onClose: () => setDetailApp(null),
        onUpdateStatus: handleUpdateStatus,
        isUpdating
      }
    )
  ] });
}
export {
  EmployerCandidates as default
};
