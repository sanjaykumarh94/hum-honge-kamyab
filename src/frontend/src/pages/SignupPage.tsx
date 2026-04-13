import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useRouter } from "@tanstack/react-router";
import { AlertCircle, CheckCircle2, Eye, EyeOff, Flame } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { UserRole } from "../backend.d";
import { useRegister } from "../hooks/useBackend";
import { useAuthStore } from "../store/auth";
import { ROLE_DASHBOARD } from "../types";

function hashPassword(password: string): string {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16);
}

const SIGNUP_ROLES: { value: UserRole; label: string }[] = [
  { value: UserRole.Student, label: "Student / छात्र" },
  { value: UserRole.JobSeeker, label: "Job Seeker / नौकरी खोजी" },
  { value: UserRole.Employer, label: "Employer / नियोक्ता" },
];

function PasswordStrength({ password }: { password: string }) {
  const checks = [
    { label: "8+ chars", met: password.length >= 8 },
    { label: "Uppercase", met: /[A-Z]/.test(password) },
    { label: "Lowercase", met: /[a-z]/.test(password) },
    { label: "Number/symbol", met: /[\d\W]/.test(password) },
  ];
  const score = checks.filter((c) => c.met).length;
  const barColors = [
    "bg-destructive",
    "bg-destructive",
    "bg-yellow-500",
    "bg-green-500",
    "bg-green-600",
  ];

  if (!password) return null;

  return (
    <div className="mt-2 space-y-1.5">
      <div className="flex gap-1">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={`bar-${i}`}
            className={`h-1 flex-1 rounded-full transition-all ${
              i < score ? barColors[score] : "bg-muted"
            }`}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-x-3 gap-y-0.5">
        {checks.map((c) => (
          <span
            key={c.label}
            className={`text-[11px] flex items-center gap-1 ${
              c.met ? "text-green-600" : "text-muted-foreground"
            }`}
          >
            {c.met ? (
              <CheckCircle2 size={10} />
            ) : (
              <span className="w-2.5 h-2.5 rounded-full border border-current inline-block" />
            )}
            {c.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function SignupPage() {
  const router = useRouter();
  const { mutateAsync: register, isPending } = useRegister();
  const { login: storeLogin } = useAuthStore();

  const [role, setRole] = useState<UserRole>(UserRole.Student);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  function validate(): boolean {
    const errs: Record<string, string> = {};
    if (!firstName.trim()) errs.firstName = "First name is required";
    if (!lastName.trim()) errs.lastName = "Last name is required";
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email))
      errs.email = "Valid email required";
    if (password.length < 8)
      errs.password = "Password must be at least 8 characters";
    if (password !== confirmPassword)
      errs.confirmPassword = "Passwords do not match";
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!validate()) return;

    try {
      const result = await register({
        email: email.trim().toLowerCase(),
        passwordHash: hashPassword(password),
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        role,
      });

      if (result.__kind__ === "ok") {
        storeLogin(result.ok);
        toast.success(
          `Welcome, ${result.ok.firstName}! Registration successful.`,
        );
        router.navigate({
          to: ROLE_DASHBOARD[result.ok.role as UserRole] ?? "/",
        });
      } else {
        setError(
          result.err ??
            "Registration failed. This email may already be registered.",
        );
      }
    } catch {
      setError("Registration failed. Please try again.");
    }
  }

  return (
    <div
      className="min-h-[calc(100vh-120px)] flex items-center justify-center py-10 px-4"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.97 0.01 37) 0%, oklch(0.95 0.02 240) 100%)",
      }}
    >
      <div className="w-full max-w-lg">
        {/* Branding */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary mb-3 shadow-lg">
            <Flame size={28} className="text-primary-foreground" />
          </div>
          <h1 className="font-display font-bold text-2xl text-foreground">
            Create Your Account
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            अपने आप को रजिस्टर करें — हम होंगे कामयाब
          </p>
        </div>

        <Card className="card-elevated shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl font-display">
              Create Account / खाता बनाएं
            </CardTitle>
            <CardDescription>
              Join as a Student, Job Seeker, or Employer
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Role Selector */}
            <div className="mb-5">
              <Label className="mb-2 block text-sm">Register as</Label>
              <Tabs value={role} onValueChange={(v) => setRole(v as UserRole)}>
                <TabsList className="flex w-full bg-muted p-1 rounded-md">
                  {SIGNUP_ROLES.map((tab) => (
                    <TabsTrigger
                      key={tab.value}
                      value={tab.value}
                      className="flex-1 text-xs px-2 py-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                      data-ocid={`signup-role-${tab.value.toLowerCase()}`}
                    >
                      {tab.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
              data-ocid="signup-form"
            >
              {/* Name row */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="signup-first-name">
                    First Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="signup-first-name"
                    placeholder="Ramesh"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    data-ocid="signup-first-name"
                  />
                  {fieldErrors.firstName && (
                    <p className="text-xs text-destructive">
                      {fieldErrors.firstName}
                    </p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="signup-last-name">
                    Last Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="signup-last-name"
                    placeholder="Kumar"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    data-ocid="signup-last-name"
                  />
                  {fieldErrors.lastName && (
                    <p className="text-xs text-destructive">
                      {fieldErrors.lastName}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <Label htmlFor="signup-email">
                  Email Address <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  data-ocid="signup-email"
                />
                {fieldErrors.email && (
                  <p className="text-xs text-destructive">
                    {fieldErrors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <Label htmlFor="signup-password">
                  Password <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="signup-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Min. 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-10"
                    required
                    autoComplete="new-password"
                    data-ocid="signup-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <PasswordStrength password={password} />
                {fieldErrors.password && (
                  <p className="text-xs text-destructive">
                    {fieldErrors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <Label htmlFor="signup-confirm-password">
                  Confirm Password <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="signup-confirm-password"
                    type={showConfirm ? "text" : "password"}
                    placeholder="Repeat your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pr-10"
                    required
                    autoComplete="new-password"
                    data-ocid="signup-confirm-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label={showConfirm ? "Hide password" : "Show password"}
                  >
                    {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {fieldErrors.confirmPassword && (
                  <p className="text-xs text-destructive">
                    {fieldErrors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Error */}
              {error && (
                <Alert variant="destructive" data-ocid="signup-error">
                  <AlertCircle size={16} />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Submit / Cancel */}
              <div className="flex gap-3 pt-1">
                <Button
                  type="submit"
                  className="flex-1 btn-primary"
                  disabled={isPending}
                  data-ocid="signup-submit"
                >
                  {isPending
                    ? "Creating Account..."
                    : "Create Account / खाता बनाएं"}
                </Button>
                <Link to="/">
                  <Button
                    type="button"
                    variant="outline"
                    data-ocid="signup-cancel"
                  >
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-4">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary font-semibold hover:underline"
                data-ocid="login-link"
              >
                Login / प्रवेश करें
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
