import { connect, DispatchProp } from 'react-redux';
import { Dispatch } from 'redux';
import { Button, ButtonProps } from 'semantic-ui-react';
import { ReduxRootState } from 'state/ducks';
import { actionCreators } from 'state/ducks/TennisEvents';
import { Action } from 'typescript-fsa';

type StateProps = ReturnType<typeof mapStateToProps>;
const mapStateToProps = (state: ReduxRootState) => ({
  previousFetchingParams: state.tennisEvents.fetchingParams
});

type DispatchingProps = ReturnType<typeof mapDispatchToProps>;
const mapDispatchToProps = (dispatch: Dispatch<Action<any>>) => ({ dispatch });

const mergeProps = (
  { previousFetchingParams }: StateProps,
  { dispatch }: DispatchProp
) => ({
  onClick: () =>
    dispatch(actionCreators.requestFetchTennisEvents(previousFetchingParams))
});

export default connect<StateProps, DispatchingProps, ButtonProps>(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Button);
