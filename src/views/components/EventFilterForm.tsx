import isMobile from 'ismobilejs';
import * as React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Button, DropdownItemProps, Form, Input, Select } from 'semantic-ui-react';
import CustomDatePicker from './common/CustomDatePicker';

export interface EventFilterFormProps {}

// export type FetchingFilters = RequireOne<{
//   dateRange?: Range<Date>;
//   days?: DaysOfWeek;
//   startHourRange?: Range<number>;
//   timeSpanRange?: Range<number>;
//   sex?: SexType;
// }>;

// export type FetchingParams = {
//   bounds?: google.maps.LatLngBoundsLiteral;
//   keyword: string;
//   filters?: FetchingFilters;
// };

// 8時台～20時台まで
const hourItems: DropdownItemProps[] = Array.from(Array(24 - 8 - 4).keys(), i => ({
  key: i,
  value: i + 8,
  text: `00${i + 8} 時台`.slice(-5),
}));
// 1時間～6時間まで
const hoursItems: DropdownItemProps[] = Array.from(Array(6).keys(), i => ({
  key: i,
  value: i + 1,
  text: `00${i + 1} 時間`.slice(-5),
}));

export const EventFilterForm: React.FC<EventFilterFormProps> = () => {
  const [startDate, setStartDate] = React.useState<Date>();
  const handleChangeStartDate = React.useCallback(date => setStartDate(date), [setStartDate]);
  const [endDate, setEndDate] = React.useState<Date>();
  const handleChangeEndDate = React.useCallback(date => setEndDate(date), [setEndDate]);

  return (
    <div>
      <Form size="mini">
        <Form.Field label="期間" hidden={isMobile.phone} />
        <Form.Group inline={true} unstackable={true}>
          <CustomDatePicker
            placeholderText="Select a start date"
            selectsStart={true}
            selected={startDate}
            startDate={startDate}
            endDate={endDate}
            maxDate={endDate}
            onChange={handleChangeStartDate}
          />
          {'　～　'}
          <CustomDatePicker
            placeholderText="Select an end date"
            selectsEnd={true}
            selected={endDate}
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            onChange={handleChangeEndDate}
          />
        </Form.Group>

        <Form.Field label="曜日" hidden={isMobile.phone} />
        <Form.Group inline={true} unstackable={true}>
          {'日月火水木金土'.split('').map((v, i) => (
            <Form.Checkbox key={i} label={v} checked={true} />
          ))}
        </Form.Group>

        <Form.Field label="開始時間帯" hidden={isMobile.phone} />
        <Form.Group inline={true} unstackable={true}>
          <Select
            placeholder="Select start hour"
            options={hourItems}
            clearable={true}
            scrolling={true}
            closeOnBlur={true}
            upward={false}
          />
          {'　～　'}
          <Select
            placeholder="Select end hour"
            options={hourItems}
            clearable={true}
            scrolling={true}
            closeOnBlur={true}
            upward={false}
          />
        </Form.Group>

        <Form.Field label="時間" hidden={isMobile.phone} />
        <Form.Group inline={true} unstackable={true}>
          <Select
            placeholder="Select start hour"
            options={hoursItems}
            clearable={true}
            scrolling={true}
            closeOnBlur={true}
            upward={false}
          />
          {'　～　'}
          <Select
            placeholder="Select end hour"
            options={hoursItems}
            clearable={true}
            scrolling={true}
            closeOnBlur={true}
            upward={false}
          />
        </Form.Group>

        <Form.Field>
          {!isMobile.phone && <label>フリーワード</label>}
          <Input placeholder="Input keyword" />
        </Form.Field>

        <Button content="条件クリア" compact={true} basic={true} />
      </Form>
    </div>
  );
};
export default EventFilterForm;
