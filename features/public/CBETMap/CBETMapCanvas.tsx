import React, { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';

interface CBETMapCanvasProps {
  center: [number, number];
  zoom: number;
  children?: React.ReactNode;
}

const TILE_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';

export const CBETMapCanvas: React.FC<CBETMapCanvasProps> = ({ center, zoom, children }) => (
  <MapContainer
    center={center}
    zoom={zoom}
    scrollWheelZoom={false}
    style={{ height: '100%', width: '100%' }}
    className="z-0"
  >
    <MapSizeSync />
    <TileLayer attribution={ATTRIBUTION} url={TILE_URL} />
    {children}
  </MapContainer>
);

const MapSizeSync: React.FC = () => {
  const map = useMap();

  useEffect(() => {
    const handleResize = () => map.invalidateSize();
    const timer = setTimeout(handleResize, 0);
    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [map]);

  return null;
};
