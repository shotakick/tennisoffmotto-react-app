import { TennisEventInfo } from 'client/TennisEvents';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Button, ButtonProps } from 'semantic-ui-react';
import { actionCreators } from 'state/ducks/TennisEvents';
import { Action } from 'typescript-fsa';

interface OwnProps {
  filter?: Partial<TennisEventInfo>;
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: Dispatch<Action<any>>, props: OwnProps) =>
  bindActionCreators(
    {
      onClick: () => actionCreators.setFetchingParams({ filter: props.filter })
    },
    dispatch
  );

type StateToProps = ReturnType<typeof mapStateToProps>;
type DispatchToProps = ReturnType<typeof mapDispatchToProps>;
export default connect<StateToProps, DispatchToProps, ButtonProps>(
  mapStateToProps,
  mapDispatchToProps
)(Button);
