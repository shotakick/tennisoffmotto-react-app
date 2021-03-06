import { actionCreatorFactory } from 'typescript-fsa';
import { FetchedResult, FetchingParams } from '../../../client/TennisEvents';
import { ViewingFilter } from './types';

// Action creators
const factory = actionCreatorFactory('TENNIS_EVENTS');
export const tennisEventsActions = {
  requestFetchTennisEvents: factory<RequestFetchTennisEventsPayload>('REQUEST_FETCH_TENNIS_EVENTS'),
  cancelFetchingTennisEvents: factory<void>('CANCEL_FETCHING_REQUEST'),
  asyncFetchTennisEvents: factory.async<FetchingParams, FetchedResult, { message: string }>(
    'ASYNC_FETCH_TENNIS_EVENTS',
  ),
  setFetchingParams: factory<FetchingParams>('SET_FETCHING_PARAMS'),
  setViewingFilter: factory<ViewingFilter>('SET_VIEWING_FILTER'),
};

// Payload
export interface RequestFetchTennisEventsPayload {
  fetchingDelay?: number;
}
