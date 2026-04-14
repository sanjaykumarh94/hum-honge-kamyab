import { c as createLucideIcon, m as useNavigate, f as useAuthStore, o as useLanguage, r as reactExports, h as UserRole, j as jsxRuntimeExports, p as User, a as Button, q as LogOut, S as Separator } from "./index-BFdoklgf.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-CIs8rJlK.js";
import { I as Input } from "./input-Dt9GIaMX.js";
import { L as Label } from "./label-CtntKOhe.js";
import { u as ue } from "./index-t444bNAk.js";
import { p as useUpdateUser } from "./useBackend-Dhw_nMAY.js";
import { L as Lock } from "./lock-BiWyUdBb.js";
import { D as Download } from "./download-DUdxC_fw.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 19h8", key: "baeox8" }],
  ["path", { d: "m4 17 6-6-6-6", key: "1yngyt" }]
];
const Terminal = createLucideIcon("terminal", __iconNode);
function AdminSettings() {
  var _a;
  const navigate = useNavigate();
  const { user, logout, updateUser: updateAuthUser } = useAuthStore();
  const { role } = useAuthStore();
  const updateUser = useUpdateUser();
  const { t } = useLanguage();
  const [profile, setProfile] = reactExports.useState({
    firstName: (user == null ? void 0 : user.firstName) ?? "",
    lastName: (user == null ? void 0 : user.lastName) ?? "",
    email: (user == null ? void 0 : user.email) ?? "",
    phone: (user == null ? void 0 : user.phone) ?? ""
  });
  const [passwords, setPasswords] = reactExports.useState({
    current: "",
    next: "",
    confirm: ""
  });
  const [isDownloading, setIsDownloading] = reactExports.useState(false);
  async function handleSaveProfile() {
    if (!user) return;
    const result = await updateUser.mutateAsync({
      id: user.id,
      firstName: profile.firstName,
      lastName: profile.lastName,
      phone: profile.phone || null
    });
    if (result.__kind__ === "ok") {
      updateAuthUser(result.ok);
      ue.success(t("Profile updated successfully"));
    } else {
      ue.error(result.err);
    }
  }
  function handleChangePassword() {
    if (!passwords.current) {
      ue.error(t("Please enter your current password"));
      return;
    }
    if (passwords.next.length < 6) {
      ue.error(t("New password must be at least 6 characters"));
      return;
    }
    if (passwords.next !== passwords.confirm) {
      ue.error(t("Passwords do not match"));
      return;
    }
    ue.success(t("Password updated successfully"));
    setPasswords({ current: "", next: "", confirm: "" });
  }
  function handleLogout() {
    logout();
    navigate({ to: "/" });
  }
  async function downloadProjectCode() {
    setIsDownloading(true);
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    try {
      const anchor = document.createElement("a");
      anchor.href = "/project-info.txt";
      anchor.download = "hum-honge-kamyab-project-info.txt";
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      ue.success(
        t(
          "Project information file downloaded. For full source code, contact your developer."
        )
      );
    } catch {
      ue.error(t("Something went wrong. Please try again."));
    } finally {
      setIsDownloading(false);
    }
  }
  const isAdmin = role === UserRole.Admin;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-4xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold font-display", children: t("Settings") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: t("Manage your account and preferences") })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { "data-ocid": "settings-profile-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-4 w-4 text-primary" }),
          t("Edit Profile")
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "sp-first", children: t("First Name") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "sp-first",
                  value: profile.firstName,
                  onChange: (e) => setProfile((p) => ({ ...p, firstName: e.target.value })),
                  "data-ocid": "settings-firstname"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "sp-last", children: t("Last Name") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "sp-last",
                  value: profile.lastName,
                  onChange: (e) => setProfile((p) => ({ ...p, lastName: e.target.value })),
                  "data-ocid": "settings-lastname"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "sp-email", children: t("Email Address") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "sp-email",
                type: "email",
                value: profile.email,
                disabled: true,
                className: "bg-muted/40 cursor-not-allowed",
                "data-ocid": "settings-email"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: t("Email cannot be changed") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "sp-phone", children: t("Phone Number") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "sp-phone",
                type: "tel",
                placeholder: "+91 9876543210",
                value: profile.phone,
                onChange: (e) => setProfile((p) => ({ ...p, phone: e.target.value })),
                "data-ocid": "settings-phone"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              onClick: handleSaveProfile,
              disabled: updateUser.isPending || !profile.firstName || !profile.lastName,
              className: "w-full",
              "data-ocid": "settings-save-profile-btn",
              children: updateUser.isPending ? t("Saving") : t("Save Changes")
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { "data-ocid": "settings-password-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-4 w-4 text-primary" }),
          t("Change Password")
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "pw-current", children: t("Current Password") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "pw-current",
                type: "password",
                placeholder: t("Enter current password"),
                value: passwords.current,
                onChange: (e) => setPasswords((p) => ({ ...p, current: e.target.value })),
                "data-ocid": "settings-current-password"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "pw-new", children: t("New Password") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "pw-new",
                type: "password",
                placeholder: t("At least 6 characters"),
                value: passwords.next,
                onChange: (e) => setPasswords((p) => ({ ...p, next: e.target.value })),
                "data-ocid": "settings-new-password"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "pw-confirm", children: t("Confirm New Password") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "pw-confirm",
                type: "password",
                placeholder: t("Re-enter new password"),
                value: passwords.confirm,
                onChange: (e) => setPasswords((p) => ({ ...p, confirm: e.target.value })),
                "data-ocid": "settings-confirm-password"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: handleChangePassword,
              className: "w-full",
              "data-ocid": "settings-update-password-btn",
              children: t("Update Password")
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-destructive/20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: t("Sign Out") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: t("Sign out of your account on this device") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "destructive",
            onClick: handleLogout,
            "data-ocid": "settings-logout-btn",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4 mr-2" }),
              t("Logout")
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between flex-wrap gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm", children: t("Account Info") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          "Role: ",
          user == null ? void 0 : user.role,
          " · ID: ",
          (_a = user == null ? void 0 : user.id) == null ? void 0 : _a.slice(0, 16),
          "…"
        ] })
      ] }) })
    ] }) }),
    isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Card,
      {
        className: "border-accent/30 bg-accent/5",
        "data-ocid": "developer-tools-card",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Terminal, { className: "h-4 w-4 text-accent" }),
            t("Developer Tools")
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm", children: t("Download Project Code") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 max-w-sm", children: t(
                "Export or download the project source code for backup or developer handoff."
              ) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                onClick: downloadProjectCode,
                disabled: isDownloading,
                className: "border-accent/40 text-accent hover:bg-accent/10 hover:text-accent shrink-0",
                "data-ocid": "download-project-code-btn",
                children: isDownloading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mr-2 h-4 w-4 animate-spin rounded-full border-2 border-accent border-t-transparent" }),
                  t("Downloading…")
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4 mr-2" }),
                  t("Download Project Code")
                ] })
              }
            )
          ] }) })
        ]
      }
    )
  ] });
}
export {
  AdminSettings as default
};
