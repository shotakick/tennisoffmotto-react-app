import { Mapper } from './TypeUtils';

export function toGroupObjectsByKey<T, K extends keyof T>(
  targetObjects: T[],
  groupingKey: K,
  elementToString?: Mapper<T[K], string>
) {
  const groupList: { [index: string]: T[] } = {};

  targetObjects.forEach(target => {
    const key = elementToString
      ? elementToString(target[groupingKey])
      : String(target[groupingKey]);
    groupList[key] = groupList[key] || [];
    groupList[key].push(target);
  });

  console.log(Object.keys(groupList).length);

  return groupList;
}
