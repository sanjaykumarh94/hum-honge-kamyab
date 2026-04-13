import { c as createLucideIcon, u as useRouter, r as reactExports, j as jsxRuntimeExports, a as Button, L as Link } from "./index-BESvdAtP.js";
import { F as Flame, A as Alert, C as CircleAlert, a as AlertDescription, E as EyeOff } from "./alert-CV4Wcu31.js";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle, d as CardDescription } from "./card-BILcuGgo.js";
import { I as Input } from "./input-BzQTN1iz.js";
import { L as Label } from "./label-PjA3JIae.js";
import { C as CircleCheck } from "./circle-check-D6FzL0r2.js";
import { M as Mail } from "./mail-tnWEXnsX.js";
import { A as ArrowLeft } from "./arrow-left-AsiSIc3U.js";
import { E as Eye } from "./eye-B99VGKid.js";
import { S as Shield } from "./shield-By8E30JF.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z",
      key: "1s6t7t"
    }
  ],
  ["circle", { cx: "16.5", cy: "7.5", r: ".5", fill: "currentColor", key: "w0ekpg" }]
];
const KeyRound = createLucideIcon("key-round", __iconNode);
const STEP_META = [
  { key: "email", label: "Enter Email", Icon: Mail },
  { key: "otp", label: "Verify OTP", Icon: Shield },
  { key: "reset", label: "New Password", Icon: KeyRound }
];
function StepIndicator({ current }) {
  const currentIdx = STEP_META.findIndex((s) => s.key === current);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center gap-0 mb-6", children: STEP_META.map((step, idx) => {
    const done = idx < currentIdx;
    const active = idx === currentIdx;
    const { Icon } = step;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `w-9 h-9 rounded-full flex items-center justify-center transition-smooth ${done ? "bg-green-500 text-white" : active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`,
            children: done ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 16 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 16 })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `text-[10px] mt-1 font-medium ${active ? "text-primary" : "text-muted-foreground"}`,
            children: step.label
          }
        )
      ] }),
      idx < STEP_META.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `w-12 h-0.5 mx-1 mb-4 transition-smooth ${idx < currentIdx ? "bg-green-500" : "bg-border"}`
        }
      )
    ] }, step.key);
  }) });
}
function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = reactExports.useState("email");
  const [email, setEmail] = reactExports.useState("");
  const [otp, setOtp] = reactExports.useState("");
  const [newPassword, setNewPassword] = reactExports.useState("");
  const [confirmPassword, setConfirmPassword] = reactExports.useState("");
  const [showNew, setShowNew] = reactExports.useState(false);
  const [showConfirm, setShowConfirm] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const [isLoading, setIsLoading] = reactExports.useState(false);
  async function handleEmailSubmit(e) {
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
  function handleOtpSubmit(e) {
    e.preventDefault();
    setError("");
    if (otp !== "123456") {
      setError("Invalid OTP. Please use the demo OTP: 123456");
      return;
    }
    setStep("reset");
  }
  async function handleResetSubmit(e) {
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
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "min-h-[calc(100vh-120px)] flex items-center justify-center py-10 px-4",
        style: {
          background: "linear-gradient(135deg, oklch(0.97 0.01 37) 0%, oklch(0.95 0.02 240) 100%)"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "card-elevated w-full max-w-md shadow-lg text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-10 pb-8 px-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 32, className: "text-green-600" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl text-foreground mb-2", children: "Password Reset Successful!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-6", children: "Your password has been updated. You can now log in with your new password." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              className: "btn-primary w-full",
              onClick: () => router.navigate({ to: "/login" }),
              "data-ocid": "reset-done-login",
              children: "Go to Login / लॉगिन करें"
            }
          )
        ] }) })
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
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary mb-3 shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { size: 24, className: "text-primary-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-xl text-foreground", children: "Reset Password" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "हम होंगे कामयाब — CSR Platform" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "card-elevated shadow-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-lg font-display", children: [
              step === "email" && "Forgot Password?",
              step === "otp" && "Verify Your Identity",
              step === "reset" && "Set New Password"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardDescription, { children: [
              step === "email" && "Enter your registered email to receive an OTP",
              step === "otp" && "Enter the OTP sent to your email address",
              step === "reset" && "Choose a strong new password"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(StepIndicator, { current: step }),
            step === "email" && /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleEmailSubmit, className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "forgot-email", children: "Email Address" }),
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
                      id: "forgot-email",
                      type: "email",
                      placeholder: "you@example.com",
                      value: email,
                      onChange: (e) => setEmail(e.target.value),
                      className: "pl-9",
                      required: true,
                      autoComplete: "email",
                      "data-ocid": "forgot-email"
                    }
                  )
                ] })
              ] }),
              error && /* @__PURE__ */ jsxRuntimeExports.jsxs(Alert, { variant: "destructive", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 16 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDescription, { children: error })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "submit",
                  className: "w-full btn-primary",
                  disabled: isLoading,
                  "data-ocid": "forgot-send-otp",
                  children: isLoading ? "Sending..." : "Send Reset OTP"
                }
              )
            ] }),
            step === "otp" && /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleOtpSubmit, className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md bg-primary/5 border border-primary/20 px-4 py-3 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-foreground mb-1", children: [
                  "OTP sent to: ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: email })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-xs", children: [
                  "Check your email for OTP.",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-primary", children: "Demo OTP: 123456" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "forgot-otp", children: "Enter OTP" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "forgot-otp",
                    type: "text",
                    placeholder: "6-digit OTP",
                    value: otp,
                    onChange: (e) => setOtp(e.target.value),
                    maxLength: 6,
                    className: "text-center text-lg tracking-widest font-mono",
                    "data-ocid": "forgot-otp"
                  }
                )
              ] }),
              error && /* @__PURE__ */ jsxRuntimeExports.jsxs(Alert, { variant: "destructive", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 16 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDescription, { children: error })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    onClick: () => {
                      setStep("email");
                      setError("");
                    },
                    className: "gap-1.5",
                    "data-ocid": "forgot-back-email",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 14 }),
                      " Back"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "submit",
                    className: "flex-1 btn-primary",
                    "data-ocid": "forgot-verify-otp",
                    children: "Verify OTP"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-xs text-muted-foreground", children: [
                "Didn't receive it?",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    className: "text-primary hover:underline font-medium",
                    onClick: () => {
                      setStep("email");
                      setError("");
                    },
                    "data-ocid": "forgot-resend",
                    children: "Resend OTP"
                  }
                )
              ] })
            ] }),
            step === "reset" && /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleResetSubmit, className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "forgot-new-password", children: "New Password" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "forgot-new-password",
                      type: showNew ? "text" : "password",
                      placeholder: "Min. 8 characters",
                      value: newPassword,
                      onChange: (e) => setNewPassword(e.target.value),
                      className: "pr-10",
                      required: true,
                      autoComplete: "new-password",
                      "data-ocid": "forgot-new-password"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setShowNew(!showNew),
                      className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
                      "aria-label": showNew ? "Hide" : "Show",
                      children: showNew ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { size: 16 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 16 })
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "forgot-confirm-password", children: "Confirm New Password" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "forgot-confirm-password",
                      type: showConfirm ? "text" : "password",
                      placeholder: "Repeat your password",
                      value: confirmPassword,
                      onChange: (e) => setConfirmPassword(e.target.value),
                      className: "pr-10",
                      required: true,
                      autoComplete: "new-password",
                      "data-ocid": "forgot-confirm-password"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setShowConfirm(!showConfirm),
                      className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
                      "aria-label": showConfirm ? "Hide" : "Show",
                      children: showConfirm ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { size: 16 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 16 })
                    }
                  )
                ] }),
                confirmPassword && newPassword !== confirmPassword && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: "Passwords do not match" })
              ] }),
              error && /* @__PURE__ */ jsxRuntimeExports.jsxs(Alert, { variant: "destructive", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 16 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDescription, { children: error })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "submit",
                  className: "w-full btn-primary",
                  disabled: isLoading,
                  "data-ocid": "forgot-reset-submit",
                  children: isLoading ? "Resetting..." : "Reset Password / पासवर्ड बदलें"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-sm text-muted-foreground mt-4", children: [
              "Remember your password?",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/login",
                  className: "text-primary font-semibold hover:underline",
                  "data-ocid": "back-to-login",
                  children: "Back to Login"
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
  ForgotPasswordPage as default
};
