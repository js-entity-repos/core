import 'mocha'; // tslint:disable-line:no-import-side-effect
import * as assert from 'power-assert';
import Facade from '../../Facade';
import Filter from '../../types/Filter';
import { TestEntity, TestId } from '../testEntity';

export default (facade: Facade<TestId, TestEntity>) => {
  describe('countEntities', () => {
    it('should return 0 when there are no entities', async () => {
      const filter: Filter<TestEntity> = {};
      const { count } = await facade.countEntities({ filter });
      assert.equal(count, 0);
    });
  });
};
