import { TennisEventInfo } from 'client/TennisEvents';
import * as React from 'react';
import { InfoWindow, InfoWindowProps } from 'react-google-maps';

type EventInfoWindowProps = {
  events: TennisEventInfo[];
} & InfoWindowProps;

export default function eventInfoWindow({
  events,
  ...infoWindowProps
}: EventInfoWindowProps) {
  return (
    <InfoWindow {...infoWindowProps}>
      <span>Something</span>
      {/* {events.map(event => (
        <div key={event.sid}>
          <h1>{event.title}</h1>
          <p>{`${event.organizer}(${event.sex})`}</p>
        </div>
      ))} */}
    </InfoWindow>
  );
}
