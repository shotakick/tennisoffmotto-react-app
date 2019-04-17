import { GoogleMapProps } from 'react-google-maps';

const DEFAULT_CENTER_TOKYO = { lat: 35.689614, lng: 139.691585 };
const DEFAULT_ZOOM = 14;

export const initialMapOptions: GoogleMapProps = {
  defaultCenter: DEFAULT_CENTER_TOKYO,
  defaultZoom: DEFAULT_ZOOM,
  defaultOptions: {
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: true,
    // zoomControl: false,
    scaleControl: true,
    rotateControl: false,
    gestureHandling: 'auto',
    styles: [
      {
        elementType: 'labels.icon',
        stylers: [{ visibility: 'off' }]
      },
      {
        featureType: 'poi.park',
        stylers: [{ visibility: 'on' }]
      },
      {
        featureType: 'water',
        stylers: [{ visibility: 'on' }]
      },
      {
        featureType: 'poi.sports_complex',
        stylers: [{ visibility: 'on' }]
      },
      {
        featureType: 'transit.station',
        stylers: [{ visibility: 'on' }]
      },
      {
        featureType: 'administrative.locality',
        stylers: [{ visibility: 'on' }]
      }
    ]
  }
};
