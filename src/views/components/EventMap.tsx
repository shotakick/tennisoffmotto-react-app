import { TennisEventInfo } from 'client/TennisEvents';
import * as React from 'react';
import { GoogleMap, GoogleMapProps, Marker } from 'react-google-maps';
import AlgoliaLogo from './common/AlgoliaLogo';
import MapControl from './common/MapControl';
import EventInfoWindow from './EventInfoWindow';

export type EventMapProps = {
  mapRef: React.RefObject<GoogleMap>;
  eventGroupListByPosition: { [key: string]: TennisEventInfo[] };
} & GoogleMapProps;

const ballIcon: google.maps.Icon = { url: 'images/tennis-ball.png' };

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
        <Marker
          key={key}
          position={eventGroupListByPosition[key][0]._geoloc}
          animation={google.maps.Animation.DROP}
          label={{ text: String(eventGroupListByPosition[key].length) }}
          icon={ballIcon}
          // If optimization, refer to https://github.com/flexport/reflective-bind
          // tslint:disable-next-line: jsx-no-lambda
          onClick={() => handleClickMarker(key)}
        >
          {key === openedInfoWindowKey && (
            <EventInfoWindow
              events={eventGroupListByPosition[key]}
              onCloseClick={closeInfoWindow}
            />
          )}
        </Marker>
      ))}
      <MapControl position={google.maps.ControlPosition.BOTTOM_LEFT}>
        <AlgoliaLogo />
      </MapControl>
    </GoogleMap>
  );
};
export default EventMap;
