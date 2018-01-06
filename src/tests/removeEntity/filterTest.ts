import * as assertRejects from 'assert-rejects';
import 'mocha'; // tslint:disable-line:no-import-side-effect
import MissingEntityError from '../../errors/MissingEntityError';
import Facade from '../../Facade';
import filterTest, { firstId, secondId } from '../utils/filterTest';
import { TestEntity } from '../utils/testEntity';

export default (facade: Facade<TestEntity>) => {
  filterTest({
    assertAllEntitiesFilter: async (filter) => {
      await facade.removeEntity({ filter, id: firstId });
      await facade.removeEntity({ filter, id: secondId });
      const firstPromise = facade.getEntity({ id: firstId });
      await assertRejects(firstPromise, MissingEntityError);
      const secondPromise = facade.getEntity({ id: secondId });
      await assertRejects(secondPromise, MissingEntityError);
    },
    assertFirstEntityFilter: async (filter) => {
      await facade.removeEntity({ filter, id: firstId });
      const promise = facade.getEntity({ id: firstId });
      await assertRejects(promise, MissingEntityError);
    },
    assertNoEntityFilter: async (filter) => {
      const promise = facade.removeEntity({ filter, id: firstId });
      await assertRejects(promise, MissingEntityError);
    },
    facade,
  });
};
