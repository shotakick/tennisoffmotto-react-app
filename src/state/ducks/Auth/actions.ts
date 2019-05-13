import { actionCreatorFactory } from 'typescript-fsa';

// Actions Payloads
export interface TrySignInPayload {
  id: string;
  pass: string;
}

export interface SetAuthStatePayload {
  isAuthenticated: boolean;
}

// Action creators
const factory = actionCreatorFactory('AUTH_ACTION');
export const authActions = {
  ensureAuthenticated: factory('ENSURE_AUTHENTICATED'),
  trySignIn: factory<TrySignInPayload>('TRY_SIGN_IN'),
  signOut: factory('SIGN_OUT'),
  setAuthState: factory<SetAuthStatePayload>('SET_AUTH_STATE'),
};
