import { f as useAuthStore, j as jsxRuntimeExports, U as Users, l as Skeleton, M as MapPin, T as Trophy, d as Briefcase, B as Badge } from "./index-BESvdAtP.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-BILcuGgo.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-Cfj2csP-.js";
import { e as useGetPlacementDrives, r as useGetPlacementRecordsByStudent } from "./useBackend-DY9BrSjM.js";
import { C as Calendar } from "./calendar-BU_hupJ9.js";
function formatDate(ts) {
  return new Date(Number(ts) / 1e6).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}
function StatusBadge({ status }) {
  const cfg = {
    upcoming: "bg-blue-100 text-blue-800 border-blue-300",
    ongoing: "bg-amber-100 text-amber-800 border-amber-300",
    completed: "bg-green-100 text-green-800 border-green-300",
    cancelled: "bg-destructive/10 text-destructive border-destructive/30",
    offered: "bg-green-100 text-green-800 border-green-300",
    shortlisted: "bg-amber-100 text-amber-800 border-amber-300",
    rejected: "bg-destructive/10 text-destructive border-destructive/30",
    pending: "bg-muted text-muted-foreground border-border"
  };
  const cls = cfg[status.toLowerCase()] ?? "bg-muted text-muted-foreground border-border";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: `text-xs capitalize ${cls}`, children: status });
}
function EmptySection({ message }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-8 text-center text-sm text-muted-foreground", children: message });
}
function StudentPlacements() {
  const { user } = useAuthStore();
  const userId = (user == null ? void 0 : user.id) ?? "";
  const { data: drives = [], isLoading: loadingDrives } = useGetPlacementDrives();
  const { data: records = [], isLoading: loadingRecords } = useGetPlacementRecordsByStudent(userId);
  const now = BigInt(Date.now()) * BigInt(1e6);
  const upcomingDrives = drives.filter(
    (d) => d.status.toLowerCase() === "upcoming" || d.driveDate > now
  );
  const offeredRecords = records.filter(
    (r) => r.offerStatus.toLowerCase() === "offered"
  );
  const shortlistedRecords = records.filter(
    (r) => r.offerStatus.toLowerCase() === "shortlisted"
  );
  const driveMap = new Map(drives.map((d) => [d.id, d]));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", "data-ocid": "student-placements", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "Placements" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Track placement drives, test results, and job offers" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 16, className: "text-primary" }),
        "Placement Drives"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0 pb-2", children: loadingDrives ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-5 space-y-3", children: ["dr-0", "dr-1", "dr-2"].map((key) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 rounded" }, key)) }) : drives.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptySection, { message: "No placement drives scheduled yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Company" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Location" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Positions" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: drives.map((drive) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { "data-ocid": `drive-row-${drive.id}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: drive.companyName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 12 }),
            formatDate(drive.driveDate)
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 12 }),
            drive.location
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right font-semibold", children: Number(drive.positions) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: drive.status }) })
        ] }, drive.id)) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { size: 16, className: "text-primary" }),
        "My Placement Record"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0 pb-2", children: loadingRecords ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-5 space-y-3", children: ["rec-0", "rec-1"].map((key) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 rounded" }, key)) }) : records.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptySection, { message: "No placement records yet. Participate in drives to see your records here." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Company" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Test Result" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Offer Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Offer Details" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: records.map((record) => {
          const drive = driveMap.get(record.driveId);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            TableRow,
            {
              "data-ocid": `record-row-${record.id}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: (drive == null ? void 0 : drive.companyName) ?? record.driveId }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm text-muted-foreground", children: record.testResult ?? "—" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: record.offerStatus }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm text-muted-foreground max-w-[200px] truncate", children: record.offerDetails ?? "—" })
              ]
            },
            record.id
          );
        }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { size: 16, className: "text-primary" }),
          "Job Offers"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: offeredRecords.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptySection, { message: "No job offers yet. Keep participating in placement drives!" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: offeredRecords.map((record) => {
          const drive = driveMap.get(record.driveId);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "p-3 bg-green-50 border border-green-200 rounded-lg",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm", children: (drive == null ? void 0 : drive.companyName) ?? record.driveId }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: record.offerDetails ?? "Offer received" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: record.offerStatus })
              ]
            },
            record.id
          );
        }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 16, className: "text-primary" }),
          "Upcoming Events"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: loadingDrives ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 rounded" }) : upcomingDrives.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptySection, { message: "No upcoming placement events." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: upcomingDrives.map((drive) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "p-3 bg-muted/40 border border-border rounded-lg",
            "data-ocid": `upcoming-drive-${drive.id}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm", children: drive.companyName }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: drive.status })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1.5 space-y-0.5 text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 11 }),
                  " ",
                  formatDate(drive.driveDate)
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 11 }),
                  " ",
                  drive.location
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 11 }),
                  " ",
                  Number(drive.positions),
                  " positions"
                ] })
              ] })
            ]
          },
          drive.id
        )) }) })
      ] })
    ] }),
    shortlistedRecords.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-amber-200 bg-amber-50/30", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base flex items-center gap-2 text-amber-800", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { size: 16 }),
        "Shortlisted Applications"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: shortlistedRecords.map((record) => {
        const drive = driveMap.get(record.driveId);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "p-3 bg-amber-50 border border-amber-200 rounded-lg",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm", children: (drive == null ? void 0 : drive.companyName) ?? record.driveId }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
                "Test Result: ",
                record.testResult ?? "Pending"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: record.offerStatus })
            ]
          },
          record.id
        );
      }) }) })
    ] })
  ] });
}
export {
  StudentPlacements as default
};
