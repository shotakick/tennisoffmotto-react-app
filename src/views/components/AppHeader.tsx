import * as React from 'react';
import { Icon, Modal } from 'semantic-ui-react';
import LoginForm from '../containers/LoginForm';
const styles = require('./AppHeader.module.scss');

export interface Props {
  toggleSidebarOpen(): void;
  isSidebarOpened: boolean;
  isAuthenticated: boolean;
  handleLogout(): void;
}

export const AppHeader: React.FC<Props> = props => {
  const { toggleSidebarOpen, isAuthenticated, handleLogout } = props;

  // const [shouldOpenLogin, setLoginVisibleState] = React.useState(false);
  // const handleOpenLogin = React.useCallback(() => setLoginVisibleState(true), []);
  // const handleCloseLogin = React.useCallback(() => setLoginVisibleState(false), []);

  return (
    <div className={styles.AppHeader}>
      <div className={styles.SidebarButton} onClick={toggleSidebarOpen}>
        <Icon name="bars" size="big" />
      </div>
      <div className={styles.Center}>
        <img className={styles.AppLogo} src="images/tennis-ball.png" />
        <span className={styles.TitleText}>Tennisoff.motto</span>
      </div>
      {isAuthenticated ? (
        <div className={styles.LoginButton} onClick={handleLogout}>
          <Icon name="sign out" size="big" />
        </div>
      ) : (
        <Modal
          closeIcon={true}
          closeOnDimmerClick={false}
          trigger={
            <div className={styles.LoginButton}>
              <Icon name="sign in" size="big" />
            </div>
          }
        >
          <Modal.Header>Administrator Login</Modal.Header>
          <Modal.Content>
            <LoginForm />
          </Modal.Content>
        </Modal>
      )}
    </div>
  );
};
export default AppHeader;
