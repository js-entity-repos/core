import * as atob from 'atob';
import { get, mapValues } from 'lodash';
// tslint:disable-next-line:no-unused
import Filter, { AndFilter, NotFilter, OrFilter } from '../../types/Filter';
import Pagination from '../../types/Pagination';
import Sort from '../../types/Sort';

const xor = (conditionA: boolean, conditionB: boolean) => {
  return (conditionA && !conditionB) || (!conditionA && conditionB);
};

export default <Entity>(pagination: Pagination, sort: Sort<Entity>): Filter<Entity> => {
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
  return filter as any as Filter<Entity>;
};
