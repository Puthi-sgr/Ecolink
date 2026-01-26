import React from 'react';
import { Button } from '../../../shared/atoms/Button';
import { useAuth } from '../../../app/AuthContext';
import { Activity, ClipboardCheck, LayoutDashboard, ShieldCheck, Users } from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-background flex font-sans">
      {/* Sidebar */}
      <aside className="w-72 bg-surface border-r border-border hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-border">
          <div className="w-9 h-9 rounded-eco bg-surface-2 flex items-center justify-center shadow-sm">
            <img src="/Logo.png" alt="EcoLink logo" className="h-6 w-6 object-contain" />
          </div>
          <div className="ml-3">
            <p className="text-xs uppercase tracking-widest text-text-muted">Control Center</p>
            <p className="font-bold font-serif text-text">Admin Workspace</p>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-text hover:bg-surface-2"
          >
            <LayoutDashboard className="w-4 h-4 text-primary" />
            Overview
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-text-muted hover:text-text hover:bg-surface-2"
          >
            <ClipboardCheck className="w-4 h-4 text-primary" />
            Pending Review
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-text-muted hover:text-text hover:bg-surface-2"
          >
            <Users className="w-4 h-4 text-primary" />
            User Management
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-text-muted hover:text-text hover:bg-surface-2"
          >
            <Activity className="w-4 h-4 text-primary" />
            System Logs
          </Button>
        </nav>
        <div className="p-4 border-t border-border">
          <div className="rounded-2xl bg-surface-2 p-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                {user?.name?.charAt(0) || 'A'}
              </div>
              <div className="text-sm">
                <p className="font-semibold text-text line-clamp-1">{user?.name}</p>
                <p className="text-xs text-text-muted">System Administrator</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                {user?.role || 'ADMIN'}
              </span>
            </div>
          </div>
          <Button variant="outline" size="sm" className="w-full mt-4" onClick={logout}>
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
         <header className="h-16 bg-surface border-b border-border md:hidden flex items-center justify-between px-4">
          <span className="font-bold text-text font-serif">Admin Portal</span>
          <Button size="sm" variant="outline" onClick={logout}>Logout</Button>
        </header>
        <div className="flex-1 p-6 md:p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
             {children}
          </div>
        </div>
      </main>
    </div>
  );
};
