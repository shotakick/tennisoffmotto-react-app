import { combineReducers } from 'redux';
import { fork } from 'redux-saga/effects';

import appReducer, { AppState } from './App';
import authReducer, { authSaga, AuthState } from './Auth';
import tennisEventsReducer, { tennisEventsSaga, TennisEventsState } from './TennisEvents';

// root state
export interface ReduxRootState {
  app: AppState;
  auth: AuthState;
  tennisEvents: TennisEventsState;
}

// root reducer
export const rootReducer = combineReducers<ReduxRootState>({
  app: appReducer,
  auth: authReducer,
  tennisEvents: tennisEventsReducer,
});
export default rootReducer;

// root saga
export function* rootSaga() {
  yield fork(tennisEventsSaga);
  yield fork(authSaga);
}
