import 'mocha'; // tslint:disable-line:no-import-side-effect
import * as assert from 'power-assert';
import { TestEntity, testEntity } from '../../tests/utils/testEntity';
import { Filter } from '../../types/Filter';
import Pagination from '../../types/Pagination';
import Sort from '../../types/Sort';
import createCursorFromEntity from '../createCursorFromEntity';
import createPaginationFilter from './index';

describe('createCursorFromEntity', () => {
  const sort: Sort<TestEntity> = { id: true, booleanProp: false };

  it('should return empty filter when the cursor is undefined', () => {
    const pagination: Pagination = { cursor: undefined, forward: true, limit: 1 };
    const actualResult = createPaginationFilter<TestEntity>(pagination, sort);
    const expectedResult = {};
    assert.deepEqual(actualResult, expectedResult);
  });

  it('should return the correct filter when the cursor is defined and going forward', () => {
    const cursor = createCursorFromEntity<TestEntity>(testEntity, sort);
    const pagination: Pagination = { cursor, forward: true, limit: 1 };
    const actualResult = createPaginationFilter<TestEntity>(pagination, sort);
    const expectedResult: Filter<TestEntity> = {
      booleanProp: { $lt: testEntity.booleanProp },
      id: { $gt: testEntity.id },
    };
    assert.deepEqual(actualResult, expectedResult);
  });

  it('should return the correct filter when the cursor is defined and going backward', () => {
    const cursor = createCursorFromEntity<TestEntity>(testEntity, sort);
    const pagination: Pagination = { cursor, forward: false, limit: 1 };
    const actualResult = createPaginationFilter<TestEntity>(pagination, sort);
    const expectedResult: Filter<TestEntity> = {
      booleanProp: { $gt: testEntity.booleanProp },
      id: { $lt: testEntity.id },
    };
    assert.deepEqual(actualResult, expectedResult);
  });
});
