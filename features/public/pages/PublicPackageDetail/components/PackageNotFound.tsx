import React from 'react';
import { Button } from '../../../../../shared/atoms/Button';

interface PackageNotFoundProps {
  onBack: () => void;
}

export const PackageNotFound: React.FC<PackageNotFoundProps> = ({ onBack }) => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6">
      <h2 className="text-2xl font-bold font-serif mb-4">Package not found</h2>
      <Button onClick={onBack}>Back to Catalog</Button>
    </div>
  );
};
