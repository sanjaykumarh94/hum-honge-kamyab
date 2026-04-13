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
import { Link, useRouter } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Eye,
  EyeOff,
  Flame,
  KeyRound,
  Mail,
  Shield,
} from "lucide-react";
import { useState } from "react";

type Step = "email" | "otp" | "reset" | "done";

const STEP_META = [
  { key: "email" as const, label: "Enter Email", Icon: Mail },
  { key: "otp" as const, label: "Verify OTP", Icon: Shield },
  { key: "reset" as const, label: "New Password", Icon: KeyRound },
];

function StepIndicator({ current }: { current: Step }) {
  const currentIdx = STEP_META.findIndex((s) => s.key === current);

  return (
    <div className="flex items-center justify-center gap-0 mb-6">
      {STEP_META.map((step, idx) => {
        const done = idx < currentIdx;
        const active = idx === currentIdx;
        const { Icon } = step;

        return (
          <div key={step.key} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-smooth ${
                  done
                    ? "bg-green-500 text-white"
                    : active
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {done ? <CheckCircle2 size={16} /> : <Icon size={16} />}
              </div>
              <span
                className={`text-[10px] mt-1 font-medium ${
                  active ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {step.label}
              </span>
            </div>
            {idx < STEP_META.length - 1 && (
              <div
                className={`w-12 h-0.5 mx-1 mb-4 transition-smooth ${
                  idx < currentIdx ? "bg-green-500" : "bg-border"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsLoading(false);
    setStep("otp");
  }

  function handleOtpSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (otp !== "123456") {
      setError("Invalid OTP. Please use the demo OTP: 123456");
      return;
    }
    setStep("reset");
  }

  async function handleResetSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsLoading(false);
    setStep("done");
  }

  if (step === "done") {
    return (
      <div
        className="min-h-[calc(100vh-120px)] flex items-center justify-center py-10 px-4"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.97 0.01 37) 0%, oklch(0.95 0.02 240) 100%)",
        }}
      >
        <Card className="card-elevated w-full max-w-md shadow-lg text-center">
          <CardContent className="pt-10 pb-8 px-8">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={32} className="text-green-600" />
            </div>
            <h2 className="font-display font-bold text-xl text-foreground mb-2">
              Password Reset Successful!
            </h2>
            <p className="text-muted-foreground text-sm mb-6">
              Your password has been updated. You can now log in with your new
              password.
            </p>
            <Button
              type="button"
              className="btn-primary w-full"
              onClick={() => router.navigate({ to: "/login" })}
              data-ocid="reset-done-login"
            >
              Go to Login / लॉगिन करें
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div
      className="min-h-[calc(100vh-120px)] flex items-center justify-center py-10 px-4"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.97 0.01 37) 0%, oklch(0.95 0.02 240) 100%)",
      }}
    >
      <div className="w-full max-w-md">
        {/* Branding */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary mb-3 shadow-lg">
            <Flame size={24} className="text-primary-foreground" />
          </div>
          <h1 className="font-display font-bold text-xl text-foreground">
            Reset Password
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            हम होंगे कामयाब — CSR Platform
          </p>
        </div>

        <Card className="card-elevated shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-display">
              {step === "email" && "Forgot Password?"}
              {step === "otp" && "Verify Your Identity"}
              {step === "reset" && "Set New Password"}
            </CardTitle>
            <CardDescription>
              {step === "email" &&
                "Enter your registered email to receive an OTP"}
              {step === "otp" && "Enter the OTP sent to your email address"}
              {step === "reset" && "Choose a strong new password"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <StepIndicator current={step} />

            {/* Step 1 — Email */}
            {step === "email" && (
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="forgot-email">Email Address</Label>
                  <div className="relative">
                    <Mail
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    />
                    <Input
                      id="forgot-email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-9"
                      required
                      autoComplete="email"
                      data-ocid="forgot-email"
                    />
                  </div>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle size={16} />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  className="w-full btn-primary"
                  disabled={isLoading}
                  data-ocid="forgot-send-otp"
                >
                  {isLoading ? "Sending..." : "Send Reset OTP"}
                </Button>
              </form>
            )}

            {/* Step 2 — OTP */}
            {step === "otp" && (
              <form onSubmit={handleOtpSubmit} className="space-y-4">
                <div className="rounded-md bg-primary/5 border border-primary/20 px-4 py-3 text-sm">
                  <p className="font-semibold text-foreground mb-1">
                    OTP sent to: <span className="text-primary">{email}</span>
                  </p>
                  <p className="text-muted-foreground text-xs">
                    Check your email for OTP.{" "}
                    <span className="font-bold text-primary">
                      Demo OTP: 123456
                    </span>
                  </p>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="forgot-otp">Enter OTP</Label>
                  <Input
                    id="forgot-otp"
                    type="text"
                    placeholder="6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                    className="text-center text-lg tracking-widest font-mono"
                    data-ocid="forgot-otp"
                  />
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle size={16} />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setStep("email");
                      setError("");
                    }}
                    className="gap-1.5"
                    data-ocid="forgot-back-email"
                  >
                    <ArrowLeft size={14} /> Back
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 btn-primary"
                    data-ocid="forgot-verify-otp"
                  >
                    Verify OTP
                  </Button>
                </div>

                <p className="text-center text-xs text-muted-foreground">
                  Didn't receive it?{" "}
                  <button
                    type="button"
                    className="text-primary hover:underline font-medium"
                    onClick={() => {
                      setStep("email");
                      setError("");
                    }}
                    data-ocid="forgot-resend"
                  >
                    Resend OTP
                  </button>
                </p>
              </form>
            )}

            {/* Step 3 — New Password */}
            {step === "reset" && (
              <form onSubmit={handleResetSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="forgot-new-password">New Password</Label>
                  <div className="relative">
                    <Input
                      id="forgot-new-password"
                      type={showNew ? "text" : "password"}
                      placeholder="Min. 8 characters"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="pr-10"
                      required
                      autoComplete="new-password"
                      data-ocid="forgot-new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNew(!showNew)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      aria-label={showNew ? "Hide" : "Show"}
                    >
                      {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="forgot-confirm-password">
                    Confirm New Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="forgot-confirm-password"
                      type={showConfirm ? "text" : "password"}
                      placeholder="Repeat your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pr-10"
                      required
                      autoComplete="new-password"
                      data-ocid="forgot-confirm-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      aria-label={showConfirm ? "Hide" : "Show"}
                    >
                      {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {confirmPassword && newPassword !== confirmPassword && (
                    <p className="text-xs text-destructive">
                      Passwords do not match
                    </p>
                  )}
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle size={16} />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  className="w-full btn-primary"
                  disabled={isLoading}
                  data-ocid="forgot-reset-submit"
                >
                  {isLoading ? "Resetting..." : "Reset Password / पासवर्ड बदलें"}
                </Button>
              </form>
            )}

            <p className="text-center text-sm text-muted-foreground mt-4">
              Remember your password?{" "}
              <Link
                to="/login"
                className="text-primary font-semibold hover:underline"
                data-ocid="back-to-login"
              >
                Back to Login
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
