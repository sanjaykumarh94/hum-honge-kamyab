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
import { Eye, Search } from "lucide-react";
import { useState } from "react";
import {
  useGetAllStudents,
  useGetCenters,
  useGetCourses,
  useGetEnrollmentsByStudent,
  useGetStudentProfile,
} from "../../hooks/useBackend";
import type { User } from "../../types";

const STATUS_CONFIG: Record<
  string,
  { label: string; variant: "default" | "secondary" | "outline" }
> = {
  not_started: { label: "Not Started", variant: "secondary" },
  in_progress: { label: "In Progress", variant: "default" },
  placed: { label: "Placed", variant: "outline" },
};

function StudentDetailDialog({
  student,
  onClose,
}: {
  student: User;
  onClose: () => void;
}) {
  const { data: profile } = useGetStudentProfile(student.id);
  const { data: enrollments = [] } = useGetEnrollmentsByStudent(student.id);
  const { data: courses = [] } = useGetCourses();

  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-lg" data-ocid="student-view-dialog">
        <DialogHeader>
          <DialogTitle>
            {student.firstName} {student.lastName}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2 max-h-[65vh] overflow-y-auto pr-1">
          <section>
            <h3 className="text-xs font-semibold mb-2 text-primary uppercase tracking-wide">
              Personal Info
            </h3>
            {[
              ["Email", student.email],
              ["Phone", student.phone ?? "—"],
              ["Role", student.role],
              [
                "Joined",
                new Date(Number(student.createdAt)).toLocaleDateString("en-IN"),
              ],
            ].map(([label, val]) => (
              <div
                key={label}
                className="flex justify-between py-1.5 border-b border-border last:border-0"
              >
                <span className="text-sm text-muted-foreground">{label}</span>
                <span className="text-sm font-medium">{val}</span>
              </div>
            ))}
          </section>
          {profile && (
            <section>
              <h3 className="text-xs font-semibold mb-2 text-primary uppercase tracking-wide">
                Profile
              </h3>
              {[
                ["Education Level", profile.educationLevel ?? "—"],
                ["Qualification", profile.qualification ?? "—"],
                ["Family Income", profile.familyIncome ?? "—"],
                ["Address", profile.address ?? "—"],
                [
                  "Placement Status",
                  STATUS_CONFIG[profile.placementStatus]?.label ??
                    profile.placementStatus,
                ],
              ].map(([label, val]) => (
                <div
                  key={label}
                  className="flex justify-between py-1.5 border-b border-border last:border-0"
                >
                  <span className="text-sm text-muted-foreground">{label}</span>
                  <span className="text-sm font-medium">{val}</span>
                </div>
              ))}
            </section>
          )}
          <section>
            <h3 className="text-xs font-semibold mb-2 text-primary uppercase tracking-wide">
              Enrollments ({enrollments.length})
            </h3>
            {enrollments.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No enrollments yet
              </p>
            ) : (
              <div className="space-y-2">
                {enrollments.map((e) => {
                  const course = courses.find((c) => c.id === e.courseId);
                  return (
                    <div
                      key={e.id}
                      className="flex items-center justify-between p-2 rounded bg-muted/40"
                    >
                      <span className="text-sm font-medium">
                        {course?.title ?? e.courseId}
                      </span>
                      <Badge variant="outline">{e.status}</Badge>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>
        <DialogFooter>
          <Button type="button" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function AdminStudents() {
  const { data: students = [], isLoading } = useGetAllStudents();
  const { data: courses = [] } = useGetCourses();
  const { data: centers = [] } = useGetCenters();

  const [search, setSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState("all");
  const [centerFilter, setCenterFilter] = useState("all");
  const [sortField, setSortField] = useState<"firstName" | "email">(
    "firstName",
  );
  const [sortAsc, setSortAsc] = useState(true);
  const [viewStudent, setViewStudent] = useState<User | null>(null);

  const filtered = students
    .filter((s) => {
      const fullName = `${s.firstName} ${s.lastName}`.toLowerCase();
      return (
        fullName.includes(search.toLowerCase()) ||
        s.email.toLowerCase().includes(search.toLowerCase())
      );
    })
    .sort((a, b) => {
      const va = a[sortField].toLowerCase();
      const vb = b[sortField].toLowerCase();
      if (va < vb) return sortAsc ? -1 : 1;
      if (va > vb) return sortAsc ? 1 : -1;
      return 0;
    });

  function toggleSort(field: "firstName" | "email") {
    if (sortField === field) setSortAsc((p) => !p);
    else {
      setSortField(field);
      setSortAsc(true);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display">Student Records</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {students.length} students registered
        </p>
      </div>

      <div className="flex gap-3 items-center flex-wrap">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search students…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 w-64"
            data-ocid="students-search"
          />
        </div>
        <Select value={courseFilter} onValueChange={setCourseFilter}>
          <SelectTrigger className="w-48" data-ocid="students-course-filter">
            <SelectValue placeholder="Filter by Course" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Courses</SelectItem>
            {courses.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={centerFilter} onValueChange={setCenterFilter}>
          <SelectTrigger className="w-48" data-ocid="students-center-filter">
            <SelectValue placeholder="Filter by Center" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Centers</SelectItem>
            {centers.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.name}
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
                onClick={() => toggleSort("firstName")}
              >
                Student Name{" "}
                {sortField === "firstName" ? (sortAsc ? "↑" : "↓") : ""}
              </TableHead>
              <TableHead
                className="cursor-pointer hover:text-primary"
                onClick={() => toggleSort("email")}
              >
                Email {sortField === "email" ? (sortAsc ? "↑" : "↓") : ""}
              </TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              ["r1", "r2", "r3", "r4", "r5"].map((k) => (
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
                    ? "No students match your search"
                    : "No students registered yet"}
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((student, idx) => {
                const statusInfo = STATUS_CONFIG.not_started;
                return (
                  <TableRow key={student.id} data-ocid="student-row">
                    <TableCell className="text-muted-foreground text-sm">
                      {idx + 1}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <span className="text-xs font-bold text-primary">
                            {student.firstName[0]}
                            {student.lastName[0]}
                          </span>
                        </div>
                        <span className="font-medium">
                          {student.firstName} {student.lastName}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {student.email}
                    </TableCell>
                    <TableCell className="text-sm">
                      {student.phone ?? "—"}
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusInfo.variant}>
                        {statusInfo.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => setViewStudent(student)}
                          data-ocid="student-view-btn"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {viewStudent && (
        <StudentDetailDialog
          student={viewStudent}
          onClose={() => setViewStudent(null)}
        />
      )}
    </div>
  );
}
