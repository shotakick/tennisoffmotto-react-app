import { connect } from 'react-redux';
import { ReduxRootState } from '../../state/ducks';
import { actionCreators } from '../../state/ducks/App';
import AppFooter, { AppFooterProps } from '../components/AppFooter';

type StateProps = Pick<AppFooterProps, 'visible'>;
type DispatchProps = Pick<AppFooterProps, 'toggleVisible'>;
export default connect<StateProps, DispatchProps, {}, ReduxRootState>(
  ({ app }) => ({ visible: app.visibleAppFooter }),
  { toggleVisible: actionCreators.toggleVisibleAppFooter }
)(AppFooter);
