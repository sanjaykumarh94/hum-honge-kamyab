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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Loader2,
  MapPin,
  Search,
  Tag,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import type { Job } from "../../backend.d";
import {
  useApplyForJob,
  useGetApplicationsByApplicant,
  useGetJobs,
} from "../../hooks/useBackend";
import { useAuthStore } from "../../store/auth";

const JOB_CATEGORIES = [
  "All Categories",
  "Technology",
  "Design",
  "Marketing",
  "Finance",
  "Operations",
  "Sales",
  "HR",
  "Engineering",
  "Manufacturing",
];

const PAGE_SIZE_OPTIONS = ["10", "20", "50"];

function fmtDate(ts: bigint): string {
  return new Date(Number(ts)).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function JobTypeBadge({ type }: { type: string }) {
  const color =
    type === "Full-Time"
      ? "bg-primary/10 text-primary"
      : type === "Part-Time"
        ? "bg-accent/10 text-accent"
        : "bg-muted text-muted-foreground";
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium ${color}`}
    >
      {type}
    </span>
  );
}

// ─── Job Card ───────────────────────────────────────────────────
function JobCard({
  job,
  applied,
  onView,
}: {
  job: Job;
  applied: boolean;
  onView: (j: Job) => void;
}) {
  return (
    <Card
      className="card-elevated hover:shadow-md transition-smooth cursor-pointer"
      onClick={() => onView(job)}
      data-ocid={`job-card-${job.id}`}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-foreground text-sm">
                {job.title}
              </h3>
              {applied && (
                <Badge className="bg-primary/10 text-primary border-0 text-[10px] gap-0.5">
                  <CheckCircle2 size={9} /> Applied
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-3 mt-1 flex-wrap">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Building2 size={11} /> {job.companyName}
              </span>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <MapPin size={11} /> {job.location}
              </span>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Calendar size={11} /> {fmtDate(job.createdAt)}
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-2 flex-wrap">
              <JobTypeBadge type={job.jobType} />
              <Badge variant="outline" className="text-[10px]">
                {job.category}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
              {job.description}
            </p>
          </div>
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="shrink-0 text-xs"
            onClick={(e) => {
              e.stopPropagation();
              onView(job);
            }}
            data-ocid={`view-job-${job.id}`}
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Job Detail Sheet ────────────────────────────────────────────
function JobDetailSheet({
  job,
  applied,
  onClose,
  onApply,
  isApplying,
}: {
  job: Job | null;
  applied: boolean;
  onClose: () => void;
  onApply: (jobId: string) => void;
  isApplying: boolean;
}) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  if (!job) return null;

  return (
    <>
      <Sheet open={!!job} onOpenChange={(o) => !o && onClose()}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-xl overflow-y-auto"
          data-ocid="job-detail-sheet"
        >
          <SheetHeader className="pb-4 border-b border-border">
            <div className="space-y-1">
              <SheetTitle className="font-display text-lg">
                {job.title}
              </SheetTitle>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Building2 size={13} /> {job.companyName}
                </span>
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <MapPin size={13} /> {job.location}
                </span>
              </div>
              <div className="flex items-center gap-2 flex-wrap pt-1">
                <JobTypeBadge type={job.jobType} />
                <Badge variant="outline" className="text-xs">
                  <Tag size={10} className="mr-1" />
                  {job.category}
                </Badge>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Calendar size={11} /> Published {fmtDate(job.createdAt)}
                </span>
              </div>
            </div>
          </SheetHeader>

          <div className="py-5 space-y-5">
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-2">
                About the Role
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {job.description}
              </p>
            </div>
            {job.requirements && (
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-2">
                  Requirements
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {job.requirements}
                </p>
              </div>
            )}
            {job.education && (
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-2">
                  Education
                </h4>
                <p className="text-sm text-muted-foreground">{job.education}</p>
              </div>
            )}
            <div className="bg-muted/30 rounded-md p-4 space-y-2">
              <h4 className="text-sm font-semibold text-foreground">
                Company Details
              </h4>
              <p className="text-xs text-muted-foreground">
                {job.companyEmail}
              </p>
              {job.companyWebsite && (
                <a
                  href={job.companyWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:underline"
                >
                  {job.companyWebsite}
                </a>
              )}
            </div>
          </div>

          <div className="border-t border-border pt-4 flex gap-3">
            {applied ? (
              <Button type="button" disabled className="flex-1 gap-2">
                <CheckCircle2 size={14} /> Already Applied
              </Button>
            ) : (
              <Button
                type="button"
                className="btn-primary flex-1"
                onClick={() => setConfirmOpen(true)}
                data-ocid={`sheet-apply-${job.id}`}
              >
                Apply Now
              </Button>
            )}
            <Button type="button" variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Confirm Apply Dialog */}
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-display">
              Confirm Application
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground py-2">
            Apply for <strong className="text-foreground">{job.title}</strong>{" "}
            at <strong className="text-foreground">{job.companyName}</strong>?
          </p>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setConfirmOpen(false)}
              disabled={isApplying}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="btn-primary"
              disabled={isApplying}
              data-ocid="confirm-apply-btn"
              onClick={() => {
                onApply(job.id);
                setConfirmOpen(false);
              }}
            >
              {isApplying ? (
                <Loader2 size={14} className="animate-spin mr-1" />
              ) : null}
              Confirm Apply
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

// ─── Main Page ──────────────────────────────────────────────────
export default function JobSeekerJobs() {
  const { user } = useAuthStore();
  const { data: jobs, isLoading } = useGetJobs();
  const { data: myApps } = useGetApplicationsByApplicant(user?.id ?? "");
  const { mutateAsync: apply, isPending: isApplying } = useApplyForJob();

  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [jobType, setJobType] = useState("all");
  const [category, setCategory] = useState("All Categories");
  const [pageSize, setPageSize] = useState(20);
  const [page, setPage] = useState(1);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const appliedJobIds = useMemo(
    () => new Set((myApps ?? []).map((a) => a.jobId)),
    [myApps],
  );

  const filtered = useMemo(() => {
    return (jobs ?? []).filter((j) => {
      const q = search.toLowerCase();
      const matchQ =
        !search ||
        j.title.toLowerCase().includes(q) ||
        j.companyName.toLowerCase().includes(q);
      const matchType =
        jobType === "all" ||
        j.jobType.toLowerCase().replace("-", "") === jobType.replace("-", "");
      const matchLoc =
        !locationFilter ||
        j.location.toLowerCase().includes(locationFilter.toLowerCase());
      const matchCat = category === "All Categories" || j.category === category;
      return matchQ && matchType && matchLoc && matchCat;
    });
  }, [jobs, search, jobType, locationFilter, category]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleApply = async (jobId: string) => {
    if (!user) {
      toast.error("Please login first");
      return;
    }
    const res = await apply({ jobId, applicantId: user.id, resumeUrl: null });
    if (res.__kind__ === "ok") {
      toast.success("Application submitted successfully!");
      setSelectedJob(null);
    } else {
      toast.error(res.err ?? "Application failed");
    }
  };

  return (
    <div className="space-y-5" data-ocid="jobseeker-jobs">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">
          Job Search
        </h1>
        <p className="text-muted-foreground text-sm">
          Find and apply for opportunities across Chhattisgarh
        </p>
      </div>

      {/* Filters */}
      <div
        className="card-elevated p-3 flex flex-wrap gap-3 items-center"
        data-ocid="jobs-filter-bar"
      >
        <div className="relative flex-1 min-w-48">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search job title or company..."
            className="pl-8 h-9"
            data-ocid="jobs-search"
          />
        </div>
        <div className="relative min-w-36">
          <MapPin
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground z-10"
          />
          <Input
            value={locationFilter}
            onChange={(e) => {
              setLocationFilter(e.target.value);
              setPage(1);
            }}
            placeholder="Location"
            className="pl-8 h-9"
            data-ocid="jobs-location"
          />
        </div>
        <Select
          value={jobType}
          onValueChange={(v) => {
            setJobType(v);
            setPage(1);
          }}
        >
          <SelectTrigger
            className="w-36 h-9 text-xs"
            data-ocid="jobs-type-filter"
          >
            <SelectValue placeholder="Job Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Full-Time">Full-Time</SelectItem>
            <SelectItem value="Part-Time">Part-Time</SelectItem>
            <SelectItem value="Contract">Contract</SelectItem>
            <SelectItem value="Internship">Internship</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={category}
          onValueChange={(v) => {
            setCategory(v);
            setPage(1);
          }}
        >
          <SelectTrigger
            className="w-40 h-9 text-xs"
            data-ocid="jobs-category-filter"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {JOB_CATEGORIES.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {isLoading ? (
            "Loading jobs..."
          ) : (
            <>
              Showing{" "}
              <strong>
                {(page - 1) * pageSize + 1}–
                {Math.min(page * pageSize, filtered.length)}
              </strong>{" "}
              of <strong>{filtered.length}</strong> jobs
            </>
          )}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Items per page:</span>
          <Select
            value={String(pageSize)}
            onValueChange={(v) => {
              setPageSize(Number(v));
              setPage(1);
            }}
          >
            <SelectTrigger
              className="w-16 h-7 text-xs"
              data-ocid="jobs-pagesize"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PAGE_SIZE_OPTIONS.map((v) => (
                <SelectItem key={v} value={v}>
                  {v}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Job list */}
      <div className="space-y-3">
        {isLoading ? (
          ["s1", "s2", "s3", "s4"].map((s) => (
            <Skeleton key={s} className="h-28 w-full rounded-md" />
          ))
        ) : paginated.length === 0 ? (
          <div
            className="text-center py-16 text-muted-foreground bg-muted/20 rounded-md border border-dashed border-border"
            data-ocid="jobs-empty"
          >
            <Briefcase size={36} className="mx-auto mb-3 opacity-30" />
            <p className="font-medium">No jobs found</p>
            <p className="text-xs mt-1">Try adjusting your search filters</p>
          </div>
        ) : (
          paginated.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              applied={appliedJobIds.has(job.id)}
              onView={setSelectedJob}
            />
          ))
        )}
      </div>

      {/* Pagination */}
      {!isLoading && filtered.length > 0 && (
        <div
          className="flex items-center justify-end gap-2"
          data-ocid="jobs-pagination"
        >
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            aria-label="Previous page"
          >
            <ChevronLeft size={14} />
          </Button>
          <span className="text-xs text-muted-foreground px-2">
            Page {page} of {totalPages}
          </span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0"
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            aria-label="Next page"
          >
            <ChevronRight size={14} />
          </Button>
        </div>
      )}

      {/* Job Detail Sheet */}
      <JobDetailSheet
        job={selectedJob}
        applied={selectedJob ? appliedJobIds.has(selectedJob.id) : false}
        onClose={() => setSelectedJob(null)}
        onApply={handleApply}
        isApplying={isApplying}
      />
    </div>
  );
}
