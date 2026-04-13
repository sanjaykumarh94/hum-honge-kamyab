import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Briefcase, Calendar, MapPin, Trophy, Users } from "lucide-react";
import {
  useGetPlacementDrives,
  useGetPlacementRecordsByStudent,
} from "../../hooks/useBackend";
import { useAuthStore } from "../../store/auth";
import type { PlacementDrive, PlacementRecord } from "../../types";

function formatDate(ts: bigint) {
  return new Date(Number(ts) / 1_000_000).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function StatusBadge({ status }: { status: string }) {
  const cfg: Record<string, string> = {
    upcoming: "bg-blue-100 text-blue-800 border-blue-300",
    ongoing: "bg-amber-100 text-amber-800 border-amber-300",
    completed: "bg-green-100 text-green-800 border-green-300",
    cancelled: "bg-destructive/10 text-destructive border-destructive/30",
    offered: "bg-green-100 text-green-800 border-green-300",
    shortlisted: "bg-amber-100 text-amber-800 border-amber-300",
    rejected: "bg-destructive/10 text-destructive border-destructive/30",
    pending: "bg-muted text-muted-foreground border-border",
  };
  const cls =
    cfg[status.toLowerCase()] ?? "bg-muted text-muted-foreground border-border";
  return (
    <Badge variant="outline" className={`text-xs capitalize ${cls}`}>
      {status}
    </Badge>
  );
}

function EmptySection({ message }: { message: string }) {
  return (
    <p className="py-8 text-center text-sm text-muted-foreground">{message}</p>
  );
}

export default function StudentPlacements() {
  const { user } = useAuthStore();
  const userId = user?.id ?? "";

  const { data: drives = [], isLoading: loadingDrives } =
    useGetPlacementDrives();
  const { data: records = [], isLoading: loadingRecords } =
    useGetPlacementRecordsByStudent(userId);

  const now = BigInt(Date.now()) * BigInt(1_000_000);
  const upcomingDrives = drives.filter(
    (d: PlacementDrive) =>
      d.status.toLowerCase() === "upcoming" || d.driveDate > now,
  );

  const offeredRecords = records.filter(
    (r: PlacementRecord) => r.offerStatus.toLowerCase() === "offered",
  );
  const shortlistedRecords = records.filter(
    (r: PlacementRecord) => r.offerStatus.toLowerCase() === "shortlisted",
  );

  const driveMap = new Map(drives.map((d: PlacementDrive) => [d.id, d]));

  return (
    <div className="space-y-8" data-ocid="student-placements">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">
          Placements
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Track placement drives, test results, and job offers
        </p>
      </div>

      {/* Placement Drives */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Users size={16} className="text-primary" />
            Placement Drives
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 pb-2">
          {loadingDrives ? (
            <div className="p-5 space-y-3">
              {["dr-0", "dr-1", "dr-2"].map((key) => (
                <Skeleton key={key} className="h-10 rounded" />
              ))}
            </div>
          ) : drives.length === 0 ? (
            <EmptySection message="No placement drives scheduled yet." />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead className="text-right">Positions</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {drives.map((drive: PlacementDrive) => (
                  <TableRow key={drive.id} data-ocid={`drive-row-${drive.id}`}>
                    <TableCell className="font-medium">
                      {drive.companyName}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {formatDate(drive.driveDate)}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin size={12} />
                        {drive.location}
                      </span>
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {Number(drive.positions)}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={drive.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* My Placement Record */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Trophy size={16} className="text-primary" />
            My Placement Record
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 pb-2">
          {loadingRecords ? (
            <div className="p-5 space-y-3">
              {["rec-0", "rec-1"].map((key) => (
                <Skeleton key={key} className="h-10 rounded" />
              ))}
            </div>
          ) : records.length === 0 ? (
            <EmptySection message="No placement records yet. Participate in drives to see your records here." />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Test Result</TableHead>
                  <TableHead>Offer Status</TableHead>
                  <TableHead>Offer Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {records.map((record: PlacementRecord) => {
                  const drive = driveMap.get(record.driveId) as
                    | PlacementDrive
                    | undefined;
                  return (
                    <TableRow
                      key={record.id}
                      data-ocid={`record-row-${record.id}`}
                    >
                      <TableCell className="font-medium">
                        {drive?.companyName ?? record.driveId}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {record.testResult ?? "—"}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={record.offerStatus} />
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground max-w-[200px] truncate">
                        {record.offerDetails ?? "—"}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Job Offers */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Briefcase size={16} className="text-primary" />
              Job Offers
            </CardTitle>
          </CardHeader>
          <CardContent>
            {offeredRecords.length === 0 ? (
              <EmptySection message="No job offers yet. Keep participating in placement drives!" />
            ) : (
              <div className="space-y-3">
                {offeredRecords.map((record: PlacementRecord) => {
                  const drive = driveMap.get(record.driveId) as
                    | PlacementDrive
                    | undefined;
                  return (
                    <div
                      key={record.id}
                      className="p-3 bg-green-50 border border-green-200 rounded-lg"
                    >
                      <p className="font-semibold text-sm">
                        {drive?.companyName ?? record.driveId}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {record.offerDetails ?? "Offer received"}
                      </p>
                      <StatusBadge status={record.offerStatus} />
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Calendar size={16} className="text-primary" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loadingDrives ? (
              <Skeleton className="h-24 rounded" />
            ) : upcomingDrives.length === 0 ? (
              <EmptySection message="No upcoming placement events." />
            ) : (
              <div className="space-y-3">
                {upcomingDrives.map((drive: PlacementDrive) => (
                  <div
                    key={drive.id}
                    className="p-3 bg-muted/40 border border-border rounded-lg"
                    data-ocid={`upcoming-drive-${drive.id}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-semibold text-sm">
                        {drive.companyName}
                      </p>
                      <StatusBadge status={drive.status} />
                    </div>
                    <div className="mt-1.5 space-y-0.5 text-xs text-muted-foreground">
                      <p className="flex items-center gap-1">
                        <Calendar size={11} /> {formatDate(drive.driveDate)}
                      </p>
                      <p className="flex items-center gap-1">
                        <MapPin size={11} /> {drive.location}
                      </p>
                      <p className="flex items-center gap-1">
                        <Users size={11} /> {Number(drive.positions)} positions
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {shortlistedRecords.length > 0 && (
        <Card className="border-amber-200 bg-amber-50/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2 text-amber-800">
              <Trophy size={16} />
              Shortlisted Applications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {shortlistedRecords.map((record: PlacementRecord) => {
                const drive = driveMap.get(record.driveId) as
                  | PlacementDrive
                  | undefined;
                return (
                  <div
                    key={record.id}
                    className="p-3 bg-amber-50 border border-amber-200 rounded-lg"
                  >
                    <p className="font-semibold text-sm">
                      {drive?.companyName ?? record.driveId}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Test Result: {record.testResult ?? "Pending"}
                    </p>
                    <StatusBadge status={record.offerStatus} />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
