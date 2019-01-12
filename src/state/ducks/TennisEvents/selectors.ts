import { createSelector } from 'reselect';
import { toGroupObjectsByKey } from 'utils';
import { ReduxRootState } from '..';
import { TennisEventInfo, ViewingFilter } from './types';

// Selectors with memorized
export const getFilterringEvents = createSelector(
  (state: ReduxRootState) => state.tennisEvents.events,
  (state: ReduxRootState) => state.tennisEvents.fetchingParams.filter,
  (events, filter) => {
    if (!filter) return events;
    return events.filter(e => isMatchedFilter(e, filter));
  }
);

export const getGroupedEventsByPoint = createSelector(
  getFilterringEvents,
  events => toGroupObjectsByKey(events, '_geoloc', geoloc => geoloc.toString())
);

export const getGroupedEventsByPointWithLimit = createSelector(
  getGroupedEventsByPoint,
  (state: any, maxCount: number) => maxCount,
  (groupedEvents, maxCount) =>
    Object.keys(groupedEvents)
      .slice(0, maxCount)
      .map(key => groupedEvents[key])
);

export const getFilterName = createSelector(
  (state: ReduxRootState) => state.tennisEvents.fetchingParams.filter,
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
    if (!event[key].includes(filter)) return false;
  }
  return true;
}
