import React from 'react';
import L from 'leaflet';
import { Marker, Tooltip } from 'react-leaflet';
import type { CBETPackage } from '../../../shared/types';
import { CBETMapTooltipCard } from './CBETMapTooltipCard';

interface CBETMapMarkersProps {
  packages: CBETPackage[];
  onPackageSelect: (pkg: CBETPackage) => void;
  icon: L.Icon;
}

export const CBETMapMarkers: React.FC<CBETMapMarkersProps> = ({ packages, onPackageSelect, icon }) => (
  <>
    {packages.map((pkg) => (
      <Marker
        key={pkg.id}
        position={[pkg.coordinates.lat, pkg.coordinates.lng]}
        icon={icon}
        eventHandlers={{
          click: () => onPackageSelect(pkg),
        }}
      >
        <Tooltip
          direction="top"
          offset={[0, -20]}
          opacity={1}
          className="!bg-transparent !border-0 !shadow-none !p-0 custom-leaflet-tooltip"
        >
          <CBETMapTooltipCard pkg={pkg} />
        </Tooltip>
      </Marker>
    ))}
  </>
);
