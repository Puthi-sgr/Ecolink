import React, { useCallback, useEffect, useMemo, useState } from 'react';
import L from 'leaflet';
import { MapContainer, Rectangle, TileLayer, useMap, useMapEvent } from 'react-leaflet';

const POSITION_CLASSES = {
  bottomleft: 'leaflet-bottom leaflet-left',
  bottomright: 'leaflet-bottom leaflet-right',
  topleft: 'leaflet-top leaflet-left',
  topright: 'leaflet-top leaflet-right',
};

const BOUNDS_STYLE = { weight: 1, color: '#059669', fillOpacity: 0.1 };

interface MinimapBoundsProps {
  parentMap: L.Map;
  zoom: number;
}

const MinimapBounds: React.FC<MinimapBoundsProps> = ({ parentMap, zoom }) => {
  const minimap = useMap();

  const onClick = useCallback(
    (e: L.LeafletMouseEvent) => {
      parentMap.setView(e.latlng, parentMap.getZoom());
    },
    [parentMap]
  );
  useMapEvent('click', onClick);

  const [bounds, setBounds] = useState(parentMap.getBounds());
  const onChange = useCallback(() => {
    setBounds(parentMap.getBounds());
    minimap.setView(parentMap.getCenter(), zoom);
  }, [minimap, parentMap, zoom]);

  useEffect(() => {
    parentMap.on('move', onChange);
    parentMap.on('zoom', onChange);
    return () => {
      parentMap.off('move', onChange);
      parentMap.off('zoom', onChange);
    };
  }, [parentMap, onChange]);

  return <Rectangle bounds={bounds} pathOptions={BOUNDS_STYLE} />;
};

interface CBETMapMinimapProps {
  position: keyof typeof POSITION_CLASSES;
  zoom: number;
}

export const CBETMapMinimap: React.FC<CBETMapMinimapProps> = ({ position, zoom }) => {
  const parentMap = useMap();
  const mapZoom = zoom || 0;

  const minimap = useMemo(
    () => (
      <MapContainer
        style={{
          height: 100,
          width: 100,
          borderRadius: '8px',
          border: '2px solid white',
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        }}
        center={parentMap.getCenter()}
        zoom={mapZoom}
        dragging={false}
        doubleClickZoom={false}
        scrollWheelZoom={false}
        attributionControl={false}
        zoomControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MinimapBounds parentMap={parentMap} zoom={mapZoom} />
      </MapContainer>
    ),
    [parentMap, mapZoom]
  );

  const positionClass = POSITION_CLASSES[position] || POSITION_CLASSES.topright;
  return (
    <div className={positionClass}>
      <div className="leaflet-control leaflet-bar !border-0 !m-4">{minimap}</div>
    </div>
  );
};
