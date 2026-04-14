import { c as createLucideIcon, u as useRouter, f as useAuthStore, r as reactExports, h as UserRole, j as jsxRuntimeExports, a as Button, L as Link, R as ROLE_DASHBOARD } from "./index-BFdoklgf.js";
import { F as Flame, E as EyeOff, A as Alert, C as CircleAlert, a as AlertDescription } from "./alert-BRZQ0saj.js";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle, d as CardDescription } from "./card-CIs8rJlK.js";
import { I as Input } from "./input-Dt9GIaMX.js";
import { L as Label } from "./label-CtntKOhe.js";
import { T as Tabs, a as TabsList, b as TabsTrigger } from "./tabs-B2JPa7zl.js";
import { u as ue } from "./index-t444bNAk.js";
import { c as useRegister } from "./useBackend-Dhw_nMAY.js";
import { C as CircleCheck } from "./circle-check-D8ywH8eM.js";
import { P as Phone } from "./phone-B6iCv0XF.js";
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
  ["rect", { width: "7", height: "12", x: "2", y: "6", rx: "1", key: "5nje8w" }],
  ["path", { d: "M13 8.32a7.43 7.43 0 0 1 0 7.36", key: "1g306n" }],
  ["path", { d: "M16.46 6.21a11.76 11.76 0 0 1 0 11.58", key: "uqvjvo" }],
  ["path", { d: "M19.91 4.1a15.91 15.91 0 0 1 .01 15.8", key: "ujntz3" }]
];
const SmartphoneNfc = createLucideIcon("smartphone-nfc", __iconNode);
function hashPassword(password) {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16);
}
const SIGNUP_ROLES = [
  { value: UserRole.Student, label: "Student / छात्र" },
  { value: UserRole.JobSeeker, label: "Job Seeker / नौकरी खोजी" },
  { value: UserRole.Employer, label: "Employer / नियोक्ता" }
];
function PasswordStrength({ password }) {
  const checks = [
    { label: "8+ chars", met: password.length >= 8 },
    { label: "Uppercase", met: /[A-Z]/.test(password) },
    { label: "Lowercase", met: /[a-z]/.test(password) },
    { label: "Number/symbol", met: /[\d\W]/.test(password) }
  ];
  const score = checks.filter((c) => c.met).length;
  const barColors = [
    "bg-destructive",
    "bg-destructive",
    "bg-yellow-500",
    "bg-green-500",
    "bg-green-600"
  ];
  if (!password) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 space-y-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", children: [0, 1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `h-1 flex-1 rounded-full transition-all ${i < score ? barColors[score] : "bg-muted"}`
      },
      `bar-${i}`
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-x-3 gap-y-0.5", children: checks.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "span",
      {
        className: `text-[11px] flex items-center gap-1 ${c.met ? "text-green-600" : "text-muted-foreground"}`,
        children: [
          c.met ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 10 }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2.5 h-2.5 rounded-full border border-current inline-block" }),
          c.label
        ]
      },
      c.label
    )) })
  ] });
}
function isValidPhone(phone) {
  const digits = phone.replace(/\D/g, "");
  return digits.length === 10 || digits.length === 12 && digits.startsWith("91");
}
function SignupPage() {
  const router = useRouter();
  const { mutateAsync: register, isPending } = useRegister();
  const { login: storeLogin } = useAuthStore();
  const [role, setRole] = reactExports.useState(UserRole.Student);
  const [firstName, setFirstName] = reactExports.useState("");
  const [lastName, setLastName] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [phone, setPhone] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [confirmPassword, setConfirmPassword] = reactExports.useState("");
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [showConfirm, setShowConfirm] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const [fieldErrors, setFieldErrors] = reactExports.useState({});
  const [registered, setRegistered] = reactExports.useState(false);
  function validate() {
    const errs = {};
    if (!firstName.trim()) errs.firstName = "First name is required";
    if (!lastName.trim()) errs.lastName = "Last name is required";
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email))
      errs.email = "Valid email required";
    if (!phone.trim() || !isValidPhone(phone))
      errs.phone = "Valid 10-digit Indian mobile number required";
    if (password.length < 8)
      errs.password = "Password must be at least 8 characters";
    if (password !== confirmPassword)
      errs.confirmPassword = "Passwords do not match";
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!validate()) return;
    const digits = phone.replace(/\D/g, "");
    `+91${digits.slice(-10)}`;
    try {
      const result = await register({
        email: email.trim().toLowerCase(),
        passwordHash: hashPassword(password),
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        role
      });
      if (result.__kind__ === "ok") {
        storeLogin(result.ok);
        setRegistered(true);
        ue.success(
          `Welcome, ${result.ok.firstName}! Registration successful.`
        );
        setTimeout(() => {
          router.navigate({
            to: ROLE_DASHBOARD[result.ok.role] ?? "/"
          });
        }, 4e3);
      } else {
        setError(
          result.err ?? "Registration failed. This email may already be registered."
        );
      }
    } catch {
      setError("Registration failed. Please try again.");
    }
  }
  function handleVerifyNow() {
    router.navigate({ to: "/login" });
    ue.info("Use 'Login with OTP' to verify your mobile number.");
  }
  if (registered) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "min-h-[calc(100vh-120px)] flex items-center justify-center py-10 px-4",
        style: {
          background: "linear-gradient(135deg, oklch(0.97 0.01 37) 0%, oklch(0.95 0.02 240) 100%)"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full max-w-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "card-elevated shadow-lg text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-8 pb-8 space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 32, className: "text-green-600" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl text-foreground mb-1", children: "Account Created!" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Your account has been successfully created." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-primary/30 bg-primary/5 px-4 py-4 text-left space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-primary font-semibold text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SmartphoneNfc, { size: 16 }),
              "Verify your phone number to complete setup"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              "Verifying your mobile number",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-foreground", children: [
                "+91 ",
                phone.replace(/\D/g, "").slice(-10)
              ] }),
              " ",
              "enables SMS-based OTP login and important notifications."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                onClick: handleVerifyNow,
                className: "w-full btn-primary",
                "data-ocid": "verify-phone-cta",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 14, className: "mr-1.5" }),
                  "Verify Phone Now / अभी सत्यापित करें"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "Redirecting to your dashboard in a moment...",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: ROLE_DASHBOARD[role] ?? "/",
                className: "text-primary hover:underline",
                "data-ocid": "skip-to-dashboard",
                children: "Skip →"
              }
            )
          ] })
        ] }) }) })
      }
    );
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
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "Create Your Account" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "अपने आप को रजिस्टर करें — हम होंगे कामयाब" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "card-elevated shadow-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-xl font-display", children: "Create Account / खाता बनाएं" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Join as a Student, Job Seeker, or Employer" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "mb-2 block text-sm", children: "Register as" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Tabs, { value: role, onValueChange: (v) => setRole(v), children: /* @__PURE__ */ jsxRuntimeExports.jsx(TabsList, { className: "flex w-full bg-muted p-1 rounded-md", children: SIGNUP_ROLES.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                TabsTrigger,
                {
                  value: tab.value,
                  className: "flex-1 text-xs px-2 py-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
                  "data-ocid": `signup-role-${tab.value.toLowerCase()}`,
                  children: tab.label
                },
                tab.value
              )) }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "form",
              {
                onSubmit: handleSubmit,
                className: "space-y-4",
                "data-ocid": "signup-form",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "signup-first-name", children: [
                        "First Name ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "signup-first-name",
                          placeholder: "Ramesh",
                          value: firstName,
                          onChange: (e) => setFirstName(e.target.value),
                          required: true,
                          "data-ocid": "signup-first-name"
                        }
                      ),
                      fieldErrors.firstName && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: fieldErrors.firstName })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "signup-last-name", children: [
                        "Last Name ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "signup-last-name",
                          placeholder: "Kumar",
                          value: lastName,
                          onChange: (e) => setLastName(e.target.value),
                          required: true,
                          "data-ocid": "signup-last-name"
                        }
                      ),
                      fieldErrors.lastName && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: fieldErrors.lastName })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "signup-email", children: [
                      "Email Address ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "signup-email",
                        type: "email",
                        placeholder: "you@example.com",
                        value: email,
                        onChange: (e) => setEmail(e.target.value),
                        required: true,
                        autoComplete: "email",
                        "data-ocid": "signup-email"
                      }
                    ),
                    fieldErrors.email && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: fieldErrors.email })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "signup-phone", children: [
                      "Mobile Number ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center px-3 bg-muted border border-input rounded-md text-sm font-medium text-muted-foreground shrink-0 h-9", children: "+91" }),
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
                            id: "signup-phone",
                            type: "tel",
                            placeholder: "10-digit mobile number",
                            value: phone,
                            onChange: (e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10)),
                            className: "pl-9",
                            maxLength: 10,
                            autoComplete: "tel-national",
                            "data-ocid": "signup-phone"
                          }
                        )
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Used for OTP login and important notifications" }),
                    fieldErrors.phone && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: fieldErrors.phone })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "signup-password", children: [
                      "Password ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "signup-password",
                          type: showPassword ? "text" : "password",
                          placeholder: "Min. 8 characters",
                          value: password,
                          onChange: (e) => setPassword(e.target.value),
                          className: "pr-10",
                          required: true,
                          autoComplete: "new-password",
                          "data-ocid": "signup-password"
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
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(PasswordStrength, { password }),
                    fieldErrors.password && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: fieldErrors.password })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "signup-confirm-password", children: [
                      "Confirm Password ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "signup-confirm-password",
                          type: showConfirm ? "text" : "password",
                          placeholder: "Repeat your password",
                          value: confirmPassword,
                          onChange: (e) => setConfirmPassword(e.target.value),
                          className: "pr-10",
                          required: true,
                          autoComplete: "new-password",
                          "data-ocid": "signup-confirm-password"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => setShowConfirm(!showConfirm),
                          className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
                          "aria-label": showConfirm ? "Hide password" : "Show password",
                          children: showConfirm ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { size: 16 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 16 })
                        }
                      )
                    ] }),
                    fieldErrors.confirmPassword && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: fieldErrors.confirmPassword })
                  ] }),
                  error && /* @__PURE__ */ jsxRuntimeExports.jsxs(Alert, { variant: "destructive", "data-ocid": "signup-error", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 16 }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDescription, { children: error })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "submit",
                        className: "flex-1 btn-primary",
                        disabled: isPending,
                        "data-ocid": "signup-submit",
                        children: isPending ? "Creating Account..." : "Create Account / खाता बनाएं"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        variant: "outline",
                        "data-ocid": "signup-cancel",
                        children: "Cancel"
                      }
                    ) })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-sm text-muted-foreground mt-4", children: [
              "Already have an account?",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/login",
                  className: "text-primary font-semibold hover:underline",
                  "data-ocid": "login-link",
                  children: "Login / प्रवेश करें"
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
  SignupPage as default
};
