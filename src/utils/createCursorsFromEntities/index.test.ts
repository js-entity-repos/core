import 'mocha'; // tslint:disable-line:no-import-side-effect
import * as assert from 'power-assert';
import { TestEntity, testEntity } from '../../tests/utils/testEntity';
import { start } from '../../types/Cursor';
import Sort from '../../types/Sort';
import { asc } from '../../types/SortOrder';
import createCursorsFromEntities from './index';

describe('createCursorsFromEntities', () => {
  const sort: Sort<TestEntity> = { id: asc };
  const firstId = 'test_id_1';
  const secondId = 'test_id_2';
  const firstEntity = { ...testEntity, id: firstId };
  const secondEntity = { ...testEntity, id: secondId };
  const firstCursor = 'eyJpZCI6InRlc3RfaWRfMSJ9';
  const secondCursor = 'eyJpZCI6InRlc3RfaWRfMiJ9';

  it('should return the correct cursors when there are no entities', () => {
    const entities: TestEntity[] = [];
    const cursor = start;
    const actualResult = createCursorsFromEntities({ cursor, entities, sort });
    assert.deepEqual(actualResult, {
      backwardCursor: start,
      forwardCursor: start,
    });
  });

  it('should return the correct cursors when there is one entity', () => {
    const entities = [firstEntity];
    const cursor = start;
    const actualResult = createCursorsFromEntities({ cursor, entities, sort });
    assert.deepEqual(actualResult, {
      backwardCursor: firstCursor,
      forwardCursor: firstCursor,
    });
  });

  it('should return the correct cursors when there are many entities', () => {
    const entities = [firstEntity, secondEntity];
    const cursor = start;
    const actualResult = createCursorsFromEntities({ cursor, entities, sort });
    assert.deepEqual(actualResult, {
      backwardCursor: firstCursor,
      forwardCursor: secondCursor,
    });
  });
});
