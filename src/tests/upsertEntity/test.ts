import 'mocha'; // tslint:disable-line:no-import-side-effect
import * as assert from 'power-assert';
import Facade from '../../Facade';
import { TestEntity, testEntity, testId, TestId } from '../utils/testEntity';

export default (facade: Facade<TestId, TestEntity>) => {
  describe('upsertEntity', () => {
    it('should create when identifier does not exist', async () => {
      const createdEntity = await facade.upsertEntity({ id: testId, entity: testEntity });
      const retrievedEntity = await facade.getEntity({ id: testId });
      assert.deepEqual(createdEntity, testEntity);
      assert.deepEqual(retrievedEntity, testEntity);
    });

    it('should overwrite when identifier does exist', async () => {
      const testOverwrite: TestEntity = {
        ...testId,
        booleanProp: false,
        numberProp: 2,
        stringProp: 'test_string_prop_overwrite',
      };
      await facade.createEntity({ entity: testEntity });
      const overwrittenEntity = await facade.upsertEntity({ id: testId, entity: testOverwrite });
      const retrievedEntity = await facade.getEntity({ id: testId });
      assert.deepEqual(overwrittenEntity, testOverwrite);
      assert.deepEqual(retrievedEntity, testOverwrite);
    });
  });
};
