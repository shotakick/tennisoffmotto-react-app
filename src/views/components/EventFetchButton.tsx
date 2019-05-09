import * as React from 'react';
import MapControlButton, {
  MapControlButtonProps
} from './common/MapControlButton';

export interface Props extends MapControlButtonProps {
  isFetching: boolean;
}

export const EventFetchButton: React.FC<Props> = ({
  isFetching,
  ...restProps
}) => (
  <MapControlButton
    {...restProps}
    title="イベント取得"
    name={isFetching ? 'spinner' : 'sync'}
    loading={isFetching}
  />
);
export default EventFetchButton;
