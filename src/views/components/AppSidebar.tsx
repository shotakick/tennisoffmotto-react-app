import * as React from 'react';
import {
  Button,
  ButtonGroupProps,
  ButtonProps,
  Header,
  Icon,
  Segment
} from 'semantic-ui-react';
import { TennisEventInfo } from '../../client/TennisEvents';
import EventFilterForm from './EventFilterForm';
import EventList from './EventList';
// import * as styles from './AppSidebar.module.scss';
const styles = require('./AppSidebar.module.scss');

const ModeSelector: React.FC<
  ButtonGroupProps & {
    currentMode: Mode;
    setMode: (mode: Mode) => void;
    hitsCount?: number;
    isFetching?: boolean;
  }
> = ({ currentMode, setMode, hitsCount, isFetching, ...props }) => (
  <Button.Group {...props}>
    <ModeSelectButton
      mode={Mode.FILTERS}
      active={currentMode === Mode.FILTERS}
      handleSelect={setMode}
      icon="filter"
    />
    <Button.Or text="⇔" />
    <ModeSelectButton
      mode={Mode.HITS}
      active={currentMode === Mode.HITS}
      handleSelect={setMode}
      label={hitsCount || '0'}
      loading={isFetching}
    />
  </Button.Group>
);

const ModeSelectButton: React.FC<
  { mode: Mode; handleSelect: (mode: Mode) => void } & ButtonProps
> = ({ mode, handleSelect, ...props }) => {
  const onClick = React.useCallback(() => handleSelect(mode), [
    mode,
    handleSelect
  ]);
  return (
    <Button
      toggle={true}
      compact={true}
      basic={true}
      content={mode}
      onClick={onClick}
      {...props}
    />
  );
};

export interface AppSidebarProps {
  isOpened?: boolean;
  toggleOpen?: () => void;
  hitsCount?: number;
  events?: TennisEventInfo[];
  isFetching?: boolean;
}

enum Mode {
  FILTERS = 'Filters',
  HITS = 'Hits'
}

// TODO 気が向いたらTab部品で作り直す
export const AppSidebar: React.FC<AppSidebarProps> = props => {
  const [currentMode, setMode] = React.useState(Mode.FILTERS);

  return (
    <div className={styles.AppSidebar}>
      <ModeSelector
        className={styles.ModeSelector}
        floated="left"
        currentMode={currentMode}
        setMode={setMode}
        hitsCount={props.hitsCount}
        isFetching={props.isFetching}
      />
      <div className={styles.CloseButton} onClick={props.toggleOpen}>
        <Icon name="close" size="large" color="grey" />
      </div>
      <Header
        className={styles.TopHeader}
        size="large"
        textAlign="center"
        attached="top"
        content={currentMode === Mode.FILTERS ? '検索条件設定' : '検索結果一覧'}
      />
      <Segment className={styles.Body} attached={true}>
        {currentMode === Mode.FILTERS ? (
          <EventFilterForm />
        ) : (
          <EventList events={props.events} />
        )}
      </Segment>
    </div>
  );
};
export default AppSidebar;
