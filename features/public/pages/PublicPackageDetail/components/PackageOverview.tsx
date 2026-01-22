import React from 'react';
import { Badge } from '../../../../../shared/atoms/Badge';
import { CBETPackage } from '../../../../../shared/types';
import { ShieldCheck, Clock, Bus, Utensils } from 'lucide-react';

interface PackageOverviewProps {
  pkg: CBETPackage;
}

export const PackageOverview: React.FC<PackageOverviewProps> = ({ pkg }) => {
  return (
    <section className="space-y-6">
      <div className="flex flex-wrap gap-3">
        <Badge variant="accent" size="sm" icon={<ShieldCheck className="w-4 h-4" />}>EcoLink Verified</Badge>
        <Badge variant="surface" size="sm" icon={<Clock className="w-4 h-4" />}>{pkg.duration}</Badge>
        <Badge variant="surface" size="sm" icon={<Bus className="w-4 h-4" />}>Transport Options</Badge>
        <Badge variant="surface" size="sm" icon={<Utensils className="w-4 h-4" />}>Meals Included</Badge>
      </div>
      <h2 className="text-2xl font-bold font-serif text-text">About this excursion</h2>
      <p className="text-text-muted leading-relaxed text-lg">{pkg.description}</p>
    </section>
  );
};
