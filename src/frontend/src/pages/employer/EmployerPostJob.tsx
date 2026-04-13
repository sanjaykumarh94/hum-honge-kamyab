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
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "@tanstack/react-router";
import { ArrowLeft, Briefcase, Building2, Loader2, MapPin } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useCreateJob } from "../../hooks/useBackend";
import { useAuthStore } from "../../store/auth";

type FormErrors = Partial<Record<string, string>>;

const JOB_TYPES = ["Full-Time", "Part-Time", "Contract", "Internship"];
const JOB_CATEGORIES = [
  "Technology",
  "Design",
  "Marketing",
  "Finance",
  "Operations",
  "Sales",
  "HR",
  "Engineering",
  "Manufacturing",
  "Education",
  "Healthcare",
  "Other",
];
const INDIA_STATES = [
  "Andhra Pradesh",
  "Bihar",
  "Chhattisgarh",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Tamil Nadu",
  "Telangana",
  "Uttar Pradesh",
  "West Bengal",
];

const INIT = {
  title: "",
  description: "",
  requirements: "",
  education: "",
  jobType: "Full-Time",
  category: "",
  companyName: "",
  companyEmail: "",
  companyWebsite: "",
  country: "India",
  state: "",
  city: "",
  zipCode: "",
  address: "",
};

function Field({
  label,
  error,
  children,
}: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className={error ? "text-destructive" : ""}>{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

export default function EmployerPostJob() {
  const { user } = useAuthStore();
  const router = useRouter();
  const { mutateAsync: createJob, isPending } = useCreateJob();
  const [form, setForm] = useState(INIT);
  const [errors, setErrors] = useState<FormErrors>({});

  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((p) => ({ ...p, [k]: e.target.value }));
  const setSelect = (k: keyof typeof form) => (v: string) =>
    setForm((p) => ({ ...p, [k]: v }));

  const validate = (): boolean => {
    const errs: FormErrors = {};
    if (!form.title.trim()) errs.title = "Title is required";
    if (!form.description.trim()) errs.description = "Description is required";
    if (!form.jobType) errs.jobType = "Job type is required";
    if (!form.category) errs.category = "Category is required";
    if (!form.companyName.trim()) errs.companyName = "Company name is required";
    if (!form.companyEmail.trim())
      errs.companyEmail = "Contact email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.companyEmail))
      errs.companyEmail = "Invalid email format";
    if (!form.city.trim()) errs.city = "City is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Not authenticated");
      return;
    }
    if (!validate()) {
      toast.error("Please fix the errors below");
      return;
    }

    const location = [form.city, form.state, form.country]
      .filter(Boolean)
      .join(", ");
    await createJob({
      employerId: user.id,
      title: form.title,
      description: form.description,
      requirements: form.requirements,
      education: form.education,
      location,
      jobType: form.jobType,
      category: form.category,
      companyName: form.companyName,
      companyEmail: form.companyEmail,
      companyWebsite: form.companyWebsite || null,
    });
    toast.success("Job posted successfully!");
    router.navigate({ to: "/employer" });
  };

  return (
    <div className="space-y-6 max-w-3xl" data-ocid="employer-post-job">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => router.navigate({ to: "/employer" })}
          aria-label="Back"
        >
          <ArrowLeft size={16} />
        </Button>
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            Post a Job
          </h1>
          <p className="text-muted-foreground text-sm">
            Create a new job listing for candidates
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {/* Job Information */}
        <Card className="card-elevated">
          <CardHeader className="pb-3 border-b border-border">
            <CardTitle className="text-sm font-display flex items-center gap-2">
              <Briefcase size={15} className="text-primary" /> Job Information
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-5 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Job Title *" error={errors.title}>
                <Input
                  value={form.title}
                  onChange={set("title")}
                  placeholder="e.g. Front-End Developer"
                  data-ocid="job-title"
                />
              </Field>
              <Field label="Job Type *" error={errors.jobType}>
                <Select
                  value={form.jobType}
                  onValueChange={setSelect("jobType")}
                >
                  <SelectTrigger data-ocid="job-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {JOB_TYPES.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </div>
            <Field label="Category *" error={errors.category}>
              <Select
                value={form.category}
                onValueChange={setSelect("category")}
              >
                <SelectTrigger data-ocid="job-category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {JOB_CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Description *" error={errors.description}>
              <Textarea
                value={form.description}
                onChange={set("description")}
                rows={5}
                placeholder="Describe the role, responsibilities, and what you're looking for..."
                data-ocid="job-description"
              />
            </Field>
            <Field label="Requirements" error={errors.requirements}>
              <Textarea
                value={form.requirements}
                onChange={set("requirements")}
                rows={4}
                placeholder="List required skills, experience, and qualifications..."
                data-ocid="job-requirements"
              />
            </Field>
            <Field label="Education Requirements" error={errors.education}>
              <Textarea
                value={form.education}
                onChange={set("education")}
                rows={2}
                placeholder="e.g. Bachelor's degree in Computer Science or related field"
                data-ocid="job-education"
              />
            </Field>
          </CardContent>
        </Card>

        {/* Company Information */}
        <Card className="card-elevated">
          <CardHeader className="pb-3 border-b border-border">
            <CardTitle className="text-sm font-display flex items-center gap-2">
              <Building2 size={15} className="text-primary" /> Company
              Information
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-5 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Company Name *" error={errors.companyName}>
                <Input
                  value={form.companyName}
                  onChange={set("companyName")}
                  placeholder="e.g. Shree Cement Ltd."
                  data-ocid="company-name"
                />
              </Field>
              <Field label="Contact Email *" error={errors.companyEmail}>
                <Input
                  type="email"
                  value={form.companyEmail}
                  onChange={set("companyEmail")}
                  placeholder="hr@company.com"
                  data-ocid="company-email"
                />
              </Field>
            </div>
            <Field label="Company Website">
              <Input
                value={form.companyWebsite}
                onChange={set("companyWebsite")}
                placeholder="https://www.company.com"
                data-ocid="company-website"
              />
            </Field>
          </CardContent>
        </Card>

        {/* Location */}
        <Card className="card-elevated">
          <CardHeader className="pb-3 border-b border-border">
            <CardTitle className="text-sm font-display flex items-center gap-2">
              <MapPin size={15} className="text-primary" /> Location
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-5 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Country">
                <Select
                  value={form.country}
                  onValueChange={setSelect("country")}
                >
                  <SelectTrigger data-ocid="job-country">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="India">India</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field label="State">
                <Select value={form.state} onValueChange={setSelect("state")}>
                  <SelectTrigger data-ocid="job-state">
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
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="City *" error={errors.city}>
                <Input
                  value={form.city}
                  onChange={set("city")}
                  placeholder="e.g. Raipur"
                  data-ocid="job-city"
                />
              </Field>
              <Field label="Zip Code">
                <Input
                  value={form.zipCode}
                  onChange={set("zipCode")}
                  placeholder="492001"
                  data-ocid="job-zipcode"
                />
              </Field>
            </div>
            <Field label="Address">
              <Input
                value={form.address}
                onChange={set("address")}
                placeholder="Street address..."
                data-ocid="job-address"
              />
            </Field>
          </CardContent>
        </Card>

        <Separator />

        <div className="flex gap-3 pb-6">
          <Button
            type="submit"
            className="btn-primary"
            disabled={isPending}
            data-ocid="post-job-submit"
          >
            {isPending ? (
              <>
                <Loader2 size={14} className="animate-spin mr-2" />
                Posting...
              </>
            ) : (
              "Post Job"
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.navigate({ to: "/employer" })}
            disabled={isPending}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
