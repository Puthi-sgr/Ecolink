import React from 'react';
import { Card } from '../../../shared/molecules/Card';
import { Button } from '../../../shared/atoms/Button';
import { Input } from '../../../shared/atoms/Input';
import { UserRole } from '../../../shared/types';

interface LoginFormProps {
  onLogin: (role: UserRole) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  return (
    <div className="flex items-center justify-center py-12">
      <Card className="w-full max-w-md" title="Portal Access">
        <div className="space-y-6" role="form" aria-label="Login Simulation Form">
          <p className="text-text-muted text-sm" id="login-instructions">
            Select a role to simulate the login process for this demo.
          </p>
          
          <div className="space-y-4">
            <Input 
              label="Email Address" 
              placeholder="user@ecolink.org" 
              disabled 
              type="email"
              aria-disabled="true"
            />
            <Input 
              label="Password" 
              type="password" 
              placeholder="••••••••" 
              disabled 
              aria-disabled="true"
            />
          </div>

          <div className="space-y-3 pt-2" aria-describedby="login-instructions">
            <Button 
              className="w-full justify-center" 
              onClick={() => onLogin(UserRole.FACULTY)}
              aria-label="Login as Faculty Member"
            >
              Login as Faculty
            </Button>
            <Button 
              className="w-full justify-center" 
              variant="secondary"
              onClick={() => onLogin(UserRole.ADMIN)}
              aria-label="Login as Administrator"
            >
              Login as Administrator
            </Button>
          </div>
          
          <div className="text-center">
            <a 
              href="#" 
              className="text-xs text-primary hover:underline focus:outline-none focus:underline focus:text-primary-600"
              aria-label="Forgot password? (Simulated link)"
            >
              Forgot password?
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
};