import * as React from 'react';
import { GoogleMapProps } from 'react-google-maps';
import './App.scss';
import AppHeader from './containers/AppHeader';
import AppSidebar from './containers/AppSidebar';
import Auth from './containers/Auth';
import EventMap from './containers/EventMap';
import { initialMapOptions } from './ini/EventMap';

interface AppState {
  initialMapOptions: GoogleMapProps;
  maxMarkerVisibleCount: number;
  isSidebarOpened: boolean;
}

class App extends React.Component<{}, AppState> {
  public constructor(props: {}) {
    super(props);
    this.state = {
      initialMapOptions,
      maxMarkerVisibleCount: 1000,
      isSidebarOpened: false,
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setDefaultPosition);
    }
  }

  public render() {
    return (
      <div className="App">
        <Auth />
        <header className="App-header">
          <AppHeader
            isSidebarOpened={this.state.isSidebarOpened}
            toggleSidebarOpen={this.toggleSidebarOpen}
          />
        </header>
        <div className="App-main">
          <EventMap
            {...this.state.initialMapOptions}
            maxMarkerVisibleCount={this.state.maxMarkerVisibleCount}
          />
        </div>
        <div className={this.state.isSidebarOpened ? 'App-sidebar' : 'App-sidebar-hidden'}>
          <AppSidebar isOpened={this.state.isSidebarOpened} toggleOpen={this.toggleSidebarOpen} />
        </div>
        <footer className="App-footer" />
      </div>
    );
  }

  private setDefaultPosition = (pos: Position) => {
    this.setState({
      initialMapOptions: {
        ...this.state.initialMapOptions,
        defaultCenter: {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        },
      },
    });
  };

  private toggleSidebarOpen = () => {
    this.setState({ isSidebarOpened: !this.state.isSidebarOpened });
  };
}

export default App;
