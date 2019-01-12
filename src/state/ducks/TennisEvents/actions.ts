import { actionCreatorFactory } from 'typescript-fsa';
import { FetchedResult, FetchingParams } from './types';

// Action types
export enum ActionType {
  REQUEST_FETCH_TENNIS_EVENTS = 'REQUEST_FETCH_TENNIS_EVENTS',
  ASYNC_FETCH_TENNIS_EVENTS = 'ASYNC_FETCH_TENNIS_EVENTS',
  CANCEL_FETCHING_REQUEST = 'CANCEL_FETCHING_REQUEST',
  SET_FETCHING_PARAMS = 'SET_FETCHING_PARAMS'
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

  // 未指定の検索条件は前回値を引き継ぐ(reducerにてマージ)。
  setFetchingParams: factory<FetchingParams>(ActionType.SET_FETCHING_PARAMS)
};

// Payload
export type RequestFetchTennisEventsPayload = {
  fetchingDelay?: number;
} & FetchingParams;
