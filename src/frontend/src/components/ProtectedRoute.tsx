import { Navigate } from "@tanstack/react-router";
import type { UserRole } from "../backend.d";
import { useAuthStore } from "../store/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) {
  const { isAuthenticated, role } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && role && !allowedRoles.includes(role)) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}
