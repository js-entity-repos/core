import * as assertRejects from 'assert-rejects';
import 'mocha'; // tslint:disable-line:no-import-side-effect
import * as assert from 'power-assert';
import MissingEntityError from '../../errors/MissingEntityError';
import Facade from '../../Facade';
import { TestEntity, testEntity, testId, TestId } from '../testEntity';

export default (facade: Facade<TestId, TestEntity>) => {
  describe('getEntity', () => {
    it('should error when identifier does not exist', async () => {
      const promise = facade.getEntity({ id: testId });
      await assertRejects(promise, MissingEntityError);
    });

    it('should not error when identifier does exist', async () => {
      await facade.createEntity({ entity: testEntity });
      const retrievedEntity = await facade.getEntity({ id: testId });
      assert.deepEqual(retrievedEntity, testEntity);
    });
  });
};
