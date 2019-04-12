import { TennisEventInfo } from 'client/TennisEvents';
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
import { usePresentPosition } from 'views/hooks/common/geolocation';
import { useEventInfoWindowControl, usePanTo } from 'views/hooks/EventMap';
import AlgoliaLogo from './common/AlgoliaLogo';
import MapControl from './common/MapControl';
import PresentLocationMapControl from './common/PresentLocationMapControl';
import EventInfoWindow from './EventInfoWindow';
import EventMapMarker from './EventMapMarker';

export type EventMapProps = {
  mapRef: React.RefObject<GoogleMap>;
  eventGroupListByPosition: { [key: string]: TennisEventInfo[] };
} & GoogleMapProps;

export const EventMap: React.FC<EventMapProps> = ({
  mapRef,
  eventGroupListByPosition,
  ...mapProps
}) => {
  const presentPosition = usePresentPosition();
  const {
    openedMarkerKey,
    closeWindow,
    toggleWindow
  } = useEventInfoWindowControl();
  const panToPresentLocation = usePanTo(mapRef.current, presentPosition);

  return (
    <GoogleMap ref={mapRef} onClick={closeWindow} {...mapProps}>
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
      <MapControl position={google.maps.ControlPosition.RIGHT_BOTTOM}>
        <PresentLocationMapControl
          onClick={panToPresentLocation}
          disabled={presentPosition === null}
        />
      </MapControl>
      <MapControl position={google.maps.ControlPosition.LEFT_BOTTOM}>
        <AlgoliaLogo />
      </MapControl>
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
