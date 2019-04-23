import * as React from 'react';
import {
  GoogleMap,
  GoogleMapProps,
  Marker,
  withGoogleMap,
  WithGoogleMapProps,
  withScriptjs,
  WithScriptjsProps
} from 'react-google-maps';
import { compose, setDisplayName, withProps } from 'recompose';
import { Loader } from 'semantic-ui-react';
import { TennisEventInfo } from '../../client/TennisEvents';
import { usePresentPosition } from '../../views/hooks/common/geolocation';
import {
  useEventInfoWindowControl,
  usePanTo
} from '../../views/hooks/EventMap';
import AlgoliaLogo from './common/AlgoliaLogo';
import MapControl from './common/MapControl';
import PresentLocationMapControlButton from './common/PresentLocationMapControlButton';
import EventFetchButton from './EventFetchButton';
import EventInfoWindow from './EventInfoWindow';
import EventMapMarker from './EventMapMarker';

export type EventMapProps = {
  mapRef: React.RefObject<GoogleMap>;
  eventGroupListByPosition: { [key: string]: TennisEventInfo[] };
  startFetching: (withDalay?: boolean) => void;
  cancelFetching: () => void;
  setFetchingBounds: () => void;
  autoFetchingMode: boolean;
  isFetching: boolean;
} & GoogleMapProps;

export const EventMap: React.FC<EventMapProps> = ({
  mapRef,
  eventGroupListByPosition,
  startFetching,
  cancelFetching,
  setFetchingBounds,
  autoFetchingMode,
  isFetching,
  ...mapProps
}) => {
  const presentPosition = usePresentPosition();
  const {
    openedMarkerKey,
    closeWindow,
    toggleWindow
  } = useEventInfoWindowControl();
  const panToPresentLocation = usePanTo(mapRef.current, presentPosition);
  const handleIdle = React.useCallback(
    () => (autoFetchingMode ? startFetching(true) : setFetchingBounds()),
    [autoFetchingMode, startFetching, setFetchingBounds]
  );

  return (
    <GoogleMap
      ref={mapRef}
      onIdle={handleIdle}
      onClick={closeWindow}
      {...mapProps}
    >
      {presentPosition && <Marker position={presentPosition} />}
      {Object.keys(eventGroupListByPosition).map(key => (
        <EventMapMarker
          key={key}
          key_={key}
          events={eventGroupListByPosition[key]}
          handleClick={toggleWindow}
        >
          {key === openedMarkerKey && (
            <EventInfoWindow
              events={eventGroupListByPosition[key]}
              onCloseClick={closeWindow}
            />
          )}
        </EventMapMarker>
      ))}
      <EventFetchButton
        position={google.maps.ControlPosition.RIGHT_TOP}
        onClick={startFetching}
        isFetching={isFetching}
      />
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
    style: { height: '100%' }
  }),
  mapElement: React.createElement('div', {
    style: { height: '100%' }
  })
};

export default compose<EventMapProps, EventMapProps>(
  setDisplayName('EventMapComponent'),
  withProps(initialGoogleMapProps),
  withScriptjs,
  withGoogleMap
)(EventMap);
