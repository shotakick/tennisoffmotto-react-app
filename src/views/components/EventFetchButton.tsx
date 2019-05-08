import * as React from 'react';
import MapControlButton, {
  MapControlButtonProps
} from './common/MapControlButton';

export const EventFetchButton: React.FC<
  MapControlButtonProps & { isFetching: boolean }
> = ({ isFetching, ...restProps }) => (
  <MapControlButton
    {...restProps}
    title="イベント取得"
    name={isFetching ? 'spinner' : 'sync'}
    loading={isFetching}
  />
);
export default EventFetchButton;
