// implemented by HOC. (recompose and react-redux)

import * as React from 'react';
import { GoogleMap } from 'react-google-maps';
import { connect } from 'react-redux';
import { compose, Omit, pure, setDisplayName, withProps } from 'recompose';
import { Dispatch } from 'redux';
import { Action } from 'typescript-fsa';
import { FetchingFilters } from '../../client/TennisEvents';
import { ReduxRootState } from '../../state/ducks';
import {
  getGroupedEventsByPointWithLimit,
  tennisEventsActions
} from '../../state/ducks/TennisEvents';
import EventMap, {
  EventMapProps as ComponentProps
} from '../components/EventMap';

// Constants
const DELAY_AMOUNT_FOR_FETCHING_START = 200;

// Types
interface InjectedProps {
  maxMarkerVisibleCount: number;
}
type OwnProps = ComponentProps & InjectedProps;
type PublicProps = Omit<
  OwnProps,
  keyof StateProps | keyof DispatchProps | 'mapRef'
>;
type StateProps = Pick<
  ComponentProps,
  'eventGroupListByPosition' | 'autoFetchingMode' | 'isFetching'
>;
type OwnState = StateProps & {};
type DispatchProps = Pick<
  ComponentProps,
  'startFetching' | 'cancelFetching' | 'setFetchingBounds'
>;

// Sub functions for Enhancer(redux connection)
const mapStateToProps = (
  state: ReduxRootState,
  { maxMarkerVisibleCount, mapRef }: OwnProps
): OwnState => ({
  eventGroupListByPosition: getGroupedEventsByPointWithLimit(state, {
    maxCount: maxMarkerVisibleCount,
    zoomLevel: mapRef.current ? mapRef.current.getZoom() : 1
  }),
  autoFetchingMode: state.app.autoFetchingMode,
  isFetching: state.tennisEvents.isFetching
});

const mapDispatchToProps = (dispatch: Dispatch<Action<any>>) => ({ dispatch });

const mergeProps = (
  state: OwnState,
  { dispatch }: { dispatch: Dispatch<Action<any>> },
  props: OwnProps
): OwnProps => ({
  ...props,
  ...state,
  startFetching: (withDalay?: boolean) => {
    dispatch(
      tennisEventsActions.setFetchingParams({
        bounds: (props.mapRef.current as GoogleMap).getBounds().toJSON()
      })
    );
    dispatch(
      tennisEventsActions.requestFetchTennisEvents({
        fetchingDelay: withDalay ? DELAY_AMOUNT_FOR_FETCHING_START : 0
      })
    );
  },
  cancelFetching: () =>
    dispatch(tennisEventsActions.cancelFetchingTennisEvents()),
  setFetchingBounds: () =>
    dispatch(
      tennisEventsActions.setFetchingParams({
        bounds: (props.mapRef.current as GoogleMap).getBounds().toJSON()
      })
    )
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
