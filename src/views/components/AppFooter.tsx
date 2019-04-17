import * as React from 'react';
import { Form } from 'semantic-ui-react';
const styles = require('./AppFooter.module.scss');
import { CSSTransition } from 'react-transition-group';

const options = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' }
];

export interface AppFooterProps {
  visible: boolean;
  toggleVisible: () => void;
}

export const AppFooter: React.FC<AppFooterProps> = ({ visible }) => (
  <CSSTransition
    in={visible}
    mountOnEnter={true}
    unmountOnExit={true}
    timeout={200}
    classNames="AppFooter"
  >
    <div>
      <Form>
        <Form.Input fluid={true} label="Keywords" />
        <Form.Select fluid={true} label="Gender" options={options} />
      </Form>
    </div>
  </CSSTransition>
);
export default AppFooter;
