import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole } from '../shared/types';

interface AuthContextType {
  user: User | null;
  login: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (role: UserRole) => {
    // Mock login logic
    const mockUser: User = {
      id: '123',
      name: role === UserRole.ADMIN ? 'Admin User' : 'Faculty Member',
      email: role === UserRole.ADMIN ? 'admin@ecolink.org' : 'faculty@ecolink.edu',
      role: role
    };
    setUser(mockUser);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};