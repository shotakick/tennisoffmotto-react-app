import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ReduxRootState } from '../../state/ducks';
import { tennisEventsActions as eventActions } from '../../state/ducks/TennisEvents';
import InnerComponent, {
  Props as InnerProps
} from '../components/EventFetchButton';

type StateProps = Pick<InnerProps, 'isFetching'>;
type DispatchProps = Pick<InnerProps, 'onClick'>;
type OwnProps = InnerProps;

const mapStateToProps = (state: ReduxRootState): StateProps => ({
  isFetching: state.tennisEvents.isFetching
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  onClick: () => dispatch(eventActions.requestFetchTennisEvents({}))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InnerComponent);
