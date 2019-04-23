import ja from 'date-fns/locale/ja';
import isMobile from 'ismobilejs';
import * as React from 'react';
import ReactDatePicker, {
  ReactDatePickerProps,
  registerLocale
} from 'react-datepicker';
import ReactDOM from 'react-dom';
import { Input } from 'semantic-ui-react';
import './CustomDatePicker.scss';

registerLocale('ja', ja);

const PopperContainer: React.FC = ({ children }) => {
  const el = document.getElementById('root');
  return el && ReactDOM.createPortal(children, el);
};

// https://github.com/Hacker0x01/react-datepicker/issues/1640
// https://github.com/Hacker0x01/react-datepicker/issues/1480
const ReadOnlyInput: React.FC = props => {
  const [state, setState] = React.useState(false);
  const setReadOnly = React.useCallback(() => setState(true), [setState]);
  const unsetReadOnly = React.useCallback(() => setState(false), [setState]);
  return (
    <Input
      {...props}
      onFocus={setReadOnly}
      onBlur={unsetReadOnly}
      readOnly={state}
    />
  );
};

export const CustomDatePicker: React.FC<ReactDatePickerProps> = props => (
  <ReactDatePicker
    isClearable={true}
    locale="ja"
    dateFormat="yyyy/MM/dd"
    popperContainer={PopperContainer}
    customInput={<ReadOnlyInput />}
    withPortal={isMobile.phone}
    {...props}
  />
);
export default CustomDatePicker;
