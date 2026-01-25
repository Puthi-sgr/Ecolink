import React, { useEffect } from 'react';
import { UserRole } from '../../shared/types';
import { useAuth } from '../AuthContext';

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
  redirectPath?: string;
  onNavigate: (path: string) => void;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({
  children,
  allowedRoles,
  redirectPath = '/login',
  onNavigate
}) => {
  const { user, login } = useAuth();
  const demoAutoLogin = true;

  // Check if user exists and has permission
  const hasAccess = user && allowedRoles.includes(user.role);

  useEffect(() => {
    if (!user && demoAutoLogin) {
      const demoRole = allowedRoles[0] ?? UserRole.PUBLIC;
      login(demoRole);
      return;
    }
    if (!user) {
      // Not logged in - Capture intent
      const currentHash = window.location.hash.slice(1);
      // Avoid loops or overwriting if already on login
      if (currentHash && currentHash !== '/login') {
        sessionStorage.setItem('returnTo', currentHash);
      }
      onNavigate('/login');
    } else if (!hasAccess) {
      // Logged in but wrong role
      onNavigate(redirectPath);
    }
  }, [user, hasAccess, redirectPath, onNavigate, login, allowedRoles, demoAutoLogin]);

  if (!hasAccess) {
    return null;
  }

  return <>{children}</>;
};
