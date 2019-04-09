// implemented by HOC. (recompose and react-redux)

import * as React from 'react';
import { GoogleMap } from 'react-google-maps';
import { connect } from 'react-redux';
import { compose, Omit, pure, setDisplayName, withProps } from 'recompose';
import { Dispatch } from 'redux';
import { ReduxRootState } from 'state/ducks';
import {
  actionCreators,
  FetchingParams,
  getGroupedEventsByPointWithLimit,
  RequestFetchTennisEventsPayload
} from 'state/ducks/TennisEvents';
import { Action } from 'typescript-fsa';
import EventMap, {
  // import {
  //   EventMap,
  EventMapProps as ComponentProps
} from '../components/EventMap';

// Constants
const DELAY_AMOUNT_FOR_FETCHING_START = 800;

// Types
interface InjectedProps {
  maxMarkerVisibleCount: number;
}
type OwnProps = ComponentProps & InjectedProps;
type PublicProps = Omit<OwnProps, keyof StateProps | 'mapRef'>;
type StateProps = Pick<ComponentProps, 'eventGroupListByPosition'>;
// type DispatchProps = Pick<ComponentProps, 'onIdle' | 'onBoundsChanged'>;
type OwnState = StateProps & {
  previousFetchingParams: FetchingParams;
};

// Sub functions for Enhancer(redux connection)
const mapStateToProps = (
  state: ReduxRootState,
  { maxMarkerVisibleCount, mapRef }: OwnProps
): OwnState => ({
  eventGroupListByPosition: getGroupedEventsByPointWithLimit(state, {
    maxCount: maxMarkerVisibleCount,
    zoomLevel: mapRef.current ? mapRef.current.getZoom() : 1
  }),
  previousFetchingParams: state.tennisEvents.fetchingParams
});

const mapDispatchToProps = (dispatch: Dispatch<Action<any>>) => ({ dispatch });

const mergeProps = (
  { previousFetchingParams, ...stateProps }: OwnState,
  { dispatch }: { dispatch: Dispatch<Action<any>> },
  ownProps: OwnProps
): OwnProps => ({
  ...ownProps,
  ...stateProps,
  onIdle: () =>
    dispatch(
      actionCreators.requestFetchTennisEvents(
        getNewFetchingParams(previousFetchingParams, ownProps)
      )
    )
  // onBoundsChanged: () => dispatch(actionCreators.cancelFetchingTennisEvents())
});

const getNewFetchingParams = (
  previousFetchingParams: FetchingParams,
  ownProps: OwnProps
): RequestFetchTennisEventsPayload => ({
  ...previousFetchingParams,
  bounds: (ownProps.mapRef.current as GoogleMap).getBounds().toJSON(),
  fetchingDelay: DELAY_AMOUNT_FOR_FETCHING_START
});

// Create Enhancer
const enhancer = compose<ComponentProps, PublicProps>(
  setDisplayName('EventMapContainer'),
  withProps({
    mapRef: React.createRef<GoogleMap>()
  }),
  pure,
  connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
  )
);

// Exports
export type EventMapProps = PublicProps;
export default enhancer(EventMap);
