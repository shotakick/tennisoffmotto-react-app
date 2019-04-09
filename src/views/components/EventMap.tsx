import { TennisEventInfo } from 'client/TennisEvents';
import * as React from 'react';
import {
  GoogleMap,
  GoogleMapProps,
  withGoogleMap,
  WithGoogleMapProps,
  withScriptjs,
  WithScriptjsProps
} from 'react-google-maps';
import { compose, setDisplayName, withProps } from 'recompose';
import AlgoliaLogo from './common/AlgoliaLogo';
import MapControl from './common/MapControl';
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
  const [openedInfoWindowKey, setOpenedInfoWindowKey] = React.useState<
    string | null
  >(null);
  const handleClickMarker = React.useCallback(
    (key: string) =>
      setOpenedInfoWindowKey(prev => (prev === key ? null : key)),
    [setOpenedInfoWindowKey]
  );
  const closeInfoWindow = React.useCallback(
    () => setOpenedInfoWindowKey(null),
    [setOpenedInfoWindowKey]
  );

  return (
    <GoogleMap ref={mapRef} onClick={closeInfoWindow} {...mapProps}>
      {Object.keys(eventGroupListByPosition).map(key => (
        <EventMapMarker
          key={key}
          key_={key}
          events={eventGroupListByPosition[key]}
          handleClick={handleClickMarker}
        >
          {key === openedInfoWindowKey && (
            <EventInfoWindow
              events={eventGroupListByPosition[key]}
              onCloseClick={closeInfoWindow}
            />
          )}
        </EventMapMarker>
      ))}
      <MapControl position={google.maps.ControlPosition.BOTTOM_LEFT}>
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
