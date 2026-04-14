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
import { useActor } from "@caffeineai/core-infrastructure";
import { Link, useRouter } from "@tanstack/react-router";
import {
  AlertCircle,
  Eye,
  EyeOff,
  Flame,
  Lock,
  Mail,
  Phone,
  RefreshCw,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { createActor } from "../backend";
import { UserRole } from "../backend.d";
import { useLogin, useSendOtp, useVerifyOtp } from "../hooks/useBackend";
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

// ── OTP Input: 6 individual boxes ─────────────────────────────────────────────
interface OtpInputProps {
  value: string;
  onChange: (val: string) => void;
  disabled?: boolean;
}

function OtpInput({ value, onChange, disabled }: OtpInputProps) {
  const digits = value.padEnd(6, "").slice(0, 6).split("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const POSITIONS = ["p0", "p1", "p2", "p3", "p4", "p5"] as const;

  // Auto-focus first digit on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  function handleKey(idx: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace") {
      e.preventDefault();
      const next = digits.map((d, i) => (i === idx ? "" : d));
      onChange(next.join(""));
      if (idx > 0) inputRefs.current[idx - 1]?.focus();
    }
  }

  function handleChange(idx: number, e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/\D/g, "");
    if (!raw) return;
    if (raw.length > 1) {
      const filled = raw.slice(0, 6).padEnd(6, "").split("");
      onChange(filled.join("").replace(/ /g, ""));
      inputRefs.current[Math.min(5, raw.length - 1)]?.focus();
      return;
    }
    const next = digits.map((d, i) => (i === idx ? raw : d));
    onChange(next.join(""));
    if (idx < 5) inputRefs.current[idx + 1]?.focus();
  }

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    onChange(pasted.padEnd(6, " ").slice(0, 6).replace(/ /g, ""));
    inputRefs.current[Math.min(5, pasted.length - 1)]?.focus();
  }

  return (
    <fieldset className="flex gap-2 justify-center border-0 p-0 m-0">
      <legend className="sr-only">6-digit OTP</legend>
      {POSITIONS.map((pos, idx) => (
        <input
          key={pos}
          ref={(el) => {
            inputRefs.current[idx] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digits[idx] === " " ? "" : (digits[idx] ?? "")}
          onChange={(e) => handleChange(idx, e)}
          onKeyDown={(e) => handleKey(idx, e)}
          onPaste={handlePaste}
          disabled={disabled}
          aria-label={`OTP digit ${idx + 1}`}
          data-ocid={`otp-digit-${idx + 1}`}
          className="otp-input w-11 h-12 text-center text-xl font-mono font-bold border-2 rounded-lg
            bg-background text-foreground border-input
            focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-colors duration-150"
        />
      ))}
    </fieldset>
  );
}

// ── Resend countdown ──────────────────────────────────────────────────────────
interface ResendCountdownProps {
  onResend: () => void;
  resetKey: number;
  disabled?: boolean;
}

function ResendCountdown({
  onResend,
  resetKey,
  disabled,
}: ResendCountdownProps) {
  const [seconds, setSeconds] = useState(60);

  // resetKey intentionally triggers a timer reset — not a missing dep
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    void resetKey; // trigger reset when resetKey changes
    setSeconds(60);
    const timer = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          clearInterval(timer);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [resetKey]);

  if (seconds > 0) {
    return (
      <p className="text-center text-sm text-muted-foreground">
        Resend in{" "}
        <span className="font-semibold text-foreground">{seconds}s</span>
      </p>
    );
  }

  return (
    <button
      type="button"
      onClick={onResend}
      disabled={disabled}
      className="w-full text-center text-sm font-semibold text-primary hover:underline
        disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
      data-ocid="otp-resend-btn"
    >
      <RefreshCw size={13} />
      Resend OTP
    </button>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
type LoginMode = "email" | "otp";

export default function LoginPage() {
  const router = useRouter();
  const { mutateAsync: login, isPending } = useLogin();
  const { mutateAsync: sendOtpMutation, isPending: isSendingOtp } =
    useSendOtp();
  const { mutateAsync: verifyOtpMutation, isPending: isVerifyingOtp } =
    useVerifyOtp();
  const { login: storeLogin, setOtpPending, setPhoneVerified } = useAuthStore();
  const { actor } = useActor(createActor);

  // Role
  const [role, setRole] = useState<UserRole>(UserRole.Student);

  // Email/password tab
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // OTP tab
  const [loginMode, setLoginMode] = useState<LoginMode>("email");
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [sessionId, setSessionId] = useState<bigint | null>(null);
  const [otpCode, setOtpCode] = useState("");
  const [resendKey, setResendKey] = useState(0);

  const [error, setError] = useState("");

  function resetOtpState() {
    setOtpSent(false);
    setSessionId(null);
    setOtpCode("");
    setResendKey(0);
    setError("");
  }

  function handleRoleChange(v: string) {
    setRole(v as UserRole);
    setError("");
    resetOtpState();
  }

  function handleModeChange(m: LoginMode) {
    setLoginMode(m);
    setError("");
    resetOtpState();
  }

  // ── Email/password submit ────────────────────────────────────────────────────
  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
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

  // ── OTP: Send ────────────────────────────────────────────────────────────────
  const sendOtp = useCallback(async () => {
    setError("");
    const raw = phone.replace(/\D/g, "");
    if (raw.length < 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }
    const e164 = `+91${raw.slice(-10)}`;

    try {
      const res = await sendOtpMutation({ phone: e164 });
      if (res.ok) {
        const sid = res.sessionId;
        setSessionId(sid);
        setOtpPending(e164, Number(sid));
        setOtpSent(true);
        setResendKey((k) => k + 1);
        toast.success(`OTP sent to ${e164.slice(0, 5)}*****${e164.slice(-4)}`);
      } else {
        const errMsg =
          res.error ??
          "Could not send SMS. Please use email/password login instead.";
        if (
          errMsg.toLowerCase().includes("rate") ||
          errMsg.toLowerCase().includes("too many")
        ) {
          setError(
            "Too many OTP requests. Please wait a few minutes before trying again.",
          );
        } else if (
          errMsg.toLowerCase().includes("invalid") ||
          errMsg.toLowerCase().includes("phone")
        ) {
          setError(
            "Invalid phone number format. Please enter a valid 10-digit Indian mobile number.",
          );
        } else {
          setError(errMsg);
        }
      }
    } catch {
      setError("Could not send SMS. Please use email/password login instead.");
    }
  }, [phone, sendOtpMutation, setOtpPending]);

  // ── OTP: Verify ──────────────────────────────────────────────────────────────
  async function handleOtpVerify(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const cleanCode = otpCode.replace(/\s/g, "");
    if (cleanCode.length !== 6) {
      setError("Please enter the complete 6-digit OTP.");
      return;
    }

    try {
      const res = await verifyOtpMutation({
        sessionId: sessionId ?? 0n,
        code: cleanCode,
      });

      // userId is Candid opt nat: bigint | undefined
      if (res.ok && res.userId !== undefined && res.userId !== null) {
        // Fetch user details by id
        const userResult = await actor?.getUserById(String(res.userId));
        if (userResult?.__kind__ === "ok") {
          storeLogin(userResult.ok);
          setPhoneVerified();
          toast.success(`Welcome, ${userResult.ok.firstName}!`);
          const dest = ROLE_DASHBOARD[userResult.ok.role as UserRole] ?? "/";
          router.navigate({ to: dest });
        } else {
          setError("Could not fetch user details. Please try again.");
        }
      } else {
        // Clear digits on failure
        setOtpCode("");
        const errMsg = res.error ?? "Invalid code, please try again.";
        if (errMsg.toLowerCase().includes("expir")) {
          setError("Code expired, please request a new OTP.");
        } else if (
          errMsg.toLowerCase().includes("attempt") ||
          errMsg.toLowerCase().includes("too many")
        ) {
          setError("Too many attempts. Please request a new OTP.");
        } else if (
          errMsg.toLowerCase().includes("invalid") ||
          errMsg.toLowerCase().includes("wrong")
        ) {
          setError("Incorrect OTP code. Please check and try again.");
        } else {
          setError(errMsg);
        }
      }
    } catch {
      setOtpCode("");
      setError("Verification failed. Please try again.");
    }
  }

  const isOtpLoading = isSendingOtp || isVerifyingOtp;
  const maskedPhone = phone
    ? `+91 ${phone.slice(-10, -6).replace(/./g, "*")}${phone.slice(-4)}`
    : "";

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
            <div className="mb-4">
              <Tabs value={role} onValueChange={handleRoleChange}>
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

            {/* Login Mode Tabs */}
            <div className="mb-5">
              <Tabs
                value={loginMode}
                onValueChange={(v) => handleModeChange(v as LoginMode)}
              >
                <TabsList className="w-full bg-muted/60 p-0.5 rounded-lg grid grid-cols-2 gap-0.5">
                  <TabsTrigger
                    value="email"
                    className="text-sm py-2 data-[state=active]:bg-card data-[state=active]:shadow-sm rounded-md"
                    data-ocid="login-mode-email"
                  >
                    <Mail size={14} className="mr-1.5 inline" />
                    Email / Password
                  </TabsTrigger>
                  <TabsTrigger
                    value="otp"
                    className="text-sm py-2 data-[state=active]:bg-card data-[state=active]:shadow-sm rounded-md"
                    data-ocid="login-mode-otp"
                  >
                    <Phone size={14} className="mr-1.5 inline" />
                    Login with OTP
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* ── Email/Password Form ── */}
            {loginMode === "email" && (
              <form
                onSubmit={handleEmailSubmit}
                className="space-y-4"
                data-ocid="login-form"
              >
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

                {error && (
                  <Alert variant="destructive" data-ocid="login-error">
                    <AlertCircle size={16} />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  className="btn-primary w-full"
                  disabled={isPending}
                  data-ocid="login-submit"
                >
                  {isPending ? "Signing in..." : "Login / प्रवेश करें"}
                </Button>
              </form>
            )}

            {/* ── OTP Form ── */}
            {loginMode === "otp" && (
              <div className="space-y-5">
                {!otpSent ? (
                  /* Step 1: Enter phone */
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      sendOtp();
                    }}
                    className="space-y-4"
                    data-ocid="otp-phone-form"
                  >
                    <div className="space-y-1.5">
                      <Label htmlFor="otp-phone">
                        Mobile Number / मोबाइल नंबर
                      </Label>
                      <div className="flex gap-2">
                        <div className="flex items-center px-3 bg-muted border border-input rounded-md text-sm font-medium text-muted-foreground shrink-0">
                          +91
                        </div>
                        <div className="relative flex-1">
                          <Phone
                            size={15}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                          />
                          <Input
                            id="otp-phone"
                            type="tel"
                            placeholder="Enter 10-digit mobile number"
                            value={phone}
                            onChange={(e) =>
                              setPhone(
                                e.target.value.replace(/\D/g, "").slice(0, 10),
                              )
                            }
                            className="pl-9"
                            maxLength={10}
                            autoComplete="tel-national"
                            data-ocid="otp-phone-input"
                          />
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        We'll send a 6-digit OTP to verify your number
                      </p>
                    </div>

                    {error && (
                      <Alert variant="destructive" data-ocid="otp-error">
                        <AlertCircle size={16} />
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    <Button
                      type="submit"
                      className="btn-primary w-full"
                      disabled={isSendingOtp || phone.length < 10}
                      data-ocid="otp-send-btn"
                    >
                      {isSendingOtp ? "Sending OTP..." : "Send OTP / OTP भेजें"}
                    </Button>
                  </form>
                ) : (
                  /* Step 2: Enter OTP */
                  <form
                    onSubmit={handleOtpVerify}
                    className="space-y-5"
                    data-ocid="otp-verify-form"
                  >
                    <div className="rounded-lg bg-primary/5 border border-primary/20 px-4 py-3 text-center">
                      <p className="text-xs text-muted-foreground">
                        OTP sent to{" "}
                        <span className="font-semibold text-foreground">
                          {maskedPhone}
                        </span>
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          resetOtpState();
                        }}
                        className="text-xs text-primary hover:underline mt-0.5"
                        data-ocid="otp-change-phone"
                      >
                        Change number
                      </button>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-center block">
                        Enter 6-digit OTP / 6 अंकों का OTP दर्ज करें
                      </Label>
                      <OtpInput
                        value={otpCode}
                        onChange={setOtpCode}
                        disabled={isOtpLoading}
                      />
                    </div>

                    <ResendCountdown
                      onResend={sendOtp}
                      resetKey={resendKey}
                      disabled={isSendingOtp}
                    />

                    {error && (
                      <Alert variant="destructive" data-ocid="otp-verify-error">
                        <AlertCircle size={16} />
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    <Button
                      type="submit"
                      className="btn-primary w-full"
                      disabled={
                        isOtpLoading || otpCode.replace(/\s/g, "").length < 6
                      }
                      data-ocid="otp-verify-btn"
                    >
                      {isVerifyingOtp
                        ? "Verifying..."
                        : "Verify & Login / जाँचें और प्रवेश करें"}
                    </Button>

                    <p className="text-center text-xs text-muted-foreground">
                      Problems logging in?{" "}
                      <button
                        type="button"
                        onClick={() => handleModeChange("email")}
                        className="text-primary font-medium hover:underline"
                        data-ocid="switch-to-email"
                      >
                        Use email/password instead
                      </button>
                    </p>
                  </form>
                )}
              </div>
            )}

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
