import 'mocha'; // tslint:disable-line:no-import-side-effect
import * as assert from 'power-assert';
import Facade from '../../Facade';
import Pagination from '../../types/Pagination';
import Sort from '../../types/Sort';
import filterTest, { firstEntity, secondEntity } from '../utils/filterTest';
import { TestEntity } from '../utils/testEntity';

export default (facade: Facade<TestEntity>) => {
  const sort: Sort<TestEntity> = {};
  const pagination: Pagination = { cursor: undefined, forward: true, limit: 2 };

  filterTest({
    assertAllEntitiesFilter: async (filter) => {
      const actualResult = await facade.getEntities({ filter, sort, pagination });
      assert.deepEqual(actualResult.entities, [firstEntity, secondEntity]);
    },
    assertFirstEntityFilter: async (filter) => {
      const actualResult = await facade.getEntities({ filter, sort, pagination });
      assert.deepEqual(actualResult.entities, [firstEntity]);
    },
    assertNoEntityFilter: async (filter) => {
      const actualResult = await facade.getEntities({ filter, sort, pagination });
      assert.deepEqual(actualResult.entities, []);
    },
    facade,
  });
};
