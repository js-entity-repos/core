// tslint:disable-next-line:no-unused
import { AndFilter, NotFilter, OrFilter } from '../types/Filter';
// tslint:disable-next-line:no-unused
import Pagination from '../types/Pagination';
import createCursorFromEntity from './createCursorFromEntity/createCursorFromEntity';
import createPaginationFilter from './createPaginationFilter/createPaginationFilter';

export default {
  createCursorFromEntity,
  createPaginationFilter,
};
