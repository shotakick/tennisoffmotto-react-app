import * as React from 'react';
import { GoogleMapProps } from 'react-google-maps';
import './App.scss';
import AppHeader from './containers/AppHeader';
import EventMap from './containers/EventMap';
import { initialMapOptions } from './ini/EventMap';

interface AppState {
  initialMapOptions: GoogleMapProps;
  maxMarkerVisibleCount: number;
}

class App extends React.Component<{}, AppState> {
  public constructor(props: {}) {
    super(props);
    this.state = { initialMapOptions, maxMarkerVisibleCount: 1000 };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setDefaultPosition);
    }
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <AppHeader />
        </header>
        <div className="App-main">
          <EventMap
            {...this.state.initialMapOptions}
            maxMarkerVisibleCount={this.state.maxMarkerVisibleCount}
          />
        </div>
      </div>
    );
  }

  private setDefaultPosition = (pos: Position) => {
    this.setState({
      initialMapOptions: {
        ...this.state.initialMapOptions,
        defaultCenter: {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        }
      }
    });
  };
}

export default App;
