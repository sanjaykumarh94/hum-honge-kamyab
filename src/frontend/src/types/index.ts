// Re-export backend types with frontend-friendly additions
export type {
  User,
  Center,
  Course,
  Enrollment,
  Job,
  Application,
  PlacementDrive,
  PlacementRecord,
  Notification,
  StudentProfile,
  JobSeekerProfile,
  Experience,
  Education,
  UserId,
  Timestamp,
} from "../backend.d";
export { UserRole } from "../backend.d";

export interface AuthState {
  user: import("../backend.d").User | null;
  role: import("../backend.d").UserRole | null;
  isAuthenticated: boolean;
}

export type NavItem = {
  label: string;
  path: string;
  icon?: string;
};

export type RoleDashboardPath = {
  [key in import("../backend.d").UserRole]: string;
};

export const ROLE_DASHBOARD: RoleDashboardPath = {
  Admin: "/admin",
  CenterManager: "/admin",
  Student: "/student",
  JobSeeker: "/jobseeker/profile",
  Employer: "/employer",
};

export const ROLE_LABELS: Record<import("../backend.d").UserRole, string> = {
  Admin: "Administrator",
  CenterManager: "Center Manager",
  Student: "Student",
  JobSeeker: "Job Seeker",
  Employer: "Employer",
};
