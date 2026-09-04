import { Navigate, useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useAuth } from './AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredPermission?: string;
}

export const ProtectedRoute = ({ children, requiredPermission }: ProtectedRouteProps) => {
  const { isAuthenticated, hasPermission, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#0B0B12]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-bio-mint border-t-transparent rounded-full animate-spin"></div>
          <span className="text-xs font-mono text-bio-mint tracking-widest uppercase">
            Loading ORCA User Context...
          </span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredPermission && !hasPermission(requiredPermission)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 p-8 text-center">
        <div className="p-4 rounded-2xl bg-coral-red/10 border border-coral-red/30 text-coral-red text-2xl">
          ⛔
        </div>
        <h2 className="text-xl font-bold text-soft-white uppercase tracking-wider">
          Access Restricted by Role Policy
        </h2>
        <p className="text-xs text-cool-gray max-w-md">
          Your current operational role does not have authorization to view this module. Contact the ORCA system administrator or switch to a permitted demo role.
        </p>
      </div>
    );
  }

  return <>{children}</>;
};
