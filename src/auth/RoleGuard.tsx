import type { ReactNode } from 'react';
import { useAuth } from './AuthContext';
import type { UserRole } from './userTypes';

interface RoleGuardProps {
  allowedRoles?: UserRole[];
  requiredPermission?: string;
  fallback?: ReactNode;
  children: ReactNode;
}

export const RoleGuard = ({
  allowedRoles,
  requiredPermission,
  fallback = null,
  children,
}: RoleGuardProps) => {
  const { role, hasPermission } = useAuth();

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <>{fallback}</>;
  }

  if (requiredPermission && !hasPermission(requiredPermission)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
