import { ReduxRootState } from '..';

export const isAuthenticated = (state: ReduxRootState) => {
  return !!state.auth.isAuthenticated;
};
