import React from 'react';
import { Button } from '../../../shared/atoms/Button';
import { useAuth } from '../../../app/AuthContext';
import { UserRole } from '../../../shared/types';
import { Mountain, Map, Info, UserCircle, BookOpen, Home } from 'lucide-react';

interface PublicLayoutProps {
  children: React.ReactNode;
  onNavigate: (path: string) => void;
}

export const PublicLayout: React.FC<PublicLayoutProps> = ({ children, onNavigate }) => {
  const { user } = useAuth();

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

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <header className="sticky top-0 z-50 w-full border-b border-border bg-surface/95 backdrop-blur-md">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => onNavigate('/')}>
            <div className="w-10 h-10 rounded-eco bg-primary flex items-center justify-center text-surface font-bold font-serif shadow-sm group-hover:scale-105 transition-transform">
              <Mountain className="w-6 h-6" />
            </div>
            <span className="font-bold text-xl text-text font-serif tracking-tight">EcoLink</span>
          </div>
          <div className="hidden md:flex items-center gap-1">
            <Button variant="ghost" size="sm" className="flex items-center gap-2" onClick={() => onNavigate('/')}>
              <Home className="w-4 h-4" /> Home
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-2" onClick={() => onNavigate('/destinations')}>
              <Map className="w-4 h-4" /> Destinations
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-2" onClick={() => onNavigate('/travel-guide')}>
              <BookOpen className="w-4 h-4" /> Travel Guide
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-2" onClick={() => onNavigate('/about')}>
              <Info className="w-4 h-4" /> How it works
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="primary" size="sm" className="flex items-center gap-2" onClick={handlePortalAction}>
              {user ? (
                <>
                  <UserCircle className="w-4 h-4" /> Portal
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        {children}
      </main>

      <footer className="border-t border-border bg-surface py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Mountain className="w-6 h-6 text-primary" />
                <span className="font-bold text-lg font-serif">EcoLink</span>
              </div>
              <p className="text-sm text-text-muted leading-relaxed">
                Bridging the gap between academic faculty and community-based ecotourism through accountability and coordination.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-4 uppercase tracking-wider text-text-muted">Resources</h4>
              <ul className="space-y-2 text-sm text-text">
                <li><a href="#" className="hover:text-primary">Safety Guidelines</a></li>
                <li><a href="#" className="hover:text-primary">Booking Policies</a></li>
                <li><a href="#" className="hover:text-primary">Support Center</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-4 uppercase tracking-wider text-text-muted">Legal</h4>
              <ul className="space-y-2 text-sm text-text">
                <li><a href="#" className="hover:text-primary">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary">Liability Waiver</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-4 uppercase tracking-wider text-text-muted">Partners</h4>
              <ul className="space-y-2 text-sm text-text">
                <li><a href="#" className="hover:text-primary">Ministry of Environment</a></li>
                <li><a href="#" className="hover:text-primary">Wildlife Alliance</a></li>
                <li><a href="#" className="hover:text-primary">Community Unions</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-text-muted text-xs">
            <p>&copy; 2024 EcoLink Portal. All rights reserved.</p>
            <p>Certified Carbon Neutral Operations</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
