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

// Additional Local State and Handlers
const withEventMapStateHandlers = withStateHandlers<
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
);

// define for GoogleMap
const initialGoogleMapProps: WithScriptjsProps | WithGoogleMapProps = {
  googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${
    process.env.REACT_APP_GOOGLE_MAP_API_KEY
  }`,
  loadingElement: React.createElement('div'),
  containerElement: React.createElement('div', {
    style: { height: '100%' }
  }),
  mapElement: React.createElement('div', {
    style: { height: '100%' }
  })
};

// Create Enhancer
const enhancer = compose<ComponentProps, PublicProps>(
  setDisplayName('EnhancedEventMap'),
  withProps(initialGoogleMapProps),
  withScriptjs,
  withGoogleMap,
  withProps({
    mapRef: React.createRef<GoogleMap>()
  }),
  withEventMapStateHandlers,
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
