import Algolia from './Algolia';

export interface TennisEventInfo {
  sid: number;
  title: string;
  organizer: string;
  sex: string;
  _geoloc: google.maps.LatLngLiteral;
  placeName: string;
  prefecture: string;
  date: Date;
  timespan: number;
  limitDate: Date;
  capacity: number;
  courtCount: number;
  courtType: string;
  detail?: string;
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

  return { events: hits, hitsCount: nbHits };
}

function mapsBoundsToAlgoliaBoundingBox(
  bounds?: google.maps.LatLngBoundsLiteral
) {
  return bounds
    ? [[bounds.north, bounds.west, bounds.south, bounds.east]]
    : undefined;
}
