import { Result } from '../../signatures/GetEntities';
import { start } from '../../types/Cursor';
import Entity from '../../types/Entity';
import Pagination from '../../types/Pagination';
import { backward, forward } from '../../types/PaginationDirection';
import Sort from '../../types/Sort';
import createCursorsFromEntities from '../createCursorsFromEntities';

export interface Opts<E extends Entity> {
  readonly entities: E[];
  readonly isEnd: boolean;
  readonly pagination: Pagination;
  readonly sort: Sort<E>;
}

export default <E extends Entity>({ entities, isEnd, pagination, sort }: Opts<E>): Result<E> => {
  const { direction, cursor } = pagination;

  const isBackward = direction === backward;
  const isForward = direction === forward;
  const isStart = cursor === start;
  const hasMoreBackward = (isBackward && !isEnd) || (isForward && !isStart);
  const hasMoreForward = (isForward && !isEnd) || (isBackward && !isStart);

  const { backwardCursor, forwardCursor } = createCursorsFromEntities({ entities, cursor, sort });
  return { entities, forwardCursor, backwardCursor, hasMoreBackward, hasMoreForward };
};
