import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { Action } from 'typescript-fsa';
import firebase from '../../../client/Firebase';
import { authActions, TrySignInPayload } from './actions';

export function* authSaga() {
  yield takeLatest(authActions.ensureAuthenticated.type, handleEnsureAuthenticated);
  yield takeLatest(authActions.trySignIn.type, handleTrySignIn);
  yield takeLatest(authActions.signOut.type, handleSignOut);
}

function* handleEnsureAuthenticated() {
  yield delay(3000);
  const isAuthenticated = !!firebase.auth().currentUser;
  yield put(authActions.setAuthState({ isAuthenticated }));
}

function* handleTrySignIn({ payload: { id, pass } }: Action<TrySignInPayload>) {
  try {
    yield call(firebase.auth().signInWithEmailAndPassword, id, pass);
    yield put(authActions.setAuthState({ isAuthenticated: true }));
  } catch (error) {
    yield put(authActions.setAuthState({ isAuthenticated: false }));
  }
}

function* handleSignOut() {
  yield firebase.auth().signOut();
}
