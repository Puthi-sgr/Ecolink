import React from 'react';
import { CBETPackage } from '../../../../../shared/types';
import { CapacityPricingTable } from '../components/CapacityPricingTable';

interface PublicPackageDetailPricelistingProps {
  pkg: CBETPackage;
}

export const PublicPackageDetailPricelisting: React.FC<PublicPackageDetailPricelistingProps> = ({ pkg }) => {
  return (
    <section id="pricing" className="scroll-mt-32">
      <CapacityPricingTable bands={pkg.capacityBands} />
    </section>
  );
};
