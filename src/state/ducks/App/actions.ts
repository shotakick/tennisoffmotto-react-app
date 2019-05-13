import { actionCreatorFactory } from 'typescript-fsa';

// Action creators
const factory = actionCreatorFactory('APP');
export const appActions = {
  setAutoFetchingMode: factory<{ autoFetchingMode: boolean }>('SET_AUTO_FETCHING_MODE'),
  toggleAutoFetchingMode: factory<void>('TOGGLE_AUTO_FETCHING_MODE'),
  setMapZoomLevel: factory<{ mapZoomLevel: number }>('SET_MAP_ZOOM_LEVEL'),
};
