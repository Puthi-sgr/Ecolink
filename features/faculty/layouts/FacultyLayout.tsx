import React from 'react';
import { Button } from '../../../shared/atoms/Button';
import { useAuth } from '../../../app/AuthContext';

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
      <aside className="hidden w-72 flex-col bg-surface shadow-[0_18px_48px_rgba(25,28,29,0.06)] ring-1 ring-[rgba(194,198,212,0.18)] md:flex">
        <div className="flex h-16 items-center px-4 md:px-5 xl:px-6">
          <div className="mr-3 flex h-9 w-9 items-center justify-center rounded-eco bg-[linear-gradient(135deg,var(--color-primary),var(--color-primary-500))] text-white shadow-[0_12px_28px_rgba(68,152,26,0.18)]">F</div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-text-muted">Workspace</p>
            <span className="font-bold text-text font-serif">Faculty Portal</span>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Button variant="secondary" className="w-full justify-start" onClick={() => navigate('/faculty/dashboard')}>Dashboard</Button>
          <Button variant="ghost" className="w-full justify-start hover:bg-surface-2" onClick={() => navigate('/')}>Browse CBET Sites</Button>
          <Button variant="ghost" className="w-full justify-start hover:bg-surface-2">My Proposals</Button>
          <Button variant="ghost" className="w-full justify-start hover:bg-surface-2">Resources</Button>
        </nav>
        <div className="p-4">
          <div className="mb-4 rounded-[20px] bg-surface-2 p-4 shadow-[0_12px_32px_rgba(25,28,29,0.04)]">
            <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xs">
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
          </div>
          <Button variant="outline" size="sm" className="w-full" onClick={logout}>Sign Out</Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white/85 shadow-[0_10px_24px_rgba(25,28,29,0.05)] backdrop-blur-xl md:hidden flex items-center justify-between px-4">
          <span className="font-bold text-text font-serif">Faculty Portal</span>
          <Button size="sm" variant="outline" onClick={logout}>Logout</Button>
        </header>
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-5xl mx-auto">
             {children}
          </div>
        </div>
      </main>
    </div>
  );
};
