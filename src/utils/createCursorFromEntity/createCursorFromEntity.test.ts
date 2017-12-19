import 'mocha'; // tslint:disable-line:no-import-side-effect
import * as assert from 'power-assert';
import { TestEntity, testEntity } from '../../tests/utils/testEntity';
import createCursorFromEntity from './createCursorFromEntity';

describe('createCursorFromEntity', () => {
  it('should return undefined when the entity is undefined', () => {
    const actualResult = createCursorFromEntity<TestEntity>(undefined, { id: true });
    assert.equal(actualResult, undefined);
  });

  it('should return the correct cursor when the entity is defined', () => {
    const actualResult = createCursorFromEntity<TestEntity>(testEntity, { id: true });
    assert.equal(actualResult, 'eyJpZCI6InRlc3RfaWQifQ==');
  });
});
