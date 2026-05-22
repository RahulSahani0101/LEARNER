import type { PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import type { Role } from "../types";

interface ProtectedRouteProps {
  requiredRole?: Role;
}

/**
 * Route guard enforcing authentication and optional role checks.
 */
export function ProtectedRoute({ requiredRole, children }: PropsWithChildren<ProtectedRouteProps>) {
  const location = useLocation();
  const { isAuthenticated, role } = useAuthStore((state) => ({
    isAuthenticated: state.isAuthenticated,
    role: state.role,
  }));

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
