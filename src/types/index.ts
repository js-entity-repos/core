import CursorType from './Cursor';
import FilterType from './Filter';
import PaginationType from './Pagination';
import SortType from './Sort';

export type Cursor = CursorType;
export type Filter<Entity> = FilterType<Entity>;
export type Paginatior = PaginationType;
export type Sort<Entity> = SortType<Entity>;
