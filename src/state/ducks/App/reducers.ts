import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { actionCreators } from './actions';

export type AppState = {
  autoFetchingMode: boolean;
};

const initialState: AppState = {
  autoFetchingMode: true
};

export const appStateReducer = reducerWithInitialState<AppState>(initialState)
  .case(actionCreators.setAutoFetchingMode, (state, { autoFetchingMode }) => ({
    ...state,
    autoFetchingMode
  }))
  .case(actionCreators.toggleAutoFetchingMode, state => ({
    ...state,
    autoFetchingMode: !state.autoFetchingMode
  }))
  .build();
export default appStateReducer;
