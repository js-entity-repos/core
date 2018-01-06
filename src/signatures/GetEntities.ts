import Cursor from '../types/Cursor';
import Entity from '../types/Entity';
import Filter from '../types/Filter';
import Pagination from '../types/Pagination';
import Sort from '../types/Sort';

export interface Opts<E extends Entity> {
  readonly filter?: Filter<E>;
  readonly sort?: Sort<E>;
  readonly pagination?: Pagination;
}

export interface Result<E extends Entity> {
  readonly entities: E[];
  readonly nextCursor: Cursor;
  readonly previousCursor: Cursor;
}

export type Signature<E extends Entity> = (opts: Opts<E>) => Promise<Result<E>>;

export default Signature;
