import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { appActions as actions } from './actions';

export type AppState = {
  autoFetchingMode: boolean;
  mapZoomLevel: number;
};

const initialState: AppState = {
  autoFetchingMode: true,
  mapZoomLevel: 1,
};

export default reducerWithInitialState<AppState>(initialState)
  .case(actions.setAutoFetchingMode, (state, { autoFetchingMode }) => ({
    ...state,
    autoFetchingMode,
  }))
  .case(actions.toggleAutoFetchingMode, state => ({
    ...state,
    autoFetchingMode: !state.autoFetchingMode,
  }))
  .case(actions.setMapZoomLevel, (state, { mapZoomLevel }) => ({
    ...state,
    mapZoomLevel,
  }))
  .build();
