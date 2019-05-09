import { GoogleMap } from 'react-google-maps';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ReduxRootState } from '../../state/ducks';
import { appActions, AppState } from '../../state/ducks/App';
import {
  getGroupedEventsByPointWithLimit,
  tennisEventsActions
} from '../../state/ducks/TennisEvents';
import InnerComponent, { Props as InnerProps } from '../components/EventMap';

const DELAY_AMOUNT_FOR_FETCHING_START = 200;

type StateProps = Pick<InnerProps, 'eventGroupListByPosition'> &
  Pick<AppState, 'autoFetchingMode'>;
type DispatchProps = { dispatch: Dispatch };
type MergedProps = Pick<
  InnerProps,
  'eventGroupListByPosition' | 'onIdle' | 'onBoundsChanged'
>;
type OwnProps = InnerProps & {
  maxMarkerVisibleCount: number;
};

const mapStateToProps = (
  state: ReduxRootState,
  { maxMarkerVisibleCount }: OwnProps
): StateProps => ({
  eventGroupListByPosition: getGroupedEventsByPointWithLimit(state, {
    maxCount: maxMarkerVisibleCount,
    zoomLevel: state.app.mapZoomLevel
  }),
  autoFetchingMode: state.app.autoFetchingMode
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  dispatch
});

const mergeProps = (
  { eventGroupListByPosition, autoFetchingMode }: StateProps,
  { dispatch }: DispatchProps,
  ownProps: OwnProps
): MergedProps => ({
  ...ownProps,
  eventGroupListByPosition,
  onIdle: (mapZoomLevel: number, bounds: google.maps.LatLngBounds) => {
    dispatch(appActions.setMapZoomLevel({ mapZoomLevel }));
    if (bounds) {
      dispatch(
        tennisEventsActions.setFetchingParams({ bounds: bounds.toJSON() })
      );
    }
    autoFetchingMode &&
      dispatch(
        tennisEventsActions.requestFetchTennisEvents({
          fetchingDelay: DELAY_AMOUNT_FOR_FETCHING_START
        })
      );
  },
  onBoundsChanged: () => {
    dispatch(tennisEventsActions.cancelFetchingTennisEvents());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(InnerComponent);
