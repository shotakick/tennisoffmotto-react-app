import { Omit, RequireOne } from '../utils/TypeUtils';
import Algolia from './Algolia';
import firebase from './Firebase';

interface TennisEventAllInfo {
  sid: number;
  title: string;
  organizer: string;
  sex: string;
  geoPoint: any;
  _geoloc: google.maps.LatLngLiteral;
  placeName: string;
  prefecture: string;
  date: Date;
  dateTimestamp: number;
  startHour: number;
  week: DayOfWeek;
  isHoliday: boolean;
  timespan: number;
  limitDate: Date;
  limitTimestamp: number;
  capacity: number;
  courtCount: number;
  courtType: string;
  createdAt: Date;
  updatedAt: Date;
  detail?: string;
}

export type TennisEventInfo = Omit<
  TennisEventAllInfo,
  | 'geoPoint'
  | 'dateTimestamp'
  | 'limitTimestamp'
  | 'startHour'
  | 'week'
  | 'isHoliday'
  | 'createdAt'
  | 'updatedAt'
  | 'detail'
>;

const attributesToRetrieve: (keyof TennisEventInfo)[] = [
  'sid',
  'title',
  'organizer',
  'sex',
  '_geoloc',
  'placeName',
  'prefecture',
  'date',
  'timespan',
  'limitDate',
  'capacity',
  'courtCount',
  'courtType',
];

const restrictSearchableAttributes: (keyof TennisEventAllInfo)[] = [
  'title',
  'organizer',
  'detail',
  'courtType',
  'placeName',
];

export interface FetchedResult {
  events: TennisEventInfo[];
  hitsCount: number;
}

type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6; // リテラル型の範囲指定もできたような気がしたんだけどなぁ…
type DaysOfWeek = 'weekends' | 'holidays' | DayOfWeek[];
type Range<T extends Date | number> = RequireOne<{
  lowerBound?: T;
  upperBound?: T;
}>;
type SexType = 'male' | 'female';

export type FetchingFilters = RequireOne<{
  dateRange?: Range<Date>;
  days?: DaysOfWeek;
  startHourRange?: Range<number>;
  timeSpanRange?: Range<number>;
  sex?: SexType;
}>;

export type FetchingParams = {
  bounds?: google.maps.LatLngBoundsLiteral;
  keyword?: string;
  filters?: FetchingFilters;
};

export async function fetchEvents(params: FetchingParams): Promise<FetchedResult> {
  // 未ログイン状態ではデータ取得しない
  if (!firebase.auth().currentUser) {
    throw new Error('Unauthenticated');
  }

  const insideBoundingBox = params.bounds && toAlgoliaBoundingBox(params.bounds);
  const filters = params.filters && toAlgoliaFilters(params.filters);
  const { hits, nbHits } = await Algolia.search({
    attributesToRetrieve,
    restrictSearchableAttributes,
    query: params.keyword || '',
    insideBoundingBox,
    filters,
  });

  return { events: hits, hitsCount: nbHits };
}

function toAlgoliaBoundingBox(bounds: google.maps.LatLngBoundsLiteral) {
  return [[bounds.north, bounds.west, bounds.south, bounds.east]];
}

function toAlgoliaFilters(filters: FetchingFilters) {
  let result = filters.dateRange ? toDateRangeFilter(filters.dateRange) : '';
  if (filters.startHourRange) {
    if (result) result += ' AND ';
    result += toNumericRangeFilter('startHour', filters.startHourRange);
  }
  if (filters.timeSpanRange) {
    if (result) result += ' AND ';
    result += toNumericRangeFilter('timespan', filters.timeSpanRange);
  }
  if (filters.sex) {
    if (result) result += ' AND ';
    result += toSexFilter(filters.sex);
  }
  if (filters.days) {
    if (result) result += ' AND ';
    result += toDaysFilter(filters.days);
  }

  return result;
}

function toDateRangeFilter(range: Range<Date>) {
  return toNumericRangeFilter('dateTimestamp', {
    lowerBound: range.lowerBound ? range.lowerBound.getTime() : 0,
    upperBound: range.upperBound ? range.upperBound.getTime() : undefined,
  });
}

function toNumericRangeFilter(
  attr: keyof Pick<
    TennisEventAllInfo,
    'dateTimestamp' | 'startHour' | 'timespan' | 'capacity' | 'courtCount'
  >,
  { lowerBound, upperBound }: Range<number>,
) {
  if (!lowerBound) return `(${attr} <= ${upperBound})`;
  if (!upperBound) return `(${attr} >= ${lowerBound})`;
  return `(${attr}:${lowerBound} TO ${upperBound})`;
}

function toSexFilter(sex: SexType) {
  return `'sex:${sex === 'male' ? '男性' : '女性'}`;
}

function toDaysFilter(days: DaysOfWeek) {
  if (days === 'weekends') return '(week:0 OR week:6)';
  if (days === 'holidays') return '(week:0 OR week:6 OR isHoliday:true)';

  let filter = '';
  for (const day of days) {
    filter += `${filter && ' OR '}week:${day}`;
  }
  return filter && `(${filter})`;
}
