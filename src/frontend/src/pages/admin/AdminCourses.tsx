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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Eye, Pencil, Plus, Search } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  useCreateCourse,
  useGetCenters,
  useGetCourses,
  useUpdateCourse,
} from "../../hooks/useBackend";
import type { Course } from "../../types";

const CATEGORIES = ["IT", "Healthcare", "Automotive", "Construction", "Retail"];

type DialogMode = "add" | "edit" | "view" | null;

interface CourseForm {
  title: string;
  description: string;
  category: string;
  durationWeeks: string;
  startDate: string;
  endDate: string;
  capacity: string;
  centerId: string;
}

const EMPTY_FORM: CourseForm = {
  title: "",
  description: "",
  category: "",
  durationWeeks: "",
  startDate: "",
  endDate: "",
  capacity: "",
  centerId: "",
};

export default function AdminCourses() {
  const { data: courses = [], isLoading } = useGetCourses();
  const { data: centers = [] } = useGetCenters();
  const createCourse = useCreateCourse();
  const updateCourse = useUpdateCourse();

  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("all");
  const [sortField, setSortField] = useState<keyof Course>("title");
  const [sortAsc, setSortAsc] = useState(true);
  const [dialogMode, setDialogMode] = useState<DialogMode>(null);
  const [selected, setSelected] = useState<Course | null>(null);
  const [form, setForm] = useState<CourseForm>(EMPTY_FORM);

  const filtered = courses
    .filter((c) => {
      const matchSearch =
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.category.toLowerCase().includes(search.toLowerCase());
      const matchCat = catFilter === "all" || c.category === catFilter;
      return matchSearch && matchCat;
    })
    .sort((a, b) => {
      const va = String(a[sortField]).toLowerCase();
      const vb = String(b[sortField]).toLowerCase();
      if (va < vb) return sortAsc ? -1 : 1;
      if (va > vb) return sortAsc ? 1 : -1;
      return 0;
    });

  function toggleSort(field: keyof Course) {
    if (sortField === field) setSortAsc((p) => !p);
    else {
      setSortField(field);
      setSortAsc(true);
    }
  }

  function sortLabel(field: keyof Course) {
    return sortField === field ? (sortAsc ? " ↑" : " ↓") : "";
  }

  function openAdd() {
    setForm(EMPTY_FORM);
    setSelected(null);
    setDialogMode("add");
  }

  function openEdit(c: Course) {
    setSelected(c);
    setForm({
      title: c.title,
      description: c.description,
      category: c.category,
      durationWeeks: c.durationWeeks.toString(),
      startDate: new Date(Number(c.startDate)).toISOString().split("T")[0],
      endDate: new Date(Number(c.endDate)).toISOString().split("T")[0],
      capacity: c.capacity.toString(),
      centerId: c.centerId ?? "",
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
        centerId: cId,
      });
      toast.success("Course created successfully");
    } else if (dialogMode === "edit" && selected) {
      await updateCourse.mutateAsync({
        id: selected.id,
        title: form.title,
        description: form.description,
        category: form.category,
        durationWeeks: dur,
        startDate: startMs,
        endDate: endMs,
        capacity: cap,
      });
      toast.success("Course updated successfully");
    }
    setDialogMode(null);
  }

  const isSaving = createCourse.isPending || updateCourse.isPending;
  const formValid =
    form.title &&
    form.category &&
    form.durationWeeks &&
    form.startDate &&
    form.endDate &&
    form.capacity;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display">Manage Courses</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {courses.length} courses available
          </p>
        </div>
        <Button type="button" onClick={openAdd} data-ocid="add-course-btn">
          <Plus className="h-4 w-4 mr-2" />
          Add Course
        </Button>
      </div>

      <div className="flex gap-3 items-center flex-wrap">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search courses…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 w-64"
            data-ocid="courses-search"
          />
        </div>
        <Select value={catFilter} onValueChange={setCatFilter}>
          <SelectTrigger className="w-44" data-ocid="courses-category-filter">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {CATEGORIES.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40">
              <TableHead className="w-10">#</TableHead>
              <TableHead
                className="cursor-pointer hover:text-primary"
                onClick={() => toggleSort("title")}
              >
                Course Title{sortLabel("title")}
              </TableHead>
              <TableHead
                className="cursor-pointer hover:text-primary"
                onClick={() => toggleSort("category")}
              >
                Category{sortLabel("category")}
              </TableHead>
              <TableHead className="text-right">Weeks</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead className="text-right">Capacity</TableHead>
              <TableHead className="text-right">Enrolled</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              ["r1", "r2", "r3", "r4"].map((k) => (
                <TableRow key={k}>
                  {["c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9"].map(
                    (c) => (
                      <TableCell key={c}>
                        <Skeleton className="h-5 w-full" />
                      </TableCell>
                    ),
                  )}
                </TableRow>
              ))
            ) : filtered.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={9}
                  className="text-center py-12 text-muted-foreground"
                >
                  {search || catFilter !== "all"
                    ? "No courses match your filters"
                    : "No courses created yet"}
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((course, idx) => (
                <TableRow key={course.id} data-ocid="course-row">
                  <TableCell className="text-muted-foreground text-sm">
                    {idx + 1}
                  </TableCell>
                  <TableCell className="font-medium">{course.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{course.category}</Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {course.durationWeeks.toString()}
                  </TableCell>
                  <TableCell className="text-sm">
                    {new Date(Number(course.startDate)).toLocaleDateString(
                      "en-IN",
                    )}
                  </TableCell>
                  <TableCell className="text-sm">
                    {new Date(Number(course.endDate)).toLocaleDateString(
                      "en-IN",
                    )}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {course.capacity.toString()}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {course.enrolledCount.toString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelected(course);
                          setDialogMode("view");
                        }}
                        data-ocid="course-view-btn"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => openEdit(course)}
                        data-ocid="course-edit-btn"
                      >
                        <Pencil className="h-4 w-4" />
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
        <DialogContent className="max-w-lg" data-ocid="course-form-dialog">
          <DialogHeader>
            <DialogTitle>
              {dialogMode === "add" ? "Add New Course" : "Edit Course"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2 max-h-[60vh] overflow-y-auto pr-1">
            <div className="space-y-1.5">
              <Label htmlFor="cf-title">Course Title *</Label>
              <Input
                id="cf-title"
                placeholder="e.g. Web Development Fundamentals"
                value={form.title}
                onChange={(e) =>
                  setForm((p) => ({ ...p, title: e.target.value }))
                }
                data-ocid="course-field-title"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="cf-description">Description *</Label>
              <Textarea
                id="cf-description"
                placeholder="Brief course description…"
                value={form.description}
                onChange={(e) =>
                  setForm((p) => ({ ...p, description: e.target.value }))
                }
                rows={3}
                data-ocid="course-field-description"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Category *</Label>
                <Select
                  value={form.category}
                  onValueChange={(v) => setForm((p) => ({ ...p, category: v }))}
                >
                  <SelectTrigger data-ocid="course-field-category">
                    <SelectValue placeholder="Select…" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="cf-weeks">Duration (weeks) *</Label>
                <Input
                  id="cf-weeks"
                  type="number"
                  placeholder="e.g. 12"
                  value={form.durationWeeks}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, durationWeeks: e.target.value }))
                  }
                  data-ocid="course-field-weeks"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="cf-start">Start Date *</Label>
                <Input
                  id="cf-start"
                  type="date"
                  value={form.startDate}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, startDate: e.target.value }))
                  }
                  data-ocid="course-field-startdate"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="cf-end">End Date *</Label>
                <Input
                  id="cf-end"
                  type="date"
                  value={form.endDate}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, endDate: e.target.value }))
                  }
                  data-ocid="course-field-enddate"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="cf-cap">Capacity *</Label>
                <Input
                  id="cf-cap"
                  type="number"
                  placeholder="e.g. 50"
                  value={form.capacity}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, capacity: e.target.value }))
                  }
                  data-ocid="course-field-capacity"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Center</Label>
                <Select
                  value={form.centerId || "none"}
                  onValueChange={(v) =>
                    setForm((p) => ({ ...p, centerId: v === "none" ? "" : v }))
                  }
                >
                  <SelectTrigger data-ocid="course-field-center">
                    <SelectValue placeholder="Select center…" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No specific center</SelectItem>
                    {centers.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
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
              disabled={isSaving || !formValid}
              data-ocid="course-save-btn"
            >
              {isSaving ? "Saving…" : "Save Course"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog
        open={dialogMode === "view"}
        onOpenChange={(o) => !o && setDialogMode(null)}
      >
        <DialogContent data-ocid="course-view-dialog">
          <DialogHeader>
            <DialogTitle>Course Details</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-1 py-2">
              {[
                ["Title", selected.title],
                ["Category", selected.category],
                ["Description", selected.description],
                ["Duration", `${selected.durationWeeks} weeks`],
                [
                  "Start Date",
                  new Date(Number(selected.startDate)).toLocaleDateString(
                    "en-IN",
                  ),
                ],
                [
                  "End Date",
                  new Date(Number(selected.endDate)).toLocaleDateString(
                    "en-IN",
                  ),
                ],
                ["Capacity", selected.capacity.toString()],
                ["Enrolled", selected.enrolledCount.toString()],
              ].map(([label, val]) => (
                <div
                  key={label}
                  className="flex justify-between py-2 border-b border-border last:border-0"
                >
                  <span className="text-sm text-muted-foreground">{label}</span>
                  <span className="text-sm font-medium max-w-xs text-right">
                    {val}
                  </span>
                </div>
              ))}
            </div>
          )}
          <DialogFooter>
            <Button type="button" onClick={() => setDialogMode(null)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
