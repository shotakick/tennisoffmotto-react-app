export {
  TennisEventInfo,
  FetchingFilters,
  FetchingParams,
  FetchedResult
} from 'client/TennisEvents';

export interface ViewingFilter {
  title?: string;
  organizer?: string;
  sex?: string;
  placeName?: string;
  prefecture?: string;
  courtType?: string;
  detail?: string;
}
