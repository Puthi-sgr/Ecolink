import React from 'react';
import { ProjectStatus } from '../types';
import { theme } from '../theme';

interface StatusBadgeProps {
  status: ProjectStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const styles = theme.status[status] || theme.status.PENDING;

  return (
    <span className={`px-3 py-1 text-xs font-semibold border ${theme.borderRadius.default} ${styles.bg} ${styles.text} ${styles.border}`}>
      {status}
    </span>
  );
};