import React from 'react';
import { Button } from '../../../shared/atoms/Button';
import { useAuth } from '../../../app/AuthContext';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-background flex font-sans">
      {/* Sidebar - Using primary color for Admin distinction but keeping nature theme */}
      <aside className="w-64 bg-primary text-surface hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-primary-600">
          <div className="w-6 h-6 rounded-full bg-primary-600 flex items-center justify-center text-surface text-xs font-bold mr-2">A</div>
          <span className="font-bold font-serif">Admin Control</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Button variant="ghost" className="w-full justify-start text-surface hover:bg-primary-600 hover:text-white">Overview</Button>
          <Button variant="ghost" className="w-full justify-start text-surface/80 hover:text-surface hover:bg-primary-600">Pending Review</Button>
          <Button variant="ghost" className="w-full justify-start text-surface/80 hover:text-surface hover:bg-primary-600">User Management</Button>
          <Button variant="ghost" className="w-full justify-start text-surface/80 hover:text-surface hover:bg-primary-600">System Logs</Button>
        </nav>
        <div className="p-4 border-t border-primary-600">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-surface font-bold text-xs border border-primary-500">
               {user?.name?.charAt(0) || 'A'}
            </div>
            <div className="text-sm">
              <div className="flex items-center gap-2">
                <p className="font-medium text-surface line-clamp-1">{user?.name}</p>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-surface/20 text-surface uppercase border border-surface/30 tracking-wider">
                  {user?.role || 'ADMIN'}
                </span>
              </div>
              <p className="text-surface/70 text-xs">System Administrator</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="w-full border-primary-600 text-surface/80 hover:text-surface hover:bg-primary-600" onClick={logout}>Sign Out</Button>
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