import React from 'react';
import { Heart } from 'lucide-react';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({ isFavorite, onToggle, className = '' }) => {
  return (
    <button
      type="button"
      aria-pressed={isFavorite}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      onClick={onToggle}
      className={`w-9 h-9 rounded-full flex items-center justify-center shadow-sm transition-colors ${
        isFavorite ? 'bg-primary text-white' : 'bg-white/90 text-text hover:bg-white'
      } ${className}`}
    >
      <Heart className="w-4 h-4" fill={isFavorite ? 'currentColor' : 'none'} />
    </button>
  );
};
