import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  BookOpen,
  Briefcase,
  FileText,
  GraduationCap,
  Loader2,
  MapPin,
  Pencil,
  Plus,
  Trash2,
  Upload,
  User,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Education, Experience } from "../../backend.d";
import {
  useAddEducation,
  useAddExperience,
  useDeleteEducation,
  useDeleteExperience,
  useGetEducations,
  useGetExperiences,
  useGetJobSeekerProfile,
  useUpdateUser,
  useUpsertJobSeekerProfile,
} from "../../hooks/useBackend";
import { useAuthStore } from "../../store/auth";

// ─── India states ───────────────────────────────────────────────
const INDIA_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

function fmtDate(ts: bigint | undefined): string {
  if (!ts) return "";
  return new Date(Number(ts)).toLocaleDateString("en-IN", {
    month: "short",
    year: "numeric",
  });
}

// ─── Experience Dialog ──────────────────────────────────────────
type ExpForm = {
  company: string;
  title: string;
  desc: string;
  start: string;
  end: string;
  isCurrent: boolean;
};
const BLANK_EXP: ExpForm = {
  company: "",
  title: "",
  desc: "",
  start: "",
  end: "",
  isCurrent: false,
};

function ExperienceDialog({
  open,
  onClose,
  initial,
  onSave,
  isSaving,
}: {
  open: boolean;
  onClose: () => void;
  initial?: ExpForm;
  onSave: (f: ExpForm) => void;
  isSaving: boolean;
}) {
  const [f, setF] = useState<ExpForm>(initial ?? BLANK_EXP);
  const upd =
    (k: keyof ExpForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setF((p) => ({ ...p, [k]: e.target.value }));

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display">
            {initial ? "Edit Experience" : "Add Experience"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-3 py-2">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Company Name *</Label>
              <Input
                value={f.company}
                onChange={upd("company")}
                data-ocid="exp-company"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Position Title *</Label>
              <Input
                value={f.title}
                onChange={upd("title")}
                data-ocid="exp-title"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Start Date *</Label>
              <Input
                type="date"
                value={f.start}
                onChange={upd("start")}
                data-ocid="exp-start"
              />
            </div>
            <div className="space-y-1.5">
              <Label>End Date</Label>
              <Input
                type="date"
                value={f.end}
                onChange={upd("end")}
                disabled={f.isCurrent}
                data-ocid="exp-end"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="exp-current"
              checked={f.isCurrent}
              onCheckedChange={(v) =>
                setF((p) => ({ ...p, isCurrent: !!v, end: v ? "" : p.end }))
              }
              data-ocid="exp-current"
            />
            <Label htmlFor="exp-current" className="text-sm cursor-pointer">
              This is my current position
            </Label>
          </div>
          <div className="space-y-1.5">
            <Label>Description</Label>
            <Textarea
              value={f.desc}
              onChange={upd("desc")}
              rows={3}
              data-ocid="exp-desc"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isSaving}
          >
            Cancel
          </Button>
          <Button
            type="button"
            className="btn-primary"
            disabled={isSaving || !f.company || !f.title || !f.start}
            onClick={() => onSave(f)}
            data-ocid="exp-save"
          >
            {isSaving ? (
              <Loader2 size={14} className="animate-spin mr-1" />
            ) : null}
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Education Dialog ───────────────────────────────────────────
type EduForm = {
  institution: string;
  degree: string;
  desc: string;
  start: string;
  end: string;
};
const BLANK_EDU: EduForm = {
  institution: "",
  degree: "",
  desc: "",
  start: "",
  end: "",
};

function EducationDialog({
  open,
  onClose,
  initial,
  onSave,
  isSaving,
}: {
  open: boolean;
  onClose: () => void;
  initial?: EduForm;
  onSave: (f: EduForm) => void;
  isSaving: boolean;
}) {
  const [f, setF] = useState<EduForm>(initial ?? BLANK_EDU);
  const upd =
    (k: keyof EduForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setF((p) => ({ ...p, [k]: e.target.value }));

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display">
            {initial ? "Edit Education" : "Add Education"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-3 py-2">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Institution *</Label>
              <Input
                value={f.institution}
                onChange={upd("institution")}
                data-ocid="edu-institution"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Degree *</Label>
              <Input
                value={f.degree}
                onChange={upd("degree")}
                data-ocid="edu-degree"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Start Date *</Label>
              <Input
                type="date"
                value={f.start}
                onChange={upd("start")}
                data-ocid="edu-start"
              />
            </div>
            <div className="space-y-1.5">
              <Label>End Date</Label>
              <Input
                type="date"
                value={f.end}
                onChange={upd("end")}
                data-ocid="edu-end"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Description</Label>
            <Textarea
              value={f.desc}
              onChange={upd("desc")}
              rows={3}
              data-ocid="edu-desc"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isSaving}
          >
            Cancel
          </Button>
          <Button
            type="button"
            className="btn-primary"
            disabled={isSaving || !f.institution || !f.degree || !f.start}
            onClick={() => onSave(f)}
            data-ocid="edu-save"
          >
            {isSaving ? (
              <Loader2 size={14} className="animate-spin mr-1" />
            ) : null}
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Experience Entry ───────────────────────────────────────────
function ExpEntry({
  exp,
  onDelete,
}: { exp: Experience; onDelete: () => void }) {
  return (
    <div
      className="flex items-start gap-3 p-3 bg-muted/20 rounded-md border border-border/50"
      data-ocid={`exp-entry-${exp.id}`}
    >
      <div className="w-8 h-8 bg-primary/10 rounded-md flex items-center justify-center shrink-0">
        <Briefcase size={14} className="text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm text-foreground">
          {exp.positionTitle}
        </p>
        <p className="text-xs text-muted-foreground">{exp.companyName}</p>
        <p className="text-xs text-muted-foreground mt-0.5">
          {fmtDate(exp.startDate)} —{" "}
          {exp.isCurrent ? "Present" : fmtDate(exp.endDate)}
        </p>
        {exp.description && (
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
            {exp.description}
          </p>
        )}
      </div>
      <div className="flex gap-1 shrink-0">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-7 w-7 p-0 text-destructive hover:bg-destructive/10"
          onClick={onDelete}
          aria-label="Delete experience"
        >
          <Trash2 size={13} />
        </Button>
      </div>
    </div>
  );
}

// ─── Education Entry ────────────────────────────────────────────
function EduEntry({ edu, onDelete }: { edu: Education; onDelete: () => void }) {
  return (
    <div
      className="flex items-start gap-3 p-3 bg-muted/20 rounded-md border border-border/50"
      data-ocid={`edu-entry-${edu.id}`}
    >
      <div className="w-8 h-8 bg-accent/10 rounded-md flex items-center justify-center shrink-0">
        <GraduationCap size={14} className="text-accent" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm text-foreground">{edu.degree}</p>
        <p className="text-xs text-muted-foreground">{edu.institution}</p>
        <p className="text-xs text-muted-foreground mt-0.5">
          {fmtDate(edu.startDate)} — {fmtDate(edu.endDate)}
        </p>
        {edu.description && (
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
            {edu.description}
          </p>
        )}
      </div>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="h-7 w-7 p-0 text-destructive hover:bg-destructive/10 shrink-0"
        onClick={onDelete}
        aria-label="Delete education"
      >
        <Trash2 size={13} />
      </Button>
    </div>
  );
}

// ─── Main Page ──────────────────────────────────────────────────
export default function JobSeekerProfile() {
  const { user, updateUser: storeUpdate } = useAuthStore();
  const { data: profile } = useGetJobSeekerProfile(user?.id ?? "");
  const { data: experiences } = useGetExperiences(user?.id ?? "");
  const { data: educations } = useGetEducations(user?.id ?? "");
  const { mutateAsync: updateUser, isPending: isSavingUser } = useUpdateUser();
  const { mutateAsync: upsertProfile, isPending: isSavingProfile } =
    useUpsertJobSeekerProfile();
  const { mutateAsync: addExp, isPending: isAddingExp } = useAddExperience();
  const { mutateAsync: deleteExp } = useDeleteExperience();
  const { mutateAsync: addEdu, isPending: isAddingEdu } = useAddEducation();
  const { mutateAsync: deleteEdu } = useDeleteEducation();

  // Account tab
  const [firstName, setFirstName] = useState(user?.firstName ?? "");
  const [lastName, setLastName] = useState(user?.lastName ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [resumeFile, setResumeFile] = useState<string>(
    profile?.resumeUrl ?? "",
  );

  // Address tab
  const [country, setCountry] = useState(profile?.country ?? "India");
  const [state, setState] = useState(profile?.state ?? "");
  const [city, setCity] = useState(profile?.city ?? "");
  const [zipCode, setZipCode] = useState(profile?.zipCode ?? "");
  const [address, setAddress] = useState(profile?.address ?? "");

  // Dialog states
  const [expDialogOpen, setExpDialogOpen] = useState(false);
  const [eduDialogOpen, setEduDialogOpen] = useState(false);

  const isSaving = isSavingUser || isSavingProfile;

  const handleSaveAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const res = await updateUser({
      id: user.id,
      firstName,
      lastName,
      phone: phone || null,
    });
    if (res.__kind__ === "ok") {
      storeUpdate(res.ok);
      toast.success("Account details saved!");
    } else toast.error(res.err ?? "Failed to save");
  };

  const handleSaveAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    await upsertProfile({
      userId: user.id,
      profile: {
        userId: user.id,
        country,
        state,
        city,
        zipCode,
        address,
        createdAt: profile?.createdAt ?? BigInt(Date.now()),
        resumeUrl: resumeFile || profile?.resumeUrl,
      },
    });
    toast.success("Address saved!");
  };

  const handleAddExp = async (f: ExpForm) => {
    if (!user) return;
    await addExp({
      userId: user.id,
      companyName: f.company,
      positionTitle: f.title,
      description: f.desc || null,
      startDate: BigInt(new Date(f.start).getTime()),
      endDate: f.end && !f.isCurrent ? BigInt(new Date(f.end).getTime()) : null,
      isCurrent: f.isCurrent,
    });
    setExpDialogOpen(false);
    toast.success("Experience added!");
  };

  const handleAddEdu = async (f: EduForm) => {
    if (!user) return;
    await addEdu({
      userId: user.id,
      institution: f.institution,
      degree: f.degree,
      description: f.desc || null,
      startDate: BigInt(new Date(f.start).getTime()),
      endDate: f.end ? BigInt(new Date(f.end).getTime()) : null,
    });
    setEduDialogOpen(false);
    toast.success("Education added!");
  };

  return (
    <div className="space-y-6 max-w-3xl" data-ocid="jobseeker-profile">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
          <User size={24} className="text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            {user ? `${user.firstName} ${user.lastName}` : "My Profile"}
          </h1>
          <p className="text-muted-foreground text-sm">{user?.email}</p>
        </div>
      </div>

      <Tabs defaultValue="account" data-ocid="profile-tabs">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger
            value="account"
            className="flex items-center gap-1.5 text-xs"
          >
            <User size={13} /> Account
          </TabsTrigger>
          <TabsTrigger
            value="address"
            className="flex items-center gap-1.5 text-xs"
          >
            <MapPin size={13} /> Address
          </TabsTrigger>
          <TabsTrigger
            value="experience"
            className="flex items-center gap-1.5 text-xs"
          >
            <Briefcase size={13} /> Experience
          </TabsTrigger>
          <TabsTrigger
            value="education"
            className="flex items-center gap-1.5 text-xs"
          >
            <BookOpen size={13} /> Education
          </TabsTrigger>
        </TabsList>

        {/* Account Details Tab */}
        <TabsContent value="account" className="mt-6">
          <Card className="card-elevated">
            <CardHeader className="pb-3 border-b border-border">
              <CardTitle className="text-base font-display flex items-center gap-2">
                <User size={16} className="text-primary" /> Account Details
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-5">
              <form onSubmit={handleSaveAccount} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label>First Name *</Label>
                    <Input
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      data-ocid="js-firstname"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Last Name *</Label>
                    <Input
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      data-ocid="js-lastname"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label>Email Address *</Label>
                  <Input
                    value={user?.email ?? ""}
                    disabled
                    className="bg-muted text-muted-foreground"
                    readOnly
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Phone Number</Label>
                  <Input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 9800000000"
                    data-ocid="js-phone"
                  />
                </div>

                <Separator />
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <FileText size={14} className="text-primary" /> Resume
                  </Label>
                  <div className="flex items-center gap-3 p-3 border border-dashed border-border rounded-md bg-muted/20">
                    {resumeFile ? (
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <FileText size={16} className="text-primary shrink-0" />
                        <span className="text-sm text-foreground truncate">
                          {resumeFile}
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-6 px-2 text-xs text-muted-foreground ml-auto"
                          onClick={() => setResumeFile("")}
                        >
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <label
                        className="flex items-center gap-2 cursor-pointer"
                        htmlFor="resume-upload"
                      >
                        <Upload size={16} className="text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          Upload Resume (PDF, DOC)
                        </span>
                        <input
                          id="resume-upload"
                          type="file"
                          accept=".pdf,.doc,.docx"
                          className="sr-only"
                          data-ocid="js-resume-upload"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) setResumeFile(file.name);
                          }}
                        />
                      </label>
                    )}
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button
                    type="submit"
                    className="btn-primary"
                    disabled={isSaving}
                    data-ocid="js-save-account"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 size={14} className="animate-spin mr-1" />
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setFirstName(user?.firstName ?? "");
                      setLastName(user?.lastName ?? "");
                      setPhone(user?.phone ?? "");
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Address Tab */}
        <TabsContent value="address" className="mt-6">
          <Card className="card-elevated">
            <CardHeader className="pb-3 border-b border-border">
              <CardTitle className="text-base font-display flex items-center gap-2">
                <MapPin size={16} className="text-primary" /> Address Details
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-5">
              <form onSubmit={handleSaveAddress} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label>Country</Label>
                    <Select value={country} onValueChange={setCountry}>
                      <SelectTrigger data-ocid="js-country">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="India">India</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label>State</Label>
                    <Select value={state} onValueChange={setState}>
                      <SelectTrigger data-ocid="js-state">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        {INDIA_STATES.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label>City *</Label>
                    <Input
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Raipur"
                      data-ocid="js-city"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Zip Code</Label>
                    <Input
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      placeholder="492001"
                      data-ocid="js-zipcode"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label>Address</Label>
                  <Textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    rows={3}
                    placeholder="Street address..."
                    data-ocid="js-address"
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <Button
                    type="submit"
                    className="btn-primary"
                    disabled={isSavingProfile}
                    data-ocid="js-save-address"
                  >
                    {isSavingProfile ? (
                      <>
                        <Loader2 size={14} className="animate-spin mr-1" />
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Experience Tab */}
        <TabsContent value="experience" className="mt-6">
          <Card className="card-elevated">
            <CardHeader className="pb-3 border-b border-border">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-display flex items-center gap-2">
                  <Briefcase size={16} className="text-primary" /> Work
                  Experience
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">
                    {(experiences ?? []).length} entries
                  </Badge>
                  <Button
                    type="button"
                    size="sm"
                    className="btn-primary h-8 gap-1.5 text-xs"
                    onClick={() => setExpDialogOpen(true)}
                    data-ocid="add-experience-btn"
                  >
                    <Plus size={13} /> Add Experience
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-5">
              {(experiences ?? []).length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Briefcase size={32} className="mx-auto mb-3 opacity-30" />
                  <p className="text-sm font-medium">No experience added yet</p>
                  <p className="text-xs mt-1">
                    Click "Add Experience" to get started
                  </p>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="mt-4 gap-1.5"
                    onClick={() => setExpDialogOpen(true)}
                  >
                    <Plus size={13} /> Add First Experience
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {(experiences ?? []).map((exp) => (
                    <ExpEntry
                      key={exp.id}
                      exp={exp}
                      onDelete={() =>
                        user && deleteExp({ id: exp.id, userId: user.id })
                      }
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
          <ExperienceDialog
            open={expDialogOpen}
            onClose={() => setExpDialogOpen(false)}
            onSave={handleAddExp}
            isSaving={isAddingExp}
          />
        </TabsContent>

        {/* Education Tab */}
        <TabsContent value="education" className="mt-6">
          <Card className="card-elevated">
            <CardHeader className="pb-3 border-b border-border">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-display flex items-center gap-2">
                  <GraduationCap size={16} className="text-primary" /> Education
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">
                    {(educations ?? []).length} entries
                  </Badge>
                  <Button
                    type="button"
                    size="sm"
                    className="btn-primary h-8 gap-1.5 text-xs"
                    onClick={() => setEduDialogOpen(true)}
                    data-ocid="add-education-btn"
                  >
                    <Plus size={13} /> Add Education
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-5">
              {(educations ?? []).length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <GraduationCap
                    size={32}
                    className="mx-auto mb-3 opacity-30"
                  />
                  <p className="text-sm font-medium">No education added yet</p>
                  <p className="text-xs mt-1">
                    Click "Add Education" to get started
                  </p>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="mt-4 gap-1.5"
                    onClick={() => setEduDialogOpen(true)}
                  >
                    <Plus size={13} /> Add First Education
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {(educations ?? []).map((edu) => (
                    <EduEntry
                      key={edu.id}
                      edu={edu}
                      onDelete={() =>
                        user && deleteEdu({ id: edu.id, userId: user.id })
                      }
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
          <EducationDialog
            open={eduDialogOpen}
            onClose={() => setEduDialogOpen(false)}
            onSave={handleAddEdu}
            isSaving={isAddingEdu}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
