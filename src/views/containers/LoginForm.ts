import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ReduxRootState } from '../../state/ducks';
import { authActions } from '../../state/ducks/Auth';
import InnerComponent, { Props as InnerProps } from '../components/LoginForm';

type StateProps = {};
type DispatchProps = Pick<InnerProps, 'onLogin'>;
type OwnProps = InnerProps;

const mapStateToProps = (state: ReduxRootState): StateProps => ({});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  onLogin: () => {
    dispatch(authActions.setAuthState({ isAuthenticated: true }));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InnerComponent);
