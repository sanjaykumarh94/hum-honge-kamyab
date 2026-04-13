import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import { Bell, BookOpen, Briefcase, GraduationCap, Trophy } from "lucide-react";
import {
  useGetCourses,
  useGetEnrollmentsByStudent,
  useGetNotifications,
  useGetStudentProfile,
} from "../../hooks/useBackend";
import { useAuthStore } from "../../store/auth";
import type { Course, Enrollment, Notification } from "../../types";

function StatCard({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  accent?: boolean;
}) {
  return (
    <Card className={accent ? "border-primary/40 bg-primary/5" : ""}>
      <CardContent className="flex items-center gap-4 p-5">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${accent ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
        >
          {icon}
        </div>
        <div className="min-w-0">
          <p className="text-2xl font-display font-bold text-foreground leading-none">
            {value}
          </p>
          <p className="text-sm text-muted-foreground mt-1">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function NotifTypeBadge({ type }: { type: string }) {
  const map: Record<string, { label: string; cls: string }> = {
    job_alert: {
      label: "Job Alert",
      cls: "bg-accent/15 text-accent border-accent/30",
    },
    course_update: {
      label: "Course",
      cls: "bg-primary/15 text-primary border-primary/30",
    },
    event_reminder: {
      label: "Event",
      cls: "bg-chart-3/20 text-foreground border-border",
    },
  };
  const cfg = map[type] ?? {
    label: type,
    cls: "bg-muted text-muted-foreground",
  };
  return (
    <Badge variant="outline" className={`text-xs ${cfg.cls}`}>
      {cfg.label}
    </Badge>
  );
}

export default function StudentDashboard() {
  const { user } = useAuthStore();
  const userId = user?.id ?? "";

  const { data: enrollments = [], isLoading: loadingEnrollments } =
    useGetEnrollmentsByStudent(userId);
  const { data: courses = [], isLoading: loadingCourses } = useGetCourses();
  const { data: notifications = [], isLoading: loadingNotifs } =
    useGetNotifications(userId);
  const { data: profile } = useGetStudentProfile(userId);

  const now = BigInt(Date.now()) * BigInt(1_000_000);
  const thirtyDaysNs = BigInt(30) * BigInt(24) * BigInt(3_600_000_000_000);

  const enrolledCourseIds = new Set(
    enrollments.map((e: Enrollment) => e.courseId),
  );

  const activeEnrollments = enrollments.filter(
    (e: Enrollment) => e.status === "active" || e.status === "enrolled",
  );
  const completedEnrollments = enrollments.filter(
    (e: Enrollment) => e.status === "completed",
  );
  const unreadNotifs = notifications.filter((n: Notification) => !n.isRead);

  const upcomingCourses = courses
    .filter(
      (c: Course) =>
        c.startDate > now &&
        c.startDate <= now + thirtyDaysNs &&
        !enrolledCourseIds.has(c.id),
    )
    .slice(0, 4);

  const ongoingWithCourse = (
    activeEnrollments
      .map((e: Enrollment) => ({
        enrollment: e,
        course: courses.find((c: Course) => c.id === e.courseId),
      }))
      .filter(({ course }: { course: Course | undefined }) => !!course) as {
      enrollment: Enrollment;
      course: Course;
    }[]
  ).slice(0, 4);

  const latestNotifs = unreadNotifs.slice(0, 3);
  const placementStatus = profile?.placementStatus ?? "Not Started";

  const placementColor =
    placementStatus === "Placed"
      ? "bg-green-100 text-green-800 border-green-300"
      : placementStatus === "In Progress"
        ? "bg-amber-100 text-amber-800 border-amber-300"
        : "bg-muted text-muted-foreground border-border";

  return (
    <div className="space-y-8" data-ocid="student-dashboard">
      {/* Welcome banner */}
      <div className="rounded-xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold">
            नमस्ते, {user?.firstName ?? "Student"}!
          </h1>
          <p className="text-primary-foreground/80 mt-1 text-sm">
            Namaste {user?.firstName} {user?.lastName}! Welcome back to हम होंगे
            कामयाब.
          </p>
        </div>
        <Badge
          variant="outline"
          className={`self-start sm:self-center border text-sm px-3 py-1 ${placementColor}`}
        >
          <Trophy size={13} className="mr-1.5 inline" />
          {placementStatus}
        </Badge>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {loadingEnrollments ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Skeleton
              key={`stat-sk-${String(i)}`}
              className="h-24 rounded-lg"
            />
          ))
        ) : (
          <>
            <StatCard
              icon={<BookOpen size={18} />}
              label="Courses Enrolled"
              value={enrollments.length}
              accent
            />
            <StatCard
              icon={<GraduationCap size={18} />}
              label="Completed"
              value={completedEnrollments.length}
            />
            <StatCard
              icon={<Bell size={18} />}
              label="Notifications"
              value={unreadNotifs.length}
            />
            <StatCard
              icon={<Briefcase size={18} />}
              label="Placement Status"
              value={placementStatus}
            />
          </>
        )}
      </div>

      {/* Notification banner */}
      {!loadingNotifs && latestNotifs.length > 0 && (
        <Card className="border-accent/30 bg-accent/5">
          <CardHeader className="pb-3 pt-4 px-5">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Bell size={15} className="text-accent" />
              Latest Notifications
              <Link
                to="/student/notifications"
                className="ml-auto text-xs text-primary hover:underline font-normal"
              >
                View All
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent className="px-5 pb-4 space-y-2">
            {latestNotifs.map((n: Notification) => (
              <div
                key={n.id}
                className="flex items-start gap-3 py-2 border-b border-border last:border-0"
              >
                <NotifTypeBadge type={n.notifType} />
                <p className="text-sm text-foreground flex-1 min-w-0">
                  {n.message}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Ongoing Courses */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-semibold text-lg text-foreground">
            Ongoing Courses
          </h2>
          <Link to="/student/enrollments">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-primary"
            >
              View All
            </Button>
          </Link>
        </div>
        {loadingEnrollments || loadingCourses ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["oc-0", "oc-1"].map((key) => (
              <Skeleton key={key} className="h-36 rounded-lg" />
            ))}
          </div>
        ) : ongoingWithCourse.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="py-10 text-center text-muted-foreground">
              <GraduationCap size={36} className="mx-auto mb-3 opacity-40" />
              <p className="text-sm">
                No ongoing courses. Browse and enroll below.
              </p>
              <Link to="/student/courses">
                <Button type="button" size="sm" className="mt-3">
                  Browse Courses
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ongoingWithCourse.map(
              ({
                enrollment,
                course,
              }: {
                enrollment: Enrollment;
                course: Course;
              }) => (
                <Card
                  key={enrollment.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-5 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-semibold text-sm text-foreground truncate">
                          {course.title}
                        </p>
                        <Badge variant="secondary" className="text-xs mt-1">
                          {course.category}
                        </Badge>
                      </div>
                      <Badge
                        variant="outline"
                        className="text-xs shrink-0 border-primary/30 text-primary"
                      >
                        {Number(enrollment.progressPercent)}%
                      </Badge>
                    </div>
                    <Progress
                      value={Number(enrollment.progressPercent)}
                      className="h-2"
                    />
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">
                        {new Date(
                          Number(course.startDate) / 1_000_000,
                        ).toLocaleDateString()}{" "}
                        –{" "}
                        {new Date(
                          Number(course.endDate) / 1_000_000,
                        ).toLocaleDateString()}
                      </p>
                      <Link to="/student/enrollments">
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          className="text-xs h-7"
                        >
                          Continue
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ),
            )}
          </div>
        )}
      </section>

      {/* Upcoming Courses */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-semibold text-lg text-foreground">
            Upcoming Courses
          </h2>
          <Link to="/student/courses">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-primary"
            >
              Browse All Courses
            </Button>
          </Link>
        </div>
        {loadingCourses ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["up-0", "up-1"].map((key) => (
              <Skeleton key={key} className="h-28 rounded-lg" />
            ))}
          </div>
        ) : upcomingCourses.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="py-8 text-center text-muted-foreground text-sm">
              No upcoming courses in the next 30 days.
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingCourses.map((c: Course) => (
              <Card key={c.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-semibold text-sm text-foreground truncate">
                        {c.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <Badge variant="secondary" className="text-xs">
                          {c.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          Starts{" "}
                          {new Date(
                            Number(c.startDate) / 1_000_000,
                          ).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {Number(c.enrolledCount)}/{Number(c.capacity)} enrolled
                      </p>
                    </div>
                    <Link to="/student/courses">
                      <Button
                        type="button"
                        size="sm"
                        className="shrink-0 bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        Enroll
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
