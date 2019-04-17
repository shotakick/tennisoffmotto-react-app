import * as React from 'react';
import { Form, Icon } from 'semantic-ui-react';
const styles = require('./AppHeader.module.scss');

export interface AppHeaderProps {
  onClickSetting: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ onClickSetting }) => (
  <div className={styles.AppHeader}>
    <img className={styles.AppLogo} src="images/tennis-ball.png" />
    <span className={styles.TitleText}>Tennisoff.motto</span>
    {/* <div className={styles.SettingButton} onClick={onClickSetting}>
      <Icon name="setting" color="grey" size="big" />
    </div> */}
  </div>
);
export default AppHeader;
