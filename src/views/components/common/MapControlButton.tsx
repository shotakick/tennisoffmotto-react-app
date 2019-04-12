import { CursorProperty } from 'csstype';
import * as React from 'react';
import { Icon, IconProps } from 'semantic-ui-react';
import MapControl from './MapControl';

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
  boxShadow: '0 2px 2px rgba(0,0,0,.1)'
};

export type MapControlButtonProps = IconProps & {
  position: google.maps.ControlPosition;
  onClick?: () => void;
  cursor?: CursorProperty;
};

export const MapControlButton: React.FC<MapControlButtonProps> = ({
  position,
  onClick,
  cursor,
  ...iconProps
}) => (
  <MapControl position={position}>
    <div
      className={'MapControlButton'}
      style={{ ...style, cursor: cursor || 'pointer' }}
      onClick={onClick}
    >
      <Icon color="grey" size="large" {...iconProps} />
    </div>
  </MapControl>
);
export default MapControlButton;
