import Cursor from './Cursor';
import PaginationDirection from './PaginationDirection';

export default interface Pagination {
  readonly cursor: Cursor;
  readonly direction: PaginationDirection;
  readonly limit: number;
}
