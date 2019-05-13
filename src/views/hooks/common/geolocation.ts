import { useEffect, useState } from 'react';

export const usePresentPosition = () => {
  const [presentPosition, setPresentPosition] = useState<google.maps.LatLngLiteral | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(({ coords }) =>
        setPresentPosition({ lat: coords.latitude, lng: coords.longitude }),
      );
      return () => navigator.geolocation.clearWatch(watchId);
    }
    return () => null;
  }, []);

  return presentPosition;
};
