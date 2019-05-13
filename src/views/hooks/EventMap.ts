import { useCallback, useState } from 'react';
import { GoogleMap } from 'react-google-maps';

export const useEventInfoWindowControl = () => {
  const [openedMarkerKey, setKey] = useState<string | null>(null);

  const closeWindow = useCallback(() => setKey(null), [setKey]);

  const toggleWindow = useCallback((key: string) => setKey(prev => (prev === key ? null : key)), [
    setKey,
  ]);

  return { openedMarkerKey, closeWindow, toggleWindow };
};

export const usePanTo = (map: GoogleMap | null, position: google.maps.LatLngLiteral | null) =>
  useCallback(() => map && position && map.panTo(position), [map, position]);
