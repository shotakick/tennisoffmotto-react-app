import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ReduxRootState } from '../../state/ducks';
import { appActions, AppState } from '../../state/ducks/App';
import {
  getGroupedEventsByPointWithLimit,
  tennisEventsActions,
} from '../../state/ducks/TennisEvents';
import InnerComponent, { Props as InnerProps } from '../components/EventMap';

const DELAY_AMOUNT_FOR_FETCHING_START = 200;

type StateProps = Pick<InnerProps, 'eventGroupListByPosition' | 'isAuthenticated'> &
  Pick<AppState, 'autoFetchingMode'>;
type DispatchProps = { dispatch: Dispatch };
type MergedProps = StateProps & Pick<InnerProps, 'onIdle' | 'onLogin' | 'onBoundsChanged'>;
type OwnProps = InnerProps & {
  maxMarkerVisibleCount: number;
};

const mapStateToProps = (
  state: ReduxRootState,
  { maxMarkerVisibleCount }: OwnProps,
): StateProps => ({
  eventGroupListByPosition: getGroupedEventsByPointWithLimit(state, {
    maxCount: maxMarkerVisibleCount,
    zoomLevel: state.app.mapZoomLevel,
  }),
  isAuthenticated: !!state.auth.isAuthenticated,
  autoFetchingMode: state.app.autoFetchingMode,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  dispatch,
});

const mergeProps = (
  stateProps: StateProps,
  { dispatch }: DispatchProps,
  ownProps: OwnProps,
): MergedProps => ({
  ...stateProps,
  ...ownProps,
  onIdle: (mapZoomLevel: number, bounds: google.maps.LatLngBounds) => {
    dispatch(appActions.setMapZoomLevel({ mapZoomLevel }));
    if (bounds) {
      dispatch(tennisEventsActions.setFetchingParams({ bounds: bounds.toJSON() }));
    }
    stateProps.autoFetchingMode &&
      dispatch(
        tennisEventsActions.requestFetchTennisEvents({
          fetchingDelay: DELAY_AMOUNT_FOR_FETCHING_START,
        }),
      );
  },
  onBoundsChanged: () => {
    dispatch(tennisEventsActions.cancelFetchingTennisEvents());
  },
  onLogin: () => {
    dispatch(tennisEventsActions.requestFetchTennisEvents({}));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(InnerComponent);
