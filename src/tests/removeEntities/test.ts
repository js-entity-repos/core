import * as assertRejects from 'assert-rejects';
import 'mocha'; // tslint:disable-line:no-import-side-effect
import MissingEntityError from '../../errors/MissingEntityError';
import Facade from '../../Facade';
import Filter from '../../types/Filter';
import { TestEntity, testEntity, testId, TestId } from '../testEntity';

export default (facade: Facade<TestId, TestEntity>) => {
  describe('removeEntities', () => {
    it('should not error when there are no entities', async () => {
      const filter: Filter<TestEntity> = {};
      await facade.removeEntities({ filter });
    });

    it('should remove all entities when there are entities', async () => {
      const filter: Filter<TestEntity> = {};
      await facade.createEntity({ entity: testEntity });
      await facade.removeEntities({ filter });
      const promise = facade.getEntity({ id: testId });
      await assertRejects(promise, MissingEntityError);
    });
  });
};
