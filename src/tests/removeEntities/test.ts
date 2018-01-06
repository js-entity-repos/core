import 'mocha'; // tslint:disable-line:no-import-side-effect
import * as assert from 'power-assert';
import Facade from '../../Facade';
import filterTest, { firstEntity, secondEntity } from '../utils/filterTest';
import { TestEntity } from '../utils/testEntity';

export default (facade: Facade<TestEntity>) => {
  describe('removeEntities', () => {
    filterTest({
      assertAllEntitiesFilter: async (filter) => {
        await facade.removeEntities({ filter });
        const actualResult = await facade.getEntities({});
        assert.deepEqual(actualResult.entities, []);
      },
      assertFirstEntityFilter: async (filter) => {
        await facade.removeEntities({ filter });
        const actualResult = await facade.getEntities({});
        assert.deepEqual(actualResult.entities, [secondEntity]);
      },
      assertNoEntityFilter: async (filter) => {
        await facade.removeEntities({ filter });
        const actualResult = await facade.getEntities({});
        assert.deepEqual(actualResult.entities, [firstEntity, secondEntity]);
      },
      facade,
    });
  });
};
