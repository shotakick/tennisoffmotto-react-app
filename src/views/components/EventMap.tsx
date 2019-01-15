import { TennisEventInfo } from 'client/TennisEvents';
import * as React from 'react';
import { GoogleMap, GoogleMapProps, Marker } from 'react-google-maps';
import EventInfoWindow from './EventInfoWindow';

export type EventMapProps = {
  mapRef: React.RefObject<GoogleMap>;
  eventGroupListByPosition: { [key: string]: TennisEventInfo[] };
  infoWindowOpenKey?: string;
  handleOnClickMarker?: (key: string) => void;
  handleOnClickMap?: () => void;
} & GoogleMapProps;

const ballIcon: google.maps.Icon = { url: 'images/tennis-ball.png' };

export const eventMap: React.FC<EventMapProps> = ({
  mapRef,
  eventGroupListByPosition,
  infoWindowOpenKey,
  handleOnClickMarker,
  handleOnClickMap,
  ...mapProps
}) => (
  <GoogleMap ref={mapRef} onClick={handleOnClickMap} {...mapProps}>
    {Object.keys(eventGroupListByPosition).map(key => {
      const onClick = () => handleOnClickMarker && handleOnClickMarker(key);
      const events = eventGroupListByPosition[key];
      return (
        <Marker
          key={key}
          position={events[0]._geoloc}
          animation={google.maps.Animation.DROP}
          label={{ text: String(events.length) }}
          icon={ballIcon}
          onClick={onClick}
        >
          {infoWindowOpenKey === key && (
            <EventInfoWindow events={events} onCloseClick={onClick} />
          )}
        </Marker>
      );
    })}
  </GoogleMap>
);
export default eventMap;
