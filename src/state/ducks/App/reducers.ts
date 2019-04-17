import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { actionCreators } from './actions';

export type AppState = {
  autoFetchingMode: boolean;
  visibleAppFooter: boolean;
};

const initialState: AppState = {
  autoFetchingMode: true,
  visibleAppFooter: false
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
  .case(actionCreators.setVisibleAppFooter, (state, { visibleAppFooter }) => ({
    ...state,
    visibleAppFooter
  }))
  .case(actionCreators.toggleVisibleAppFooter, state => ({
    ...state,
    visibleAppFooter: !state.visibleAppFooter
  }))
  .build();
export default appStateReducer;
