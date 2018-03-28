import { first, last } from 'lodash';
import { Result } from '../../signatures/GetEntities';
import { end, start } from '../../types/Cursor';
import Entity from '../../types/Entity';
import Pagination from '../../types/Pagination';
import { backward, forward } from '../../types/PaginationDirection';
import Sort from '../../types/Sort';
import createCursorFromEntity from '../../utils/createCursorFromEntity';

export interface Opts<E extends Entity> {
  readonly entities: E[];
  readonly isEnd: boolean;
  readonly pagination: Pagination;
  readonly sort: Sort<E>;
}

export default <E extends Entity>({ entities, isEnd, pagination, sort }: Opts<E>): Result<E> => {
  const nextCursor = createCursorFromEntity(last(entities), sort);
  const previousCursor = createCursorFromEntity(first(entities), sort);

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
