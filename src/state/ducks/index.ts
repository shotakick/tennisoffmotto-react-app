import { combineReducers } from 'redux';
import { fork } from 'redux-saga/effects';

import {
  tennisEventsReducer,
  tennisEventsSaga,
  TennisEventsState
} from './TennisEvents';

// root state
export interface ReduxRootState {
  tennisEvents: TennisEventsState;
}

// root reducer
export const rootReducer = combineReducers<ReduxRootState>({
  tennisEvents: tennisEventsReducer
});
export default rootReducer;

// root saga
export function* rootSaga() {
  yield fork(tennisEventsSaga);
}
