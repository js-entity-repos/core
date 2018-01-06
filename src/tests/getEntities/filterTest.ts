import 'mocha'; // tslint:disable-line:no-import-side-effect
import * as assert from 'power-assert';
import Facade from '../../Facade';
import filterTest, { firstEntity, secondEntity } from '../utils/filterTest';
import { TestEntity } from '../utils/testEntity';

export default (facade: Facade<TestEntity>) => {
  filterTest({
    assertAllEntitiesFilter: async (filter) => {
      const actualResult = await facade.getEntities({ filter });
      assert.deepEqual(actualResult.entities, [firstEntity, secondEntity]);
    },
    assertFirstEntityFilter: async (filter) => {
      const actualResult = await facade.getEntities({ filter });
      assert.deepEqual(actualResult.entities, [firstEntity]);
    },
    assertNoEntityFilter: async (filter) => {
      const actualResult = await facade.getEntities({ filter });
      assert.deepEqual(actualResult.entities, []);
    },
    facade,
  });
};
