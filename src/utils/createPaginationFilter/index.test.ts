import 'mocha'; // tslint:disable-line:no-import-side-effect
import * as assert from 'power-assert';
import { TestEntity, testEntity } from '../../tests/utils/testEntity';
import Pagination from '../../types/Pagination';
import createCursorFromEntity from '../createCursorFromEntity';
import createPaginationFilter from './index';

describe('createCursorFromEntity', () => {
  const sort = { id: true };

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
    const expectedResult = {
      id: { $gt: testEntity.id },
    };
    assert.deepEqual(actualResult, expectedResult);
  });

  it('should return the correct filter when the cursor is defined and going backward', () => {
    const cursor = createCursorFromEntity<TestEntity>(testEntity, sort);
    const pagination: Pagination = { cursor, forward: false, limit: 1 };
    const actualResult = createPaginationFilter<TestEntity>(pagination, sort);
    const expectedResult = {
      id: { $lt: testEntity.id },
    };
    assert.deepEqual(actualResult, expectedResult);
  });
});
