import 'mocha'; // tslint:disable-line:no-import-side-effect
import * as assert from 'power-assert';
import { TestEntity, testEntity } from '../../tests/utils/testEntity';
import { start } from '../../types/Cursor';
import Pagination from '../../types/Pagination';
import { forward } from '../../types/PaginationDirection';
import Sort from '../../types/Sort';
import { asc } from '../../types/SortOrder';
import createGetEntitiesResult from './index';

describe('createGetEntitiesResult forward', () => {
  const sort: Sort<TestEntity> = { id: asc };
  const firstId = 'test_id_1';
  const secondId = 'test_id_2';
  const firstEntity = { ...testEntity, id: firstId };
  const secondEntity = { ...testEntity, id: secondId };
  const firstCursor = 'eyJpZCI6InRlc3RfaWRfMSJ9';
  const secondCursor = 'eyJpZCI6InRlc3RfaWRfMiJ9';

  it('should return the correct result when there are no entities', () => {
    const entities: TestEntity[] = [];
    const pagination: Pagination = { cursor: start, direction: forward, limit: 1 };
    const isEnd = true;
    const result = createGetEntitiesResult({ entities, isEnd, pagination, sort });
    assert.deepEqual(result, {
      backwardCursor: start,
      entities,
      forwardCursor: start,
      hasMoreBackward: false,
      hasMoreForward: false,
    });
  });

  it('should return the correct result when not at the end going from start', () => {
    const entities = [firstEntity, secondEntity];
    const pagination: Pagination = { cursor: start, direction: forward, limit: 1 };
    const isEnd = false;
    const result = createGetEntitiesResult({ entities, isEnd, pagination, sort });
    assert.deepEqual(result, {
      backwardCursor: firstCursor,
      entities,
      forwardCursor: secondCursor,
      hasMoreBackward: false,
      hasMoreForward: true,
    });
  });

  it('should return the correct result when at the end going from start', () => {
    const entities = [firstEntity, secondEntity];
    const pagination: Pagination = { cursor: start, direction: forward, limit: 1 };
    const isEnd = true;
    const result = createGetEntitiesResult({ entities, isEnd, pagination, sort });
    assert.deepEqual(result, {
      backwardCursor: firstCursor,
      entities,
      forwardCursor: secondCursor,
      hasMoreBackward: false,
      hasMoreForward: false,
    });
  });

  it('should return the correct result when not at the end going from cursor', () => {
    const entities = [secondEntity];
    const pagination: Pagination = { cursor: firstCursor, direction: forward, limit: 1 };
    const isEnd = false;
    const result = createGetEntitiesResult({ entities, isEnd, pagination, sort });
    assert.deepEqual(result, {
      backwardCursor: secondCursor,
      entities,
      forwardCursor: secondCursor,
      hasMoreBackward: true,
      hasMoreForward: true,
    });
  });

  it('should return the correct result when at the end going from cursor', () => {
    const entities = [secondEntity];
    const pagination: Pagination = { cursor: firstCursor, direction: forward, limit: 1 };
    const isEnd = true;
    const result = createGetEntitiesResult({ entities, isEnd, pagination, sort });
    assert.deepEqual(result, {
      backwardCursor: secondCursor,
      entities,
      forwardCursor: secondCursor,
      hasMoreBackward: true,
      hasMoreForward: false,
    });
  });
});
