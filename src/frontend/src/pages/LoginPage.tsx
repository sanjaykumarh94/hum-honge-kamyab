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
import { AlertCircle, Eye, EyeOff, Flame, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { UserRole } from "../backend.d";
import { useLogin } from "../hooks/useBackend";
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

const ROLE_TABS: { value: UserRole; label: string }[] = [
  { value: UserRole.Admin, label: "Admin" },
  { value: UserRole.CenterManager, label: "Center Mgr" },
  { value: UserRole.Student, label: "Student" },
  { value: UserRole.Employer, label: "Employer" },
  { value: UserRole.JobSeeker, label: "Job Seeker" },
];

export default function LoginPage() {
  const router = useRouter();
  const { mutateAsync: login, isPending } = useLogin();
  const { login: storeLogin } = useAuthStore();

  const [role, setRole] = useState<UserRole>(UserRole.Student);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");

  const isStudent = role === UserRole.Student;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    // Student OTP flow: first click sends OTP, second click verifies
    if (isStudent && !otpSent) {
      setOtpSent(true);
      toast.info("OTP sent! Demo OTP: 123456");
      return;
    }

    if (isStudent && otp !== "123456") {
      setError("Invalid OTP. Demo OTP: 123456");
      return;
    }

    try {
      const result = await login({
        email: email.trim().toLowerCase(),
        passwordHash: hashPassword(password),
      });

      if (result.__kind__ === "ok") {
        storeLogin(result.ok);
        toast.success(`Welcome back, ${result.ok.firstName}!`);
        const dest = ROLE_DASHBOARD[result.ok.role as UserRole] ?? "/";
        router.navigate({ to: dest });
      } else {
        setError(result.err ?? "Invalid credentials. Please try again.");
      }
    } catch {
      setError("Login failed. Please check your credentials.");
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
            हम होंगे कामयाब
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Shree Raipur Cement CSR Platform
          </p>
        </div>

        <Card className="card-elevated shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl font-display">
              Login / प्रवेश करें
            </CardTitle>
            <CardDescription>
              Select your role and sign in to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Role Selector */}
            <div className="mb-5">
              <Tabs
                value={role}
                onValueChange={(v) => {
                  setRole(v as UserRole);
                  setOtpSent(false);
                  setOtp("");
                  setError("");
                }}
              >
                <TabsList className="flex w-full h-auto flex-wrap gap-1 bg-muted p-1 rounded-md">
                  {ROLE_TABS.map((tab) => (
                    <TabsTrigger
                      key={tab.value}
                      value={tab.value}
                      className="flex-1 min-w-0 text-xs px-2 py-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                      data-ocid={`role-tab-${tab.value.toLowerCase()}`}
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
              data-ocid="login-form"
            >
              {/* Email */}
              <div className="space-y-1.5">
                <Label htmlFor="login-email">Email / Username</Label>
                <div className="relative">
                  <Mail
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-9"
                    required
                    autoComplete="email"
                    data-ocid="login-email"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="login-password">Password</Label>
                  <Link
                    to="/forgot-password"
                    className="text-xs text-primary hover:underline"
                    data-ocid="forgot-password-link"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <Input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-9 pr-10"
                    required
                    autoComplete="current-password"
                    data-ocid="login-password"
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
              </div>

              {/* OTP for Student */}
              {isStudent && otpSent && (
                <div className="space-y-1.5">
                  <Label htmlFor="login-otp">OTP Verification</Label>
                  <div className="rounded-md bg-primary/5 border border-primary/20 px-3 py-2 text-xs text-muted-foreground mb-1">
                    📱 Check your email/phone for OTP.{" "}
                    <span className="font-semibold text-primary">
                      Demo OTP: 123456
                    </span>
                  </div>
                  <Input
                    id="login-otp"
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                    className="text-center tracking-widest font-mono"
                    data-ocid="login-otp"
                  />
                </div>
              )}

              {/* Error */}
              {error && (
                <Alert variant="destructive" data-ocid="login-error">
                  <AlertCircle size={16} />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Submit */}
              <Button
                type="submit"
                className="btn-primary w-full"
                disabled={isPending}
                data-ocid="login-submit"
              >
                {isPending
                  ? "Signing in..."
                  : isStudent && !otpSent
                    ? "Continue / आगे बढ़ें"
                    : "Login / प्रवेश करें"}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-4">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-primary font-semibold hover:underline"
                data-ocid="signup-link"
              >
                Sign up / खाता बनाएं
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
