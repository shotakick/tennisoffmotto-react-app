import { actionCreatorFactory } from 'typescript-fsa';

// Action creators
const factory = actionCreatorFactory();
export const actionCreators = {
  setAutoFetchingMode: factory<{ autoFetchingMode: boolean }>(
    'SET_AUTO_FETCHING_MODE'
  ),
  toggleAutoFetchingMode: factory<void>('TOGGLE_AUTO_FETCHING_MODE')
};
