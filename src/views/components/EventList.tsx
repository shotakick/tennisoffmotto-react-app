import * as React from 'react';
import { Item } from 'semantic-ui-react';

export interface EventListProps {
  items: { header: string; metas: string[] }[];
}

const EventList: React.FC<EventListProps> = ({ items = [] }) => (
  <>
    <Item.Group divided={true}>
      {items.map((item, i) => (
        <Item key={i}>
          <Item.Content>
            <Item.Header as="a">{item.header}</Item.Header>
            {item.metas
              ? item.metas.map((meta, j) => (
                  <Item.Meta key={j}>{meta}</Item.Meta>
                ))
              : null}
          </Item.Content>
        </Item>
      ))}
    </Item.Group>
  </>
);
export default EventList;
