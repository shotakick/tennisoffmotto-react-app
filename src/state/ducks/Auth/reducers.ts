import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { authActions as actions } from './actions';

export interface AuthState {
  isPreparead?: boolean;
  isAuthenticated?: boolean;
}

const initialState: AuthState = {
  isPreparead: false,
  isAuthenticated: false,
};

export default reducerWithInitialState<AuthState>(initialState)
  .case(actions.signOut, (state, payload) => ({
    isPreparead: true,
    isAuthenticated: false,
  }))
  .case(actions.setAuthState, (state, payload) => ({
    isPreparead: true,
    isAuthenticated: payload.isAuthenticated,
  }))
  .build();
