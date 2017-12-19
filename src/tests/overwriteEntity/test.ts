import * as assertRejects from 'assert-rejects';
import 'mocha'; // tslint:disable-line:no-import-side-effect
import * as assert from 'power-assert';
import MissingEntityError from '../../errors/MissingEntityError';
import Facade from '../../Facade';
import { TestEntity, testEntity, testId, TestId } from '../testEntity';

export default (facade: Facade<TestId, TestEntity>) => {
  describe('removeEntity', () => {
    it('should error when identifier does not exist', async () => {
      const promise = facade.overwriteEntity({ id: testId, entity: testEntity });
      await assertRejects(promise, MissingEntityError);
    });

    it('should overwrite when identifier does exist', async () => {
      const overwrite: TestEntity = {
        ...testId,
        booleanProp: false,
        numberProp: 2,
        stringProp: 'test_string_prop_overwrite',
      };
      await facade.createEntity({ entity: testEntity });
      const overwrittenEntity = await facade.overwriteEntity({ id: testId, entity: overwrite });
      const retrievedEntity = await facade.getEntity({ id: testId });
      assert.deepEqual(overwrittenEntity, overwrite);
      assert.deepEqual(retrievedEntity, overwrite);
    });
  });
};
