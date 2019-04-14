import { connect, Omit } from 'react-redux';
import { ReduxRootState } from '../../state/ducks';
import { getFilterringEvents } from '../../state/ducks/TennisEvents';
import EventList, { EventListProps } from '../components/EventList';

const mapStateToProps = (state: ReduxRootState) => ({
  items: getFilterringEvents(state).map(event => ({
    header: event.title,
    metas: [
      `${event.organizer}(${event.sex})`,
      event.placeName,
      event._geoloc.toString(),
      event.date.toDateString()
    ]
  }))
});

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventList);
