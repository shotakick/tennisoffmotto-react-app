import { createSelector } from 'reselect';
import { ReduxRootState } from '..';
import { TennisEventInfo } from '../../../client/TennisEvents';
import { toGroupObjectsByKey } from '../../../utils';
import { ViewingFilter } from './types';

// Selectors with memorized
export const getFilterringEvents = createSelector<
  ReduxRootState,
  TennisEventInfo[],
  ViewingFilter,
  TennisEventInfo[]
>(
  state => state.tennisEvents.events,
  state => state.tennisEvents.viewingFilter,
  (events, filter) => events.filter(e => isMatchedFilter(e, filter))
);

export type GroupedEvents = { [index: string]: TennisEventInfo[] };

export const getGroupedEventsByNearyPoint = createSelector<
  ReduxRootState,
  { zoomLevel: number },
  TennisEventInfo[],
  number,
  GroupedEvents
>(
  getFilterringEvents,
  (state, { zoomLevel }) => zoomLevel,
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

export const getGroupedEventsByPointWithLimit = createSelector<
  ReduxRootState,
  { zoomLevel: number; maxCount: number },
  GroupedEvents,
  number,
  GroupedEvents
>(
  getGroupedEventsByNearyPoint,
  (state, { maxCount }) => maxCount,
  (srcList, maxCount) => {
    const newList: typeof srcList = {};
    Object.keys(srcList)
      .slice(0, maxCount)
      .forEach(key => (newList[key] = srcList[key]));
    return newList;
  }
);

// Sub functions for selector
// 将来対応 とりあえずの適当実装
function isMatchedFilter(
  event: TennisEventInfo,
  filter: ViewingFilter
): boolean {
  if (filter.sex && filter.sex !== event.sex) return false;
  if (filter.prefecture && filter.prefecture !== event.prefecture) return false;
  return true;
}

function getFractionDigitsForRounding(zoomLevel: number) {
  console.log(`zoomLevel: ${zoomLevel}`);
  if (zoomLevel <= 8) return 0;
  if (zoomLevel <= 10) return 1;
  if (zoomLevel <= 15) return 2;
  return 3;
}
