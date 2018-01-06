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
      const firstEntityResult = await facade.patchEntity({
        filter,
        id: firstId,
        patch: firstEntity,
      });
      assert.deepEqual(firstEntityResult.entity, firstEntity);
      const secondEntityResult = await facade.patchEntity({
        filter,
        id: secondId,
        patch: secondEntity,
      });
      assert.deepEqual(secondEntityResult.entity, secondEntity);
    },
    assertFirstEntityFilter: async (filter) => {
      const actualResult = await facade.patchEntity({
        filter,
        id: firstId,
        patch: firstEntity,
      });
      assert.deepEqual(actualResult.entity, firstEntity);
    },
    assertNoEntityFilter: async (filter) => {
      const promise = facade.patchEntity({
        filter,
        id: firstId,
        patch: firstEntity,
      });
      await assertRejects(promise, MissingEntityError);
    },
    facade,
  });
};
