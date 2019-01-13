import { TennisEventInfo } from 'client/TennisEvents';
import * as React from 'react';
import { GoogleMap, GoogleMapProps, Marker } from 'react-google-maps';

export type EventMapProps = {
  mapRef: React.RefObject<GoogleMap>;
  eventGroupListByPosition: { [position: string]: TennisEventInfo[] };
  maxMarkerVisibleCount: number;
} & GoogleMapProps;

export default function eventMap({
  mapRef,
  eventGroupListByPosition,
  ...mapProps
}: EventMapProps) {
  return (
    <GoogleMap ref={mapRef} {...mapProps}>
      {Object.keys(eventGroupListByPosition).map(key => {
        const events = eventGroupListByPosition[key];
        return (
          <Marker
            key={key}
            position={events[0]._geoloc}
            animation={google.maps.Animation.DROP}
            label={{ text: String(events.length) }}
          />
        );
      })}
    </GoogleMap>
  );
}
