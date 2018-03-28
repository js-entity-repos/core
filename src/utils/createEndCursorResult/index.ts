import { Result } from '../../signatures/GetEntities';
import { end, start } from '../../types/Cursor';
import Entity from '../../types/Entity';
import Pagination from '../../types/Pagination';
import { forward } from '../../types/PaginationDirection';

export default <E extends Entity>(pagination: Pagination): Result<E> => {
  if (pagination.direction === forward) {
    return { entities: [], previousCursor: start, nextCursor: end };
  }
  return { entities: [], previousCursor: end, nextCursor: start };
};
