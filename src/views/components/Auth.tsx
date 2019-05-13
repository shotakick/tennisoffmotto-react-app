import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

export interface Props {
  isAuthPrepared: boolean;
  ensureAuthenticated(): void;
}

export const Auth: React.FC<Props> = props => {
  const { isAuthPrepared, ensureAuthenticated } = props;

  React.useEffect(() => {
    if (!isAuthPrepared) ensureAuthenticated();
  }, [isAuthPrepared, ensureAuthenticated]);

  if (!isAuthPrepared) {
    return (
      <Dimmer active={true}>
        <Loader>Loading</Loader>
      </Dimmer>
    );
  }

  return <>{props.children}</>;
};
export default Auth;
