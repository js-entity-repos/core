import * as atob from 'atob';
import { get, mapValues } from 'lodash';
import Entity from '../../types/Entity';
// tslint:disable-next-line:no-unused
import Filter, { ConditionFilter, EntityFilter } from '../../types/Filter';
import Pagination from '../../types/Pagination';
import { forward } from '../../types/PaginationDirection';
import Sort from '../../types/Sort';
import { asc } from '../../types/SortOrder';

const xor = (conditionA: boolean, conditionB: boolean) => {
  return (conditionA && !conditionB) || (!conditionA && conditionB);
};

export default <E extends Entity>(pagination: Pagination, sort: Sort<E>): Filter<E> => {
  if (pagination.cursor === undefined) {
    return {};
  }
  const cursorObj = JSON.parse(atob(pagination.cursor));
  const filter = mapValues(cursorObj, (cursorValue, sortKey) => {
    const ascendingPagination = !xor(
      get(sort, sortKey) === asc,
      pagination.direction === forward,
    );
    if (ascendingPagination) {
      if (sortKey === 'id') {
        return { $gt: cursorValue };
      } else {
        return { $gte: cursorValue };
      }
    } else {
      if (sortKey === 'id') {
        return { $lt: cursorValue };
      } else {
        return { $lte: cursorValue };
      }
    }
  });
  return filter as any as Filter<E>;
};
