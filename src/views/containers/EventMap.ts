// implemented by HOC. (recompose and react-redux)

import * as React from 'react';
import {
  GoogleMap,
  GoogleMapProps,
  withGoogleMap,
  WithGoogleMapProps,
  withScriptjs,
  WithScriptjsProps
} from 'react-google-maps';
import { connect } from 'react-redux';
import {
  compose,
  Omit,
  pure,
  setDisplayName,
  StateHandlerMap,
  withProps,
  withStateHandlers
} from 'recompose';
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
  EventMapProps as ComponentProps
} from '../components/EventMap';

// Constants
const DELAY_AMOUNT_FOR_FETCHING_START = 800;
const DEFAULT_CENTER_TOKYO = { lat: 35.689614, lng: 139.691585 };
const DEFAULT_ZOOM = 14;

// Types
type OwnProps = ComponentProps & {
  maxMarkerVisibleCount: number;
};
type PrivateProps = Pick<
  OwnProps,
  | keyof GoogleMapProps
  | keyof LStateProps
  | keyof LStateHanlerProps
  | keyof StateProps
  // | keyof DispatchProps
  | 'mapRef'
>;
type PublicProps = Omit<OwnProps, keyof PrivateProps>;
type LStateProps = Pick<ComponentProps, 'infoWindowOpenKey'>;
type LStateHanlerProps = Pick<
  ComponentProps,
  'handleOnClickMarker' | 'handleOnClickMap'
>;
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
    zoomLevel: mapRef.current ? mapRef.current.getZoom() : DEFAULT_ZOOM
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
    ),
  onBoundsChanged: () => dispatch(actionCreators.cancelFetchingTennisEvents())
});

const getNewFetchingParams = (
  previousFetchingParams: FetchingParams,
  ownProps: OwnProps
): RequestFetchTennisEventsPayload => ({
  ...previousFetchingParams,
  bounds: (ownProps.mapRef.current as GoogleMap).getBounds().toJSON(),
  fetchingDelay: DELAY_AMOUNT_FOR_FETCHING_START
});

// Sub functions for Enhancer(to GoogleMap)
const getInitialGoogleMapProps = ():
  | WithScriptjsProps
  | WithGoogleMapProps => ({
  googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${
    process.env.REACT_APP_GOOGLE_MAP_API_KEY
  }`,
  loadingElement: React.createElement('div', {
    style: { height: '100%' }
  }),
  containerElement: React.createElement('div', {
    style: { height: '100%' }
  }),
  mapElement: React.createElement('div', {
    style: { height: '100%' }
  })
});

const overrideGoogleMapDefaultProps = (): GoogleMapProps => ({
  defaultCenter: DEFAULT_CENTER_TOKYO,
  defaultZoom: DEFAULT_ZOOM,
  defaultOptions: {
    mapTypeControl: false,
    streetViewControl: false,
    zoomControl: false,
    scaleControl: false,
    rotateControl: false,
    gestureHandling: 'greedy'
  }
});

// Create Enhancer
const enhancer = compose<ComponentProps, PublicProps>(
  setDisplayName('EnhancedEventMap'),
  withProps(getInitialGoogleMapProps()),
  withProps(overrideGoogleMapDefaultProps()),
  withScriptjs,
  withGoogleMap,
  withProps({
    mapRef: React.createRef<GoogleMap>()
  }),
  withStateHandlers<
    LStateProps,
    LStateHanlerProps & StateHandlerMap<LStateProps>,
    ComponentProps
  >(
    { infoWindowOpenKey: undefined },
    {
      handleOnClickMarker: (state, props) => key => ({
        ...state,
        infoWindowOpenKey: state.infoWindowOpenKey === key ? undefined : key
      }),
      handleOnClickMap: (state, props) => () => ({
        ...state,
        infoWindowOpenKey: undefined
      })
    }
  ),
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
