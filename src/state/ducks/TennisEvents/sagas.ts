import { call, delay, put, race, take, takeLatest } from 'redux-saga/effects';
import { Action } from 'typescript-fsa';
import * as Api from '../../../client/TennisEvents';
import { actionCreators, RequestFetchTennisEventsPayload } from './actions';

export function* tennisEventsSaga() {
  yield takeLatest(
    actionCreators.requestFetchTennisEvents.type,
    handleFetchEventsRequest
  );
}

function* handleFetchEventsRequest(
  action: Action<RequestFetchTennisEventsPayload>
) {
  yield race({
    task: call(asyncFetchEventsWithDelay, action.payload),
    cancel: take(actionCreators.cancelFetchingTennisEvents.type),
    cancelByChangeParams: take(actionCreators.setViewingFilter.type)
  });
}

function* asyncFetchEventsWithDelay(params: RequestFetchTennisEventsPayload) {
  if (params.fetchingDelay) {
    yield delay(params.fetchingDelay);
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
