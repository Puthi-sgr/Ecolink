export type UniversalTone = 'primary' | 'accent' | 'clay' | 'leaf' | 'river' | 'sun' | 'earth' | 'berry' | 'neutral';

export const universalToneClasses: Record<
  UniversalTone,
  {
    bg: string;
    softBg: string;
    border: string;
    text: string;
    icon: string;
    dot: string;
  }
> = {
  primary: {
    bg: 'bg-primary',
    softBg: 'bg-primary-50',
    border: 'border-primary-200',
    text: 'text-primary-700',
    icon: 'text-primary',
    dot: 'bg-primary',
  },
  accent: {
    bg: 'bg-accent',
    softBg: 'bg-accent-50',
    border: 'border-accent-200',
    text: 'text-accent-700',
    icon: 'text-accent-600',
    dot: 'bg-accent',
  },
  clay: {
    bg: 'bg-clay',
    softBg: 'bg-clay-50',
    border: 'border-clay-200',
    text: 'text-clay-700',
    icon: 'text-clay',
    dot: 'bg-clay',
  },
  leaf: {
    bg: 'bg-leaf',
    softBg: 'bg-leaf-50',
    border: 'border-leaf-200',
    text: 'text-leaf-700',
    icon: 'text-leaf-600',
    dot: 'bg-leaf',
  },
  river: {
    bg: 'bg-river',
    softBg: 'bg-river-50',
    border: 'border-river-200',
    text: 'text-river-700',
    icon: 'text-river-600',
    dot: 'bg-river',
  },
  sun: {
    bg: 'bg-sun',
    softBg: 'bg-sun-50',
    border: 'border-sun-200',
    text: 'text-sun-700',
    icon: 'text-sun-600',
    dot: 'bg-sun',
  },
  earth: {
    bg: 'bg-earth',
    softBg: 'bg-earth-50',
    border: 'border-earth-200',
    text: 'text-earth-700',
    icon: 'text-earth-600',
    dot: 'bg-earth',
  },
  berry: {
    bg: 'bg-berry',
    softBg: 'bg-berry-50',
    border: 'border-berry-200',
    text: 'text-berry-700',
    icon: 'text-berry-600',
    dot: 'bg-berry',
  },
  neutral: {
    bg: 'bg-surface-3',
    softBg: 'bg-surface-2',
    border: 'border-border/60',
    text: 'text-text-muted',
    icon: 'text-text-muted',
    dot: 'bg-border',
  },
};

export const pointToneOrder: UniversalTone[] = ['primary', 'river', 'sun', 'earth', 'berry', 'clay', 'leaf', 'accent'];

export const theme = {
  colors: {
    primary: 'var(--color-primary)',
    primaryScale: {
      50: 'var(--color-primary-50)',
      100: 'var(--color-primary-100)',
      200: 'var(--color-primary-200)',
      500: 'var(--color-primary-500)',
      700: 'var(--color-primary-700)',
    },
    secondary: 'var(--color-secondary)',
    secondaryScale: {
      50: 'var(--color-secondary-50)',
      100: 'var(--color-secondary-100)',
      200: 'var(--color-secondary-200)',
      500: 'var(--color-secondary-500)',
      700: 'var(--color-secondary-700)',
    },
    secondarySurface: 'var(--color-surface-2)',
    background: 'var(--color-bg)',
    surface: 'var(--color-surface)',
    border: 'var(--color-border)',
    tones: universalToneClasses,
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
