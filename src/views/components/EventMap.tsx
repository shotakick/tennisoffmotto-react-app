import { TennisEventInfo } from 'client/TennisEvents';
import * as React from 'react';
import { GoogleMap, GoogleMapProps, Marker } from 'react-google-maps';
import EventInfoWindow from './EventInfoWindow';

export type EventMapProps = {
  mapRef: React.RefObject<GoogleMap>;
  eventGroupListByPosition: { [key: string]: TennisEventInfo[] };
  infoWindowOpenKey?: string;
  handleOnClickMarker?: (key: string) => unknown;
} & GoogleMapProps;

export default function eventMap({
  mapRef,
  eventGroupListByPosition,
  infoWindowOpenKey,
  handleOnClickMarker,
  ...mapProps
}: EventMapProps) {
  return (
    <GoogleMap ref={mapRef} {...mapProps}>
      {Object.keys(eventGroupListByPosition).map(key => {
        const onClick = () => handleOnClickMarker && handleOnClickMarker(key);
        const events = eventGroupListByPosition[key];
        return (
          <Marker
            key={key}
            position={events[0]._geoloc}
            animation={google.maps.Animation.DROP}
            label={{ text: String(events.length) }}
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
}
