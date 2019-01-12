import { TennisEventInfo } from 'client/TennisEvents';
import * as React from 'react';
import { Marker, MarkerProps } from 'react-google-maps';

export type EventMarkerProps = {
  event: TennisEventInfo;
} & MarkerProps;

export default function eventMarker({
  event,
  ...markerProps
}: EventMarkerProps) {
  return <Marker position={event._geoloc} {...markerProps} />;
}
