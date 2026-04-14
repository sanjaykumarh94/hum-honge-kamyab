import { r as reactExports, j as jsxRuntimeExports, a as Button, n as Skeleton, B as Badge } from "./index-BFdoklgf.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogFooter } from "./dialog-47aAxjo8.js";
import { I as Input } from "./input-Dt9GIaMX.js";
import { L as Label } from "./label-CtntKOhe.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-DQJaxcj7.js";
import { T as Textarea } from "./textarea-DMonJcHX.js";
import { u as ue } from "./index-t444bNAk.js";
import { g as useGetPlacementDrives, o as useCreatePlacementDrive } from "./useBackend-Dhw_nMAY.js";
import { P as Plus } from "./plus-DzFA7BCj.js";
import "./index-BCWFByZy.js";
import "./index-q7D4Kz4T.js";
import "./index-CG7nvONz.js";
import "./index-XioNHgJQ.js";
const EMPTY_FORM = {
  companyName: "",
  location: "",
  driveDate: "",
  positions: "",
  description: ""
};
function DriveStatusBadge({
  status,
  driveDate
}) {
  const isUpcoming = Number(driveDate) > Date.now();
  if (isUpcoming) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-accent/15 text-foreground border-accent/30 border", children: "Upcoming" });
  }
  if (status === "completed") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "border-border", children: "Completed" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: status });
}
function SkeletonRows() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: ["r1", "r2", "r3"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: ["c1", "c2", "c3", "c4", "c5"].map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-full" }) }, c)) }, k)) });
}
function AdminPlacements() {
  const { data: drives = [], isLoading } = useGetPlacementDrives();
  const createDrive = useCreatePlacementDrive();
  const [showAdd, setShowAdd] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState(EMPTY_FORM);
  const now = Date.now();
  const upcoming = drives.filter((d) => Number(d.driveDate) > now).sort((a, b) => Number(a.driveDate) - Number(b.driveDate));
  const all = [...drives].sort(
    (a, b) => Number(b.driveDate) - Number(a.driveDate)
  );
  async function handleSave() {
    await createDrive.mutateAsync({
      companyName: form.companyName,
      location: form.location,
      driveDate: BigInt(new Date(form.driveDate).getTime()),
      positions: BigInt(Number(form.positions)),
      description: form.description
    });
    ue.success("Placement drive added successfully");
    setShowAdd(false);
    setForm(EMPTY_FORM);
  }
  const formValid = form.companyName && form.location && form.driveDate && form.positions && form.description;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold font-display", children: "Placement Drives" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
          upcoming.length,
          " upcoming · ",
          drives.length,
          " total"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          onClick: () => setShowAdd(true),
          "data-ocid": "add-drive-btn",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
            "Add Placement Drive"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-base font-semibold mb-3 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full bg-primary inline-block" }),
        "Upcoming Placement Drives"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-border overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "bg-muted/40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "#" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Company Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Location" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Positions" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonRows, {}) : upcoming.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          TableCell,
          {
            colSpan: 6,
            className: "text-center py-10 text-muted-foreground",
            children: "No upcoming placement drives scheduled"
          }
        ) }) : upcoming.map((drive, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { "data-ocid": "drive-row", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground text-sm", children: idx + 1 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: drive.companyName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm", children: new Date(Number(drive.driveDate)).toLocaleDateString(
            "en-IN",
            { day: "numeric", month: "short", year: "numeric" }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground text-sm", children: drive.location }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right font-mono", children: drive.positions.toString() }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            DriveStatusBadge,
            {
              status: drive.status,
              driveDate: drive.driveDate
            }
          ) })
        ] }, drive.id)) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-base font-semibold mb-3 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full bg-muted-foreground inline-block" }),
        "All Placement Drives"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-border overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "bg-muted/40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "#" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Company Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Location" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Positions" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Description" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonRows, {}) : all.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          TableCell,
          {
            colSpan: 7,
            className: "text-center py-10 text-muted-foreground",
            children: "No placement drives yet — add one above"
          }
        ) }) : all.map((drive, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { "data-ocid": "all-drive-row", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground text-sm", children: idx + 1 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: drive.companyName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm", children: new Date(Number(drive.driveDate)).toLocaleDateString(
            "en-IN",
            { day: "numeric", month: "short", year: "numeric" }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground text-sm", children: drive.location }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right font-mono", children: drive.positions.toString() }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            DriveStatusBadge,
            {
              status: drive.status,
              driveDate: drive.driveDate
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm text-muted-foreground max-w-xs truncate", children: drive.description })
        ] }, drive.id)) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showAdd, onOpenChange: (o) => !o && setShowAdd(false), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "drive-form-dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Add Placement Drive" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 py-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "df-company", children: "Company Name *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "df-company",
              placeholder: "e.g. Tata Consultancy Services",
              value: form.companyName,
              onChange: (e) => setForm((p) => ({ ...p, companyName: e.target.value })),
              "data-ocid": "drive-field-company"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "df-location", children: "Location *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "df-location",
                placeholder: "e.g. Raipur, CG",
                value: form.location,
                onChange: (e) => setForm((p) => ({ ...p, location: e.target.value })),
                "data-ocid": "drive-field-location"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "df-date", children: "Drive Date *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "df-date",
                type: "date",
                value: form.driveDate,
                onChange: (e) => setForm((p) => ({ ...p, driveDate: e.target.value })),
                "data-ocid": "drive-field-date"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "df-positions", children: "Positions Available *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "df-positions",
              type: "number",
              placeholder: "e.g. 25",
              value: form.positions,
              onChange: (e) => setForm((p) => ({ ...p, positions: e.target.value })),
              "data-ocid": "drive-field-positions"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "df-desc", children: "Description *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "df-desc",
              placeholder: "Details about the drive, eligibility, etc.",
              value: form.description,
              onChange: (e) => setForm((p) => ({ ...p, description: e.target.value })),
              rows: 3,
              "data-ocid": "drive-field-description"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: () => setShowAdd(false),
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            onClick: handleSave,
            disabled: createDrive.isPending || !formValid,
            "data-ocid": "drive-save-btn",
            children: createDrive.isPending ? "Saving…" : "Add Drive"
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  AdminPlacements as default
};
