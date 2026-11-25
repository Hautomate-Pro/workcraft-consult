import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import type { Role } from "../lib/api";
import { useAuth } from "../lib/auth";

type RequireAuthProps = { role?: Role; children: ReactNode };

export function RequireAuth({ role, children }: RequireAuthProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <p role="status" className="py-24 text-center text-sm text-muted">
        Loading…
      </p>
    );
  }
  if (!user) return <Navigate to="/learner-portal" replace />;
  if (role && user.role !== role) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}
