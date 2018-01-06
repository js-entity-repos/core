import * as assertRejects from 'assert-rejects';
import 'mocha'; // tslint:disable-line:no-import-side-effect
import * as assert from 'power-assert';
import MissingEntityError from '../../errors/MissingEntityError';
import Facade from '../../Facade';
import filterTest, { firstEntity, firstId, secondEntity, secondId } from '../utils/filterTest';
import { TestEntity } from '../utils/testEntity';

export default (facade: Facade<TestEntity>) => {
  filterTest({
    assertAllEntitiesFilter: async (filter) => {
      const firstEntityResult = await facade.getEntity({ id: firstId, filter });
      assert.deepEqual(firstEntityResult.entity, firstEntity);
      const secondEntityResult = await facade.getEntity({ id: secondId, filter });
      assert.deepEqual(secondEntityResult.entity, secondEntity);
    },
    assertFirstEntityFilter: async (filter) => {
      const actualResult = await facade.getEntity({ id: firstId, filter });
      assert.deepEqual(actualResult.entity, firstEntity);
    },
    assertNoEntityFilter: async (filter) => {
      const promise = facade.getEntity({ id: firstId, filter });
      await assertRejects(promise, MissingEntityError);
    },
    facade,
  });
};
