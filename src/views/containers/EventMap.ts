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
const DELAY_AMOUNT_FOR_FETCHING_START = 500;
const DEFAULT_CENTER_TOKYO = { lat: 35.689614, lng: 139.691585 };
const DEFAULT_ZOOM = 14;

// Types
type OwnProps = ComponentProps & {
  previousFetchingParams: FetchingParams;
  maxMarkerVisibleCount: number;
};
type PrivateProps = Pick<
  OwnProps,
  | keyof LocalProps
  | keyof LStateProps
  | keyof LStateHanlerProps
  | keyof StateProps
  | keyof OverriddenProps
>;
type PublicProps = Omit<OwnProps, keyof PrivateProps>;
type LocalProps = Pick<ComponentProps, 'mapRef'>;
type LStateProps = Pick<ComponentProps, 'infoWindowOpenKey'>;
type LStateHanlerProps = Pick<ComponentProps, 'handleOnClickMarker'>;
type StateProps = Pick<
  OwnProps,
  'eventGroupListByPosition' | 'previousFetchingParams'
>;
type OverriddenProps = ReturnType<typeof overrideGoogleMapDefaultProps>;

// Sub functions for Enhancer(redux connection)
const mapStateToProps = (
  state: ReduxRootState,
  { maxMarkerVisibleCount, mapRef }: OwnProps
): StateProps => ({
  eventGroupListByPosition: getGroupedEventsByPointWithLimit(state, {
    maxCount: maxMarkerVisibleCount,
    zoomLevel: mapRef.current ? mapRef.current.getZoom() : DEFAULT_ZOOM
  }),
  previousFetchingParams: state.tennisEvents.fetchingParams
});

const mapDispatchToProps = (
  dispatch: Dispatch<Action<any>>,
  ownProps: OwnProps
): DispatchProps => ({
  onIdle: () =>
    dispatch(
      actionCreators.requestFetchTennisEvents(getNewFetchingParams(ownProps))
    ),
  onBoundsChanged: () => dispatch(actionCreators.cancelFetchingTennisEvents())
});

const getNewFetchingParams = (
  ownProps: OwnProps
): RequestFetchTennisEventsPayload => ({
  ...ownProps.previousFetchingParams,
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

const overrideGoogleMapDefaultProps = (): Required<
  Pick<GoogleMapProps, 'defaultCenter' | 'defaultZoom'>
> => ({
  defaultCenter: DEFAULT_CENTER_TOKYO,
  defaultZoom: DEFAULT_ZOOM
});

// Create Enhancer
const enhancer = compose<ComponentProps, PublicProps>(
  setDisplayName('EnhancedEventMap'),
  withProps(getInitialGoogleMapProps()),
  withProps(overrideGoogleMapDefaultProps()),
  withScriptjs,
  withGoogleMap,
  withProps<LocalProps, ComponentProps>({
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
        infoWindowOpenKey: state.infoWindowOpenKey === key ? undefined : key
      })
    }
  ),
  pure,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

// Exports
export type EventMapProps = PublicProps;
export default enhancer(EventMap);
