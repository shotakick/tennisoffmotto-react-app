import * as React from 'react';
import {
  GoogleMap,
  GoogleMapProps,
  InfoWindow,
  Marker,
  withGoogleMap,
  WithGoogleMapProps,
  withScriptjs,
  WithScriptjsProps,
} from 'react-google-maps';
import { compose, setDisplayName, withProps } from 'recompose';
import { Loader } from 'semantic-ui-react';
import { TennisEventInfo } from '../../client/TennisEvents';
import { Omit } from '../../utils/TypeUtils';
import { usePresentPosition } from '../../views/hooks/common/geolocation';
import { useEventInfoWindowControl, usePanTo } from '../../views/hooks/EventMap';
import EventFetchButton from '../containers/EventFetchButton';
import AlgoliaLogo from './common/AlgoliaLogo';
import MapControl from './common/MapControl';
import PresentLocationMapControlButton from './common/PresentLocationMapControlButton';
import EventList from './EventList';
import EventMapMarker from './EventMapMarker';

export type Props = Omit<GoogleMapProps, 'onIdle'> & {
  eventGroupListByPosition: { [key: string]: TennisEventInfo[] };
  onIdle(zoomLevel: number, bounds: google.maps.LatLngBounds): void;
  isAuthenticated: boolean;
  onLogin(): void;
};

const EventMap: React.FC<Props> = props => {
  const { eventGroupListByPosition, onIdle, isAuthenticated, onLogin, ...mapProps } = props;

  const mapRef = React.useRef<GoogleMap>(null);
  const presentPosition = usePresentPosition();
  const { openedMarkerKey, closeWindow, toggleWindow } = useEventInfoWindowControl();
  const panToPresentLocation = usePanTo(mapRef.current, presentPosition);
  const handleIdle = React.useCallback(() => {
    if (mapRef.current) {
      onIdle(mapRef.current.getZoom(), mapRef.current.getBounds());
    }
  }, [onIdle, mapRef.current]);

  React.useEffect(() => {
    if (isAuthenticated) onLogin();
  }, [isAuthenticated]);

  return (
    <GoogleMap ref={mapRef} onIdle={handleIdle} onClick={closeWindow} {...mapProps}>
      {presentPosition && <Marker position={presentPosition} />}
      {Object.keys(eventGroupListByPosition).map(key => (
        <EventMapMarker
          key={key}
          key_={key}
          events={eventGroupListByPosition[key]}
          handleClick={toggleWindow}
        >
          {key === openedMarkerKey && (
            <InfoWindow onCloseClick={closeWindow}>
              <EventList events={eventGroupListByPosition[key]} />
            </InfoWindow>
          )}
        </EventMapMarker>
      ))}
      <EventFetchButton position={google.maps.ControlPosition.RIGHT_TOP} />
      <PresentLocationMapControlButton
        position={google.maps.ControlPosition.RIGHT_BOTTOM}
        onClick={panToPresentLocation}
        disabled={presentPosition === null}
      />
      <MapControl position={google.maps.ControlPosition.LEFT_TOP}>
        <AlgoliaLogo />
      </MapControl>
      <Loader active={false} inline="centered" />
    </GoogleMap>
  );
};

// define for GoogleMap
const initialGoogleMapProps: WithScriptjsProps | WithGoogleMapProps = {
  googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${
    process.env.REACT_APP_GOOGLE_MAP_API_KEY
  }`,
  loadingElement: React.createElement('div'),
  containerElement: React.createElement('div', {
    style: { height: '100%' },
  }),
  mapElement: React.createElement('div', {
    style: { height: '100%' },
  }),
};

export default compose<Props, Props>(
  setDisplayName('EventMapComponent'),
  withProps(initialGoogleMapProps),
  withScriptjs,
  withGoogleMap,
)(EventMap);
