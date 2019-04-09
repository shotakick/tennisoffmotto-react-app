import { TennisEventInfo } from 'client/TennisEvents';
import * as React from 'react';
import { GoogleMap, GoogleMapProps } from 'react-google-maps';
import AlgoliaLogo from './common/AlgoliaLogo';
import MapControl from './common/MapControl';
import EventInfoWindow from './EventInfoWindow';
import EventMapMarker from './EventMapMarker';

export type EventMapProps = {
  mapRef: React.RefObject<GoogleMap>;
  eventGroupListByPosition: { [key: string]: TennisEventInfo[] };
} & GoogleMapProps;

const EventMap: React.FC<EventMapProps> = ({
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
export default EventMap;
