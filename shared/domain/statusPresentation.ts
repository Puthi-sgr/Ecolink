import { PlannerStatus, ProjectStatus, QuoteRequestStatus } from '../types';

type SharedStatus = ProjectStatus | QuoteRequestStatus | PlannerStatus;

interface StatusPresentation {
  label: string;
  badgeVariant: 'outline' | 'secondary' | 'primary' | 'accent' | 'surface';
  className: string;
}

const STATUS_PRESENTATION: Record<SharedStatus, StatusPresentation> = {
  PENDING: {
    label: 'Pending',
    badgeVariant: 'secondary',
    className: 'bg-status-pending/10 text-status-pending border-status-pending/30',
  },
  APPROVED: {
    label: 'Approved',
    badgeVariant: 'primary',
    className: 'bg-status-approved/10 text-status-approved border-status-approved/30',
  },
  LOCKED: {
    label: 'Locked',
    badgeVariant: 'accent',
    className: 'bg-status-locked/10 text-status-locked border-status-locked/30',
  },
  CANCELLED: {
    label: 'Cancelled',
    badgeVariant: 'outline',
    className: 'bg-status-cancelled/10 text-status-cancelled border-status-cancelled/30',
  },
  COMPLETED: {
    label: 'Completed',
    badgeVariant: 'accent',
    className: 'bg-status-completed/10 text-status-completed border-status-completed/30',
  },
  Draft: {
    label: 'Draft',
    badgeVariant: 'outline',
    className: 'bg-surface text-text-muted border-border',
  },
  'Needs Info': {
    label: 'Needs Info',
    badgeVariant: 'secondary',
    className: 'bg-amber-50 text-amber-900 border-amber-200',
  },
  'Under Review': {
    label: 'Under Review',
    badgeVariant: 'primary',
    className: 'bg-primary/10 text-primary border-primary/20',
  },
  Quoted: {
    label: 'Quoted',
    badgeVariant: 'accent',
    className: 'bg-accent/10 text-accent border-accent/20',
  },
  'Ready to Request': {
    label: 'Ready to Request',
    badgeVariant: 'primary',
    className: 'bg-primary/10 text-primary border-primary/20',
  },
  'Ready for Faculty Review': {
    label: 'Ready for Faculty Review',
    badgeVariant: 'secondary',
    className: 'bg-sky-50 text-sky-900 border-sky-200',
  },
  Requested: {
    label: 'Requested',
    badgeVariant: 'accent',
    className: 'bg-accent/10 text-accent border-accent/20',
  },
};

export const getStatusPresentation = (status: SharedStatus) =>
  STATUS_PRESENTATION[status] || STATUS_PRESENTATION.Draft;
