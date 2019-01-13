import * as React from 'react';
import { Header } from 'semantic-ui-react';
import './App.css';
import EventList from './containers/EventList';
import EventMap from './containers/EventMap';
import FetchEventsButton from './containers/FetchEventsButton';
import FilterEventsButton from './containers/FilterEventsButton';

class App extends React.Component {
  public render() {
    return (
      <div className="App" style={{ height: '100vh' }}>
        <Header as="h1">テストアプリ!</Header>
        <FetchEventsButton content="イベント取得" />
        <FilterEventsButton content="男性のみ" filter={{ sex: '男性' }} />
        <FilterEventsButton
          // className="ui disabled"
          content="女性のみ"
          filter={{ sex: '女性' }}
        />
        <EventMap maxMarkerVisibleCount={100} />
        <EventList header="イベントリスト" />
      </div>
    );
  }
}

export default App;
