import * as atob from 'atob';
import { get, mapValues } from 'lodash';
import Entity from '../../types/Entity';
// tslint:disable-next-line:no-unused
import Filter, { ConditionFilter, EntityFilter } from '../../types/Filter';
import Pagination from '../../types/Pagination';
import Sort from '../../types/Sort';

const xor = (conditionA: boolean, conditionB: boolean) => {
  return (conditionA && !conditionB) || (!conditionA && conditionB);
};

export default <E extends Entity>(pagination: Pagination, sort: Sort<E>): Filter<E> => {
  if (pagination.cursor === undefined) {
    return {};
  }
  const cursorObj = JSON.parse(atob(pagination.cursor));
  const filter = mapValues(cursorObj, (cursorValue, sortKey) => {
    const forward = !xor(get(sort, sortKey), pagination.forward);
    if (forward) {
      return { $gt: cursorValue };
    } else {
      return { $lt: cursorValue };
    }
  });
  return filter as any as Filter<E>;
};
