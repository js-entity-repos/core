import 'mocha'; // tslint:disable-line:no-import-side-effect
import * as assert from 'power-assert';
import Facade from '../../Facade';
import filterTest from '../utils/filterTest';
import { TestEntity, TestId } from '../utils/testEntity';

export default (facade: Facade<TestId, TestEntity>) => {
  describe('countEntities', () => {
    filterTest({
      assertAllEntitiesFilter: async (filter) => {
        const { count } = await facade.countEntities({ filter });
        const expectedCount = 2;
        assert.equal(count, expectedCount);
      },
      assertFirstEntityFilter: async (filter) => {
        const { count } = await facade.countEntities({ filter });
        const expectedCount = 1;
        assert.equal(count, expectedCount);
      },
      assertNoEntityFilter: async (filter) => {
        const { count } = await facade.countEntities({ filter });
        const expectedCount = 0;
        assert.equal(count, expectedCount);
      },
      facade,
    });
  });
};
