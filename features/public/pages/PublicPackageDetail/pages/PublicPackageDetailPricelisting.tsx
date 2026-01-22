import React from 'react';
import { CBETPackage } from '../../../../../shared/types';
import { CapacityPricingTable } from '../components/CapacityPricingTable';

interface PublicPackageDetailPricelistingProps {
  pkg: CBETPackage;
}

export const PublicPackageDetailPricelisting: React.FC<PublicPackageDetailPricelistingProps> = ({ pkg }) => {
  return <CapacityPricingTable bands={pkg.capacityBands} />;
};
