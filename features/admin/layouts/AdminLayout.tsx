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
      <aside className="hidden w-72 flex-col bg-[linear-gradient(180deg,#273551_0%,#202d45_100%)] text-white shadow-[0_18px_48px_rgba(25,28,29,0.12)] md:flex">
        <div className="flex h-16 items-center px-4 md:px-5 xl:px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-eco bg-white/10 backdrop-blur-sm">
            <img src="/Logo.png" alt="EcoLink logo" className="h-6 w-6 object-contain" />
          </div>
          <div className="ml-3">
            <p className="text-xs uppercase tracking-widest text-white/55">Control Center</p>
            <p className="font-bold font-serif text-white">Admin Workspace</p>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-white hover:bg-white/10 hover:text-white"
          >
            <LayoutDashboard className="w-4 h-4 text-primary" />
            Overview
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-white/72 hover:bg-white/10 hover:text-white"
          >
            <ClipboardCheck className="w-4 h-4 text-primary" />
            Pending Review
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-white/72 hover:bg-white/10 hover:text-white"
          >
            <Users className="w-4 h-4 text-primary" />
            User Management
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-white/72 hover:bg-white/10 hover:text-white"
          >
            <Activity className="w-4 h-4 text-primary" />
            System Logs
          </Button>
        </nav>
        <div className="p-4">
          <div className="rounded-2xl bg-white/8 p-4 space-y-3 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/14 flex items-center justify-center text-primary font-bold text-sm">
                {user?.name?.charAt(0) || 'A'}
              </div>
              <div className="text-sm">
                <p className="font-semibold text-white line-clamp-1">{user?.name}</p>
                <p className="text-xs text-white/55">System Administrator</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span className="text-xs font-semibold text-white/65 uppercase tracking-wider">
                {user?.role || 'ADMIN'}
              </span>
            </div>
          </div>
          <Button variant="secondary" size="sm" className="w-full mt-4" onClick={logout}>
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
         <header className="h-16 bg-white/85 shadow-[0_10px_24px_rgba(25,28,29,0.05)] backdrop-blur-xl md:hidden flex items-center justify-between px-4">
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
