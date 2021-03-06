import moment from 'moment';
import 'moment/locale/ja';
import * as React from 'react';
import { Divider, List } from 'semantic-ui-react';
import { TennisEventInfo } from '../../client/TennisEvents';

const INFO_URL = 'https://www.tennisoff.net/off';
const USER_URL = 'https://www.tennisoff.net/profile';

const getTitle = (event: TennisEventInfo) => (
  <a href={`${INFO_URL}/${event.sid}`} target={'_blank'} rel={'noopener'}>
    {`${event.title} (${event.sid})`}
  </a>
);
const getOrganizer = (event: TennisEventInfo) => (
  <a href={`${USER_URL}/${event.organizer}`} target={'_blank'} rel={'noopener'}>
    {`${event.organizer} (${event.sex})`}
  </a>
);
const getDate = (event: TennisEventInfo) =>
  moment(event.date)
    .locale('ja')
    .format(`M月D日(ddd) k時mm分 から ${event.timespan}時間`);
const getInfo = (event: TennisEventInfo) =>
  `${event.capacity}人 / ${event.courtType}(${event.courtCount}面)`;

type EventList = {
  events?: TennisEventInfo[];
};

const EventList: React.FC<EventList> = ({ events = [] }) => (
  <div>
    {events.map((event, index) => (
      <div key={event.sid}>
        <List>
          <List.Item>
            <List.Icon name="linkify" />
            <List.Content>
              <List.Header>{getTitle(event)}</List.Header>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="user" />
            <List.Content>{getOrganizer(event)}</List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="calendar alternate outline" />
            <List.Content>{getDate(event)}</List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="map marker alternate" />
            <List.Content>{event.placeName}</List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="clipboard outline" />
            <List.Content>{getInfo(event)}</List.Content>
          </List.Item>
        </List>
        {index + 1 < events.length && <Divider fitted={true} />}
      </div>
    ))}
  </div>
);
export default EventList;
