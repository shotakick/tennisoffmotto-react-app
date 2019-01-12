import * as React from 'react';
import { Header, Item } from 'semantic-ui-react';

export interface EventListProps {
  header: string;
  items: { header: string; metas: string[] }[];
}

const eventList: React.FC<EventListProps> = ({ header, items = [] }) => (
  <>
    <Header as="h2">{header}</Header>
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
export default eventList;
