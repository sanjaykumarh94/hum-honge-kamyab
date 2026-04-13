import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
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
import {
  Calendar,
  CheckCircle2,
  Eye,
  FileText,
  Search,
  UserCircle,
  Users,
  XCircle,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import type { Application } from "../../backend.d";
import {
  useGetApplicationsByJob,
  useGetJobsByEmployer,
  useUpdateApplicationStatus,
} from "../../hooks/useBackend";
import { useAuthStore } from "../../store/auth";

function fmtDate(ts: bigint): string {
  return new Date(Number(ts)).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function StatusBadge({ status }: { status: string }) {
  if (status === "shortlisted")
    return (
      <Badge className="bg-accent/10 text-accent border-0 text-xs">
        Shortlisted
      </Badge>
    );
  if (status === "rejected")
    return (
      <Badge variant="destructive" className="text-xs">
        Rejected
      </Badge>
    );
  if (status === "accepted")
    return (
      <Badge className="bg-primary/10 text-primary border-0 text-xs">
        Accepted
      </Badge>
    );
  return (
    <Badge variant="secondary" className="text-xs">
      Applied
    </Badge>
  );
}

// ─── Candidate Detail Sheet ──────────────────────────────────────
function CandidateSheet({
  app,
  jobTitle,
  onClose,
  onUpdateStatus,
  isUpdating,
}: {
  app: Application | null;
  jobTitle: string;
  onClose: () => void;
  onUpdateStatus: (id: string, status: string, jobId: string) => void;
  isUpdating: boolean;
}) {
  if (!app) return null;

  return (
    <Sheet open={!!app} onOpenChange={(o) => !o && onClose()}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md overflow-y-auto"
        data-ocid="candidate-detail-sheet"
      >
        <SheetHeader className="pb-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <UserCircle size={22} className="text-primary" />
            </div>
            <div>
              <SheetTitle className="font-display text-base">
                Candidate Details
              </SheetTitle>
              <p className="text-xs text-muted-foreground">{app.applicantId}</p>
            </div>
          </div>
        </SheetHeader>

        <div className="py-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-muted/30 rounded-md p-3">
              <p className="text-xs text-muted-foreground">Applied For</p>
              <p className="text-sm font-medium text-foreground mt-0.5">
                {jobTitle}
              </p>
            </div>
            <div className="bg-muted/30 rounded-md p-3">
              <p className="text-xs text-muted-foreground">Application Date</p>
              <p className="text-sm font-medium text-foreground mt-0.5 flex items-center gap-1">
                <Calendar size={12} />
                {fmtDate(app.appliedAt)}
              </p>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              Current Status
            </p>
            <StatusBadge status={app.status} />
          </div>

          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              Resume
            </p>
            {app.resumeUrl ? (
              <a
                href={app.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-primary hover:underline"
                data-ocid="candidate-resume-link"
              >
                <FileText size={14} /> Download Resume
              </a>
            ) : (
              <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                <FileText size={14} className="opacity-40" /> No resume uploaded
              </p>
            )}
          </div>

          <Separator />

          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
              Update Status
            </p>
            <div className="flex gap-2 flex-wrap">
              <Button
                type="button"
                size="sm"
                className="gap-1.5 bg-accent/10 text-accent hover:bg-accent/20 border-0"
                disabled={isUpdating || app.status === "shortlisted"}
                onClick={() => onUpdateStatus(app.id, "shortlisted", app.jobId)}
                data-ocid="shortlist-candidate"
              >
                <CheckCircle2 size={13} /> Shortlist
              </Button>
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="gap-1.5 text-destructive hover:bg-destructive/10 hover:text-destructive border-destructive/30"
                disabled={isUpdating || app.status === "rejected"}
                onClick={() => onUpdateStatus(app.id, "rejected", app.jobId)}
                data-ocid="reject-candidate"
              >
                <XCircle size={13} /> Reject
              </Button>
              <Button
                type="button"
                size="sm"
                className="gap-1.5 btn-primary"
                disabled={isUpdating || app.status === "accepted"}
                onClick={() => onUpdateStatus(app.id, "accepted", app.jobId)}
                data-ocid="accept-candidate"
              >
                <CheckCircle2 size={13} /> Accept
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

// ─── Main Page ──────────────────────────────────────────────────
export default function EmployerCandidates() {
  const { user } = useAuthStore();
  const { data: jobs } = useGetJobsByEmployer(user?.id ?? "");
  const [search, setSearch] = useState("");
  const [selectedJobId, setSelectedJobId] = useState("all");
  const [detailApp, setDetailApp] = useState<Application | null>(null);

  const { data: applications, isLoading } = useGetApplicationsByJob(
    selectedJobId !== "all" ? selectedJobId : "",
  );
  const { mutateAsync: updateStatus, isPending: isUpdating } =
    useUpdateApplicationStatus();

  const currentJobTitle = useMemo(() => {
    if (!selectedJobId || selectedJobId === "all") return "";
    return (jobs ?? []).find((j) => j.id === selectedJobId)?.title ?? "";
  }, [jobs, selectedJobId]);

  const detailJobTitle = useMemo(() => {
    if (!detailApp) return "";
    return (
      (jobs ?? []).find((j) => j.id === detailApp.jobId)?.title ??
      detailApp.jobId
    );
  }, [jobs, detailApp]);

  const filtered = useMemo(
    () =>
      (applications ?? []).filter(
        (a) =>
          !search || a.applicantId.toLowerCase().includes(search.toLowerCase()),
      ),
    [applications, search],
  );

  const handleUpdateStatus = async (
    id: string,
    status: string,
    jobId: string,
  ) => {
    const res = await updateStatus({ applicationId: id, status, jobId });
    if (res.__kind__ === "ok") {
      toast.success(`Candidate ${status} successfully`);
      setDetailApp(null);
    } else {
      toast.error(res.err ?? "Failed to update status");
    }
  };

  return (
    <div className="space-y-5" data-ocid="employer-candidates">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">
          Candidate List
        </h1>
        <p className="text-muted-foreground text-sm">
          Review and manage job applications
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-48">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by applicant ID..."
            className="pl-8 h-9"
            data-ocid="candidates-search"
          />
        </div>
        <Select value={selectedJobId} onValueChange={setSelectedJobId}>
          <SelectTrigger
            className="w-56 h-9 text-xs"
            data-ocid="candidates-job-filter"
          >
            <SelectValue placeholder="Filter by job" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Jobs</SelectItem>
            {(jobs ?? []).map((j) => (
              <SelectItem key={j.id} value={j.id}>
                {j.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Result count */}
      {selectedJobId !== "all" && !isLoading && (
        <p className="text-sm text-muted-foreground">
          <strong>{filtered.length}</strong> candidate
          {filtered.length !== 1 ? "s" : ""} for{" "}
          <strong className="text-foreground">{currentJobTitle}</strong>
        </p>
      )}

      {/* Table */}
      <div className="card-elevated overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead className="text-xs">Application Date</TableHead>
                <TableHead className="text-xs">Resume</TableHead>
                <TableHead className="text-xs">Candidate ID</TableHead>
                <TableHead className="text-xs">Job Title</TableHead>
                <TableHead className="text-xs">Status</TableHead>
                <TableHead className="text-xs text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                ["r1", "r2", "r3"].map((r) => (
                  <TableRow key={r}>
                    {["c1", "c2", "c3", "c4", "c5", "c6"].map((c) => (
                      <TableCell key={c}>
                        <Skeleton className="h-4 w-full" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : selectedJobId === "all" ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-14 text-muted-foreground"
                    data-ocid="candidates-empty-select"
                  >
                    <Users size={28} className="mx-auto mb-3 opacity-30" />
                    <p className="text-sm font-medium">
                      Select a job to view candidates
                    </p>
                    <p className="text-xs mt-1">
                      Use the filter above to choose a job posting
                    </p>
                  </TableCell>
                </TableRow>
              ) : filtered.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-14 text-muted-foreground"
                    data-ocid="candidates-empty"
                  >
                    <Users size={28} className="mx-auto mb-3 opacity-30" />
                    <p className="text-sm font-medium">No applications yet</p>
                    <p className="text-xs mt-1">
                      Share this job posting to attract candidates
                    </p>
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((app) => {
                  const jobName =
                    (jobs ?? []).find((j) => j.id === app.jobId)?.title ??
                    app.jobId;
                  return (
                    <TableRow
                      key={app.id}
                      className="hover:bg-muted/20 cursor-pointer"
                      onClick={() => setDetailApp(app)}
                      data-ocid={`candidate-row-${app.id}`}
                    >
                      <TableCell className="text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar size={10} /> {fmtDate(app.appliedAt)}
                        </span>
                      </TableCell>
                      <TableCell>
                        {app.resumeUrl ? (
                          <span className="flex items-center gap-1 text-xs text-primary">
                            <FileText size={12} /> Resumes.pdf
                          </span>
                        ) : (
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <FileText size={12} className="opacity-40" /> No
                            resume
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="font-medium text-xs max-w-32 truncate">
                        {app.applicantId}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground max-w-40 truncate">
                        {jobName}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={app.status} />
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground"
                          onClick={(e) => {
                            e.stopPropagation();
                            setDetailApp(app);
                          }}
                          aria-label="View candidate"
                          data-ocid={`view-candidate-${app.id}`}
                        >
                          <Eye size={13} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Candidate Detail Sheet */}
      <CandidateSheet
        app={detailApp}
        jobTitle={detailJobTitle}
        onClose={() => setDetailApp(null)}
        onUpdateStatus={handleUpdateStatus}
        isUpdating={isUpdating}
      />
    </div>
  );
}
