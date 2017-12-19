import * as assertRejects from 'assert-rejects';
import 'mocha'; // tslint:disable-line:no-import-side-effect
import * as assert from 'power-assert';
import MissingEntityError from '../../errors/MissingEntityError';
import Facade from '../../Facade';
import { TestEntity, testEntity, testId, TestId } from '../utils/testEntity';

export default (facade: Facade<TestId, TestEntity>) => {
  describe('patchEntity', () => {
    const assertPatch = async (testPatch: Partial<TestEntity>) => {
      const patchedEntity = await facade.patchEntity({ id: testId, patch: testPatch });
      const retrievedEntity = await facade.getEntity({ id: testId });
      const expectedEntity = { ...testEntity, ...testPatch };
      assert.deepEqual(patchedEntity, expectedEntity);
      assert.deepEqual(retrievedEntity, expectedEntity);
    };

    it('should error when identifier does not exist', async () => {
      const promise = facade.overwriteEntity({ id: testId, entity: testEntity });
      await assertRejects(promise, MissingEntityError);
    });

    it('should patch when patching one entity property', async () => {
      const testPatch: Partial<TestEntity> = {
        stringProp: 'test_string_prop_patch',
      };
      await facade.createEntity({ entity: testEntity });
      await assertPatch(testPatch);
    });

    it('should patch when patching all entity properties', async () => {
      const testPatch: Partial<TestEntity> = {
        booleanProp: false,
        numberProp: 2,
        stringProp: 'test_string_prop_patch',
      };
      await facade.createEntity({ entity: testEntity });
      await assertPatch(testPatch);
    });
  });
};
