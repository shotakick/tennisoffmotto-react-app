import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { FetchedResult, FetchingParams } from '../../../client/TennisEvents';
import { tennisEventsActions as actions } from './actions';
import { ViewingFilter } from './types';

export interface TennisEventsState {
  result: FetchedResult;
  fetchingParams: FetchingParams;
  viewingFilter: ViewingFilter;
  isFetching: boolean;
}

const initialState: TennisEventsState = {
  result: { events: [], hitsCount: 0 },
  fetchingParams: { keyword: '' },
  viewingFilter: {},
  isFetching: false
};

export default reducerWithInitialState<TennisEventsState>(initialState)
  .case(actions.asyncFetchTennisEvents.started, (state, payload) => ({
    ...state,
    fetchingParams: payload,
    isFetching: true
  }))
  .case(actions.asyncFetchTennisEvents.done, (state, payload) => ({
    ...state,
    result: payload.result,
    isFetching: false
  }))
  .case(actions.asyncFetchTennisEvents.failed, (state, payload) => ({
    ...state,
    isFetching: false
  }))
  .case(actions.setFetchingParams, (state, payload) => ({
    ...state,
    fetchingParams: { ...state.fetchingParams, ...payload }
  }))
  .case(actions.setViewingFilter, (state, payload) => ({
    ...state,
    viewingFilter: payload
  }))
  .build();
