import React from 'react';
import { LoginForm } from '../components/LoginForm';
import { useAuth } from '../../../app/AuthContext';
import { UserRole } from '../../../shared/types';

interface LoginPageProps {
    onLoginSuccess?: (role: UserRole) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const { login } = useAuth();

  const handleLogin = (role: UserRole) => {
      login(role);
      if (onLoginSuccess) onLoginSuccess(role);
  };

  return <LoginForm onLogin={handleLogin} />;
};