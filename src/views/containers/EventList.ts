import { connect, Omit } from 'react-redux';
import { ReduxRootState } from 'state/ducks';
import { getFilterName, getFilterringEvents } from 'state/ducks/TennisEvents';
import EventList, {
  EventListProps as InnerProps
} from '../components/EventList';

export type EventListProps = Omit<InnerProps, 'items'>;

const mapStateToProps = (
  state: ReduxRootState,
  { header }: EventListProps
) => ({
  items: getFilterringEvents(state).map(event => ({
    header: event.title,
    metas: [
      `${event.organizer}(${event.sex})`,
      event.placeName,
      event._geoloc.toString(),
      event.date.toDateString()
    ]
  })),
  header: `${getFilterName(state, header)} (${
    state.tennisEvents.events.length
  }/${state.tennisEvents.hitsCount})`
});

const mapDispatchToProps = () => ({});

type StateToProps = ReturnType<typeof mapStateToProps>;
type DispatchToProps = ReturnType<typeof mapDispatchToProps>;
export default connect<StateToProps, DispatchToProps, EventListProps>(
  mapStateToProps,
  mapDispatchToProps
)(EventList);
