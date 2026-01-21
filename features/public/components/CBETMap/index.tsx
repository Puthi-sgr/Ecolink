import React, { useMemo } from 'react';
import type { CBETPackage } from '../../../../shared/types';
import { CBETMapCanvas } from './CBETMapCanvas';
import { CBETMapLayout } from './CBETMapLayout';
import { CBETMapMarkers } from './CBETMapMarkers';
import { CBETMapMinimap } from './CBETMapMinimap';
import { CBETMapOverlayHint } from './CBETMapOverlayHint';
import { createCustomIcon } from './createCustomIcon';

interface CBETMapProps {
  packages: CBETPackage[];
  onPackageSelect: (pkg: CBETPackage) => void;
}

export const CBETMap: React.FC<CBETMapProps> = ({ packages, onPackageSelect }) => {
  const centerPosition: [number, number] = [12.0, 104.5];
  const markerIcon = useMemo(() => createCustomIcon(), []);

  return (
    <CBETMapLayout overlay={<CBETMapOverlayHint />}>
      <CBETMapCanvas center={centerPosition} zoom={7}>
        <CBETMapMarkers packages={packages} onPackageSelect={onPackageSelect} icon={markerIcon} />
        <CBETMapMinimap position="bottomright" zoom={5} />
      </CBETMapCanvas>
    </CBETMapLayout>
  );
};
