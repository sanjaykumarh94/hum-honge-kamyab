import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { BarChart2, Download, FileText, TrendingUp, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  useGetAllStudents,
  useGetCenters,
  useGetCourses,
  useGetPlacementDrives,
} from "../../hooks/useBackend";

const CATEGORIES = ["IT", "Healthcare", "Automotive", "Construction", "Retail"];

function MiniStatBar({
  label,
  value,
  max,
  color,
}: {
  label: string;
  value: number;
  max: number;
  color: string;
}) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-muted-foreground truncate">{label}</span>
        <span className="font-semibold text-foreground">{value}</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${color}`}
          style={{ width: `${Math.max(pct, 2)}%` }}
        />
      </div>
    </div>
  );
}

function handleDownload(reportName: string, type: string) {
  toast.info(`${reportName} ${type} report download coming soon`);
}

export default function AdminReports() {
  const { data: students = [], isLoading: loadStudents } = useGetAllStudents();
  const { data: courses = [], isLoading: loadCourses } = useGetCourses();
  const { data: centers = [] } = useGetCenters();
  const { data: drives = [], isLoading: loadDrives } = useGetPlacementDrives();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [courseFilter, setCourseFilter] = useState("all");
  const [centerFilter, setCenterFilter] = useState("all");

  const totalEnrollments = courses.reduce(
    (sum, c) => sum + Number(c.enrolledCount),
    0,
  );
  const completedDrives = drives.filter((d) => d.status === "completed").length;
  const placementRate =
    drives.length > 0 ? Math.round((completedDrives / drives.length) * 100) : 0;

  const categoryCounts = CATEGORIES.map((cat) => ({
    label: cat,
    enrolled: courses
      .filter((c) => c.category === cat)
      .reduce((s, c) => s + Number(c.enrolledCount), 0),
  }));
  const maxEnrolled = Math.max(...categoryCounts.map((c) => c.enrolled), 1);

  const completionRates = courses.slice(0, 5).map((c) => ({
    label: c.title,
    rate:
      Number(c.capacity) > 0
        ? Math.round((Number(c.enrolledCount) / Number(c.capacity)) * 100)
        : 0,
  }));
  const maxRate = Math.max(...completionRates.map((c) => c.rate), 1);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display">Reports & Analytics</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Generate and download program reports
        </p>
      </div>

      {/* Filter controls */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4 items-end">
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">
                Start Date
              </Label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-40"
                data-ocid="report-filter-start"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">End Date</Label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-40"
                data-ocid="report-filter-end"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Course</Label>
              <Select value={courseFilter} onValueChange={setCourseFilter}>
                <SelectTrigger
                  className="w-48"
                  data-ocid="report-filter-course"
                >
                  <SelectValue placeholder="All Courses" />
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
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Center</Label>
              <Select value={centerFilter} onValueChange={setCenterFilter}>
                <SelectTrigger
                  className="w-48"
                  data-ocid="report-filter-center"
                >
                  <SelectValue placeholder="All Centers" />
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
          </div>
        </CardContent>
      </Card>

      {/* Report cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily Enrollments */}
        <Card data-ocid="report-enrollments">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                Daily Enrollments
              </CardTitle>
              <div className="flex gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs"
                  onClick={() => handleDownload("Daily Enrollments", "CSV")}
                  data-ocid="report-enrollments-csv"
                >
                  <Download className="h-3 w-3 mr-1" />
                  CSV
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs"
                  onClick={() => handleDownload("Daily Enrollments", "PDF")}
                  data-ocid="report-enrollments-pdf"
                >
                  <FileText className="h-3 w-3 mr-1" />
                  PDF
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {loadStudents || loadCourses ? (
              <div className="space-y-2">
                {["s1", "s2", "s3"].map((k) => (
                  <Skeleton key={k} className="h-8 w-full" />
                ))}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
                    <p className="text-xs text-muted-foreground">
                      Total Students
                    </p>
                    <p className="text-2xl font-bold font-display text-primary">
                      {students.length}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-accent/5 border border-accent/10">
                    <p className="text-xs text-muted-foreground">Enrollments</p>
                    <p className="text-2xl font-bold font-display">
                      {totalEnrollments}
                    </p>
                  </div>
                </div>
                <div className="space-y-2 pt-2">
                  {categoryCounts.map((cat) => (
                    <MiniStatBar
                      key={cat.label}
                      label={cat.label}
                      value={cat.enrolled}
                      max={maxEnrolled}
                      color="bg-primary"
                    />
                  ))}
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Placement Outcomes */}
        <Card data-ocid="report-placements">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                Placement Outcomes
              </CardTitle>
              <div className="flex gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs"
                  onClick={() => handleDownload("Placement Outcomes", "CSV")}
                  data-ocid="report-placements-csv"
                >
                  <Download className="h-3 w-3 mr-1" />
                  CSV
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs"
                  onClick={() => handleDownload("Placement Outcomes", "PDF")}
                  data-ocid="report-placements-pdf"
                >
                  <FileText className="h-3 w-3 mr-1" />
                  PDF
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {loadDrives ? (
              <div className="space-y-2">
                {["s1", "s2", "s3"].map((k) => (
                  <Skeleton key={k} className="h-8 w-full" />
                ))}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
                    <p className="text-xs text-muted-foreground">
                      Total Drives
                    </p>
                    <p className="text-2xl font-bold font-display text-primary">
                      {drives.length}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-accent/5 border border-accent/10">
                    <p className="text-xs text-muted-foreground">
                      Success Rate
                    </p>
                    <p className="text-2xl font-bold font-display">
                      {placementRate}%
                    </p>
                  </div>
                </div>
                <div className="space-y-3 pt-2">
                  <MiniStatBar
                    label="Completed Drives"
                    value={completedDrives}
                    max={drives.length || 1}
                    color="bg-primary"
                  />
                  <MiniStatBar
                    label="Upcoming Drives"
                    value={drives.length - completedDrives}
                    max={drives.length || 1}
                    color="bg-accent"
                  />
                  <div className="p-3 rounded-lg bg-muted/40">
                    <p className="text-xs text-muted-foreground">
                      Total Positions
                    </p>
                    <p className="text-xl font-bold">
                      {drives
                        .reduce((s, d) => s + Number(d.positions), 0)
                        .toLocaleString()}
                    </p>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Course Completion */}
        <Card data-ocid="report-completion">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <BarChart2 className="h-4 w-4 text-primary" />
                Course Completion Rate
              </CardTitle>
              <div className="flex gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs"
                  onClick={() => handleDownload("Course Completion", "CSV")}
                  data-ocid="report-completion-csv"
                >
                  <Download className="h-3 w-3 mr-1" />
                  CSV
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs"
                  onClick={() => handleDownload("Course Completion", "PDF")}
                  data-ocid="report-completion-pdf"
                >
                  <FileText className="h-3 w-3 mr-1" />
                  PDF
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {loadCourses ? (
              <div className="space-y-2">
                {["s1", "s2", "s3"].map((k) => (
                  <Skeleton key={k} className="h-8 w-full" />
                ))}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
                    <p className="text-xs text-muted-foreground">
                      Total Courses
                    </p>
                    <p className="text-2xl font-bold font-display text-primary">
                      {courses.length}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-accent/5 border border-accent/10">
                    <p className="text-xs text-muted-foreground">Avg Fill %</p>
                    <p className="text-2xl font-bold font-display">
                      {completionRates.length > 0
                        ? Math.round(
                            completionRates.reduce((s, c) => s + c.rate, 0) /
                              completionRates.length,
                          )
                        : 0}
                      %
                    </p>
                  </div>
                </div>
                <div className="space-y-2 pt-2">
                  {completionRates.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No courses yet
                    </p>
                  ) : (
                    completionRates.map((cr) => (
                      <MiniStatBar
                        key={cr.label}
                        label={cr.label}
                        value={cr.rate}
                        max={maxRate}
                        color="bg-primary"
                      />
                    ))
                  )}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
