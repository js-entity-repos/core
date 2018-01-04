import 'mocha'; // tslint:disable-line:no-import-side-effect
import * as assert from 'power-assert';
import Facade from '../../Facade';
import { TestEntity, testEntity, testId } from '../utils/testEntity';

export default (facade: Facade<TestEntity>) => {
  describe('upsertEntity', () => {
    it('should create when identifier does not exist', async () => {
      const { entity: createdEntity } = await facade.upsertEntity({
        entity: testEntity,
        id: testId,
      });
      const { entity: retrievedEntity } = await facade.getEntity({ id: testId });
      assert.deepEqual(createdEntity, testEntity);
      assert.deepEqual(retrievedEntity, testEntity);
    });

    it('should overwrite when identifier does exist', async () => {
      const testOverwrite: TestEntity = {
        booleanProp: false,
        id: testId,
        numberProp: 2,
        stringProp: 'test_string_prop_overwrite',
      };
      await facade.createEntity({ id: testId, entity: testEntity });
      const { entity: overwrittenEntity } = await facade.upsertEntity({
        entity: testOverwrite,
        id: testId,
      });
      const { entity: retrievedEntity } = await facade.getEntity({ id: testId });
      assert.deepEqual(overwrittenEntity, testOverwrite);
      assert.deepEqual(retrievedEntity, testOverwrite);
    });
  });
};
