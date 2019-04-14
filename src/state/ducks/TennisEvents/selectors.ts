import { createSelector } from 'reselect';
import { ReduxRootState } from '..';
import { TennisEventInfo } from '../../../client/TennisEvents';
import { toGroupObjectsByKey } from '../../../utils';
import { ViewingFilter } from './types';

// Selectors with memorized
export const getFilterringEvents = createSelector(
  (state: ReduxRootState) => state.tennisEvents.events,
  (state: ReduxRootState) => state.tennisEvents.viewingFilter,
  (events, filter) => {
    if (!filter) return events;
    return events.filter(e => isMatchedFilter(e, filter));
  }
);

export const getGroupedEventsByNearyPoint = createSelector(
  getFilterringEvents,
  (state: any, { zoomLevel }: { zoomLevel: number }) => zoomLevel,
  (events, zoomLevel) => {
    // 同一位置毎にグループ化させて地図にマーカー表示させたいが
    // 元データの位置座標が同じ場所なのに微妙に一致しない場合が多々あるので
    // 地図の表示倍率によってある程度丸めた座標値にてグループ化させる。
    const n = getFractionDigitsForRounding(zoomLevel);
    return toGroupObjectsByKey(
      events,
      '_geoloc',
      ({ lat, lng }) => `(${lat.toFixed(n)},${lng.toFixed(n)})`
    );
  }
);

export const getGroupedEventsByPointWithLimit = createSelector(
  getGroupedEventsByNearyPoint,
  (state: any, { maxCount }: { maxCount: number }) => maxCount,
  (srcList, maxCount) => {
    const newList: typeof srcList = {};
    Object.keys(srcList)
      .slice(0, maxCount)
      .forEach(key => (newList[key] = srcList[key]));
    return newList;
  }
);

export const getFilterName = createSelector(
  (state: ReduxRootState) => state.tennisEvents.viewingFilter,
  (state: any, defaultName: string) => defaultName,
  (filter, defaultName) =>
    filter
      ? Object.entries(filter).reduce(
          (acc, cur) => [`${acc[0]}/${cur[0]}(${cur[1]})`, null],
          ['表示条件:', null]
        )
      : defaultName
);

// Sub functions for selector
function isMatchedFilter(
  event: TennisEventInfo,
  filter: ViewingFilter
): boolean {
  for (const key of Object.keys(filter)) {
    if (!filter[key]) continue;
    if (!event[key]) return false;
    if (!event[key].includes(filter[key])) return false;
  }
  return true;
}

function getFractionDigitsForRounding(zoomLevel: number) {
  console.log(`zoomLevel: ${zoomLevel}`);
  if (zoomLevel <= 8) return 0;
  if (zoomLevel <= 10) return 1;
  if (zoomLevel <= 15) return 2;
  return 3;
}
