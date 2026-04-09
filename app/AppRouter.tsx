import React, { Suspense, lazy, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { UserRole } from '../shared/types';
import { RoleGuard } from './guards/RoleGuard';
import { PublicLayout } from '../features/public/layouts/PublicLayout';
import { CBETCatalog } from '../features/public/pages/CBETCatalog';
import { getCurrentHashPath, subscribeToHashRouteChanges } from '../shared/utils/hashRoute';
import { useSmoothScrollToTop } from '../shared/hooks/useSmoothScrollToTop';

const LandingPage = lazy(() =>
  import('../features/public/pages/LandingPage').then((module) => ({ default: module.LandingPage }))
);
const LoginPage = lazy(() =>
  import('../features/public/pages/LoginPage').then((module) => ({ default: module.LoginPage }))
);
const FavoritesPage = lazy(() =>
  import('../features/public/pages/FavoritesPage').then((module) => ({ default: module.FavoritesPage }))
);
const PlannerPage = lazy(() =>
  import('../features/public/pages/PlannerPage').then((module) => ({ default: module.PlannerPage }))
);
const DestinationsPage = lazy(() =>
  import('../features/public/pages/DestinationsPage').then((module) => ({ default: module.DestinationsPage }))
);
const PublicPackageDetails = lazy(() =>
  import('../features/public/pages/PublicPackageDetail/PublicPackageDetails').then((module) => ({
    default: module.PublicPackageDetails,
  }))
);
const TravelGuidePage = lazy(() => import('../features/travel-guide/TravelGuidePage'));
const FacultyDashboard = lazy(() =>
  import('../features/faculty/pages/FacultyDashboard').then((module) => ({ default: module.FacultyDashboard }))
);
const FacultyTripDetails = lazy(() =>
  import('../features/faculty/pages/FacultyTripDetails').then((module) => ({
    default: module.FacultyTripDetails,
  }))
);
const AdminDashboard = lazy(() =>
  import('../features/admin/pages/AdminDashboard').then((module) => ({ default: module.AdminDashboard }))
);
const AdminTripDetails = lazy(() =>
  import('../features/admin/pages/AdminTripDetails').then((module) => ({ default: module.AdminTripDetails }))
);

type RouteParams = Record<string, string | undefined>;

interface RouteConfig {
  path: string;
  render: (params: RouteParams) => React.ReactNode;
}

export const matchRoute = (pattern: string, path: string): RouteParams | null => {
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

export const resolveRoute = (path: string, routes: RouteConfig[]) => {
  for (const route of routes) {
    const params = matchRoute(route.path, path);
    if (params) {
      return { route, params };
    }
  }
  return null;
};

const RouteLoader: React.FC = () => (
  <div className="container mx-auto px-4 py-12 md:px-5 xl:px-6">
    <div className="rounded-[28px] border border-border bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold text-text">Loading view…</p>
    </div>
  </div>
);

export const AppRouter: React.FC = () => {
  const { user } = useAuth();
  const [currentPath, setCurrentPath] = useState(getCurrentHashPath);

  useEffect(() => {
    if (!window.location.hash) {
      window.location.hash = '/';
    }
    const handleHashChange = () => {
      setCurrentPath(getCurrentHashPath());
    };
    return subscribeToHashRouteChanges(handleHashChange);
  }, []);

  useSmoothScrollToTop(currentPath);

  const navigate = (path: string) => {
    if (window.location.hash.slice(1).split('?')[0] === path) {
      return;
    }

    window.location.hash = path;
  };

  useEffect(() => {
    if (user && currentPath === '/login') {
      const returnTo = sessionStorage.getItem('returnTo');

      if (user.role === UserRole.ADMIN) {
        sessionStorage.removeItem('returnTo');
        sessionStorage.removeItem('pendingPackageId');
        navigate('/admin/dashboard');
        return;
      }

      if (returnTo) {
        sessionStorage.removeItem('returnTo');
        navigate(returnTo);
      } else if (user.role === UserRole.FACULTY) {
        navigate('/faculty/dashboard');
      }
    }
  }, [currentPath, user]);

  const facultyRoutes: RouteConfig[] = [
    {
      path: '/faculty/trips/:tripId',
      render: (params) => <FacultyTripDetails tripId={params.tripId || ''} />,
    },
    {
      path: '/faculty/dashboard',
      render: () => <FacultyDashboard />,
    },
    {
      path: '/faculty',
      render: () => <FacultyDashboard />,
    },
  ];

  const adminRoutes: RouteConfig[] = [
    {
      path: '/admin/trips/:tripId',
      render: (params) => <AdminTripDetails tripId={params.tripId || ''} />,
    },
    {
      path: '/admin/dashboard',
      render: () => <AdminDashboard />,
    },
    {
      path: '/admin',
      render: () => <AdminDashboard />,
    },
  ];

  const publicRoutes: RouteConfig[] = [
    {
      path: '/login',
      render: () => <LoginPage onLoginSuccess={() => {}} />,
    },
    {
      path: '/about',
      render: () => <LandingPage onNavigate={navigate} />,
    },
    {
      path: '/favorites',
      render: () => <FavoritesPage />,
    },
    {
      path: '/planner',
      render: () => <PlannerPage />,
    },
    {
      path: '/destinations',
      render: () => <DestinationsPage />,
    },
    {
      path: '/travel-guide',
      render: () => <TravelGuidePage />,
    },
    {
      path: '/package/:packageId/:tab?',
      render: (params) => <PublicPackageDetails packageId={params.packageId || ''} tab={params.tab} />,
    },
    {
      path: '*',
      render: () => <CBETCatalog />,
    },
  ];

  const renderWithFallback = (node: React.ReactNode) => <Suspense fallback={<RouteLoader />}>{node}</Suspense>;

  const facultyMatch = resolveRoute(currentPath, facultyRoutes);
  if (facultyMatch) {
    return (
      <RoleGuard allowedRoles={[UserRole.FACULTY]} onNavigate={navigate}>
        {renderWithFallback(facultyMatch.route.render(facultyMatch.params))}
      </RoleGuard>
    );
  }

  const adminMatch = resolveRoute(currentPath, adminRoutes);
  if (adminMatch) {
    return (
      <RoleGuard allowedRoles={[UserRole.ADMIN]} onNavigate={navigate}>
        {renderWithFallback(adminMatch.route.render(adminMatch.params))}
      </RoleGuard>
    );
  }

  const publicMatch = resolveRoute(currentPath, publicRoutes) || {
    route: publicRoutes[publicRoutes.length - 1],
    params: {},
  };

  return (
    <PublicLayout onNavigate={navigate}>
      {renderWithFallback(publicMatch.route.render(publicMatch.params))}
    </PublicLayout>
  );
};
