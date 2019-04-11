import * as React from 'react';
import { GoogleMapProps } from 'react-google-maps';
import './App.css';
import MainMenu from './components/MainMenu';
import EventMap from './containers/EventMap';
import { initialMapOptions } from './ini/EventMap';

interface AppState {
  initialMapOptions: GoogleMapProps;
  maxMarkerVisibleCount: number;
}

class App extends React.Component<{}, AppState> {
  public constructor(props: {}) {
    super(props);
    this.state = { initialMapOptions, maxMarkerVisibleCount: 300 };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setCenterPosition);
    }
  }

  public render() {
    return (
      <div className="App">
        <header>
          <MainMenu />
          <div className="Title">
            <img className="Title-logo" src="images/tennis-ball.png" />
            <span className="Title-text">Tennisoff.motto</span>
          </div>
        </header>

        <div className="App-content">
          <EventMap
            {...this.state.initialMapOptions}
            maxMarkerVisibleCount={this.state.maxMarkerVisibleCount}
          />
        </div>
        <footer />
      </div>
    );
  }

  private setCenterPosition = (pos: Position) => {
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
