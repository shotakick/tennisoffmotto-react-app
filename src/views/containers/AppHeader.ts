import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import firebase from '../../client/Firebase';
import { ReduxRootState } from '../../state/ducks';
import { authActions } from '../../state/ducks/Auth';
import InnerComponent, { Props as InnerProps } from '../components/AppHeader';

type StateProps = Pick<InnerProps, 'isAuthenticated'>;
type DispatchProps = Pick<InnerProps, 'handleLogout'>;
type OwnProps = {};

const mapStateToProps = (state: ReduxRootState): StateProps => ({
  isAuthenticated: !!state.auth.isAuthenticated,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  handleLogout: () => dispatch(authActions.signOut()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InnerComponent);
