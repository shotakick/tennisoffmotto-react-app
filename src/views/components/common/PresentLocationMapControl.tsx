import * as React from 'react';
import { Icon } from 'semantic-ui-react';

const style: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '40px',
  height: '40px',
  margin: '10px',
  backgroundColor: '#fff',
  border: '1px solid #fff',
  borderRadius: '3px',
  boxShadow: '0 2px 2px rgba(0,0,0,.1)',
  cursor: 'pointer'
};

interface Props {
  onClick: () => void;
  disabled?: boolean;
}

export const PresentLocationMapControl: React.FC<Props> = props => {
  return (
    <div
      className={'PresentLocationButton'}
      style={{ ...style, cursor: props.disabled ? 'not-allowed' : 'pointer' }}
      onClick={props.onClick}
    >
      <Icon
        name="location arrow"
        color="grey"
        size="large"
        disabled={props.disabled}
      />
    </div>
  );
};
export default PresentLocationMapControl;
