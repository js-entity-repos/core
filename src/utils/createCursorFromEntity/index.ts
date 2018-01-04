import * as btoa from 'btoa';
import { get, set } from 'lodash';
import Cursor from '../../types/Cursor';
import Entity from '../../types/Entity';
import Sort from '../../types/Sort';

export default <E extends Entity>(entity: E | undefined, sort: Sort<E>): Cursor => {
  if (entity === undefined) {
    return undefined;
  }
  const sortKeys = Object.keys(sort);
  const cursorResult = sortKeys.reduce<Partial<E>>((result, sortKey) => {
    return set(result, sortKey, get(entity, sortKey));
  }, {});
  return btoa(JSON.stringify(cursorResult));
};
