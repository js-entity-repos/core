import * as btoa from 'btoa';
import { get, set } from 'lodash';
import Cursor from '../../types/Cursor';
import Sort from '../../types/Sort';

export default <Entity>(entity: Entity | undefined, sort: Sort<Entity>): Cursor => {
  if (entity === undefined) {
    return undefined;
  }
  const sortKeys = Object.keys(sort);
  const cursorResult = sortKeys.reduce<Partial<Entity>>((result, sortKey) => {
    return set(result, sortKey, get(entity, sortKey));
  }, {});
  return btoa(JSON.stringify(cursorResult));
};
