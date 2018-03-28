import 'mocha'; // tslint:disable-line:no-import-side-effect
import * as assert from 'power-assert';
import { TestEntity, testEntity } from '../../tests/utils/testEntity';
import { asc } from '../../types/SortOrder';
import createCursorFromEntity from './index';

describe('createCursorFromEntity', () => {
  it('should return the correct cursor when the entity is defined', () => {
    const actualResult = createCursorFromEntity<TestEntity>(testEntity, { id: asc });
    assert.equal(actualResult, 'eyJpZCI6InRlc3RfaWQifQ==');
  });
});
