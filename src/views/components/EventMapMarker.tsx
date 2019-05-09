import * as React from 'react';
import { Marker } from 'react-google-maps';
import { TennisEventInfo } from '../../client/TennisEvents';

const ballIcon: google.maps.Icon = { url: 'images/tennis-ball.png' };

type Key = string;

export interface EventMapMarkerProps {
  key_: Key;
  events: TennisEventInfo[];
  handleClick: (key: Key) => void;
}

export const EventMapMarker: React.FC<EventMapMarkerProps> = ({
  key_,
  events,
  handleClick,
  children
}) => {
  const onClick = React.useCallback(() => handleClick(key_), [
    key_,
    handleClick
  ]);

  return (
    <Marker
      position={events[0]._geoloc}
      animation={google.maps.Animation.DROP}
      label={{ text: String(events.length) }}
      icon={ballIcon}
      onClick={onClick}
    >
      {children}
    </Marker>
  );
};
export default EventMapMarker;
