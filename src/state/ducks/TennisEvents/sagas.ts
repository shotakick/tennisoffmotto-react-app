import * as Api from 'client/TennisEvents';
import { delay } from 'redux-saga';
import { call, put, race, take, takeLatest } from 'redux-saga/effects';
import { Action } from 'typescript-fsa';
import {
  actionCreators,
  ActionType,
  RequestFetchTennisEventsPayload
} from './actions';
import * as Api from '../../../client/TennisEvents';
import { actionCreators, RequestFetchTennisEventsPayload } from './actions';

export function* tennisEventsSaga() {
  yield takeLatest(
    ActionType.REQUEST_FETCH_TENNIS_EVENTS,
    handleFetchEventsRequest
  );
}

function* handleFetchEventsRequest(
  action: Action<RequestFetchTennisEventsPayload>
) {
  yield race({
    task: call(asyncFetchEventsWithDelay, action.payload),
    cancel: take(ActionType.CANCEL_FETCHING_REQUEST),
    cancelByChangeParams: take(ActionType.SET_VIEWING_FILTER)
  });
}

function* asyncFetchEventsWithDelay(params: RequestFetchTennisEventsPayload) {
  if (params.fetchingDelay) {
    yield call(delay, params.fetchingDelay);
  }

  yield put(actionCreators.asyncFetchTennisEvents.started(params));

  try {
    const result: Api.FetchedResult = yield call(Api.fetchEvents, params);

    yield put(
      actionCreators.asyncFetchTennisEvents.done({
        params,
        result
      })
    );
  } catch (err) {
    console.error(`failed fetchEvents: ${err}`);
    yield put(
      actionCreators.asyncFetchTennisEvents.failed({
        params,
        error: { message: err }
      })
    );
  }
}
