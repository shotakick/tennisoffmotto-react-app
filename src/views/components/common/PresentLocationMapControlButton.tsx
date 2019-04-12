import * as React from 'react';
import MapControlButton, { MapControlButtonProps } from './MapControlButton';

export const PresentLocationMapControlButton: React.FC<
  MapControlButtonProps
> = props => (
  <MapControlButton
    {...props}
    name="location arrow"
    cursor={props.disabled ? 'not-allowed' : 'pointer'}
  />
);
export default PresentLocationMapControlButton;
