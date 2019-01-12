export { TennisEventInfo } from 'client/TennisEvents';

export interface FetchingParams {
  filter?: ViewingFilter;
  keyword?: string;
  bounds?: google.maps.LatLngBoundsLiteral;
}

export { FetchedResult } from 'client/TennisEvents';

export interface ViewingParams {
  filter?: ViewingFilter;
  keyword?: string;
  bounds?: google.maps.LatLngBoundsLiteral;
}

export interface ViewingFilter {
  title?: string;
  organizer?: string;
  sex?: string;
  placeName?: string;
  prefecture?: string;
  courtType?: string;
  detail?: string;
}
