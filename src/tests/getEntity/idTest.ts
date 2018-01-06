import * as assertRejects from 'assert-rejects';
import 'mocha'; // tslint:disable-line:no-import-side-effect
import * as assert from 'power-assert';
import MissingEntityError from '../../errors/MissingEntityError';
import Facade from '../../Facade';
import { TestEntity, testEntity, testId } from '../utils/testEntity';

export default (facade: Facade<TestEntity>) => {
  it('should error when identifier does not exist', async () => {
    const promise = facade.getEntity({ id: testId });
    await assertRejects(promise, MissingEntityError);
  });

  it('should not error when identifier does exist', async () => {
    await facade.createEntity({ id: testId, entity: testEntity });
    const { entity: retrievedEntity } = await facade.getEntity({ id: testId });
    assert.deepEqual(retrievedEntity, testEntity);
  });
};
