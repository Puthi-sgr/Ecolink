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
import { DestinationsPage } from '../features/public/pages/DestinationsPage';
import { FavoritesPage } from '../features/public/pages/FavoritesPage';
import { PublicPackageDetails } from '../features/public/pages/PublicPackageDetail/PublicPackageDetails';
import TravelGuidePage from '../features/travel-guide/TravelGuidePage';

type RouteParams = Record<string, string | undefined>;

interface RouteConfig {
  path: string;
  render: (params: RouteParams) => React.ReactNode;
}

const matchRoute = (pattern: string, path: string): RouteParams | null => {
  if (pattern === '*') return {};

  const patternSegments = pattern.split('/').filter(Boolean);
  const pathSegments = path.split('/').filter(Boolean);
  const params: RouteParams = {};

  let pIndex = 0;
  let sIndex = 0;

  while (pIndex < patternSegments.length) {
    const segment = patternSegments[pIndex];
    const isParam = segment.startsWith(':');
    const isOptional = isParam && segment.endsWith('?');
    const name = isParam ? segment.slice(1, isOptional ? -1 : undefined) : '';

    if (isParam) {
      if (sIndex >= pathSegments.length) {
        if (isOptional) {
          pIndex += 1;
          continue;
        }
        return null;
      }
      params[name] = pathSegments[sIndex];
      pIndex += 1;
      sIndex += 1;
      continue;
    }

    if (pathSegments[sIndex] !== segment) {
      return null;
    }

    pIndex += 1;
    sIndex += 1;
  }

  if (sIndex < pathSegments.length) {
    return null;
  }

  return params;
};

const resolveRoute = (path: string, routes: RouteConfig[]) => {
  for (const route of routes) {
    const params = matchRoute(route.path, path);
    if (params) {
      return { route, params };
    }
  }
  return null;
};

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPath]);

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

  const facultyRoutes: RouteConfig[] = [
    {
      path: '/faculty/trips/:tripId',
      render: (params) => <FacultyTripDetails tripId={params.tripId || ''} />
    },
    {
      path: '/faculty/dashboard',
      render: () => <FacultyDashboard />
    },
    {
      path: '/faculty',
      render: () => <FacultyDashboard />
    }
  ];

  const adminRoutes: RouteConfig[] = [
    {
      path: '/admin/trips/:tripId',
      render: (params) => <AdminTripDetails tripId={params.tripId || ''} />
    },
    {
      path: '/admin/dashboard',
      render: () => <AdminDashboard />
    },
    {
      path: '/admin',
      render: () => <AdminDashboard />
    }
  ];

  const publicRoutes: RouteConfig[] = [
    {
      path: '/login',
      render: () => <LoginPage onLoginSuccess={(role) => {}} />
    },
    {
      path: '/about',
      render: () => <LandingPage onNavigate={navigate} />
    },
    {
      path: '/favorites',
      render: () => <FavoritesPage />
    },
    {
      path: '/destinations',
      render: () => <DestinationsPage />
    },
    {
      path: '/travel-guide',
      render: () => <TravelGuidePage />
    },
    {
      path: '/package/:packageId/:tab?',
      render: (params) => <PublicPackageDetails packageId={params.packageId || ''} tab={params.tab} />
    },
    {
      path: '*',
      render: () => <CBETCatalog />
    }
  ];

  const facultyMatch = resolveRoute(currentPath, facultyRoutes);
  if (facultyMatch) {
    return (
      <RoleGuard allowedRoles={[UserRole.FACULTY]} onNavigate={navigate}>
        {facultyMatch.route.render(facultyMatch.params)}
      </RoleGuard>
    );
  }

  const adminMatch = resolveRoute(currentPath, adminRoutes);
  if (adminMatch) {
    return (
      <RoleGuard allowedRoles={[UserRole.ADMIN]} onNavigate={navigate}>
        {adminMatch.route.render(adminMatch.params)}
      </RoleGuard>
    );
  }

  const publicMatch = resolveRoute(currentPath, publicRoutes) || {
    route: publicRoutes[publicRoutes.length - 1],
    params: {}
  };

  return (
    <PublicLayout onNavigate={navigate}>
      {publicMatch.route.render(publicMatch.params)}
    </PublicLayout>
  );
};
