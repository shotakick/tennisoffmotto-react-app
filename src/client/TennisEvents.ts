import { Wrap } from 'utils';
import Algolia from './Algolia';

export type TennisEventInfo = Wrap<TennisEventInfoJson, ConversionTypes>;
interface TennisEventInfoJson {
  sid: number;
  title: string;
  organizer: string;
  sex: string;
  _geoloc: google.maps.LatLngLiteral;
  placeName: string;
  prefecture: string;
  date: { _seconds: number };
  timespan: number;
  limitDate: { _seconds: number };
  capacity: number;
  courtCount: number;
  courtType: string;
  detail?: string;
}
interface ConversionTypes {
  date: Date;
  limitDate: Date;
}

export interface FetchedResult {
  events: TennisEventInfo[];
  hitsCount: number;
}

export async function fetchEvents({
  keyword,
  bounds
}: {
  keyword?: string;
  bounds?: google.maps.LatLngBoundsLiteral;
}): Promise<FetchedResult> {
  if (bounds) {
    console.log(
      `fetchEvents(bounds: [${bounds.north},${bounds.west}]-[${bounds.south},${
        bounds.east
      }])`
    );
  }
  if (keyword) {
    console.log(`fetchEvents(keyword: ${keyword})`);
  }

  const insideBoundingBox = mapsBoundsToAlgoliaBoundingBox(bounds);
  const { hits, nbHits } = await Algolia.search({
    query: keyword,
    insideBoundingBox
  });

  const events = convertJsonToClientFormat(hits);

  return { events, hitsCount: nbHits };
}

function mapsBoundsToAlgoliaBoundingBox(
  bounds?: google.maps.LatLngBoundsLiteral
) {
  return bounds
    ? [[bounds.north, bounds.west, bounds.south, bounds.east]]
    : undefined;
}

function convertJsonToClientFormat(
  hits: TennisEventInfoJson[]
): TennisEventInfo[] {
  return hits.map(hit => {
    const { date, limitDate, ...rest } = hit;
    return {
      date: new Date(date._seconds),
      limitDate: new Date(limitDate._seconds),
      ...rest
    };
  });
}
