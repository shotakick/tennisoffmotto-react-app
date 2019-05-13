import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ReduxRootState } from '../../state/ducks';
import InnerComponent, { Props as InnerProps } from '../components/AppSidebar';

type StateProps = Pick<InnerProps, 'hitsCount' | 'events' | 'isFetching'>;
type DispatchProps = {};
type OwnProps = InnerProps;

const mapStateToProps = (state: ReduxRootState): StateProps => ({
  hitsCount: state.tennisEvents.result.hitsCount,
  events: state.tennisEvents.result.events,
  isFetching: state.tennisEvents.isFetching,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InnerComponent);
