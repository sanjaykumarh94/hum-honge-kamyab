import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  useCreateCenter,
  useDeleteCenter,
  useGetCenters,
  useUpdateCenter,
} from "../../hooks/useBackend";
import type { Center } from "../../types";

type SortField = "name" | "location" | "capacity";
type DialogMode = "add" | "edit" | "view" | null;

interface CenterForm {
  name: string;
  location: string;
  capacity: string;
  managerName: string;
  managerContact: string;
}

const EMPTY_FORM: CenterForm = {
  name: "",
  location: "",
  capacity: "",
  managerName: "",
  managerContact: "",
};

export default function AdminCenters() {
  const { data: centers = [], isLoading } = useGetCenters();
  const createCenter = useCreateCenter();
  const updateCenter = useUpdateCenter();
  const deleteCenter = useDeleteCenter();

  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortAsc, setSortAsc] = useState(true);
  const [dialogMode, setDialogMode] = useState<DialogMode>(null);
  const [selected, setSelected] = useState<Center | null>(null);
  const [form, setForm] = useState<CenterForm>(EMPTY_FORM);
  const [deleteConfirm, setDeleteConfirm] = useState<Center | null>(null);

  const filtered = centers
    .filter(
      (c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.location.toLowerCase().includes(search.toLowerCase()),
    )
    .sort((a, b) => {
      const va =
        sortField === "capacity"
          ? Number(a.capacity)
          : (a[sortField] as string).toLowerCase();
      const vb =
        sortField === "capacity"
          ? Number(b.capacity)
          : (b[sortField] as string).toLowerCase();
      if (va < vb) return sortAsc ? -1 : 1;
      if (va > vb) return sortAsc ? 1 : -1;
      return 0;
    });

  function toggleSort(field: SortField) {
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

  function openEdit(c: Center) {
    setSelected(c);
    setForm({
      name: c.name,
      location: c.location,
      capacity: c.capacity.toString(),
      managerName: c.managerName,
      managerContact: c.managerContact,
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
        managerContact: form.managerContact,
      });
      toast.success("Center added successfully");
    } else if (dialogMode === "edit" && selected) {
      await updateCenter.mutateAsync({
        id: selected.id,
        name: form.name,
        location: form.location,
        capacity: cap,
        managerName: form.managerName,
        managerContact: form.managerContact,
      });
      toast.success("Center updated successfully");
    }
    setDialogMode(null);
  }

  async function handleDelete(c: Center) {
    await deleteCenter.mutateAsync(c.id);
    toast.success("Center deleted");
    setDeleteConfirm(null);
  }

  const isSaving = createCenter.isPending || updateCenter.isPending;

  function sortLabel(field: SortField) {
    return sortField === field ? (sortAsc ? " ↑" : " ↓") : "";
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display">Manage Centers</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {centers.length} training centers registered
          </p>
        </div>
        <Button type="button" onClick={openAdd} data-ocid="add-center-btn">
          <Plus className="h-4 w-4 mr-2" />
          Add Center
        </Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name or location…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
          data-ocid="centers-search"
        />
      </div>

      <div className="rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40">
              <TableHead className="w-10">#</TableHead>
              <TableHead
                className="cursor-pointer hover:text-primary"
                onClick={() => toggleSort("name")}
              >
                Center Name{sortLabel("name")}
              </TableHead>
              <TableHead
                className="cursor-pointer hover:text-primary"
                onClick={() => toggleSort("location")}
              >
                Location{sortLabel("location")}
              </TableHead>
              <TableHead>Manager</TableHead>
              <TableHead
                className="cursor-pointer hover:text-primary text-right"
                onClick={() => toggleSort("capacity")}
              >
                Capacity{sortLabel("capacity")}
              </TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              ["r1", "r2", "r3", "r4"].map((k) => (
                <TableRow key={k}>
                  {["c1", "c2", "c3", "c4", "c5", "c6"].map((c) => (
                    <TableCell key={c}>
                      <Skeleton className="h-5 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : filtered.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-12 text-muted-foreground"
                >
                  {search
                    ? "No centers match your search"
                    : "No centers added yet"}
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((center, idx) => (
                <TableRow key={center.id} data-ocid="center-row">
                  <TableCell className="text-muted-foreground text-sm">
                    {idx + 1}
                  </TableCell>
                  <TableCell className="font-medium">{center.name}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {center.location}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{center.managerName}</div>
                    <div className="text-xs text-muted-foreground">
                      {center.managerContact}
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {center.capacity.toString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelected(center);
                          setDialogMode("view");
                        }}
                        data-ocid="center-view-btn"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => openEdit(center)}
                        data-ocid="center-edit-btn"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => setDeleteConfirm(center)}
                        data-ocid="center-delete-btn"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Add/Edit Dialog */}
      <Dialog
        open={dialogMode === "add" || dialogMode === "edit"}
        onOpenChange={(o) => !o && setDialogMode(null)}
      >
        <DialogContent data-ocid="center-form-dialog">
          <DialogHeader>
            <DialogTitle>
              {dialogMode === "add" ? "Add New Center" : "Edit Center"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            {(
              [
                ["name", "Center Name *", "e.g. Raipur Skill Center"],
                ["location", "Location *", "e.g. Raipur, Chhattisgarh"],
                ["capacity", "Capacity *", "e.g. 200"],
                ["managerName", "Manager Name *", "e.g. Ramesh Kumar"],
                ["managerContact", "Manager Contact *", "e.g. +91 9876543210"],
              ] as [keyof CenterForm, string, string][]
            ).map(([field, label, placeholder]) => (
              <div key={field} className="space-y-1.5">
                <Label htmlFor={`cf-${field}`}>{label}</Label>
                <Input
                  id={`cf-${field}`}
                  placeholder={placeholder}
                  value={form[field]}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, [field]: e.target.value }))
                  }
                  type={field === "capacity" ? "number" : "text"}
                  data-ocid={`center-field-${field}`}
                />
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setDialogMode(null)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSave}
              disabled={
                isSaving ||
                !form.name ||
                !form.location ||
                !form.capacity ||
                !form.managerName ||
                !form.managerContact
              }
              data-ocid="center-save-btn"
            >
              {isSaving ? "Saving…" : "Save Center"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog
        open={dialogMode === "view"}
        onOpenChange={(o) => !o && setDialogMode(null)}
      >
        <DialogContent data-ocid="center-view-dialog">
          <DialogHeader>
            <DialogTitle>Center Details</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-1 py-2">
              {[
                ["Center Name", selected.name],
                ["Location", selected.location],
                ["Capacity", selected.capacity.toString()],
                ["Manager Name", selected.managerName],
                ["Manager Contact", selected.managerContact],
                [
                  "Created",
                  new Date(Number(selected.createdAt)).toLocaleDateString(
                    "en-IN",
                  ),
                ],
              ].map(([label, val]) => (
                <div
                  key={label}
                  className="flex justify-between py-2 border-b border-border last:border-0"
                >
                  <span className="text-sm text-muted-foreground">{label}</span>
                  <span className="text-sm font-medium">{val}</span>
                </div>
              ))}
              <Badge variant="secondary" className="mt-2">
                ID: {selected.id.slice(0, 12)}…
              </Badge>
            </div>
          )}
          <DialogFooter>
            <Button type="button" onClick={() => setDialogMode(null)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete confirm */}
      <Dialog
        open={!!deleteConfirm}
        onOpenChange={(o) => !o && setDeleteConfirm(null)}
      >
        <DialogContent data-ocid="center-delete-dialog">
          <DialogHeader>
            <DialogTitle>Delete Center</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete{" "}
            <strong>{deleteConfirm?.name}</strong>? This action cannot be
            undone.
          </p>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setDeleteConfirm(null)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              disabled={deleteCenter.isPending}
              onClick={() => deleteConfirm && handleDelete(deleteConfirm)}
              data-ocid="center-delete-confirm-btn"
            >
              {deleteCenter.isPending ? "Deleting…" : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
