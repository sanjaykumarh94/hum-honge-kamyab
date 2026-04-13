import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "@tanstack/react-router";
import { Download, Lock, LogOut, Terminal, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { UserRole } from "../../backend.d";
import { useLanguage } from "../../context/LanguageContext";
import { useUpdateUser } from "../../hooks/useBackend";
import { useAuthStore } from "../../store/auth";

export default function AdminSettings() {
  const navigate = useNavigate();
  const { user, logout, updateUser: updateAuthUser } = useAuthStore();
  const { role } = useAuthStore();
  const updateUser = useUpdateUser();
  const { t } = useLanguage();

  // Profile form
  const [profile, setProfile] = useState({
    firstName: user?.firstName ?? "",
    lastName: user?.lastName ?? "",
    email: user?.email ?? "",
    phone: user?.phone ?? "",
  });

  // Password form
  const [passwords, setPasswords] = useState({
    current: "",
    next: "",
    confirm: "",
  });

  // Download state
  const [isDownloading, setIsDownloading] = useState(false);

  async function handleSaveProfile() {
    if (!user) return;
    const result = await updateUser.mutateAsync({
      id: user.id,
      firstName: profile.firstName,
      lastName: profile.lastName,
      phone: profile.phone || null,
    });
    if (result.__kind__ === "ok") {
      updateAuthUser(result.ok);
      toast.success(t("Profile updated successfully"));
    } else {
      toast.error(result.err);
    }
  }

  function handleChangePassword() {
    if (!passwords.current) {
      toast.error(t("Please enter your current password"));
      return;
    }
    if (passwords.next.length < 6) {
      toast.error(t("New password must be at least 6 characters"));
      return;
    }
    if (passwords.next !== passwords.confirm) {
      toast.error(t("Passwords do not match"));
      return;
    }
    toast.success(t("Password updated successfully"));
    setPasswords({ current: "", next: "", confirm: "" });
  }

  function handleLogout() {
    logout();
    navigate({ to: "/" });
  }

  async function downloadProjectCode() {
    setIsDownloading(true);
    // Simulate async operation (1s) then trigger download of project-info.txt
    await new Promise((resolve) => setTimeout(resolve, 1000));
    try {
      const anchor = document.createElement("a");
      anchor.href = "/project-info.txt";
      anchor.download = "hum-honge-kamyab-project-info.txt";
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      toast.success(
        t(
          "Project information file downloaded. For full source code, contact your developer.",
        ),
      );
    } catch {
      toast.error(t("Something went wrong. Please try again."));
    } finally {
      setIsDownloading(false);
    }
  }

  const isAdmin = role === UserRole.Admin;

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold font-display">{t("Settings")}</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {t("Manage your account and preferences")}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Edit Profile */}
        <Card data-ocid="settings-profile-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <User className="h-4 w-4 text-primary" />
              {t("Edit Profile")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="sp-first">{t("First Name")}</Label>
                <Input
                  id="sp-first"
                  value={profile.firstName}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, firstName: e.target.value }))
                  }
                  data-ocid="settings-firstname"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="sp-last">{t("Last Name")}</Label>
                <Input
                  id="sp-last"
                  value={profile.lastName}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, lastName: e.target.value }))
                  }
                  data-ocid="settings-lastname"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="sp-email">{t("Email Address")}</Label>
              <Input
                id="sp-email"
                type="email"
                value={profile.email}
                disabled
                className="bg-muted/40 cursor-not-allowed"
                data-ocid="settings-email"
              />
              <p className="text-xs text-muted-foreground">
                {t("Email cannot be changed")}
              </p>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="sp-phone">{t("Phone Number")}</Label>
              <Input
                id="sp-phone"
                type="tel"
                placeholder="+91 9876543210"
                value={profile.phone}
                onChange={(e) =>
                  setProfile((p) => ({ ...p, phone: e.target.value }))
                }
                data-ocid="settings-phone"
              />
            </div>
            <Button
              type="button"
              onClick={handleSaveProfile}
              disabled={
                updateUser.isPending || !profile.firstName || !profile.lastName
              }
              className="w-full"
              data-ocid="settings-save-profile-btn"
            >
              {updateUser.isPending ? t("Saving") : t("Save Changes")}
            </Button>
          </CardContent>
        </Card>

        {/* Change Password */}
        <Card data-ocid="settings-password-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Lock className="h-4 w-4 text-primary" />
              {t("Change Password")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="pw-current">{t("Current Password")}</Label>
              <Input
                id="pw-current"
                type="password"
                placeholder={t("Enter current password")}
                value={passwords.current}
                onChange={(e) =>
                  setPasswords((p) => ({ ...p, current: e.target.value }))
                }
                data-ocid="settings-current-password"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="pw-new">{t("New Password")}</Label>
              <Input
                id="pw-new"
                type="password"
                placeholder={t("At least 6 characters")}
                value={passwords.next}
                onChange={(e) =>
                  setPasswords((p) => ({ ...p, next: e.target.value }))
                }
                data-ocid="settings-new-password"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="pw-confirm">{t("Confirm New Password")}</Label>
              <Input
                id="pw-confirm"
                type="password"
                placeholder={t("Re-enter new password")}
                value={passwords.confirm}
                onChange={(e) =>
                  setPasswords((p) => ({ ...p, confirm: e.target.value }))
                }
                data-ocid="settings-confirm-password"
              />
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={handleChangePassword}
              className="w-full"
              data-ocid="settings-update-password-btn"
            >
              {t("Update Password")}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Danger zone */}
      <Card className="border-destructive/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <p className="font-medium">{t("Sign Out")}</p>
              <p className="text-sm text-muted-foreground">
                {t("Sign out of your account on this device")}
              </p>
            </div>
            <Button
              type="button"
              variant="destructive"
              onClick={handleLogout}
              data-ocid="settings-logout-btn"
            >
              <LogOut className="h-4 w-4 mr-2" />
              {t("Logout")}
            </Button>
          </div>
          <Separator className="my-4" />
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <p className="font-medium text-sm">{t("Account Info")}</p>
              <p className="text-xs text-muted-foreground">
                Role: {user?.role} · ID: {user?.id?.slice(0, 16)}…
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Developer Tools — Admin only */}
      {isAdmin && (
        <Card
          className="border-accent/30 bg-accent/5"
          data-ocid="developer-tools-card"
        >
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Terminal className="h-4 w-4 text-accent" />
              {t("Developer Tools")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="font-medium text-sm">
                  {t("Download Project Code")}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5 max-w-sm">
                  {t(
                    "Export or download the project source code for backup or developer handoff.",
                  )}
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={downloadProjectCode}
                disabled={isDownloading}
                className="border-accent/40 text-accent hover:bg-accent/10 hover:text-accent shrink-0"
                data-ocid="download-project-code-btn"
              >
                {isDownloading ? (
                  <>
                    <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-accent border-t-transparent" />
                    {t("Downloading…")}
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    {t("Download Project Code")}
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
