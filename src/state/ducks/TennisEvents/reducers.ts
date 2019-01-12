import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { actionCreators } from './actions';
import { FetchedResult, FetchingParams } from './types';

export type TennisEventsState = FetchedResult & {
  fetchingParams: FetchingParams;
  isLoading: boolean;
};

const initialState: TennisEventsState = {
  events: [],
  hitsCount: 0,
  fetchingParams: {},
  isLoading: false
};

export const tennisEventsReducer = reducerWithInitialState<TennisEventsState>(
  initialState
)
  .case(actionCreators.asyncFetchTennisEvents.started, (state, payload) => ({
    ...state,
    fetchingParams: { ...payload },
    isLoading: true
  }))
  .case(actionCreators.asyncFetchTennisEvents.done, (state, payload) => ({
    ...state,
    ...payload.result,
    isLoading: false
  }))
  .case(actionCreators.asyncFetchTennisEvents.failed, (state, payload) => ({
    ...initialState,
    fetchingParams: { ...payload.params }
  }))
  .case(actionCreators.setFetchingParams, (state, payload) => ({
    ...state,
    fetchingParams: { ...payload }
  }))
  .build();
export default tennisEventsReducer;
