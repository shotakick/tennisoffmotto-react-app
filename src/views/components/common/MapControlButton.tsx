import * as React from 'react';
import { Icon, IconProps } from 'semantic-ui-react';
import MapControl from './MapControl';
const styles = require('./MapControlButton.module.scss');
// import * as styles from './MapControlButton.module.scss'; // TODO: https://github.com/Jimdo/typings-for-css-modules-loader

export type MapControlButtonProps = IconProps & {
  position: google.maps.ControlPosition;
  title?: string;
  onClick?: () => void;
};

export const MapControlButton: React.FC<MapControlButtonProps> = ({
  position,
  title,
  onClick,
  ...iconProps
}) => (
  <MapControl position={position}>
    <div className={styles.MapControlButton} title={title} onClick={onClick}>
      <Icon className={styles.Icon} color="grey" size="large" {...iconProps} />
    </div>
  </MapControl>
);
export default MapControlButton;
