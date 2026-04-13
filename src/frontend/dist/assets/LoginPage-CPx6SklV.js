import { u as useRouter, f as useAuthStore, r as reactExports, g as UserRole, j as jsxRuntimeExports, L as Link, a as Button, R as ROLE_DASHBOARD } from "./index-BESvdAtP.js";
import { F as Flame, E as EyeOff, A as Alert, C as CircleAlert, a as AlertDescription } from "./alert-CV4Wcu31.js";
import { C as Card, b as CardHeader, c as CardTitle, d as CardDescription, a as CardContent } from "./card-BILcuGgo.js";
import { I as Input } from "./input-BzQTN1iz.js";
import { L as Label } from "./label-PjA3JIae.js";
import { T as Tabs, a as TabsList, b as TabsTrigger } from "./tabs-BWRNkXzI.js";
import { u as ue } from "./index-B6STimMY.js";
import { u as useLogin } from "./useBackend-DY9BrSjM.js";
import { M as Mail } from "./mail-tnWEXnsX.js";
import { L as Lock } from "./lock-BikdnO2v.js";
import { E as Eye } from "./eye-B99VGKid.js";
import "./index-DHKM-vaf.js";
import "./index-2V6FtwJL.js";
import "./index-C0RboPBm.js";
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
function LoginPage() {
  const router = useRouter();
  const { mutateAsync: login, isPending } = useLogin();
  const { login: storeLogin } = useAuthStore();
  const [role, setRole] = reactExports.useState(UserRole.Student);
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [otp, setOtp] = reactExports.useState("");
  const [otpSent, setOtpSent] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const isStudent = role === UserRole.Student;
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    if (isStudent && !otpSent) {
      setOtpSent(true);
      ue.info("OTP sent! Demo OTP: 123456");
      return;
    }
    if (isStudent && otp !== "123456") {
      setError("Invalid OTP. Demo OTP: 123456");
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
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Tabs,
              {
                value: role,
                onValueChange: (v) => {
                  setRole(v);
                  setOtpSent(false);
                  setOtp("");
                  setError("");
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(TabsList, { className: "flex w-full h-auto flex-wrap gap-1 bg-muted p-1 rounded-md", children: ROLE_TABS.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TabsTrigger,
                  {
                    value: tab.value,
                    className: "flex-1 min-w-0 text-xs px-2 py-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
                    "data-ocid": `role-tab-${tab.value.toLowerCase()}`,
                    children: tab.label
                  },
                  tab.value
                )) })
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "form",
              {
                onSubmit: handleSubmit,
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
                  isStudent && otpSent && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "login-otp", children: "OTP Verification" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md bg-primary/5 border border-primary/20 px-3 py-2 text-xs text-muted-foreground mb-1", children: [
                      "📱 Check your email/phone for OTP.",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-primary", children: "Demo OTP: 123456" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "login-otp",
                        type: "text",
                        placeholder: "Enter 6-digit OTP",
                        value: otp,
                        onChange: (e) => setOtp(e.target.value),
                        maxLength: 6,
                        className: "text-center tracking-widest font-mono",
                        "data-ocid": "login-otp"
                      }
                    )
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
                      children: isPending ? "Signing in..." : isStudent && !otpSent ? "Continue / आगे बढ़ें" : "Login / प्रवेश करें"
                    }
                  )
                ]
              }
            ),
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
