import { connect } from 'react-redux';
import { ReduxRootState } from '../../state/ducks';
import { actionCreators } from '../../state/ducks/App';
import AppHeader, { AppHeaderProps } from '../components/AppHeader';

type DispatchProps = Pick<AppHeaderProps, 'onClickSetting'>;
export default connect<{}, DispatchProps, {}, ReduxRootState>(
  null,
  { onClickSetting: actionCreators.toggleVisibleAppFooter }
)(AppHeader);
