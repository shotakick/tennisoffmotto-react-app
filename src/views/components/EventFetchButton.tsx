import * as React from 'react';
import MapControlButton, {
  MapControlButtonProps
} from './common/MapControlButton';

export const EventFetchButton: React.FC<
  MapControlButtonProps & { isFetching: boolean }
> = props => (
  <MapControlButton
    {...props}
    title="イベント取得"
    name={props.isFetching ? 'spinner' : 'sync'}
    loading={props.isFetching}
  />
);
export default EventFetchButton;
