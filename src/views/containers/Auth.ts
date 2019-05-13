import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ReduxRootState } from '../../state/ducks';
import { authActions } from '../../state/ducks/Auth';
import InnerComponent, { Props as InnerProps } from '../components/Auth';

type StateProps = Pick<InnerProps, 'isAuthPrepared'>;
type DispatchProps = Pick<InnerProps, 'ensureAuthenticated'>;
type OwnProps = InnerProps;

const mapStateToProps = (state: ReduxRootState): StateProps => ({
  isAuthPrepared: !!state.auth.isPreparead,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  ensureAuthenticated: () => dispatch(authActions.ensureAuthenticated()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InnerComponent);
