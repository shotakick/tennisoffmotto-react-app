import { actionCreatorFactory } from 'typescript-fsa';
import { FetchedResult, FetchingParams, ViewingFilter } from './types';

// Action types
export enum ActionType {
  REQUEST_FETCH_TENNIS_EVENTS = 'REQUEST_FETCH_TENNIS_EVENTS',
  ASYNC_FETCH_TENNIS_EVENTS = 'ASYNC_FETCH_TENNIS_EVENTS',
  CANCEL_FETCHING_REQUEST = 'CANCEL_FETCHING_REQUEST',
  SET_VIEWING_FILTER = 'SET_VIEWING_FILTER'
}

// Action creators
const factory = actionCreatorFactory();
export const actionCreators = {
  requestFetchTennisEvents: factory<RequestFetchTennisEventsPayload>(
    ActionType.REQUEST_FETCH_TENNIS_EVENTS
  ),

  cancelFetchingTennisEvents: factory<void>(ActionType.CANCEL_FETCHING_REQUEST),

  asyncFetchTennisEvents: factory.async<
    FetchingParams,
    FetchedResult,
    { message: string }
  >(ActionType.ASYNC_FETCH_TENNIS_EVENTS),

  setViewingFilter: factory<ViewingFilter>(ActionType.SET_VIEWING_FILTER)
};

// Payload
export type RequestFetchTennisEventsPayload = {
  fetchingDelay?: number;
} & FetchingParams;
