export const theme = {
  colors: {
    primary: 'var(--color-primary)',
    secondary: 'var(--color-surface-2)',
    background: 'var(--color-bg)',
    surface: 'var(--color-surface)',
    border: 'var(--color-border)',
  },
  status: {
    PENDING: { bg: 'bg-status-pending/10', text: 'text-status-pending', border: 'border-status-pending/30' },
    APPROVED: { bg: 'bg-status-approved/10', text: 'text-status-approved', border: 'border-status-approved/30' },
    LOCKED: { bg: 'bg-status-locked/10', text: 'text-status-locked', border: 'border-status-locked/30' },
    CANCELLED: { bg: 'bg-status-cancelled/10', text: 'text-status-cancelled', border: 'border-status-cancelled/30' },
    COMPLETED: { bg: 'bg-status-completed/10', text: 'text-status-completed', border: 'border-status-completed/30' },
  },
  borderRadius: {
    default: 'rounded-eco',
  },
  spacing: {
    default: 'p-eco',
  }
};