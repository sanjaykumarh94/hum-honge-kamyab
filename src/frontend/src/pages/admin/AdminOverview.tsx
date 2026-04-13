import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "@tanstack/react-router";
import {
  BookOpen,
  Building2,
  GraduationCap,
  PlusCircle,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  useGetAllStudents,
  useGetCenters,
  useGetCourses,
  useGetPlacementDrives,
} from "../../hooks/useBackend";
import { useAuthStore } from "../../store/auth";

const COURSE_CATEGORIES = [
  "IT",
  "Healthcare",
  "Automotive",
  "Construction",
  "Retail",
];

function StatCard({
  title,
  value,
  icon: Icon,
  color,
  loading,
}: {
  title: string;
  value: string | number;
  icon: React.ElementType;
  color: string;
  loading: boolean;
}) {
  return (
    <Card data-ocid="stat-card">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            {loading ? (
              <Skeleton className="h-8 w-20" />
            ) : (
              <p className="text-3xl font-bold font-display">{value}</p>
            )}
          </div>
          <div className={`p-3 rounded-xl ${color}`}>
            <Icon className="h-5 w-5 text-primary-foreground" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function AdminOverview() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { data: students = [], isLoading: loadStudents } = useGetAllStudents();
  const { data: courses = [], isLoading: loadCourses } = useGetCourses();
  const { data: centers = [], isLoading: loadCenters } = useGetCenters();
  const { data: drives = [], isLoading: loadDrives } = useGetPlacementDrives();

  const now = Date.now();
  const upcoming = drives
    .filter((d) => Number(d.driveDate) > now)
    .sort((a, b) => Number(a.driveDate) - Number(b.driveDate))
    .slice(0, 3);

  const recentStudents = [...students]
    .sort((a, b) => Number(b.createdAt) - Number(a.createdAt))
    .slice(0, 5);

  const categoryCounts = COURSE_CATEGORIES.map((cat) => ({
    label: cat,
    count: courses.filter((c) => c.category === cat).length,
  }));
  const maxCount = Math.max(...categoryCounts.map((c) => c.count), 1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold font-display text-foreground">
            Hum Honge Kamyab — Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Welcome back,{" "}
            <span className="font-semibold text-primary">
              {user ? `${user.firstName} ${user.lastName}` : "Administrator"}
            </span>
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => navigate({ to: "/admin/centers" })}
            data-ocid="quick-add-center"
          >
            <PlusCircle className="h-4 w-4 mr-1" />
            Add Center
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => navigate({ to: "/admin/courses" })}
            data-ocid="quick-add-course"
          >
            <PlusCircle className="h-4 w-4 mr-1" />
            Add Course
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={() => navigate({ to: "/admin/students" })}
            data-ocid="quick-add-student"
          >
            <PlusCircle className="h-4 w-4 mr-1" />
            Students
          </Button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Students"
          value={students.length}
          icon={Users}
          color="bg-primary"
          loading={loadStudents}
        />
        <StatCard
          title="Total Courses"
          value={courses.length}
          icon={BookOpen}
          color="bg-accent"
          loading={loadCourses}
        />
        <StatCard
          title="Total Centers"
          value={centers.length}
          icon={Building2}
          color="bg-primary/80"
          loading={loadCenters}
        />
        <StatCard
          title="Placement Drives"
          value={drives.length}
          icon={TrendingUp}
          color="bg-accent/80"
          loading={loadDrives}
        />
      </div>

      {/* Charts + quick info row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bar chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-primary" />
              Courses by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loadCourses ? (
              <div className="flex gap-3 h-32 items-end">
                {["c1", "c2", "c3", "c4", "c5"].map((k) => (
                  <Skeleton key={k} className="flex-1 h-full" />
                ))}
              </div>
            ) : (
              <div className="flex gap-3 items-end h-32">
                {categoryCounts.map((cat) => {
                  const pct = Math.round((cat.count / maxCount) * 100);
                  return (
                    <div
                      key={cat.label}
                      className="flex-1 flex flex-col items-center gap-1"
                    >
                      <span className="text-xs font-medium text-primary">
                        {cat.count}
                      </span>
                      <div className="w-full bg-muted rounded-t overflow-hidden h-20 flex items-end">
                        <div
                          className="w-full bg-primary/70 rounded-t transition-all duration-500"
                          style={{ height: `${Math.max(pct, 4)}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground truncate w-full text-center">
                        {cat.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upcoming drives */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              Upcoming Placement Drives
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {loadDrives ? (
              ["d1", "d2", "d3"].map((k) => (
                <Skeleton key={k} className="h-14" />
              ))
            ) : upcoming.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4 text-center">
                No upcoming drives scheduled
              </p>
            ) : (
              upcoming.map((drive) => (
                <div
                  key={drive.id}
                  className="flex items-start justify-between p-3 rounded-lg bg-muted/40 border border-border"
                  data-ocid="drive-item"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">
                      {drive.companyName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {drive.location}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(Number(drive.driveDate)).toLocaleDateString(
                        "en-IN",
                      )}
                    </p>
                  </div>
                  <Badge variant="secondary" className="ml-2 shrink-0">
                    {drive.positions.toString()} posts
                  </Badge>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent students */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            Recent Students
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loadStudents ? (
            <div className="space-y-2">
              {["s1", "s2", "s3", "s4", "s5"].map((k) => (
                <Skeleton key={k} className="h-10" />
              ))}
            </div>
          ) : recentStudents.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4 text-center">
              No students enrolled yet
            </p>
          ) : (
            <div className="divide-y divide-border">
              {recentStudents.map((s) => (
                <div
                  key={s.id}
                  className="flex items-center justify-between py-3"
                  data-ocid="student-row"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-primary">
                        {s.firstName[0]}
                        {s.lastName[0]}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">
                        {s.firstName} {s.lastName}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {s.email}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="ml-2 shrink-0">
                    {s.role}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
