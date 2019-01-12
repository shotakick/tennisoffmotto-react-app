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
import { compose, Omit, pure, setDisplayName, withProps } from 'recompose';
import { bindActionCreators, Dispatch } from 'redux';
import { ReduxRootState } from 'state/ducks';
import {
  actionCreators,
  FetchingParams,
  getGroupedEventsByPointWithLimit
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
  previousFetchingParams: FetchingParams;
};
type PrivateProps = Pick<OwnProps, keyof OverriddenGoogleMapProps | 'mapRef'>;
type PublicProps = Omit<OwnProps, keyof PrivateProps | keyof StateProps>;
type StateProps = ReturnType<typeof mapStateToProps>;
type OverriddenGoogleMapProps = ReturnType<
  typeof overrideGoogleMapDefaultProps
>;

// Create Enhancer
const enhancer = compose<ComponentProps, PublicProps>(
  setDisplayName('EnhancedEventMap'),
  withProps({
    mapRef: React.createRef<GoogleMap>()
  }),
  withProps(getInitialGoogleMapProps()),
  withProps(overrideGoogleMapDefaultProps()),
  withScriptjs,
  withGoogleMap,
  pure,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

// Sub functions for Enhancer(redux connection)
function mapStateToProps(
  state: ReduxRootState,
  { maxMarkerVisibleCount }: OwnProps
) {
  return {
    eventGroupListByPosition: getGroupedEventsByPointWithLimit(
      state,
      maxMarkerVisibleCount
    ),
    previousFetchingParams: state.tennisEvents.fetchingParams
  };
}

function mapDispatchToProps(
  dispatch: Dispatch<Action<any>>,
  ownProps: OwnProps
): Pick<GoogleMapProps, 'onIdle' | 'onBoundsChanged'> {
  return bindActionCreators(
    {
      onIdle: () =>
        actionCreators.requestFetchTennisEvents(getNewFetchingParams(ownProps)),
      onBoundsChanged: () => actionCreators.cancelFetchingTennisEvents()
    },
    dispatch
  );
}

function getNewFetchingParams(ownProps: OwnProps) {
  return {
    ...ownProps.previousFetchingParams,
    bounds: (ownProps.mapRef.current as GoogleMap).getBounds().toJSON(),
    fetchingDelay: DELAY_AMOUNT_FOR_FETCHING_START
  };
}

// Sub functions for Enhancer(to GoogleMap)
function getInitialGoogleMapProps(): WithScriptjsProps | WithGoogleMapProps {
  return {
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
  };
}

function overrideGoogleMapDefaultProps(): Required<
  Pick<GoogleMapProps, 'defaultCenter' | 'defaultZoom'>
> {
  return {
    defaultCenter: DEFAULT_CENTER_TOKYO,
    defaultZoom: DEFAULT_ZOOM
  };
}

// Exports
export type EventMapProps = PublicProps;
export default enhancer(EventMap);
