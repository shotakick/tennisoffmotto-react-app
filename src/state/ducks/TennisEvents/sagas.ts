import {
  call,
  delay,
  put,
  race,
  select,
  take,
  takeLatest
} from 'redux-saga/effects';
import { Action } from 'typescript-fsa';
import * as Api from '../../../client/TennisEvents';
import {
  RequestFetchTennisEventsPayload,
  tennisEventsActions as actions
} from './actions';
import { selectFetchingParams } from './selectors';

export function* tennisEventsSaga() {
  yield takeLatest(
    actions.requestFetchTennisEvents.type,
    handleFetchEventsRequest
  );
}

function* handleFetchEventsRequest(
  action: Action<RequestFetchTennisEventsPayload>
) {
  yield race({
    task: call(fetchEvents, action.payload),
    cancel: take(actions.cancelFetchingTennisEvents.type),
    cancelByChangeParams: take(actions.setFetchingParams.type)
  });
}

function* fetchEvents(params: RequestFetchTennisEventsPayload) {
  if (params.fetchingDelay) {
    yield delay(params.fetchingDelay);
  }

  const fetchingParams = yield select(selectFetchingParams);

  yield put(actions.asyncFetchTennisEvents.started(fetchingParams));

  try {
    const result: Api.FetchedResult = yield call(
      Api.fetchEvents,
      fetchingParams
    );

    yield put(
      actions.asyncFetchTennisEvents.done({
        params: fetchingParams,
        result
      })
    );
  } catch (error) {
    yield put(
      actions.asyncFetchTennisEvents.failed({
        params: fetchingParams,
        error
      })
    );
  }
}
