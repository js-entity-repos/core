import * as atob from 'atob';
import { get } from 'lodash';
import { start } from '../../types/Cursor';
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

const getCursorKeyFilter = <E extends Entity>(
  sortKey: string,
  sort: Sort<E>,
  pagination: Pagination,
  cursorObj: any,
) => {
  const sortOrder = get(sort, sortKey);
  const ascendingPagination = !xor(
    sortOrder === asc,
    pagination.direction === forward,
  );
  const cursorValue = get(cursorObj, sortKey);
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
};

export default <E extends Entity>(pagination: Pagination, sort: Sort<E>): Filter<E> => {
  const cursor = pagination.cursor;
  if (cursor === start) {
    return {};
  }

  const cursorObj = JSON.parse(atob(cursor));
  const sortKeys = Object.keys(sort);
  const sortKeyFilters = sortKeys.map((sortKey, keyIndex) => {
    const sortKeysToMatch = sortKeys.slice(0, keyIndex);
    const matchFilter = sortKeysToMatch.reduce((result: any, sortKeyToMatch) => {
      result[sortKeyToMatch] = cursorObj[sortKeyToMatch];
      return result;
    }, {});

    const cursorKeyFilter = getCursorKeyFilter(sortKey, sort, pagination, cursorObj);
    matchFilter[sortKey] = cursorKeyFilter;
    return matchFilter;
  });

  const filter = { $or: sortKeyFilters };
  return filter as any as Filter<E>;
};
