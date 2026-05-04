import React from 'react';
import { Button } from '../../../shared/atoms/Button';
import { Input } from '../../../shared/atoms/Input';
import { Card } from '../../../shared/molecules/Card';
import { UserRole } from '../../../shared/types';

interface LoginFormProps {
  onLogin: (role: UserRole) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  return (
    <div className="flex items-center justify-center py-12">
      <Card className="w-full max-w-md" title="Portal Access">
        <div className="space-y-6" role="form" aria-label="Login simulation form">
          <p className="text-sm text-text-muted" id="login-instructions">
            Choose a role to preview the protected workflows in this prototype.
          </p>

          <div className="space-y-4">
            <Input
              label="Email Address"
              placeholder="user@ecolink.org..."
              disabled
              type="email"
              name="email"
              autoComplete="email"
              spellCheck={false}
              aria-disabled="true"
            />
            <Input
              label="Password"
              type="password"
              placeholder="Demo access is role-based..."
              disabled
              name="password"
              autoComplete="current-password"
              aria-disabled="true"
            />
          </div>

          <div className="space-y-3 pt-2" aria-describedby="login-instructions">
            <Button
              className="w-full justify-center"
              onClick={() => onLogin(UserRole.FACULTY)}
              aria-label="Login as faculty member"
            >
              Login as Faculty
            </Button>
            <Button
              className="w-full justify-center"
              variant="secondary"
              onClick={() => onLogin(UserRole.ADMIN)}
              aria-label="Login as administrator"
            >
              Login as Administrator
            </Button>
          </div>

          <p className="text-center text-xs leading-relaxed text-text-muted">
            Demo note: authentication is simulated. Use the faculty flow to request trips and the administrator flow to review operations.
          </p>
        </div>
      </Card>
    </div>
  );
};
