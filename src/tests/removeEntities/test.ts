import 'mocha'; // tslint:disable-line:no-import-side-effect
import * as assert from 'power-assert';
import Facade from '../../Facade';
import Pagination from '../../types/Pagination';
import Sort from '../../types/Sort';
import filterTest, { firstEntity, secondEntity } from '../utils/filterTest';
import { TestEntity, TestId } from '../utils/testEntity';

export default (facade: Facade<TestId, TestEntity>) => {
  describe('removeEntities', () => {
    const sort: Sort<TestEntity> = {};
    const pagination: Pagination = { cursor: undefined, forward: true, limit: 2 };

    filterTest({
      assertAllEntitiesFilter: async (filter) => {
        await facade.removeEntities({ filter });
        const actualResult = await facade.getEntities({ filter: {}, sort, pagination });
        assert.deepEqual(actualResult.entities, []);
      },
      assertFirstEntityFilter: async (filter) => {
        await facade.removeEntities({ filter });
        const actualResult = await facade.getEntities({ filter: {}, sort, pagination });
        assert.deepEqual(actualResult.entities, [secondEntity]);
      },
      assertNoEntityFilter: async (filter) => {
        await facade.removeEntities({ filter });
        const actualResult = await facade.getEntities({ filter: {}, sort, pagination });
        assert.deepEqual(actualResult.entities, [firstEntity, secondEntity]);
      },
      facade,
    });
  });
};
