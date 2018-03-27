import { first, last } from 'lodash';
import GetEntities from '../../signatures/GetEntities';
import { end, start } from '../../types/Cursor';
import Entity from '../../types/Entity';
import { Filter } from '../../types/Filter';
import Pagination from '../../types/Pagination';
import { backward, forward } from '../../types/PaginationDirection';
import Sort from '../../types/Sort';
import { asc } from '../../types/SortOrder';
import createCursorFromEntity from '../../utils/createCursorFromEntity';

export type EntityGetter<E extends Entity> = (opts: {
  readonly pagination: Pagination;
  readonly filter: Filter<E>;
  readonly sort: Sort<E>;
}) => Promise<any[]>;

export interface Config<E extends Entity> {
  readonly constructEntity: <T>(document: T) => E;
  readonly defaultPaginationLimit: number;
  readonly getEntities: EntityGetter<E>;
}

export default <E extends Entity>(config: Config<E>): GetEntities<E> => {
  const defaultPagination: Pagination = {
    cursor: start,
    direction: forward,
    limit: config.defaultPaginationLimit,
  };
  const defaultSort = { id: asc } as Sort<E>;

  return async ({ pagination = defaultPagination, filter = {}, sort = defaultSort }) => {
    if (pagination.cursor === end && pagination.direction === forward) {
      return { entities: [], previousCursor: start, nextCursor: end };
    }
    if (pagination.cursor === end && pagination.direction === backward) {
      return { entities: [], previousCursor: end, nextCursor: start };
    }

    const results = await config.getEntities({
      filter,
      pagination: {
        cursor: pagination.cursor,
        direction: pagination.direction,
        limit: pagination.limit + 1,
      },
      sort,
    });
    const documents = results.slice(0, pagination.limit);

    const entities = documents.map(config.constructEntity);
    const nextCursor = createCursorFromEntity(last(entities), sort);
    const previousCursor = createCursorFromEntity(first(entities), sort);

    const isEnd = results.length <= pagination.limit;
    if (isEnd && pagination.direction === forward) {
      return { entities, nextCursor: end, previousCursor };
    }
    if (isEnd && pagination.direction === backward) {
      return { entities, nextCursor, previousCursor: end };
    }

    const isStart = pagination.cursor === start;
    if (isStart && pagination.direction === forward) {
      return { entities, nextCursor, previousCursor: end };
    }
    if (isStart && pagination.direction === backward) {
      return { entities, nextCursor: end, previousCursor };
    }

    return { entities, nextCursor, previousCursor };
  };
};
