import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Button, ButtonProps } from 'semantic-ui-react';
import { ReduxRootState } from 'state/ducks';
import { actionCreators } from 'state/ducks/TennisEvents';
import { Action } from 'typescript-fsa';

function mapStateToProps(state: ReduxRootState) {
  return {
    previousFetchingParams: state.tennisEvents.fetchingParams
  };
}

function mapDispatchToProps(
  dispatch: Dispatch<Action<any>>,
  { previousFetchingParams }: StateProps
) {
  return bindActionCreators(
    {
      onClick: () =>
        actionCreators.requestFetchTennisEvents(previousFetchingParams)
    },
    dispatch
  );
}

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchingProps = ReturnType<typeof mapDispatchToProps>;
export default connect<StateProps, DispatchingProps, ButtonProps>(
  mapStateToProps,
  mapDispatchToProps
)(Button);
