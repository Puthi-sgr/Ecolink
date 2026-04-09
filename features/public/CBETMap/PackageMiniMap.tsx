import React from 'react';
import { Marker } from 'react-leaflet';
import { CBETMapCanvas } from './CBETMapCanvas';
import { createCustomIcon } from './createCustomIcon';

interface PackageMiniMapProps {
  coordinates: { lat: number; lng: number };
}

const markerIcon = createCustomIcon();

const PackageMiniMap: React.FC<PackageMiniMapProps> = ({ coordinates }) => (
  <CBETMapCanvas center={[coordinates.lat, coordinates.lng]} zoom={11}>
    <Marker position={[coordinates.lat, coordinates.lng]} icon={markerIcon} />
  </CBETMapCanvas>
);

export default PackageMiniMap;

