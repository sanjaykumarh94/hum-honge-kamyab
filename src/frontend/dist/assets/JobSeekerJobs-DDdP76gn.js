import { c as createLucideIcon, f as useAuthStore, r as reactExports, j as jsxRuntimeExports, M as MapPin, n as Skeleton, d as Briefcase, a as Button, C as ChevronRight, B as Badge, e as Building2 } from "./index-BFdoklgf.js";
import { C as Card, a as CardContent } from "./card-CIs8rJlK.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogFooter } from "./dialog-47aAxjo8.js";
import { I as Input } from "./input-Dt9GIaMX.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-BdpOzEfG.js";
import { S as Sheet, a as SheetContent, b as SheetHeader, c as SheetTitle } from "./sheet-DnOz5FVI.js";
import { u as ue } from "./index-t444bNAk.js";
import { D as useGetJobs, E as useGetApplicationsByApplicant, F as useApplyForJob } from "./useBackend-Dhw_nMAY.js";
import { S as Search } from "./search-DCgqmb4O.js";
import { C as CircleCheck } from "./circle-check-D8ywH8eM.js";
import { C as Calendar } from "./calendar-SYG9NX0d.js";
import { T as Tag } from "./tag-es0_LHAt.js";
import { L as LoaderCircle } from "./loader-circle-BuFLBBTd.js";
import "./index-BCWFByZy.js";
import "./index-q7D4Kz4T.js";
import "./index-CG7nvONz.js";
import "./index-XioNHgJQ.js";
import "./index-BaLXypA6.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode);
const JOB_CATEGORIES = [
  "All Categories",
  "Technology",
  "Design",
  "Marketing",
  "Finance",
  "Operations",
  "Sales",
  "HR",
  "Engineering",
  "Manufacturing"
];
const PAGE_SIZE_OPTIONS = ["10", "20", "50"];
function fmtDate(ts) {
  return new Date(Number(ts)).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}
function JobTypeBadge({ type }) {
  const color = type === "Full-Time" ? "bg-primary/10 text-primary" : type === "Part-Time" ? "bg-accent/10 text-accent" : "bg-muted text-muted-foreground";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium ${color}`,
      children: type
    }
  );
}
function JobCard({
  job,
  applied,
  onView
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Card,
    {
      className: "card-elevated hover:shadow-md transition-smooth cursor-pointer",
      onClick: () => onView(job),
      "data-ocid": `job-card-${job.id}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-sm", children: job.title }),
            applied && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-primary/10 text-primary border-0 text-[10px] gap-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 9 }),
              " Applied"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-1 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { size: 11 }),
              " ",
              job.companyName
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 11 }),
              " ",
              job.location
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 11 }),
              " ",
              fmtDate(job.createdAt)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mt-2 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(JobTypeBadge, { type: job.jobType }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-[10px]", children: job.category })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-2 line-clamp-2", children: job.description })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            size: "sm",
            variant: "outline",
            className: "shrink-0 text-xs",
            onClick: (e) => {
              e.stopPropagation();
              onView(job);
            },
            "data-ocid": `view-job-${job.id}`,
            children: "View Details"
          }
        )
      ] }) })
    }
  );
}
function JobDetailSheet({
  job,
  applied,
  onClose,
  onApply,
  isApplying
}) {
  const [confirmOpen, setConfirmOpen] = reactExports.useState(false);
  if (!job) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sheet, { open: !!job, onOpenChange: (o) => !o && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      SheetContent,
      {
        side: "right",
        className: "w-full sm:max-w-xl overflow-y-auto",
        "data-ocid": "job-detail-sheet",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SheetHeader, { className: "pb-4 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTitle, { className: "font-display text-lg", children: job.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { size: 13 }),
                " ",
                job.companyName
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 13 }),
                " ",
                job.location
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap pt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(JobTypeBadge, { type: job.jobType }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { size: 10, className: "mr-1" }),
                job.category
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 11 }),
                " Published ",
                fmtDate(job.createdAt)
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-5 space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-foreground mb-2", children: "About the Role" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap", children: job.description })
            ] }),
            job.requirements && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-foreground mb-2", children: "Requirements" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap", children: job.requirements })
            ] }),
            job.education && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-foreground mb-2", children: "Education" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: job.education })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-md p-4 space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-foreground", children: "Company Details" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: job.companyEmail }),
              job.companyWebsite && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: job.companyWebsite,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "text-xs text-primary hover:underline",
                  children: job.companyWebsite
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border pt-4 flex gap-3", children: [
            applied ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", disabled: true, className: "flex-1 gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 14 }),
              " Already Applied"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                className: "btn-primary flex-1",
                onClick: () => setConfirmOpen(true),
                "data-ocid": `sheet-apply-${job.id}`,
                children: "Apply Now"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: onClose, children: "Close" })
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: confirmOpen, onOpenChange: setConfirmOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: "Confirm Application" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground py-2", children: [
        "Apply for ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: job.title }),
        " ",
        "at ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: job.companyName }),
        "?"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: () => setConfirmOpen(false),
            disabled: isApplying,
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            className: "btn-primary",
            disabled: isApplying,
            "data-ocid": "confirm-apply-btn",
            onClick: () => {
              onApply(job.id);
              setConfirmOpen(false);
            },
            children: [
              isApplying ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 14, className: "animate-spin mr-1" }) : null,
              "Confirm Apply"
            ]
          }
        )
      ] })
    ] }) })
  ] });
}
function JobSeekerJobs() {
  const { user } = useAuthStore();
  const { data: jobs, isLoading } = useGetJobs();
  const { data: myApps } = useGetApplicationsByApplicant((user == null ? void 0 : user.id) ?? "");
  const { mutateAsync: apply, isPending: isApplying } = useApplyForJob();
  const [search, setSearch] = reactExports.useState("");
  const [locationFilter, setLocationFilter] = reactExports.useState("");
  const [jobType, setJobType] = reactExports.useState("all");
  const [category, setCategory] = reactExports.useState("All Categories");
  const [pageSize, setPageSize] = reactExports.useState(20);
  const [page, setPage] = reactExports.useState(1);
  const [selectedJob, setSelectedJob] = reactExports.useState(null);
  const appliedJobIds = reactExports.useMemo(
    () => new Set((myApps ?? []).map((a) => a.jobId)),
    [myApps]
  );
  const filtered = reactExports.useMemo(() => {
    return (jobs ?? []).filter((j) => {
      const q = search.toLowerCase();
      const matchQ = !search || j.title.toLowerCase().includes(q) || j.companyName.toLowerCase().includes(q);
      const matchType = jobType === "all" || j.jobType.toLowerCase().replace("-", "") === jobType.replace("-", "");
      const matchLoc = !locationFilter || j.location.toLowerCase().includes(locationFilter.toLowerCase());
      const matchCat = category === "All Categories" || j.category === category;
      return matchQ && matchType && matchLoc && matchCat;
    });
  }, [jobs, search, jobType, locationFilter, category]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);
  const handleApply = async (jobId) => {
    if (!user) {
      ue.error("Please login first");
      return;
    }
    const res = await apply({ jobId, applicantId: user.id, resumeUrl: null });
    if (res.__kind__ === "ok") {
      ue.success("Application submitted successfully!");
      setSelectedJob(null);
    } else {
      ue.error(res.err ?? "Application failed");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", "data-ocid": "jobseeker-jobs", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "Job Search" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Find and apply for opportunities across Chhattisgarh" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "card-elevated p-3 flex flex-wrap gap-3 items-center",
        "data-ocid": "jobs-filter-bar",
        children: [
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
                onChange: (e) => {
                  setSearch(e.target.value);
                  setPage(1);
                },
                placeholder: "Search job title or company...",
                className: "pl-8 h-9",
                "data-ocid": "jobs-search"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-w-36", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              MapPin,
              {
                size: 14,
                className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground z-10"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: locationFilter,
                onChange: (e) => {
                  setLocationFilter(e.target.value);
                  setPage(1);
                },
                placeholder: "Location",
                className: "pl-8 h-9",
                "data-ocid": "jobs-location"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: jobType,
              onValueChange: (v) => {
                setJobType(v);
                setPage(1);
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectTrigger,
                  {
                    className: "w-36 h-9 text-xs",
                    "data-ocid": "jobs-type-filter",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Job Type" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Types" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Full-Time", children: "Full-Time" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Part-Time", children: "Part-Time" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Contract", children: "Contract" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Internship", children: "Internship" })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: category,
              onValueChange: (v) => {
                setCategory(v);
                setPage(1);
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectTrigger,
                  {
                    className: "w-40 h-9 text-xs",
                    "data-ocid": "jobs-category-filter",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: JOB_CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c, children: c }, c)) })
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: isLoading ? "Loading jobs..." : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        "Showing",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
          (page - 1) * pageSize + 1,
          "–",
          Math.min(page * pageSize, filtered.length)
        ] }),
        " ",
        "of ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: filtered.length }),
        " jobs"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Items per page:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Select,
          {
            value: String(pageSize),
            onValueChange: (v) => {
              setPageSize(Number(v));
              setPage(1);
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectTrigger,
                {
                  className: "w-16 h-7 text-xs",
                  "data-ocid": "jobs-pagesize",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: PAGE_SIZE_OPTIONS.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: v, children: v }, v)) })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: isLoading ? ["s1", "s2", "s3", "s4"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 w-full rounded-md" }, s)) : paginated.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "text-center py-16 text-muted-foreground bg-muted/20 rounded-md border border-dashed border-border",
        "data-ocid": "jobs-empty",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { size: 36, className: "mx-auto mb-3 opacity-30" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "No jobs found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-1", children: "Try adjusting your search filters" })
        ]
      }
    ) : paginated.map((job) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      JobCard,
      {
        job,
        applied: appliedJobIds.has(job.id),
        onView: setSelectedJob
      },
      job.id
    )) }),
    !isLoading && filtered.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center justify-end gap-2",
        "data-ocid": "jobs-pagination",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              className: "h-8 w-8 p-0",
              disabled: page === 1,
              onClick: () => setPage((p) => p - 1),
              "aria-label": "Previous page",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { size: 14 })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground px-2", children: [
            "Page ",
            page,
            " of ",
            totalPages
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              className: "h-8 w-8 p-0",
              disabled: page === totalPages,
              onClick: () => setPage((p) => p + 1),
              "aria-label": "Next page",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 14 })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      JobDetailSheet,
      {
        job: selectedJob,
        applied: selectedJob ? appliedJobIds.has(selectedJob.id) : false,
        onClose: () => setSelectedJob(null),
        onApply: handleApply,
        isApplying
      }
    )
  ] });
}
export {
  JobSeekerJobs as default
};
