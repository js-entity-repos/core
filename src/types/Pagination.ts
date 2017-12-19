import Cursor from './Cursor';

export default interface Pagination {
  readonly cursor: Cursor;
  readonly forward: boolean;
  readonly limit: number;
}
