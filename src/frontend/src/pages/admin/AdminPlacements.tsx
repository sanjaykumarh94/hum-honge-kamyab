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
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  useCreatePlacementDrive,
  useGetPlacementDrives,
} from "../../hooks/useBackend";

interface DriveForm {
  companyName: string;
  location: string;
  driveDate: string;
  positions: string;
  description: string;
}

const EMPTY_FORM: DriveForm = {
  companyName: "",
  location: "",
  driveDate: "",
  positions: "",
  description: "",
};

function DriveStatusBadge({
  status,
  driveDate,
}: { status: string; driveDate: bigint }) {
  const isUpcoming = Number(driveDate) > Date.now();
  if (isUpcoming) {
    return (
      <Badge className="bg-accent/15 text-foreground border-accent/30 border">
        Upcoming
      </Badge>
    );
  }
  if (status === "completed") {
    return (
      <Badge variant="outline" className="border-border">
        Completed
      </Badge>
    );
  }
  return <Badge variant="secondary">{status}</Badge>;
}

function SkeletonRows() {
  return (
    <>
      {["r1", "r2", "r3"].map((k) => (
        <TableRow key={k}>
          {["c1", "c2", "c3", "c4", "c5"].map((c) => (
            <TableCell key={c}>
              <Skeleton className="h-5 w-full" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}

export default function AdminPlacements() {
  const { data: drives = [], isLoading } = useGetPlacementDrives();
  const createDrive = useCreatePlacementDrive();

  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState<DriveForm>(EMPTY_FORM);

  const now = Date.now();
  const upcoming = drives
    .filter((d) => Number(d.driveDate) > now)
    .sort((a, b) => Number(a.driveDate) - Number(b.driveDate));
  const all = [...drives].sort(
    (a, b) => Number(b.driveDate) - Number(a.driveDate),
  );

  async function handleSave() {
    await createDrive.mutateAsync({
      companyName: form.companyName,
      location: form.location,
      driveDate: BigInt(new Date(form.driveDate).getTime()),
      positions: BigInt(Number(form.positions)),
      description: form.description,
    });
    toast.success("Placement drive added successfully");
    setShowAdd(false);
    setForm(EMPTY_FORM);
  }

  const formValid =
    form.companyName &&
    form.location &&
    form.driveDate &&
    form.positions &&
    form.description;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display">Placement Drives</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {upcoming.length} upcoming · {drives.length} total
          </p>
        </div>
        <Button
          type="button"
          onClick={() => setShowAdd(true)}
          data-ocid="add-drive-btn"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Placement Drive
        </Button>
      </div>

      {/* Upcoming section */}
      <section>
        <h2 className="text-base font-semibold mb-3 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-primary inline-block" />
          Upcoming Placement Drives
        </h2>
        <div className="rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40">
                <TableHead>#</TableHead>
                <TableHead>Company Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="text-right">Positions</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <SkeletonRows />
              ) : upcoming.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-10 text-muted-foreground"
                  >
                    No upcoming placement drives scheduled
                  </TableCell>
                </TableRow>
              ) : (
                upcoming.map((drive, idx) => (
                  <TableRow key={drive.id} data-ocid="drive-row">
                    <TableCell className="text-muted-foreground text-sm">
                      {idx + 1}
                    </TableCell>
                    <TableCell className="font-medium">
                      {drive.companyName}
                    </TableCell>
                    <TableCell className="text-sm">
                      {new Date(Number(drive.driveDate)).toLocaleDateString(
                        "en-IN",
                        { day: "numeric", month: "short", year: "numeric" },
                      )}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {drive.location}
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      {drive.positions.toString()}
                    </TableCell>
                    <TableCell>
                      <DriveStatusBadge
                        status={drive.status}
                        driveDate={drive.driveDate}
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </section>

      {/* All drives */}
      <section>
        <h2 className="text-base font-semibold mb-3 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-muted-foreground inline-block" />
          All Placement Drives
        </h2>
        <div className="rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40">
                <TableHead>#</TableHead>
                <TableHead>Company Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="text-right">Positions</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <SkeletonRows />
              ) : all.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-10 text-muted-foreground"
                  >
                    No placement drives yet — add one above
                  </TableCell>
                </TableRow>
              ) : (
                all.map((drive, idx) => (
                  <TableRow key={drive.id} data-ocid="all-drive-row">
                    <TableCell className="text-muted-foreground text-sm">
                      {idx + 1}
                    </TableCell>
                    <TableCell className="font-medium">
                      {drive.companyName}
                    </TableCell>
                    <TableCell className="text-sm">
                      {new Date(Number(drive.driveDate)).toLocaleDateString(
                        "en-IN",
                        { day: "numeric", month: "short", year: "numeric" },
                      )}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {drive.location}
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      {drive.positions.toString()}
                    </TableCell>
                    <TableCell>
                      <DriveStatusBadge
                        status={drive.status}
                        driveDate={drive.driveDate}
                      />
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground max-w-xs truncate">
                      {drive.description}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </section>

      {/* Add Dialog */}
      <Dialog open={showAdd} onOpenChange={(o) => !o && setShowAdd(false)}>
        <DialogContent data-ocid="drive-form-dialog">
          <DialogHeader>
            <DialogTitle>Add Placement Drive</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="df-company">Company Name *</Label>
              <Input
                id="df-company"
                placeholder="e.g. Tata Consultancy Services"
                value={form.companyName}
                onChange={(e) =>
                  setForm((p) => ({ ...p, companyName: e.target.value }))
                }
                data-ocid="drive-field-company"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="df-location">Location *</Label>
                <Input
                  id="df-location"
                  placeholder="e.g. Raipur, CG"
                  value={form.location}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, location: e.target.value }))
                  }
                  data-ocid="drive-field-location"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="df-date">Drive Date *</Label>
                <Input
                  id="df-date"
                  type="date"
                  value={form.driveDate}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, driveDate: e.target.value }))
                  }
                  data-ocid="drive-field-date"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="df-positions">Positions Available *</Label>
              <Input
                id="df-positions"
                type="number"
                placeholder="e.g. 25"
                value={form.positions}
                onChange={(e) =>
                  setForm((p) => ({ ...p, positions: e.target.value }))
                }
                data-ocid="drive-field-positions"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="df-desc">Description *</Label>
              <Textarea
                id="df-desc"
                placeholder="Details about the drive, eligibility, etc."
                value={form.description}
                onChange={(e) =>
                  setForm((p) => ({ ...p, description: e.target.value }))
                }
                rows={3}
                data-ocid="drive-field-description"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowAdd(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSave}
              disabled={createDrive.isPending || !formValid}
              data-ocid="drive-save-btn"
            >
              {createDrive.isPending ? "Saving…" : "Add Drive"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
