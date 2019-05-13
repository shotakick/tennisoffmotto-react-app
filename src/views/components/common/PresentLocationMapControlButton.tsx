import * as React from 'react';
import MapControlButton, { MapControlButtonProps } from './MapControlButton';

export const PresentLocationMapControlButton: React.FC<MapControlButtonProps> = props => (
  <MapControlButton
    {...props}
    name="location arrow"
    title={props.disabled ? '現在地を取得できません' : '現在地へ移動する'}
  />
);
export default PresentLocationMapControlButton;
