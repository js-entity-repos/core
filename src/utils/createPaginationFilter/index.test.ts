import 'mocha'; // tslint:disable-line:no-import-side-effect
import * as assert from 'power-assert';
import { TestEntity, testEntity } from '../../tests/utils/testEntity';
import { start } from '../../types/Cursor';
import { Filter } from '../../types/Filter';
import Pagination from '../../types/Pagination';
import { backward, forward } from '../../types/PaginationDirection';
import Sort from '../../types/Sort';
import { asc, desc } from '../../types/SortOrder';
import createCursorFromEntity from '../createCursorFromEntity';
import createPaginationFilter from './index';

describe('createCursorFromEntity', () => {
  const sort: Sort<TestEntity> = { id: asc, numberProp: desc };

  it('should return empty filter when the cursor is start', () => {
    const pagination: Pagination = { cursor: start, direction: forward, limit: 1 };
    const actualResult = createPaginationFilter<TestEntity>(pagination, sort);
    const expectedResult = {};
    assert.deepEqual(actualResult, expectedResult);
  });

  it('should return the correct filter when the cursor is defined and going forward', () => {
    const cursor = createCursorFromEntity<TestEntity>(testEntity, sort);
    const pagination: Pagination = { cursor, direction: forward, limit: 1 };
    const actualResult = createPaginationFilter<TestEntity>(pagination, sort);
    const expectedResult: Filter<TestEntity> = {
      id: { $gt: testEntity.id },
      numberProp: { $lte: testEntity.numberProp },
    };
    assert.deepEqual(actualResult, expectedResult);
  });

  it('should return the correct filter when the cursor is defined and going backward', () => {
    const cursor = createCursorFromEntity<TestEntity>(testEntity, sort);
    const pagination: Pagination = { cursor, direction: backward, limit: 1 };
    const actualResult = createPaginationFilter<TestEntity>(pagination, sort);
    const expectedResult: Filter<TestEntity> = {
      id: { $lt: testEntity.id },
      numberProp: { $gte: testEntity.numberProp },
    };
    assert.deepEqual(actualResult, expectedResult);
  });
});
