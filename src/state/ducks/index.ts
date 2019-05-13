import { combineReducers } from 'redux';
import { fork } from 'redux-saga/effects';

import appReducer, { AppState } from './App';
import tennisEventsReducer, { tennisEventsSaga, TennisEventsState } from './TennisEvents';

// root state
export interface ReduxRootState {
  app: AppState;
  tennisEvents: TennisEventsState;
}

// root reducer
export const rootReducer = combineReducers<ReduxRootState>({
  app: appReducer,
  tennisEvents: tennisEventsReducer,
});
export default rootReducer;

// root saga
export function* rootSaga() {
  yield fork(tennisEventsSaga);
}
