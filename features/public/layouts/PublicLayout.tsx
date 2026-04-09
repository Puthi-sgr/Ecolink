import React, { useEffect, useMemo, useState } from 'react';
import { Button } from '../../../shared/atoms/Button';
import { useAuth } from '../../../app/AuthContext';
import { UserRole } from '../../../shared/types';
import { getCurrentHashPath, getCurrentHashQuery } from '../../../shared/utils/hashRoute';
import { ChevronRight, Heart, Home, Info, Map, Menu, Route, UserCircle, X, BookOpen } from 'lucide-react';
import { CldImage } from '../../../shared/atoms/CldImage';

interface PublicLayoutProps {
  children: React.ReactNode;
  onNavigate: (path: string) => void;
}

export const PublicLayout: React.FC<PublicLayoutProps> = ({ children, onNavigate }) => {
  const { user } = useAuth();
  const [activePath, setActivePath] = useState(getCurrentHashPath);
  const [isPrintMode, setIsPrintMode] = useState(Boolean(getCurrentHashQuery().get('print')));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showPrototypeNotice, setShowPrototypeNotice] = useState(true);
  const isHome = activePath === '/';
  const isDestinations = activePath.startsWith('/destinations') || activePath.startsWith('/package');
  const isTravelGuide = activePath.startsWith('/travel-guide');
  const isFavorites = activePath.startsWith('/favorites');
  const isPlanner = activePath.startsWith('/planner');
  const isAbout = activePath.startsWith('/about');

  const navItems = useMemo(
    () => [
      { label: 'Home', href: '/', icon: Home, active: isHome },
      { label: 'Destinations', href: '/destinations', icon: Map, active: isDestinations },
      { label: 'Planner', href: '/planner', icon: Route, active: isPlanner },
      { label: 'Travel Guide', href: '/travel-guide', icon: BookOpen, active: isTravelGuide },
      { label: 'Favorites', href: '/favorites', icon: Heart, active: isFavorites },
      { label: 'How It Works', href: '/about', icon: Info, active: isAbout },
    ],
    [isAbout, isDestinations, isFavorites, isHome, isPlanner, isTravelGuide]
  );

  useEffect(() => {
    const handleHashChange = () => {
      setActivePath(getCurrentHashPath());
      setIsPrintMode(Boolean(getCurrentHashQuery().get('print')));
      setMobileMenuOpen(false);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handlePortalAction = () => {
    if (user) {
      if (user.role === UserRole.FACULTY) {
        onNavigate('/faculty/dashboard');
      } else if (user.role === UserRole.ADMIN) {
        onNavigate('/admin/dashboard');
      }
    } else {
      onNavigate('/login');
    }
  };

  const portalLabel = user ? 'Open Portal' : 'Sign In';

  if (isPrintMode) {
    return (
      <div className="min-h-screen bg-white" data-print-layout="true">
        <main id="main-content" className="min-h-screen">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-text focus:shadow-lg"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-50 w-full border-b border-border bg-white/95 backdrop-blur" data-app-shell="true">
        <div className="container mx-auto px-4 md:px-5 xl:px-6 h-16 flex items-center justify-between">
          <a
            href="#/"
            className="flex items-center gap-3 group"
            onClick={(event) => {
              event.preventDefault();
              onNavigate('/');
            }}
          >
            <div className="w-10 h-10 rounded-eco bg-surface-2 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <CldImage assetKey="logo.main" alt="EcoLink logo" className="h-8 w-8 object-contain" />
            </div>
            <div>
              <span className="font-bold text-xl text-text font-serif tracking-tight">EcoLink</span>
              <p className="hidden md:block text-xs uppercase tracking-[0.18em] text-text-muted">
                Community-Based Ecotourism Planning
              </p>
            </div>
          </a>

          <nav aria-label="Primary" className="hidden md:flex items-center gap-2">
            {navItems.map(({ label, href, icon: Icon, active }) => (
              <a
                key={href}
                href={`#${href}`}
                aria-current={active ? 'page' : undefined}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[15px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 ${
                  active
                    ? 'bg-primary/10 text-primary'
                    : 'text-text-muted hover:bg-surface-2 hover:text-text'
                }`}
                onClick={(event) => {
                  event.preventDefault();
                  onNavigate(href);
                }}
              >
                <Icon className="w-4 h-4" aria-hidden="true" />
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Button
              variant="primary"
              size="sm"
              className="hidden sm:inline-flex"
              onClick={handlePortalAction}
            >
              <UserCircle className="w-4 h-4" aria-hidden="true" />
              {portalLabel}
            </Button>

            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-text transition-colors hover:border-primary hover:text-primary md:hidden"
              aria-expanded={mobileMenuOpen}
              aria-controls="public-mobile-menu"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              onClick={() => setMobileMenuOpen((current) => !current)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div id="public-mobile-menu" className="border-t border-border bg-white md:hidden">
            <nav aria-label="Mobile" className="container mx-auto px-4 md:px-5 xl:px-6 py-4">
              <div className="grid gap-2">
                {navItems.map(({ label, href, icon: Icon, active }) => (
                  <a
                    key={href}
                    href={`#${href}`}
                    aria-current={active ? 'page' : undefined}
                    className={`flex items-center justify-between rounded-eco px-4 py-3 text-sm font-semibold transition-colors ${
                      active ? 'bg-primary text-white' : 'bg-surface-2 text-text hover:bg-surface'
                    }`}
                    onClick={(event) => {
                      event.preventDefault();
                      onNavigate(href);
                    }}
                  >
                    <span className="inline-flex items-center gap-3">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      {label}
                    </span>
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                ))}

                <Button className="mt-2 w-full justify-center" onClick={handlePortalAction}>
                  <UserCircle className="w-4 h-4" aria-hidden="true" />
                  {portalLabel}
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>

      <main id="main-content" className="flex-1">
        {children}
      </main>

      {showPrototypeNotice && (
        <div
          className="fixed bottom-4 left-4 right-4 z-50 rounded-2xl border border-border bg-white px-5 py-4 text-sm text-text shadow-2xl ring-1 ring-primary/20 md:left-auto md:right-6 md:max-w-sm"
          aria-live="polite"
          data-app-shell="true"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-bold text-primary tracking-wide uppercase">Prototype Notice</p>
              <p className="text-text mt-2 leading-relaxed">
                This application is a prototype. The listings and requests shown here are demo data and should not be treated as live operational records.
              </p>
            </div>
            <button
              type="button"
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-text-muted transition-colors hover:bg-surface-2 hover:text-text"
              aria-label="Dismiss prototype notice"
              onClick={() => setShowPrototypeNotice(false)}
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}

      <footer className="border-t border-border bg-surface py-12" data-app-shell="true">
        <div className="container mx-auto px-4 md:px-5 xl:px-6">
          <div className="grid grid-cols-1 gap-12 mb-12 md:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <CldImage assetKey="logo.main" alt="EcoLink logo" className="h-7 w-7 object-contain" />
                <span className="font-bold text-lg font-serif">EcoLink</span>
              </div>
              <p className="text-sm text-text-muted leading-relaxed">
                Bridging the gap between academic faculty and community-based ecotourism through accountability and coordination.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-4 uppercase tracking-wider text-text-muted">Resources</h4>
              <ul className="space-y-2 text-sm text-text">
                <li><a href="#/travel-guide" className="hover:text-primary" onClick={(event) => { event.preventDefault(); onNavigate('/travel-guide'); }}>Safety Guidelines</a></li>
                <li><a href="#/destinations" className="hover:text-primary" onClick={(event) => { event.preventDefault(); onNavigate('/destinations'); }}>Booking Policies</a></li>
                <li><a href="#/about" className="hover:text-primary" onClick={(event) => { event.preventDefault(); onNavigate('/about'); }}>Support Center</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-4 uppercase tracking-wider text-text-muted">Planning</h4>
              <ul className="space-y-2 text-sm text-text-muted">
                <li>Faculty proposals are reviewed inside the protected portal workflow.</li>
                <li>Requests remain pending until dates, group size, and site approvals are confirmed.</li>
                <li>Travel readiness guidance is available before submitting a package request.</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-4 uppercase tracking-wider text-text-muted">Partners</h4>
              <ul className="space-y-2 text-sm text-text">
                <li>Ministry of Environment</li>
                <li>Wildlife Alliance</li>
                <li>Community Unions</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-text-muted text-xs">
            <p>&copy; 2026 EcoLink Portal. All rights reserved.</p>
            <p>Certified Carbon Neutral Operations</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
