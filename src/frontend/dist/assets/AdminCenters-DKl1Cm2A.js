import { r as reactExports, j as jsxRuntimeExports, a as Button, l as Skeleton, B as Badge } from "./index-BESvdAtP.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogFooter } from "./dialog-De3pM8re.js";
import { I as Input } from "./input-BzQTN1iz.js";
import { L as Label } from "./label-PjA3JIae.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-Cfj2csP-.js";
import { u as ue } from "./index-B6STimMY.js";
import { d as useGetCenters, f as useCreateCenter, g as useUpdateCenter, h as useDeleteCenter } from "./useBackend-DY9BrSjM.js";
import { P as Plus } from "./plus-NrIWEBjb.js";
import { S as Search } from "./search-DMmwE063.js";
import { E as Eye } from "./eye-B99VGKid.js";
import { P as Pencil } from "./pencil-DJeDbJIp.js";
import { T as Trash2 } from "./trash-2-DcO_V06Z.js";
import "./index-2uff8Ysi.js";
import "./index-DHKM-vaf.js";
import "./index-BWNgSiJ4.js";
import "./index-C0RboPBm.js";
const EMPTY_FORM = {
  name: "",
  location: "",
  capacity: "",
  managerName: "",
  managerContact: ""
};
function AdminCenters() {
  const { data: centers = [], isLoading } = useGetCenters();
  const createCenter = useCreateCenter();
  const updateCenter = useUpdateCenter();
  const deleteCenter = useDeleteCenter();
  const [search, setSearch] = reactExports.useState("");
  const [sortField, setSortField] = reactExports.useState("name");
  const [sortAsc, setSortAsc] = reactExports.useState(true);
  const [dialogMode, setDialogMode] = reactExports.useState(null);
  const [selected, setSelected] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState(EMPTY_FORM);
  const [deleteConfirm, setDeleteConfirm] = reactExports.useState(null);
  const filtered = centers.filter(
    (c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.location.toLowerCase().includes(search.toLowerCase())
  ).sort((a, b) => {
    const va = sortField === "capacity" ? Number(a.capacity) : a[sortField].toLowerCase();
    const vb = sortField === "capacity" ? Number(b.capacity) : b[sortField].toLowerCase();
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
  function openAdd() {
    setForm(EMPTY_FORM);
    setSelected(null);
    setDialogMode("add");
  }
  function openEdit(c) {
    setSelected(c);
    setForm({
      name: c.name,
      location: c.location,
      capacity: c.capacity.toString(),
      managerName: c.managerName,
      managerContact: c.managerContact
    });
    setDialogMode("edit");
  }
  async function handleSave() {
    const cap = BigInt(Number(form.capacity) || 0);
    if (dialogMode === "add") {
      await createCenter.mutateAsync({
        name: form.name,
        location: form.location,
        capacity: cap,
        managerName: form.managerName,
        managerContact: form.managerContact
      });
      ue.success("Center added successfully");
    } else if (dialogMode === "edit" && selected) {
      await updateCenter.mutateAsync({
        id: selected.id,
        name: form.name,
        location: form.location,
        capacity: cap,
        managerName: form.managerName,
        managerContact: form.managerContact
      });
      ue.success("Center updated successfully");
    }
    setDialogMode(null);
  }
  async function handleDelete(c) {
    await deleteCenter.mutateAsync(c.id);
    ue.success("Center deleted");
    setDeleteConfirm(null);
  }
  const isSaving = createCenter.isPending || updateCenter.isPending;
  function sortLabel(field) {
    return sortField === field ? sortAsc ? " ↑" : " ↓" : "";
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold font-display", children: "Manage Centers" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
          centers.length,
          " training centers registered"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", onClick: openAdd, "data-ocid": "add-center-btn", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
        "Add Center"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          placeholder: "Search by name or location…",
          value: search,
          onChange: (e) => setSearch(e.target.value),
          className: "pl-9",
          "data-ocid": "centers-search"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-border overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "bg-muted/40", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "w-10", children: "#" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TableHead,
          {
            className: "cursor-pointer hover:text-primary",
            onClick: () => toggleSort("name"),
            children: [
              "Center Name",
              sortLabel("name")
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TableHead,
          {
            className: "cursor-pointer hover:text-primary",
            onClick: () => toggleSort("location"),
            children: [
              "Location",
              sortLabel("location")
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Manager" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TableHead,
          {
            className: "cursor-pointer hover:text-primary text-right",
            onClick: () => toggleSort("capacity"),
            children: [
              "Capacity",
              sortLabel("capacity")
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-center", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: isLoading ? ["r1", "r2", "r3", "r4"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: ["c1", "c2", "c3", "c4", "c5", "c6"].map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-full" }) }, c)) }, k)) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        TableCell,
        {
          colSpan: 6,
          className: "text-center py-12 text-muted-foreground",
          children: search ? "No centers match your search" : "No centers added yet"
        }
      ) }) : filtered.map((center, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { "data-ocid": "center-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground text-sm", children: idx + 1 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: center.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground", children: center.location }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm", children: center.managerName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: center.managerContact })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right font-mono", children: center.capacity.toString() }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              onClick: () => {
                setSelected(center);
                setDialogMode("view");
              },
              "data-ocid": "center-view-btn",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              onClick: () => openEdit(center),
              "data-ocid": "center-edit-btn",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "text-destructive hover:text-destructive",
              onClick: () => setDeleteConfirm(center),
              "data-ocid": "center-delete-btn",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
            }
          )
        ] }) })
      ] }, center.id)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: dialogMode === "add" || dialogMode === "edit",
        onOpenChange: (o) => !o && setDialogMode(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "center-form-dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: dialogMode === "add" ? "Add New Center" : "Edit Center" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4 py-2", children: [
            ["name", "Center Name *", "e.g. Raipur Skill Center"],
            ["location", "Location *", "e.g. Raipur, Chhattisgarh"],
            ["capacity", "Capacity *", "e.g. 200"],
            ["managerName", "Manager Name *", "e.g. Ramesh Kumar"],
            ["managerContact", "Manager Contact *", "e.g. +91 9876543210"]
          ].map(([field, label, placeholder]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: `cf-${field}`, children: label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: `cf-${field}`,
                placeholder,
                value: form[field],
                onChange: (e) => setForm((p) => ({ ...p, [field]: e.target.value })),
                type: field === "capacity" ? "number" : "text",
                "data-ocid": `center-field-${field}`
              }
            )
          ] }, field)) }),
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
                disabled: isSaving || !form.name || !form.location || !form.capacity || !form.managerName || !form.managerContact,
                "data-ocid": "center-save-btn",
                children: isSaving ? "Saving…" : "Save Center"
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
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "center-view-dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Center Details" }) }),
          selected && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 py-2", children: [
            [
              ["Center Name", selected.name],
              ["Location", selected.location],
              ["Capacity", selected.capacity.toString()],
              ["Manager Name", selected.managerName],
              ["Manager Contact", selected.managerContact],
              [
                "Created",
                new Date(Number(selected.createdAt)).toLocaleDateString(
                  "en-IN"
                )
              ]
            ].map(([label, val]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex justify-between py-2 border-b border-border last:border-0",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: val })
                ]
              },
              label
            )),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "mt-2", children: [
              "ID: ",
              selected.id.slice(0, 12),
              "…"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", onClick: () => setDialogMode(null), children: "Close" }) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: !!deleteConfirm,
        onOpenChange: (o) => !o && setDeleteConfirm(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "center-delete-dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Delete Center" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            "Are you sure you want to delete",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: deleteConfirm == null ? void 0 : deleteConfirm.name }),
            "? This action cannot be undone."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                onClick: () => setDeleteConfirm(null),
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "destructive",
                disabled: deleteCenter.isPending,
                onClick: () => deleteConfirm && handleDelete(deleteConfirm),
                "data-ocid": "center-delete-confirm-btn",
                children: deleteCenter.isPending ? "Deleting…" : "Delete"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
export {
  AdminCenters as default
};
