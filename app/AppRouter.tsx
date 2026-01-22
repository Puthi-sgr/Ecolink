import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { UserRole } from '../shared/types';
import { RoleGuard } from './guards/RoleGuard';

import { PublicLayout } from '../features/public/layouts/PublicLayout';
import { LandingPage } from '../features/public/pages/LandingPage';
import { LoginPage } from '../features/public/pages/LoginPage';
import { FacultyDashboard } from '../features/faculty/pages/FacultyDashboard';
import { FacultyTripDetails } from '../features/faculty/pages/FacultyTripDetails';
import { AdminDashboard } from '../features/admin/pages/AdminDashboard';
import { AdminTripDetails } from '../features/admin/pages/AdminTripDetails';
import { CBETCatalog } from '../features/public/pages/CBETCatalog';
import { PublicPackageDetails } from '../features/public/pages/PublicPackageDetail/PublicPackageDetails';
import TravelGuidePage from '../features/travel-guide/TravelGuidePage';

export const AppRouter: React.FC = () => {
  const { user } = useAuth();
  const [currentPath, setCurrentPath] = useState(window.location.hash.slice(1) || '/');

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash.slice(1) || '/');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path: string) => {
    window.location.hash = path;
  };

  // Login Redirects with ReturnTo logic
  useEffect(() => {
    if (user && currentPath === '/login') {
        const returnTo = sessionStorage.getItem('returnTo');

        // ADMIN OVERRIDE: Always go to dashboard.
        if (user.role === UserRole.ADMIN) {
             sessionStorage.removeItem('returnTo');
             sessionStorage.removeItem('pendingPackageId'); 
             navigate('/admin/dashboard');
             return;
        }
        
        if (returnTo) {
            sessionStorage.removeItem('returnTo');
            navigate(returnTo);
        } else {
            if (user.role === UserRole.FACULTY) {
                navigate('/faculty/dashboard');
            } 
        }
    }
  }, [user, currentPath]);

  // --- Protected Routes ---

  // Faculty Routes
  if (currentPath.startsWith('/faculty')) {
    const tripDetailMatch = currentPath.match(/\/faculty\/trips\/(.+)/);
    
    return (
      <RoleGuard allowedRoles={[UserRole.FACULTY]} onNavigate={navigate}>
         {tripDetailMatch ? (
             <FacultyTripDetails tripId={tripDetailMatch[1]} />
         ) : (
             <FacultyDashboard />
         )}
      </RoleGuard>
    );
  }

  // Admin Routes
  if (currentPath.startsWith('/admin')) {
    const tripDetailMatch = currentPath.match(/\/admin\/trips\/(.+)/);

    return (
      <RoleGuard allowedRoles={[UserRole.ADMIN]} onNavigate={navigate}>
        {tripDetailMatch ? (
            <AdminTripDetails tripId={tripDetailMatch[1]} />
        ) : (
            <AdminDashboard />
        )}
      </RoleGuard>
    );
  }

  // --- Public Routes ---
  const packageDetailMatch = currentPath.match(/\/package\/(.+)/);

  return (
    <PublicLayout onNavigate={navigate}>
      {currentPath === '/login' ? (
        <LoginPage onLoginSuccess={(role) => {}} />
      ) : currentPath === '/about' ? (
        <LandingPage onNavigate={navigate} />
      ) : currentPath === '/travel-guide' ? (
        <TravelGuidePage />
      ) : packageDetailMatch ? (
        <PublicPackageDetails packageId={packageDetailMatch[1]} />
      ) : (
        <CBETCatalog />
      )}
    </PublicLayout>
  );
};
