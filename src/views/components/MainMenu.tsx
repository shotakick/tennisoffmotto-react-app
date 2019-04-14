import * as React from 'react';
import { Dropdown, Menu, MenuProps } from 'semantic-ui-react';
import FetchEventsButton from '../../views/containers/FetchEventsButton';
import FilterEventsButton from '../../views/containers/FilterEventsButton';

const menuProps: MenuProps = {
  color: 'green',
  inverted: true,
  stackable: true
};

const MainMenu: React.FC = () => (
  <Menu attached="top" {...menuProps}>
    {/* <Menu attached="top" color="teal" inverted={true} stackable={true}> */}
    <Dropdown item={true} icon="content" simple={true}>
      <Dropdown.Menu>
        <Dropdown.Item>
          <FetchEventsButton content="イベント取得" />
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Header>フィルタ</Dropdown.Header>
        <Dropdown.Item>
          <FilterEventsButton content="男性のみ" filter={{ sex: '男性' }} />
        </Dropdown.Item>
        <Dropdown.Item>
          <FilterEventsButton content="女性のみ" filter={{ sex: '女性' }} />
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    <Menu.Menu position="right">
      <div className="ui right aligned category search item">
        <div className="ui transparent icon input">
          <input className="prompt" type="text" placeholder="Search place..." />
          <i className="search link icon" />
        </div>
        <div className="results" />
      </div>
    </Menu.Menu>
  </Menu>
);
export default MainMenu;
