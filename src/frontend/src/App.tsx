import { Skeleton } from "@/components/ui/skeleton";
import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { UserRole } from "./backend.d";
import { AuthLayout, PublicLayout } from "./components/Layout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { useAuthStore } from "./store/auth";

// ─── Lazy page imports ───────────────────────────────────────────
const LandingPage = lazy(() => import("./pages/LandingPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const ForgotPasswordPage = lazy(() => import("./pages/ForgotPasswordPage"));

// Admin
const AdminOverview = lazy(() => import("./pages/admin/AdminOverview"));
const AdminCenters = lazy(() => import("./pages/admin/AdminCenters"));
const AdminCourses = lazy(() => import("./pages/admin/AdminCourses"));
const AdminStudents = lazy(() => import("./pages/admin/AdminStudents"));
const AdminPlacements = lazy(() => import("./pages/admin/AdminPlacements"));
const AdminReports = lazy(() => import("./pages/admin/AdminReports"));
const AdminSettings = lazy(() => import("./pages/admin/AdminSettings"));

// Student
const StudentDashboard = lazy(() => import("./pages/student/StudentDashboard"));
const StudentProfile = lazy(() => import("./pages/student/StudentProfile"));
const StudentEnrollments = lazy(
  () => import("./pages/student/StudentEnrollments"),
);
const StudentCourses = lazy(() => import("./pages/student/StudentCourses"));
const StudentPlacements = lazy(
  () => import("./pages/student/StudentPlacements"),
);
const StudentNotifications = lazy(
  () => import("./pages/student/StudentNotifications"),
);

// JobSeeker
const JobSeekerProfile = lazy(
  () => import("./pages/jobseeker/JobSeekerProfile"),
);
const JobSeekerJobs = lazy(() => import("./pages/jobseeker/JobSeekerJobs"));

// Employer
const EmployerDashboard = lazy(
  () => import("./pages/employer/EmployerDashboard"),
);
const EmployerPostJob = lazy(() => import("./pages/employer/EmployerPostJob"));
const EmployerCandidates = lazy(
  () => import("./pages/employer/EmployerCandidates"),
);

// ─── Loading fallback ────────────────────────────────────────────
function PageLoader() {
  return (
    <div className="p-8 space-y-4">
      <Skeleton className="h-8 w-64" />
      <Skeleton className="h-4 w-96" />
      <div className="grid grid-cols-3 gap-4 mt-6">
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
      </div>
    </div>
  );
}

// ─── Route wrappers ──────────────────────────────────────────────
function PublicPage({
  component: Component,
}: { component: React.ComponentType }) {
  return (
    <PublicLayout>
      <Suspense fallback={<PageLoader />}>
        <Component />
      </Suspense>
    </PublicLayout>
  );
}

function AdminPage({
  component: Component,
}: { component: React.ComponentType }) {
  return (
    <ProtectedRoute allowedRoles={[UserRole.Admin, UserRole.CenterManager]}>
      <AuthLayout>
        <Suspense fallback={<PageLoader />}>
          <Component />
        </Suspense>
      </AuthLayout>
    </ProtectedRoute>
  );
}

function StudentPage({
  component: Component,
}: { component: React.ComponentType }) {
  return (
    <ProtectedRoute allowedRoles={[UserRole.Student]}>
      <AuthLayout>
        <Suspense fallback={<PageLoader />}>
          <Component />
        </Suspense>
      </AuthLayout>
    </ProtectedRoute>
  );
}

function JobSeekerPage({
  component: Component,
}: { component: React.ComponentType }) {
  return (
    <ProtectedRoute allowedRoles={[UserRole.JobSeeker]}>
      <AuthLayout>
        <Suspense fallback={<PageLoader />}>
          <Component />
        </Suspense>
      </AuthLayout>
    </ProtectedRoute>
  );
}

function EmployerPage({
  component: Component,
}: { component: React.ComponentType }) {
  return (
    <ProtectedRoute allowedRoles={[UserRole.Employer]}>
      <AuthLayout>
        <Suspense fallback={<PageLoader />}>
          <Component />
        </Suspense>
      </AuthLayout>
    </ProtectedRoute>
  );
}

// ─── Routes ──────────────────────────────────────────────────────
const rootRoute = createRootRoute();

// Public routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <PublicPage component={LandingPage} />,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: () => <PublicPage component={LoginPage} />,
});

const signupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/signup",
  component: () => <PublicPage component={SignupPage} />,
});

const forgotPasswordRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/forgot-password",
  component: () => <PublicPage component={ForgotPasswordPage} />,
});

// Admin routes
const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: () => <AdminPage component={AdminOverview} />,
});

const adminCentersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/centers",
  component: () => <AdminPage component={AdminCenters} />,
});

const adminCoursesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/courses",
  component: () => <AdminPage component={AdminCourses} />,
});

const adminStudentsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/students",
  component: () => <AdminPage component={AdminStudents} />,
});

const adminPlacementsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/placements",
  component: () => <AdminPage component={AdminPlacements} />,
});

const adminReportsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/reports",
  component: () => <AdminPage component={AdminReports} />,
});

const adminSettingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/settings",
  component: () => <AdminPage component={AdminSettings} />,
});

// Student routes
const studentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/student",
  component: () => <StudentPage component={StudentDashboard} />,
});

const studentProfileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/student/profile",
  component: () => <StudentPage component={StudentProfile} />,
});

const studentEnrollmentsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/student/enrollments",
  component: () => <StudentPage component={StudentEnrollments} />,
});

const studentCoursesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/student/courses",
  component: () => <StudentPage component={StudentCourses} />,
});

const studentPlacementsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/student/placements",
  component: () => <StudentPage component={StudentPlacements} />,
});

const studentNotificationsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/student/notifications",
  component: () => <StudentPage component={StudentNotifications} />,
});

// JobSeeker routes
const jobSeekerProfileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/jobseeker/profile",
  component: () => <JobSeekerPage component={JobSeekerProfile} />,
});

const jobSeekerJobsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/jobseeker/jobs",
  component: () => <JobSeekerPage component={JobSeekerJobs} />,
});

// Employer routes
const employerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/employer",
  component: () => <EmployerPage component={EmployerDashboard} />,
});

const employerPostJobRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/employer/post-job",
  component: () => <EmployerPage component={EmployerPostJob} />,
});

const employerCandidatesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/employer/candidates",
  component: () => <EmployerPage component={EmployerCandidates} />,
});

// ─── Router ──────────────────────────────────────────────────────
const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  signupRoute,
  forgotPasswordRoute,
  adminRoute,
  adminCentersRoute,
  adminCoursesRoute,
  adminStudentsRoute,
  adminPlacementsRoute,
  adminReportsRoute,
  adminSettingsRoute,
  studentRoute,
  studentProfileRoute,
  studentEnrollmentsRoute,
  studentCoursesRoute,
  studentPlacementsRoute,
  studentNotificationsRoute,
  jobSeekerProfileRoute,
  jobSeekerJobsRoute,
  employerRoute,
  employerPostJobRoute,
  employerCandidatesRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// ─── App ──────────────────────────────────────────────────────────
export default function App() {
  return <RouterProvider router={router} />;
}
