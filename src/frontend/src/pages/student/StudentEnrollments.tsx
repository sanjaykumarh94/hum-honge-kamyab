import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Calendar, ChevronRight } from "lucide-react";
import { useState } from "react";
import {
  useGetCourses,
  useGetEnrollmentsByStudent,
} from "../../hooks/useBackend";
import { useAuthStore } from "../../store/auth";
import type { Course, Enrollment } from "../../types";

const STATUS_TABS = ["all", "active", "completed", "dropped"] as const;
type StatusFilter = (typeof STATUS_TABS)[number];

const STATUS_BADGE: Record<string, string> = {
  active: "bg-green-100 text-green-800 border-green-300",
  enrolled: "bg-blue-100 text-blue-800 border-blue-300",
  completed: "bg-primary/10 text-primary border-primary/30",
  dropped: "bg-destructive/10 text-destructive border-destructive/30",
};

function formatDate(ts: bigint) {
  return new Date(Number(ts) / 1_000_000).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

interface EnrollmentCardProps {
  enrollment: Enrollment;
  course: Course;
  onOpen: () => void;
}

function EnrollmentCard({ enrollment, course, onOpen }: EnrollmentCardProps) {
  const statusCls =
    STATUS_BADGE[enrollment.status] ??
    "bg-muted text-muted-foreground border-border";
  return (
    <Card
      className="hover:shadow-md transition-shadow cursor-pointer"
      onClick={onOpen}
      data-ocid={`enrollment-card-${enrollment.id}`}
    >
      <CardContent className="p-5 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="font-semibold text-sm text-foreground truncate">
              {course.title}
            </p>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <Badge variant="secondary" className="text-xs">
                {course.category}
              </Badge>
              <Badge variant="outline" className={`text-xs ${statusCls}`}>
                {enrollment.status}
              </Badge>
            </div>
          </div>
          <ChevronRight
            size={16}
            className="text-muted-foreground shrink-0 mt-1"
          />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Progress</span>
            <span>{Number(enrollment.progressPercent)}%</span>
          </div>
          <Progress
            value={Number(enrollment.progressPercent)}
            className="h-1.5"
          />
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar size={11} />
            Enrolled: {formatDate(enrollment.enrolledAt)}
          </span>
          <span>
            {formatDate(course.startDate)} – {formatDate(course.endDate)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

export default function StudentEnrollments() {
  const { user } = useAuthStore();
  const userId = user?.id ?? "";

  const { data: enrollments = [], isLoading: loadingEnrollments } =
    useGetEnrollmentsByStudent(userId);
  const { data: courses = [], isLoading: loadingCourses } = useGetCourses();

  const [filter, setFilter] = useState<StatusFilter>("all");
  const [selectedEnrollment, setSelectedEnrollment] = useState<{
    enrollment: Enrollment;
    course: Course;
  } | null>(null);

  const enriched = enrollments
    .map((e: Enrollment) => ({
      enrollment: e,
      course: courses.find((c: Course) => c.id === e.courseId),
    }))
    .filter(({ course }: { course: Course | undefined }) => !!course) as {
    enrollment: Enrollment;
    course: Course;
  }[];

  const filtered = enriched.filter(
    ({ enrollment }: { enrollment: Enrollment }) => {
      if (filter === "all") return true;
      if (filter === "active")
        return (
          enrollment.status === "active" || enrollment.status === "enrolled"
        );
      return enrollment.status === filter;
    },
  );

  const isLoading = loadingEnrollments || loadingCourses;

  return (
    <div className="space-y-6" data-ocid="student-enrollments">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            My Enrollments
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Track your course progress and status
          </p>
        </div>
        <Badge variant="outline" className="text-sm px-3 py-1">
          {enrollments.length} total
        </Badge>
      </div>

      <Tabs
        value={filter}
        onValueChange={(v) => setFilter(v as StatusFilter)}
        data-ocid="enrollment-filter-tabs"
      >
        <TabsList>
          {STATUS_TABS.map((tab) => (
            <TabsTrigger key={tab} value={tab} className="capitalize">
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["sk-0", "sk-1", "sk-2", "sk-3"].map((key) => (
            <Skeleton key={key} className="h-36 rounded-lg" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="py-16 flex flex-col items-center text-muted-foreground gap-3">
            <BookOpen size={40} className="opacity-30" />
            <p className="font-medium">
              No {filter === "all" ? "" : filter} enrollments
            </p>
            <p className="text-sm">
              {filter === "all"
                ? "You haven't enrolled in any courses yet."
                : `No ${filter} courses found.`}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map(
            ({
              enrollment,
              course,
            }: {
              enrollment: Enrollment;
              course: Course;
            }) => (
              <EnrollmentCard
                key={enrollment.id}
                enrollment={enrollment}
                course={course}
                onOpen={() => setSelectedEnrollment({ enrollment, course })}
              />
            ),
          )}
        </div>
      )}

      <Sheet
        open={!!selectedEnrollment}
        onOpenChange={(open) => !open && setSelectedEnrollment(null)}
      >
        <SheetContent>
          {selectedEnrollment && (
            <>
              <SheetHeader>
                <SheetTitle className="font-display text-lg">
                  {selectedEnrollment.course.title}
                </SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-5">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">
                    {selectedEnrollment.course.category}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={
                      STATUS_BADGE[selectedEnrollment.enrollment.status] ??
                      "bg-muted text-muted-foreground"
                    }
                  >
                    {selectedEnrollment.enrollment.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {selectedEnrollment.course.description}
                </p>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-semibold">
                      {Number(selectedEnrollment.enrollment.progressPercent)}%
                    </span>
                  </div>
                  <Progress
                    value={Number(
                      selectedEnrollment.enrollment.progressPercent,
                    )}
                    className="h-2"
                  />
                </div>
                <div className="space-y-2 text-sm">
                  {[
                    {
                      label: "Enrolled On",
                      value: formatDate(
                        selectedEnrollment.enrollment.enrolledAt,
                      ),
                    },
                    {
                      label: "Start Date",
                      value: formatDate(selectedEnrollment.course.startDate),
                    },
                    {
                      label: "End Date",
                      value: formatDate(selectedEnrollment.course.endDate),
                    },
                    {
                      label: "Duration",
                      value: `${selectedEnrollment.course.durationWeeks} weeks`,
                    },
                    {
                      label: "Capacity",
                      value: `${selectedEnrollment.course.enrolledCount}/${selectedEnrollment.course.capacity}`,
                    },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between">
                      <span className="text-muted-foreground">{label}</span>
                      <span className="font-medium">{String(value)}</span>
                    </div>
                  ))}
                </div>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full mt-2"
                  onClick={() => setSelectedEnrollment(null)}
                >
                  Close
                </Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
