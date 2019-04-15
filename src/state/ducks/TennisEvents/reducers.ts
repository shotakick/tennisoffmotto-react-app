import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { FetchedResult, FetchingParams } from '../../../client/TennisEvents';
import { actionCreators } from './actions';
import { ViewingFilter } from './types';

export type TennisEventsState = FetchedResult & {
  fetchingParams: FetchingParams;
  viewingFilter: ViewingFilter;
  isFetching: boolean;
};

const initialState: TennisEventsState = {
  events: [],
  hitsCount: 0,
  fetchingParams: { keyword: '' },
  viewingFilter: {},
  isFetching: false
};

export const tennisEventsReducer = reducerWithInitialState<TennisEventsState>(
  initialState
)
  .case(actionCreators.asyncFetchTennisEvents.started, (state, payload) => ({
    ...state,
    fetchingParams: { ...payload },
    isFetching: true
  }))
  .case(actionCreators.asyncFetchTennisEvents.done, (state, payload) => ({
    ...state,
    ...payload.result,
    isFetching: false
  }))
  .case(actionCreators.asyncFetchTennisEvents.failed, (state, payload) => ({
    ...state,
    events: [],
    hitsCount: 0,
    isFetching: false
  }))
  .case(actionCreators.setFetchingParams, (state, payload) => ({
    ...state,
    fetchingParams: payload
  }))
  .case(actionCreators.setViewingFilter, (state, payload) => ({
    ...state,
    viewingFilter: payload
  }))
  .build();
export default tennisEventsReducer;
