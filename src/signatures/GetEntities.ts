import Cursor from '../types/Cursor';
import Filter from '../types/Filter';
import Pagination from '../types/Pagination';
import Sort from '../types/Sort';

export interface Opts<Entity> {
  readonly filter: Filter<Entity>;
  readonly sort: Sort<Entity>;
  readonly pagination: Pagination;
}

export interface Result<Entity> {
  readonly entities: Entity[];
  readonly nextCursor: Cursor;
  readonly previousCursor: Cursor;
}

export type Signature<Entity> = (opts: Opts<Entity>) => Promise<Result<Entity>>;

export default Signature;
