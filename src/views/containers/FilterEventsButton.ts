import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Button, ButtonProps } from 'semantic-ui-react';
import { Action } from 'typescript-fsa';
import { actionCreators, ViewingFilter } from '../../state/ducks/TennisEvents';

interface OwnProps {
  filter: ViewingFilter;
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (
  dispatch: Dispatch<Action<any>>,
  props: OwnProps
) => ({
  onClick: () => dispatch(actionCreators.setViewingFilter(props.filter))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Button);
