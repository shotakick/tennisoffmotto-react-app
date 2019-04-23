import * as React from 'react';
import { Checkbox, Icon } from 'semantic-ui-react';
const styles = require('./AppHeader.module.scss');

export interface AppHeaderProps {
  toggleSidebarOpen: () => void;
  isSidebarOpened: boolean;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  toggleSidebarOpen,
  isSidebarOpened
}) => (
  <div className={styles.AppHeader}>
    <div className={styles.SidebarButton} onClick={toggleSidebarOpen}>
      <Icon name="bars" size="big" />
    </div>
    {/* <div className={styles.SidebarToggleButton} onClick={toggleSidebarOpen}>
      <Checkbox slider={true} checked={isSidebarOpened} />
    </div> */}
    <div className={styles.Center}>
      <img className={styles.AppLogo} src="images/tennis-ball.png" />
      <span className={styles.TitleText}>Tennisoff.motto</span>
    </div>
  </div>
);
export default AppHeader;
