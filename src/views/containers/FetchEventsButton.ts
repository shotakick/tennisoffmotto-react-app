import { connect, DispatchProp } from 'react-redux';
import { Dispatch } from 'redux';
import { Button, ButtonProps } from 'semantic-ui-react';
import { Action } from 'typescript-fsa';
import { ReduxRootState } from '../../state/ducks';
import { actionCreators } from '../../state/ducks/TennisEvents';

type StateProps = ReturnType<typeof mapStateToProps>;
const mapStateToProps = (state: ReduxRootState) => ({
  previousFetchingParams: state.tennisEvents.fetchingParams
});

type DispatchingProps = ReturnType<typeof mapDispatchToProps>;
const mapDispatchToProps = (dispatch: Dispatch<Action<any>>) => ({ dispatch });

const mergeProps = (
  { previousFetchingParams }: StateProps,
  { dispatch }: DispatchingProps
) => ({
  onClick: () =>
    dispatch(actionCreators.requestFetchTennisEvents(previousFetchingParams))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Button);
