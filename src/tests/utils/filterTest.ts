// tslint:disable:max-file-line-count
import 'mocha'; // tslint:disable-line:no-import-side-effect
import Facade from '../../Facade';
import Filter from '../../types/Filter';
import { TestEntity, testEntity } from '../utils/testEntity';

export type FilterAsserter = (filter?: Filter<TestEntity>) => Promise<void>;

export interface Opts {
  readonly facade: Facade<TestEntity>;
  readonly assertFirstEntityFilter: FilterAsserter;
  readonly assertNoEntityFilter: FilterAsserter;
  readonly assertAllEntitiesFilter: FilterAsserter;
}
export const firstId = 'test_id_1';
export const secondId = 'test_id_2';
export const firstEntity = { ...testEntity, id: firstId, stringProp: 'abc', numberProp: 1 };
export const secondEntity = { ...testEntity, id: secondId, stringProp: 'def', numberProp: 2 };

export default (opts: Opts) => {
  const createTestEntities = async () => {
    await opts.facade.createEntity({ id: firstId, entity: firstEntity });
    await opts.facade.createEntity({ id: secondId, entity: secondEntity });
  };

  it('should not filter when filter is not defined', async () => {
    await createTestEntities();
    await opts.assertAllEntitiesFilter(undefined);
  });

  it('should not filter when using no filter', async () => {
    await createTestEntities();
    await opts.assertAllEntitiesFilter({});
  });

  it('should return no entities when using a filter matching none', async () => {
    await createTestEntities();
    await opts.assertNoEntityFilter({ stringProp: 'c' });
  });

  it('should filter correctly when not using an operator', async () => {
    await createTestEntities();
    await opts.assertFirstEntityFilter({ stringProp: firstEntity.stringProp });
  });

  it('should filter correctly when using $eq operator', async () => {
    await createTestEntities();
    await opts.assertFirstEntityFilter({ stringProp: { $eq: firstEntity.stringProp } });
  });

  it('should filter correctly when using $ne operator', async () => {
    await createTestEntities();
    await opts.assertFirstEntityFilter({ stringProp: { $ne: secondEntity.stringProp } });
  });

  it('should filter correctly when using $gt and $lt operators', async () => {
    await createTestEntities();
    await opts.assertFirstEntityFilter({ numberProp: { $gt: 0, $lt: 2 } });
  });

  it('should filter correctly when using $gte and $lte operators', async () => {
    await createTestEntities();
    await opts.assertFirstEntityFilter({ numberProp: { $gte: 1, $lte: 1 } });
  });

  it('should filter correctly when using $in operator', async () => {
    await createTestEntities();
    await opts.assertFirstEntityFilter({ stringProp: { $in: [firstEntity.stringProp] } });
  });

  it('should filter correctly when using $and operator', async () => {
    await createTestEntities();
    await opts.assertFirstEntityFilter({
      $and: [
        { stringProp: firstEntity.stringProp },
        { numberProp: 1 },
      ],
    });
  });

  it('should filter correctly when using $or operator', async () => {
    await createTestEntities();
    await opts.assertFirstEntityFilter({
      $or: [
        { stringProp: firstEntity.stringProp },
        { numberProp: 1 },
      ],
    });
  });

  it('should filter correctly when using $nor operator', async () => {
    await createTestEntities();
    await opts.assertFirstEntityFilter({
      $nor: [
        { stringProp: secondEntity.stringProp },
        { numberProp: 2 },
      ],
    });
  });

  it('should filter correctly when using $not operator', async () => {
    await createTestEntities();
    await opts.assertFirstEntityFilter({ stringProp: { $not: { $eq: secondEntity.stringProp } } });
  });

  it('should filter correctly when using $search operator with lowercase', async () => {
    await createTestEntities();
    await opts.assertFirstEntityFilter({ id: { $search: 'b' } });
  });

  it('should filter correctly when using $search operator with uppercase', async () => {
    await createTestEntities();
    await opts.assertFirstEntityFilter({ id: { $search: 'B' } });
  });
};
