import * as React from 'react';
import './App.css';
import MainMenu from './components/MainMenu';
import EventMap from './containers/EventMap';
import { initialMapOptions } from './ini/EventMap';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <MainMenu />
        <div className="Title">
          <img className="Title-logo" src="images/tennis-ball.png" />
          <span className="Title-text">Tennisoff.motto</span>
        </div>
        <div className="App-content">
          <EventMap maxMarkerVisibleCount={300} {...initialMapOptions} />
        </div>
        <footer />
      </div>
    );
  }
}

export default App;
