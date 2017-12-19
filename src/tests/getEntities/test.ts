import 'mocha'; // tslint:disable-line:no-import-side-effect
import * as assert from 'power-assert';
import Facade from '../../Facade';
import { Result as GetEntitiesResult } from '../../signatures/GetEntities';
import Filter from '../../types/Filter';
import Pagination from '../../types/Pagination';
import Sort from '../../types/Sort';
import { TestEntity, TestId } from '../testEntity';

export default (facade: Facade<TestId, TestEntity>) => {
  describe('getEntities', () => {
    it('should return no entities when there are no entities', async () => {
      const filter: Filter<TestEntity> = {};
      const sort: Sort<TestEntity> = {};
      const pagination: Pagination = { cursor: undefined, forward: true, limit: 1 };
      const actualResult = await facade.getEntities({ filter, sort, pagination });
      const expectedResult: GetEntitiesResult<TestEntity> = {
        entities: [],
        nextCursor: undefined,
        previousCursor: undefined,
      };
      assert.deepEqual(actualResult, expectedResult);
    });
  });
};
