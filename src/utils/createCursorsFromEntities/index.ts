import { first, last } from 'lodash';
import Cursor from '../../types/Cursor';
import Entity from '../../types/Entity';
import Sort from '../../types/Sort';
import createCursorFromEntity from '../createCursorFromEntity';

export interface Opts<E extends Entity> {
  readonly entities: E[];
  readonly cursor: Cursor;
  readonly sort: Sort<E>;
}

export interface Result {
  readonly backwardCursor: Cursor;
  readonly forwardCursor: Cursor;
}

export default <E extends Entity>({ entities, cursor, sort }: Opts<E>): Result => {
  if (entities.length !== 0) {
    return {
      backwardCursor: createCursorFromEntity(first(entities) as E, sort),
      forwardCursor: createCursorFromEntity(last(entities) as E, sort),
    };
  }
  return {
    backwardCursor: cursor,
    forwardCursor: cursor,
  };
};
