import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { AlertTriangle, BookOpen, Calendar, Search, Users } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  useEnrollInCourse,
  useGetCenters,
  useGetCourses,
  useGetEnrollmentsByStudent,
} from "../../hooks/useBackend";
import { useAuthStore } from "../../store/auth";
import type { Course, Enrollment } from "../../types";

function formatDate(ts: bigint) {
  return new Date(Number(ts) / 1_000_000).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function CourseCard({
  course,
  isEnrolled,
  onEnroll,
}: {
  course: Course;
  isEnrolled: boolean;
  onEnroll: (course: Course) => void;
}) {
  const capacity = Number(course.capacity);
  const enrolled = Number(course.enrolledCount);
  const isFull = enrolled >= capacity;
  const isNearFull = !isFull && capacity > 0 && enrolled / capacity > 0.85;

  return (
    <Card
      className="flex flex-col hover:shadow-md transition-shadow"
      data-ocid={`course-card-${course.id}`}
    >
      <CardContent className="p-5 flex flex-col flex-1 gap-3">
        <div className="flex items-start justify-between gap-2">
          <p className="font-semibold text-sm text-foreground leading-snug line-clamp-2 flex-1 min-w-0">
            {course.title}
          </p>
          <Badge variant="secondary" className="text-xs shrink-0">
            {course.category}
          </Badge>
        </div>

        <p className="text-xs text-muted-foreground line-clamp-2 flex-1">
          {course.description}
        </p>

        <div className="space-y-1.5 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Calendar size={11} />
            <span>
              {formatDate(course.startDate)} – {formatDate(course.endDate)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Users size={11} />
              {enrolled}/{capacity} enrolled
            </span>
            <span>{Number(course.durationWeeks)}w</span>
          </div>
        </div>

        {isNearFull && (
          <p className="text-xs text-amber-600 flex items-center gap-1">
            <AlertTriangle size={11} />
            Only {capacity - enrolled} spots left
          </p>
        )}

        <div className="mt-auto pt-2">
          {isEnrolled ? (
            <Badge
              variant="outline"
              className="w-full justify-center py-1.5 border-primary/40 text-primary bg-primary/5"
            >
              ✓ Enrolled
            </Badge>
          ) : (
            <Button
              type="button"
              size="sm"
              className="w-full"
              disabled={isFull}
              onClick={() => onEnroll(course)}
              data-ocid={`enroll-btn-${course.id}`}
            >
              {isFull ? "Course Full" : "Enroll Now"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default function StudentCourses() {
  const { user } = useAuthStore();
  const userId = user?.id ?? "";

  const { data: courses = [], isLoading: loadingCourses } = useGetCourses();
  const { data: enrollments = [], isLoading: loadingEnrollments } =
    useGetEnrollmentsByStudent(userId);
  const { data: centers = [] } = useGetCenters();
  const enrollInCourse = useEnrollInCourse();

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [centerFilter, setCenterFilter] = useState("all");
  const [sortBy, setSortBy] = useState("startDate");
  const [confirmCourse, setConfirmCourse] = useState<Course | null>(null);

  const enrolledCourseIds = new Set(
    enrollments.map((e: Enrollment) => e.courseId),
  );

  const categories = useMemo(() => {
    const cats = new Set(courses.map((c: Course) => c.category));
    return Array.from(cats) as string[];
  }, [courses]);

  const filtered = useMemo(() => {
    let list = courses.filter((c: Course) => {
      const matchesSearch =
        !search ||
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        categoryFilter === "all" || c.category === categoryFilter;
      const matchesCenter =
        centerFilter === "all" ||
        (c.centerId ?? "") === centerFilter ||
        (!c.centerId && centerFilter === "none");
      return matchesSearch && matchesCategory && matchesCenter;
    });
    if (sortBy === "startDate") {
      list = [...list].sort(
        (a, b) => Number(a.startDate) - Number(b.startDate),
      );
    } else if (sortBy === "duration") {
      list = [...list].sort(
        (a, b) => Number(a.durationWeeks) - Number(b.durationWeeks),
      );
    }
    return list;
  }, [courses, search, categoryFilter, centerFilter, sortBy]);

  const handleEnroll = async () => {
    if (!confirmCourse) return;
    try {
      const result = await enrollInCourse.mutateAsync({
        studentId: userId,
        courseId: confirmCourse.id,
      });
      if (result.__kind__ === "err") {
        toast.error(result.err);
      } else {
        toast.success(`Enrolled in "${confirmCourse.title}"!`);
        setConfirmCourse(null);
      }
    } catch {
      toast.error("Enrollment failed. Please try again.");
    }
  };

  const isLoading = loadingCourses || loadingEnrollments;

  return (
    <div className="space-y-6" data-ocid="student-courses">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">
          Available Courses
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Browse and enroll in vocational training courses
        </p>
      </div>

      {/* Filter bar */}
      <div className="flex flex-wrap gap-3" data-ocid="courses-filter-bar">
        <div className="relative flex-1 min-w-[200px]">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
            data-ocid="courses-search"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-44" data-ocid="courses-category-filter">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={centerFilter} onValueChange={setCenterFilter}>
          <SelectTrigger className="w-44" data-ocid="courses-center-filter">
            <SelectValue placeholder="Center" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Centers</SelectItem>
            <SelectItem value="none">No Center</SelectItem>
            {centers.map((center: { id: string; name: string }) => (
              <SelectItem key={center.id} value={center.id}>
                {center.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-40" data-ocid="courses-sort">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="startDate">Start Date</SelectItem>
            <SelectItem value="duration">Duration</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {!isLoading && (
        <p className="text-sm text-muted-foreground">
          Showing {filtered.length} of {courses.length} courses
        </p>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {["sk-0", "sk-1", "sk-2", "sk-3", "sk-4", "sk-5"].map((key) => (
            <Skeleton key={key} className="h-56 rounded-lg" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="py-16 flex flex-col items-center text-muted-foreground gap-3">
            <BookOpen size={40} className="opacity-30" />
            <p className="font-medium">No courses found</p>
            <p className="text-sm">
              Try adjusting your filters or search term.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((course: Course) => (
            <CourseCard
              key={course.id}
              course={course}
              isEnrolled={enrolledCourseIds.has(course.id)}
              onEnroll={setConfirmCourse}
            />
          ))}
        </div>
      )}

      <Dialog
        open={!!confirmCourse}
        onOpenChange={(open) => !open && setConfirmCourse(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Enrollment</DialogTitle>
          </DialogHeader>
          {confirmCourse && (
            <div className="space-y-3 text-sm">
              <p className="font-semibold text-base">{confirmCourse.title}</p>
              <div className="space-y-1 text-muted-foreground">
                <p>Category: {confirmCourse.category}</p>
                <p>
                  Dates: {formatDate(confirmCourse.startDate)} –{" "}
                  {formatDate(confirmCourse.endDate)}
                </p>
                <p>
                  Seats: {Number(confirmCourse.enrolledCount)}/
                  {Number(confirmCourse.capacity)}
                </p>
                {Number(confirmCourse.capacity) > 0 &&
                  Number(confirmCourse.enrolledCount) /
                    Number(confirmCourse.capacity) >
                    0.85 && (
                    <p className="text-amber-600 flex items-center gap-1">
                      <AlertTriangle size={13} />
                      Nearly full — enroll soon!
                    </p>
                  )}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setConfirmCourse(null)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleEnroll}
              disabled={enrollInCourse.isPending}
              data-ocid="confirm-enroll-btn"
            >
              {enrollInCourse.isPending ? "Enrolling..." : "Confirm Enrollment"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
