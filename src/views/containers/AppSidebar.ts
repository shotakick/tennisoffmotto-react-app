import { connect } from 'react-redux';
import { ReduxRootState } from '../../state/ducks';
import AppSidebar, { AppSidebarProps } from '../components/AppSidebar';

type StateProps = Pick<AppSidebarProps, 'hitsCount' | 'events' | 'isFetching'>;
export default connect<StateProps, {}, {}, ReduxRootState>(
  ({ tennisEvents }) => ({
    hitsCount: tennisEvents.hitsCount,
    events: tennisEvents.events,
    isFetching: tennisEvents.isFetching
  }),
  {}
)(AppSidebar);
