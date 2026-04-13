import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link, useRouter } from "@tanstack/react-router";
import {
  BarChart3,
  Bell,
  BookOpen,
  Briefcase,
  Building2,
  ChevronRight,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  MapPin,
  Menu,
  Settings,
  Trophy,
  User,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import { UserRole } from "../backend.d";
import { useLanguage } from "../context/LanguageContext";
import { useAuthStore } from "../store/auth";
import { ROLE_LABELS } from "../types";
import { LanguageToggle } from "./LanguageToggle";

// ─── Nav Item Types ─────────────────────────────────────────────
type NavItem = { label: string; path: string; icon: React.ReactNode };

const adminNav: NavItem[] = [
  { label: "Overview", path: "/admin", icon: <LayoutDashboard size={16} /> },
  { label: "Centers", path: "/admin/centers", icon: <MapPin size={16} /> },
  { label: "Courses", path: "/admin/courses", icon: <BookOpen size={16} /> },
  { label: "Students", path: "/admin/students", icon: <Users size={16} /> },
  {
    label: "Placements",
    path: "/admin/placements",
    icon: <Trophy size={16} />,
  },
  { label: "Reports", path: "/admin/reports", icon: <BarChart3 size={16} /> },
  { label: "Settings", path: "/admin/settings", icon: <Settings size={16} /> },
];

const studentNav: NavItem[] = [
  { label: "Dashboard", path: "/student", icon: <LayoutDashboard size={16} /> },
  { label: "My Profile", path: "/student/profile", icon: <User size={16} /> },
  {
    label: "Enrollments",
    path: "/student/enrollments",
    icon: <BookOpen size={16} />,
  },
  {
    label: "Courses",
    path: "/student/courses",
    icon: <GraduationCap size={16} />,
  },
  {
    label: "Placements",
    path: "/student/placements",
    icon: <Trophy size={16} />,
  },
  {
    label: "Notifications",
    path: "/student/notifications",
    icon: <Bell size={16} />,
  },
];

const jobSeekerNav: NavItem[] = [
  { label: "My Profile", path: "/jobseeker/profile", icon: <User size={16} /> },
  {
    label: "Job Search",
    path: "/jobseeker/jobs",
    icon: <Briefcase size={16} />,
  },
];

const employerNav: NavItem[] = [
  {
    label: "Dashboard",
    path: "/employer",
    icon: <LayoutDashboard size={16} />,
  },
  {
    label: "Post a Job",
    path: "/employer/post-job",
    icon: <Briefcase size={16} />,
  },
  {
    label: "Candidates",
    path: "/employer/candidates",
    icon: <Users size={16} />,
  },
];

function getNavItems(role: UserRole | null): NavItem[] {
  if (role === UserRole.Admin || role === UserRole.CenterManager)
    return adminNav;
  if (role === UserRole.Student) return studentNav;
  if (role === UserRole.JobSeeker) return jobSeekerNav;
  if (role === UserRole.Employer) return employerNav;
  return [];
}

// ─── Public Layout ──────────────────────────────────────────────
function PublicHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <header
      className="bg-card border-b border-border shadow-sm sticky top-0 z-50"
      data-ocid="public-header"
    >
      {/* Saffron government stripe */}
      <div className="h-1 bg-primary w-full" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
              <span className="text-primary-foreground font-display font-bold text-sm">
                HHK
              </span>
            </div>
            <div className="min-w-0">
              <p className="font-display font-bold text-foreground text-sm leading-tight truncate">
                हम होंगे कामयाब
              </p>
              <p className="text-muted-foreground text-xs truncate">
                Shree Raipur Cement CSR
              </p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {[
              { label: "Home", path: "/" },
              { label: "Jobs", path: "/jobseeker/jobs" },
              { label: "Courses", path: "/student/courses" },
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="px-3 py-2 text-sm text-foreground hover:text-primary hover:bg-muted rounded-sm transition-smooth font-body"
              >
                {t(item.label)}
              </Link>
            ))}
            <Separator orientation="vertical" className="h-5 mx-2" />
            <LanguageToggle className="mr-1" />
            <Link to="/login">
              <Button variant="outline" size="sm" data-ocid="nav-login">
                {t("Login")}
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="sm" className="btn-primary" data-ocid="nav-signup">
                अपने आप को रजिस्टर करें
              </Button>
            </Link>
          </nav>

          {/* Mobile: language toggle + hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageToggle />
            <button
              type="button"
              className="p-2 text-foreground hover:bg-muted rounded-sm"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <div className="md:hidden pb-4 space-y-1 border-t border-border pt-3">
            {[
              { label: "Home", path: "/" },
              { label: "Jobs", path: "/jobseeker/jobs" },
              { label: "Courses", path: "/student/courses" },
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className="block px-3 py-2 text-sm text-foreground hover:bg-muted rounded-sm transition-smooth"
              >
                {t(item.label)}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-2">
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                <Button variant="outline" size="sm" className="w-full">
                  {t("Login")}
                </Button>
              </Link>
              <Link to="/signup" onClick={() => setMenuOpen(false)}>
                <Button size="sm" className="btn-primary w-full">
                  {t("Register")}
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

// ─── Authenticated Sidebar Layout ────────────────────────────────
function AuthSidebar({ navItems }: { navItems: NavItem[] }) {
  const { user, role, logout } = useAuthStore();
  const { t } = useLanguage();
  const router = useRouter();
  const currentPath = router.state.location.pathname;

  const handleLogout = () => {
    logout();
    router.navigate({ to: "/login" });
  };

  const initials = user
    ? `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase()
    : "??";

  return (
    <aside
      className="w-64 shrink-0 bg-card border-r border-border flex flex-col h-full"
      data-ocid="app-sidebar"
    >
      {/* Brand */}
      <div className="h-1 bg-primary w-full" />
      <div className="px-4 py-4 border-b border-border">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xs">
              HHK
            </span>
          </div>
          <div>
            <p className="font-display font-bold text-xs text-foreground leading-tight">
              हम होंगे कामयाब
            </p>
            <p className="text-muted-foreground text-[10px]">CSR Platform</p>
          </div>
        </Link>
      </div>

      {/* User profile */}
      <div className="px-4 py-3 border-b border-border">
        <div className="flex items-center gap-3">
          <Avatar className="w-9 h-9">
            <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-foreground truncate">
              {user ? `${user.firstName} ${user.lastName}` : "User"}
            </p>
            {role && (
              <Badge
                variant="secondary"
                className="text-[10px] px-1.5 py-0 mt-0.5"
              >
                {ROLE_LABELS[role]}
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive =
            currentPath === item.path ||
            (item.path !== "/admin" &&
              item.path !== "/student" &&
              item.path !== "/employer" &&
              currentPath.startsWith(item.path));
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-sm text-sm transition-smooth ${
                isActive
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-foreground hover:bg-muted hover:text-foreground"
              }`}
              data-ocid={`sidebar-nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <span
                className={isActive ? "text-primary" : "text-muted-foreground"}
              >
                {item.icon}
              </span>
              <span className="flex-1">{t(item.label)}</span>
              {isActive && <ChevronRight size={12} className="text-primary" />}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-border">
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/5 rounded-sm transition-smooth"
          data-ocid="sidebar-logout"
        >
          <LogOut size={16} />
          <span>{t("Logout")}</span>
        </button>
      </div>
    </aside>
  );
}

// ─── Authenticated Header (mobile) ───────────────────────────────
function AuthHeader({ navItems }: { navItems: NavItem[] }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, role, logout } = useAuthStore();
  const { t } = useLanguage();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.navigate({ to: "/login" });
  };

  const initials = user
    ? `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase()
    : "??";

  return (
    <header
      className="bg-card border-b border-border sticky top-0 z-50 lg:hidden"
      data-ocid="auth-header-mobile"
    >
      <div className="h-1 bg-primary w-full" />
      <div className="px-4 flex items-center justify-between h-14">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-[10px]">
              HHK
            </span>
          </div>
          <span className="font-display font-bold text-sm">हम होंगे कामयाब</span>
        </Link>
        <div className="flex items-center gap-2">
          {role && (
            <Badge variant="outline" className="text-xs hidden sm:flex">
              {ROLE_LABELS[role]}
            </Badge>
          )}
          <LanguageToggle />
          <Avatar className="w-7 h-7">
            <AvatarFallback className="bg-primary/10 text-primary text-[10px] font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1.5 hover:bg-muted rounded-sm"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-border bg-card pb-3 px-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 text-sm text-foreground hover:bg-muted rounded-sm transition-smooth"
            >
              {item.icon}
              {t(item.label)}
            </Link>
          ))}
          <Separator className="my-2" />
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-muted-foreground hover:text-destructive"
          >
            <LogOut size={16} /> {t("Logout")}
          </button>
        </div>
      )}
    </header>
  );
}

// ─── Footer ──────────────────────────────────────────────────────
function Footer() {
  const { t } = useLanguage();
  return (
    <footer
      className="bg-card border-t border-border py-6 mt-auto"
      data-ocid="site-footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <Building2 size={14} className="text-primary" />
          </div>
          <div>
            <p className="font-display font-semibold text-sm text-foreground">
              हम होंगे कामयाब
            </p>
            <p className="text-xs text-muted-foreground">
              Shree Raipur Cement Plant CSR Initiative
            </p>
          </div>
        </div>
        <div className="flex items-center gap-6 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-primary transition-colors">
            {t("Home")}
          </Link>
          <Link
            to="/jobseeker/jobs"
            className="hover:text-primary transition-colors"
          >
            {t("Jobs")}
          </Link>
          <Link to="/login" className="hover:text-primary transition-colors">
            {t("Login")}
          </Link>
        </div>
        <p className="text-xs text-muted-foreground text-center">
          © {new Date().getFullYear()}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors underline underline-offset-2"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </footer>
  );
}

// ─── Public Layout ───────────────────────────────────────────────
export function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PublicHeader />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

// ─── Authenticated Layout ────────────────────────────────────────
export function AuthLayout({ children }: { children: React.ReactNode }) {
  const { role } = useAuthStore();
  const navItems = getNavItems(role);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AuthHeader navItems={navItems} />
      <div className="flex flex-1 overflow-hidden">
        {/* Desktop sidebar */}
        <div className="hidden lg:flex h-[calc(100vh-0px)] sticky top-0">
          <AuthSidebar navItems={navItems} />
        </div>
        <main
          className="flex-1 overflow-y-auto p-6 bg-background"
          data-ocid="auth-main-content"
        >
          {children}
        </main>
      </div>
    </div>
  );
}

// ─── Default export (public) ──────────────────────────────────────
export default function Layout({ children }: { children: React.ReactNode }) {
  return <PublicLayout>{children}</PublicLayout>;
}
