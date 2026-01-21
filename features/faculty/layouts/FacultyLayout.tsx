import React from 'react';
import { Button } from '../../../shared/atoms/Button';
import { useAuth } from '../../../app/AuthContext';
import { UserRole } from '../../../shared/types';

interface FacultyLayoutProps {
  children: React.ReactNode;
}

export const FacultyLayout: React.FC<FacultyLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  
  const navigate = (path: string) => {
    window.location.hash = path;
  };

  return (
    <div className="min-h-screen bg-background flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-surface border-r border-border hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-border">
          <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-surface text-xs font-bold mr-2">F</div>
          <span className="font-bold text-text font-serif">Faculty Portal</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Button variant="ghost" className="w-full justify-start hover:bg-surface-2" onClick={() => navigate('/faculty/dashboard')}>Dashboard</Button>
          <Button variant="ghost" className="w-full justify-start hover:bg-surface-2" onClick={() => navigate('/')}>Browse CBET Sites</Button>
          <Button variant="ghost" className="w-full justify-start hover:bg-surface-2">My Proposals</Button>
          <Button variant="ghost" className="w-full justify-start hover:bg-surface-2">Resources</Button>
        </nav>
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-surface font-bold text-xs">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="text-sm">
              <div className="flex items-center gap-2">
                <p className="font-medium text-text line-clamp-1">{user?.name}</p>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-primary/10 text-primary uppercase border border-primary/20 tracking-wider">
                  {user?.role || 'FACULTY'}
                </span>
              </div>
              <p className="text-text-muted text-xs">Environmental Science</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="w-full" onClick={logout}>Sign Out</Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-surface border-b border-border md:hidden flex items-center justify-between px-4">
          <span className="font-bold text-text font-serif">Faculty Portal</span>
          <Button size="sm" variant="outline" onClick={logout}>Logout</Button>
        </header>
        <div className="flex-1 p-6 md:p-8 overflow-y-auto">
          <div className="max-w-5xl mx-auto">
             {children}
          </div>
        </div>
      </main>
    </div>
  );
};