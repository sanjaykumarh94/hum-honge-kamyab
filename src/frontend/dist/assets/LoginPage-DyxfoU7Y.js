import { c as createLucideIcon, u as useRouter, f as useAuthStore, g as useActor, r as reactExports, h as UserRole, j as jsxRuntimeExports, L as Link, a as Button, R as ROLE_DASHBOARD, i as createActor } from "./index-BFdoklgf.js";
import { F as Flame, E as EyeOff, A as Alert, C as CircleAlert, a as AlertDescription } from "./alert-BRZQ0saj.js";
import { C as Card, b as CardHeader, c as CardTitle, d as CardDescription, a as CardContent } from "./card-CIs8rJlK.js";
import { I as Input } from "./input-Dt9GIaMX.js";
import { L as Label } from "./label-CtntKOhe.js";
import { T as Tabs, a as TabsList, b as TabsTrigger } from "./tabs-B2JPa7zl.js";
import { u as ue } from "./index-t444bNAk.js";
import { u as useLogin, a as useSendOtp, b as useVerifyOtp } from "./useBackend-Dhw_nMAY.js";
import { M as Mail } from "./mail-DLlqUigx.js";
import { P as Phone } from "./phone-B6iCv0XF.js";
import { L as Lock } from "./lock-BiWyUdBb.js";
import { E as Eye } from "./eye-DkXKaTg1.js";
import "./index-q7D4Kz4T.js";
import "./index-BaLXypA6.js";
import "./index-XioNHgJQ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
];
const RefreshCw = createLucideIcon("refresh-cw", __iconNode);
function hashPassword(password) {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16);
}
const ROLE_TABS = [
  { value: UserRole.Admin, label: "Admin" },
  { value: UserRole.CenterManager, label: "Center Mgr" },
  { value: UserRole.Student, label: "Student" },
  { value: UserRole.Employer, label: "Employer" },
  { value: UserRole.JobSeeker, label: "Job Seeker" }
];
function OtpInput({ value, onChange, disabled }) {
  const digits = value.padEnd(6, "").slice(0, 6).split("");
  const inputRefs = reactExports.useRef([]);
  const POSITIONS = ["p0", "p1", "p2", "p3", "p4", "p5"];
  reactExports.useEffect(() => {
    var _a;
    (_a = inputRefs.current[0]) == null ? void 0 : _a.focus();
  }, []);
  function handleKey(idx, e) {
    var _a;
    if (e.key === "Backspace") {
      e.preventDefault();
      const next = digits.map((d, i) => i === idx ? "" : d);
      onChange(next.join(""));
      if (idx > 0) (_a = inputRefs.current[idx - 1]) == null ? void 0 : _a.focus();
    }
  }
  function handleChange(idx, e) {
    var _a, _b;
    const raw = e.target.value.replace(/\D/g, "");
    if (!raw) return;
    if (raw.length > 1) {
      const filled = raw.slice(0, 6).padEnd(6, "").split("");
      onChange(filled.join("").replace(/ /g, ""));
      (_a = inputRefs.current[Math.min(5, raw.length - 1)]) == null ? void 0 : _a.focus();
      return;
    }
    const next = digits.map((d, i) => i === idx ? raw : d);
    onChange(next.join(""));
    if (idx < 5) (_b = inputRefs.current[idx + 1]) == null ? void 0 : _b.focus();
  }
  function handlePaste(e) {
    var _a;
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    onChange(pasted.padEnd(6, " ").slice(0, 6).replace(/ /g, ""));
    (_a = inputRefs.current[Math.min(5, pasted.length - 1)]) == null ? void 0 : _a.focus();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("fieldset", { className: "flex gap-2 justify-center border-0 p-0 m-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("legend", { className: "sr-only", children: "6-digit OTP" }),
    POSITIONS.map((pos, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        ref: (el) => {
          inputRefs.current[idx] = el;
        },
        type: "text",
        inputMode: "numeric",
        maxLength: 1,
        value: digits[idx] === " " ? "" : digits[idx] ?? "",
        onChange: (e) => handleChange(idx, e),
        onKeyDown: (e) => handleKey(idx, e),
        onPaste: handlePaste,
        disabled,
        "aria-label": `OTP digit ${idx + 1}`,
        "data-ocid": `otp-digit-${idx + 1}`,
        className: "otp-input w-11 h-12 text-center text-xl font-mono font-bold border-2 rounded-lg\n            bg-background text-foreground border-input\n            focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30\n            disabled:opacity-50 disabled:cursor-not-allowed\n            transition-colors duration-150"
      },
      pos
    ))
  ] });
}
function ResendCountdown({
  onResend,
  resetKey,
  disabled
}) {
  const [seconds, setSeconds] = reactExports.useState(60);
  reactExports.useEffect(() => {
    setSeconds(60);
    const timer = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          clearInterval(timer);
          return 0;
        }
        return s - 1;
      });
    }, 1e3);
    return () => clearInterval(timer);
  }, [resetKey]);
  if (seconds > 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-sm text-muted-foreground", children: [
      "Resend in",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
        seconds,
        "s"
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick: onResend,
      disabled,
      className: "w-full text-center text-sm font-semibold text-primary hover:underline\n        disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5",
      "data-ocid": "otp-resend-btn",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 13 }),
        "Resend OTP"
      ]
    }
  );
}
function LoginPage() {
  const router = useRouter();
  const { mutateAsync: login, isPending } = useLogin();
  const { mutateAsync: sendOtpMutation, isPending: isSendingOtp } = useSendOtp();
  const { mutateAsync: verifyOtpMutation, isPending: isVerifyingOtp } = useVerifyOtp();
  const { login: storeLogin, setOtpPending, setPhoneVerified } = useAuthStore();
  const { actor } = useActor(createActor);
  const [role, setRole] = reactExports.useState(UserRole.Student);
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [loginMode, setLoginMode] = reactExports.useState("email");
  const [phone, setPhone] = reactExports.useState("");
  const [otpSent, setOtpSent] = reactExports.useState(false);
  const [sessionId, setSessionId] = reactExports.useState(null);
  const [otpCode, setOtpCode] = reactExports.useState("");
  const [resendKey, setResendKey] = reactExports.useState(0);
  const [error, setError] = reactExports.useState("");
  function resetOtpState() {
    setOtpSent(false);
    setSessionId(null);
    setOtpCode("");
    setResendKey(0);
    setError("");
  }
  function handleRoleChange(v) {
    setRole(v);
    setError("");
    resetOtpState();
  }
  function handleModeChange(m) {
    setLoginMode(m);
    setError("");
    resetOtpState();
  }
  async function handleEmailSubmit(e) {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    try {
      const result = await login({
        email: email.trim().toLowerCase(),
        passwordHash: hashPassword(password)
      });
      if (result.__kind__ === "ok") {
        storeLogin(result.ok);
        ue.success(`Welcome back, ${result.ok.firstName}!`);
        const dest = ROLE_DASHBOARD[result.ok.role] ?? "/";
        router.navigate({ to: dest });
      } else {
        setError(result.err ?? "Invalid credentials. Please try again.");
      }
    } catch {
      setError("Login failed. Please check your credentials.");
    }
  }
  const sendOtp = reactExports.useCallback(async () => {
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
        ue.success(`OTP sent to ${e164.slice(0, 5)}*****${e164.slice(-4)}`);
      } else {
        const errMsg = res.error ?? "Could not send SMS. Please use email/password login instead.";
        if (errMsg.toLowerCase().includes("rate") || errMsg.toLowerCase().includes("too many")) {
          setError(
            "Too many OTP requests. Please wait a few minutes before trying again."
          );
        } else if (errMsg.toLowerCase().includes("invalid") || errMsg.toLowerCase().includes("phone")) {
          setError(
            "Invalid phone number format. Please enter a valid 10-digit Indian mobile number."
          );
        } else {
          setError(errMsg);
        }
      }
    } catch {
      setError("Could not send SMS. Please use email/password login instead.");
    }
  }, [phone, sendOtpMutation, setOtpPending]);
  async function handleOtpVerify(e) {
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
        code: cleanCode
      });
      if (res.ok && res.userId !== void 0 && res.userId !== null) {
        const userResult = await (actor == null ? void 0 : actor.getUserById(String(res.userId)));
        if ((userResult == null ? void 0 : userResult.__kind__) === "ok") {
          storeLogin(userResult.ok);
          setPhoneVerified();
          ue.success(`Welcome, ${userResult.ok.firstName}!`);
          const dest = ROLE_DASHBOARD[userResult.ok.role] ?? "/";
          router.navigate({ to: dest });
        } else {
          setError("Could not fetch user details. Please try again.");
        }
      } else {
        setOtpCode("");
        const errMsg = res.error ?? "Invalid code, please try again.";
        if (errMsg.toLowerCase().includes("expir")) {
          setError("Code expired, please request a new OTP.");
        } else if (errMsg.toLowerCase().includes("attempt") || errMsg.toLowerCase().includes("too many")) {
          setError("Too many attempts. Please request a new OTP.");
        } else if (errMsg.toLowerCase().includes("invalid") || errMsg.toLowerCase().includes("wrong")) {
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
  const maskedPhone = phone ? `+91 ${phone.slice(-10, -6).replace(/./g, "*")}${phone.slice(-4)}` : "";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "min-h-[calc(100vh-120px)] flex items-center justify-center py-10 px-4",
      style: {
        background: "linear-gradient(135deg, oklch(0.97 0.01 37) 0%, oklch(0.95 0.02 240) 100%)"
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary mb-3 shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { size: 28, className: "text-primary-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "हम होंगे कामयाब" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Shree Raipur Cement CSR Platform" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "card-elevated shadow-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-xl font-display", children: "Login / प्रवेश करें" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Select your role and sign in to continue" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Tabs, { value: role, onValueChange: handleRoleChange, children: /* @__PURE__ */ jsxRuntimeExports.jsx(TabsList, { className: "flex w-full h-auto flex-wrap gap-1 bg-muted p-1 rounded-md", children: ROLE_TABS.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              TabsTrigger,
              {
                value: tab.value,
                className: "flex-1 min-w-0 text-xs px-2 py-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
                "data-ocid": `role-tab-${tab.value.toLowerCase()}`,
                children: tab.label
              },
              tab.value
            )) }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Tabs,
              {
                value: loginMode,
                onValueChange: (v) => handleModeChange(v),
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "w-full bg-muted/60 p-0.5 rounded-lg grid grid-cols-2 gap-0.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    TabsTrigger,
                    {
                      value: "email",
                      className: "text-sm py-2 data-[state=active]:bg-card data-[state=active]:shadow-sm rounded-md",
                      "data-ocid": "login-mode-email",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 14, className: "mr-1.5 inline" }),
                        "Email / Password"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    TabsTrigger,
                    {
                      value: "otp",
                      className: "text-sm py-2 data-[state=active]:bg-card data-[state=active]:shadow-sm rounded-md",
                      "data-ocid": "login-mode-otp",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 14, className: "mr-1.5 inline" }),
                        "Login with OTP"
                      ]
                    }
                  )
                ] })
              }
            ) }),
            loginMode === "email" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "form",
              {
                onSubmit: handleEmailSubmit,
                className: "space-y-4",
                "data-ocid": "login-form",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "login-email", children: "Email / Username" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Mail,
                        {
                          size: 16,
                          className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "login-email",
                          type: "email",
                          placeholder: "you@example.com",
                          value: email,
                          onChange: (e) => setEmail(e.target.value),
                          className: "pl-9",
                          required: true,
                          autoComplete: "email",
                          "data-ocid": "login-email"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "login-password", children: "Password" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Link,
                        {
                          to: "/forgot-password",
                          className: "text-xs text-primary hover:underline",
                          "data-ocid": "forgot-password-link",
                          children: "Forgot password?"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Lock,
                        {
                          size: 16,
                          className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "login-password",
                          type: showPassword ? "text" : "password",
                          placeholder: "Enter your password",
                          value: password,
                          onChange: (e) => setPassword(e.target.value),
                          className: "pl-9 pr-10",
                          required: true,
                          autoComplete: "current-password",
                          "data-ocid": "login-password"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => setShowPassword(!showPassword),
                          className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
                          "aria-label": showPassword ? "Hide password" : "Show password",
                          children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { size: 16 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 16 })
                        }
                      )
                    ] })
                  ] }),
                  error && /* @__PURE__ */ jsxRuntimeExports.jsxs(Alert, { variant: "destructive", "data-ocid": "login-error", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 16 }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDescription, { children: error })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "submit",
                      className: "btn-primary w-full",
                      disabled: isPending,
                      "data-ocid": "login-submit",
                      children: isPending ? "Signing in..." : "Login / प्रवेश करें"
                    }
                  )
                ]
              }
            ),
            loginMode === "otp" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-5", children: !otpSent ? (
              /* Step 1: Enter phone */
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "form",
                {
                  onSubmit: (e) => {
                    e.preventDefault();
                    sendOtp();
                  },
                  className: "space-y-4",
                  "data-ocid": "otp-phone-form",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "otp-phone", children: "Mobile Number / मोबाइल नंबर" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center px-3 bg-muted border border-input rounded-md text-sm font-medium text-muted-foreground shrink-0", children: "+91" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Phone,
                            {
                              size: 15,
                              className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Input,
                            {
                              id: "otp-phone",
                              type: "tel",
                              placeholder: "Enter 10-digit mobile number",
                              value: phone,
                              onChange: (e) => setPhone(
                                e.target.value.replace(/\D/g, "").slice(0, 10)
                              ),
                              className: "pl-9",
                              maxLength: 10,
                              autoComplete: "tel-national",
                              "data-ocid": "otp-phone-input"
                            }
                          )
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "We'll send a 6-digit OTP to verify your number" })
                    ] }),
                    error && /* @__PURE__ */ jsxRuntimeExports.jsxs(Alert, { variant: "destructive", "data-ocid": "otp-error", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 16 }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDescription, { children: error })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "submit",
                        className: "btn-primary w-full",
                        disabled: isSendingOtp || phone.length < 10,
                        "data-ocid": "otp-send-btn",
                        children: isSendingOtp ? "Sending OTP..." : "Send OTP / OTP भेजें"
                      }
                    )
                  ]
                }
              )
            ) : (
              /* Step 2: Enter OTP */
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "form",
                {
                  onSubmit: handleOtpVerify,
                  className: "space-y-5",
                  "data-ocid": "otp-verify-form",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-primary/5 border border-primary/20 px-4 py-3 text-center", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                        "OTP sent to",
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: maskedPhone })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => {
                            resetOtpState();
                          },
                          className: "text-xs text-primary hover:underline mt-0.5",
                          "data-ocid": "otp-change-phone",
                          children: "Change number"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-center block", children: "Enter 6-digit OTP / 6 अंकों का OTP दर्ज करें" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        OtpInput,
                        {
                          value: otpCode,
                          onChange: setOtpCode,
                          disabled: isOtpLoading
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      ResendCountdown,
                      {
                        onResend: sendOtp,
                        resetKey: resendKey,
                        disabled: isSendingOtp
                      }
                    ),
                    error && /* @__PURE__ */ jsxRuntimeExports.jsxs(Alert, { variant: "destructive", "data-ocid": "otp-verify-error", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 16 }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDescription, { children: error })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "submit",
                        className: "btn-primary w-full",
                        disabled: isOtpLoading || otpCode.replace(/\s/g, "").length < 6,
                        "data-ocid": "otp-verify-btn",
                        children: isVerifyingOtp ? "Verifying..." : "Verify & Login / जाँचें और प्रवेश करें"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-xs text-muted-foreground", children: [
                      "Problems logging in?",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => handleModeChange("email"),
                          className: "text-primary font-medium hover:underline",
                          "data-ocid": "switch-to-email",
                          children: "Use email/password instead"
                        }
                      )
                    ] })
                  ]
                }
              )
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-sm text-muted-foreground mt-4", children: [
              "Don't have an account?",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/signup",
                  className: "text-primary font-semibold hover:underline",
                  "data-ocid": "signup-link",
                  children: "Sign up / खाता बनाएं"
                }
              )
            ] })
          ] })
        ] })
      ] })
    }
  );
}
export {
  LoginPage as default
};
