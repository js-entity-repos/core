import 'mocha'; // tslint:disable-line:no-import-side-effect
import * as assert from 'power-assert';
import Facade from '../../Facade';
import Filter from '../../types/Filter';
import Pagination from '../../types/Pagination';
import Sort from '../../types/Sort';
import { TestEntity, testEntity } from '../utils/testEntity';

export default (facade: Facade<TestEntity>) => {
  const firstId = 'test_id_1';
  const secondId = 'test_id_2';
  const firstEntity = { ...testEntity, id: firstId, stringProp: 'a', numberProp: 1 };
  const secondEntity = { ...testEntity, id: secondId, stringProp: 'b', numberProp: 2 };

  const assertSort = async (sortedEntities: TestEntity[], sort: Sort<TestEntity>) => {
    const filter: Filter<TestEntity> = {};
    const pagination: Pagination = { cursor: undefined, forward: true, limit: 2 };
    const actualResult = await facade.getEntities({ filter, sort, pagination });

    const actualEntities = actualResult.entities;
    const expectedEntities = sortedEntities;
    assert.deepEqual(actualEntities, expectedEntities);
  };

  it('should sort by one ascending property when entities are ordered', async () => {
    await facade.createEntity({ id: firstId, entity: firstEntity });
    await facade.createEntity({ id: secondId, entity: secondEntity });
    await assertSort([firstEntity, secondEntity], { stringProp: true });
  });

  it('should sort by one ascending property when entities are unordered', async () => {
    await facade.createEntity({ id: secondId, entity: secondEntity });
    await facade.createEntity({ id: firstId, entity: firstEntity });
    await assertSort([firstEntity, secondEntity], { stringProp: true });
  });

  it('should sort by one descending property when entities are ordered', async () => {
    await facade.createEntity({ id: secondId, entity: secondEntity });
    await facade.createEntity({ id: firstId, entity: firstEntity });
    await assertSort([secondEntity, firstEntity], { stringProp: false });
  });

  it('should sort by one descending property when entities are unordered', async () => {
    await facade.createEntity({ id: firstId, entity: firstEntity });
    await facade.createEntity({ id: secondId, entity: secondEntity });
    await assertSort([secondEntity, firstEntity], { stringProp: false });
  });

  it('should sort by two properties when ascending first and descending second', async () => {
    await facade.createEntity({ id: firstId, entity: firstEntity });
    await facade.createEntity({ id: secondId, entity: secondEntity });
    await assertSort([firstEntity, secondEntity], { stringProp: true, numberProp: false });
  });

  it('should sort by two properties when descending first and ascending second', async () => {
    await facade.createEntity({ id: firstId, entity: firstEntity });
    await facade.createEntity({ id: secondId, entity: secondEntity });
    await assertSort([secondEntity, firstEntity], { stringProp: false, numberProp: true });
  });
};
