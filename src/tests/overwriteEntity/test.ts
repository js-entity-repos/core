import * as assertRejects from 'assert-rejects';
import 'mocha'; // tslint:disable-line:no-import-side-effect
import * as assert from 'power-assert';
import MissingEntityError from '../../errors/MissingEntityError';
import Facade from '../../Facade';
import { TestEntity, testEntity, testId, TestId } from '../utils/testEntity';

export default (facade: Facade<TestId, TestEntity>) => {
  describe('overwriteEntity', () => {
    it('should error when identifier does not exist', async () => {
      const promise = facade.overwriteEntity({ id: testId, entity: testEntity });
      await assertRejects(promise, MissingEntityError);
    });

    it('should overwrite when identifier does exist', async () => {
      const testOverwrite: TestEntity = {
        ...testId,
        booleanProp: false,
        numberProp: 2,
        stringProp: 'test_string_prop_overwrite',
      };
      await facade.createEntity({ id: testId, entity: testEntity });
      const { entity: overwrittenEntity } = await facade.overwriteEntity({
        entity: testOverwrite,
        id: testId,
      });
      const { entity: retrievedEntity } = await facade.getEntity({ id: testId });
      assert.deepEqual(overwrittenEntity, testOverwrite);
      assert.deepEqual(retrievedEntity, testOverwrite);
    });
  });
};
