import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "@tanstack/react-router";
import {
  Briefcase,
  Building2,
  Calendar,
  Eye,
  MapPin,
  Pencil,
  Plus,
  Tag,
  Trash2,
  TrendingUp,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import type { Job } from "../../backend.d";
import {
  useDeleteJob,
  useGetApplicationsByJob,
  useGetJobsByEmployer,
} from "../../hooks/useBackend";
import { useAuthStore } from "../../store/auth";

// ─── Stat Card ──────────────────────────────────────────────────
function StatCard({
  icon,
  label,
  value,
  colorClass,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  colorClass: string;
}) {
  return (
    <Card className="card-elevated">
      <CardContent className="p-4 flex items-center gap-4">
        <div
          className={`w-11 h-11 rounded-lg flex items-center justify-center shrink-0 ${colorClass}`}
        >
          {icon}
        </div>
        <div>
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="text-2xl font-bold font-display text-foreground">
            {value}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function fmtDate(ts: bigint): string {
  return new Date(Number(ts)).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function StatusBadge({ count }: { count: bigint }) {
  const n = Number(count);
  return (
    <Badge
      variant={n > 0 ? "default" : "secondary"}
      className="text-xs tabular-nums"
    >
      {n} applicant{n !== 1 ? "s" : ""}
    </Badge>
  );
}

// ─── Job Detail Sheet ────────────────────────────────────────────
function JobDetailSheet({
  job,
  onClose,
}: { job: Job | null; onClose: () => void }) {
  const { data: apps } = useGetApplicationsByJob(job?.id ?? "");
  if (!job) return null;
  return (
    <Sheet open={!!job} onOpenChange={(o) => !o && onClose()}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-lg overflow-y-auto"
        data-ocid="employer-job-detail-sheet"
      >
        <SheetHeader className="pb-4 border-b border-border">
          <SheetTitle className="font-display">{job.title}</SheetTitle>
          <div className="flex items-center gap-3 flex-wrap text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Building2 size={12} />
              {job.companyName}
            </span>
            <span className="flex items-center gap-1">
              <MapPin size={12} />
              {job.location}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              {fmtDate(job.createdAt)}
            </span>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Badge variant="outline" className="text-xs">
              {job.jobType}
            </Badge>
            <Badge variant="outline" className="text-xs">
              <Tag size={10} className="mr-1" />
              {job.category}
            </Badge>
            <Badge className="text-xs">
              {job.applicationsCount.toString()} applicants
            </Badge>
          </div>
        </SheetHeader>
        <div className="py-4 space-y-4">
          <div>
            <h4 className="text-sm font-semibold mb-1.5">Description</h4>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
              {job.description}
            </p>
          </div>
          {job.requirements && (
            <div>
              <h4 className="text-sm font-semibold mb-1.5">Requirements</h4>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                {job.requirements}
              </p>
            </div>
          )}
          <div className="bg-muted/30 rounded-md p-3">
            <p className="text-xs font-semibold text-muted-foreground mb-1">
              Recent Applicants ({(apps ?? []).length})
            </p>
            {(apps ?? []).length === 0 ? (
              <p className="text-xs text-muted-foreground">
                No applications yet
              </p>
            ) : (
              <div className="space-y-1.5">
                {(apps ?? []).slice(0, 5).map((a) => (
                  <div
                    key={a.id}
                    className="flex items-center justify-between text-xs"
                  >
                    <span className="text-muted-foreground truncate">
                      {a.applicantId}
                    </span>
                    <Badge variant="secondary" className="text-[10px]">
                      {a.status}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

// ─── Main Page ──────────────────────────────────────────────────
export default function EmployerDashboard() {
  const { user } = useAuthStore();
  const router = useRouter();
  const { data: jobs, isLoading } = useGetJobsByEmployer(user?.id ?? "");
  const { mutateAsync: deleteJob } = useDeleteJob();

  const [search, setSearch] = useState("");
  const [detailJob, setDetailJob] = useState<Job | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Job | null>(null);

  const totalApps = useMemo(
    () => (jobs ?? []).reduce((a, j) => a + Number(j.applicationsCount), 0),
    [jobs],
  );
  const activeJobs = (jobs ?? []).length;

  const filtered = useMemo(
    () =>
      (jobs ?? []).filter(
        (j) =>
          !search ||
          j.title.toLowerCase().includes(search.toLowerCase()) ||
          j.companyName.toLowerCase().includes(search.toLowerCase()),
      ),
    [jobs, search],
  );

  const handleDelete = async () => {
    if (!deleteTarget || !user) return;
    const res = await deleteJob({ id: deleteTarget.id, employerId: user.id });
    if (res.__kind__ === "ok") toast.success("Job deleted");
    else toast.error("Failed to delete job");
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-6" data-ocid="employer-dashboard">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            Employer Dashboard
          </h1>
          <p className="text-muted-foreground text-sm">
            {user?.firstName} {user?.lastName} — {user?.email}
          </p>
        </div>
        <Button
          type="button"
          className="btn-primary gap-2"
          onClick={() => router.navigate({ to: "/employer/post-job" })}
          data-ocid="post-new-job-btn"
        >
          <Plus size={15} /> Post New Job
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {isLoading ? (
          ["s1", "s2", "s3"].map((s) => (
            <Skeleton key={s} className="h-20 rounded-md" />
          ))
        ) : (
          <>
            <StatCard
              icon={<Briefcase size={18} className="text-primary" />}
              label="Total Jobs Posted"
              value={activeJobs}
              colorClass="bg-primary/10"
            />
            <StatCard
              icon={<Users size={18} className="text-accent" />}
              label="Total Applications"
              value={totalApps}
              colorClass="bg-accent/10"
            />
            <StatCard
              icon={<TrendingUp size={18} className="text-chart-3" />}
              label="Active Listings"
              value={activeJobs}
              colorClass="bg-chart-3/10"
            />
          </>
        )}
      </div>

      {/* Jobs Table */}
      <Card className="card-elevated">
        <CardHeader className="pb-3 border-b border-border">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <CardTitle className="text-base font-display flex items-center gap-2">
              <Briefcase size={15} className="text-primary" /> Job Postings
            </CardTitle>
            <div className="relative w-56">
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search jobs..."
                className="h-8 text-xs pr-3 pl-8"
                data-ocid="employer-jobs-search"
              />
              <span
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  role="img"
                  aria-label="Search"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead className="text-xs">Job Title</TableHead>
                  <TableHead className="text-xs">Category</TableHead>
                  <TableHead className="text-xs">Location</TableHead>
                  <TableHead className="text-xs">Posted Date</TableHead>
                  <TableHead className="text-xs text-center">
                    Applications
                  </TableHead>
                  <TableHead className="text-xs">Type</TableHead>
                  <TableHead className="text-xs text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  ["r1", "r2", "r3"].map((r) => (
                    <TableRow key={r}>
                      {["c1", "c2", "c3", "c4", "c5", "c6", "c7"].map((c) => (
                        <TableCell key={c}>
                          <Skeleton className="h-4 w-full" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : filtered.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center py-12 text-muted-foreground"
                      data-ocid="employer-jobs-empty"
                    >
                      <Briefcase
                        size={28}
                        className="mx-auto mb-2 opacity-30"
                      />
                      <p className="text-sm">
                        {search
                          ? "No jobs match your search"
                          : "No jobs posted yet"}
                      </p>
                      {!search && (
                        <Button
                          type="button"
                          size="sm"
                          className="btn-primary mt-3 gap-1.5"
                          onClick={() =>
                            router.navigate({ to: "/employer/post-job" })
                          }
                        >
                          <Plus size={13} /> Post Your First Job
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((job) => (
                    <TableRow
                      key={job.id}
                      className="hover:bg-muted/20"
                      data-ocid={`employer-job-row-${job.id}`}
                    >
                      <TableCell className="font-medium text-sm">
                        {job.title}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {job.category}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin size={10} />
                          {job.location}
                        </span>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {fmtDate(job.createdAt)}
                      </TableCell>
                      <TableCell className="text-center">
                        <StatusBadge count={job.applicationsCount} />
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-[10px]">
                          {job.jobType}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground"
                            onClick={() => setDetailJob(job)}
                            aria-label="View job"
                            data-ocid={`view-job-${job.id}`}
                          >
                            <Eye size={13} />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground"
                            onClick={() =>
                              router.navigate({ to: "/employer/post-job" })
                            }
                            aria-label="Edit job"
                            data-ocid={`edit-job-${job.id}`}
                          >
                            <Pencil size={13} />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0 text-destructive hover:bg-destructive/10"
                            onClick={() => setDeleteTarget(job)}
                            aria-label="Delete job"
                            data-ocid={`delete-job-${job.id}`}
                          >
                            <Trash2 size={13} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Job Detail Sheet */}
      <JobDetailSheet job={detailJob} onClose={() => setDetailJob(null)} />

      {/* Delete Confirm Dialog */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(o) => !o && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display">
              Delete Job Posting?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <strong>{deleteTarget?.title}</strong>? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={handleDelete}
              data-ocid="confirm-delete-job"
            >
              Delete Job
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
