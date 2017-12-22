import 'mocha'; // tslint:disable-line:no-import-side-effect
import Facade from '../../Facade';
import Filter from '../../types/Filter';
import { TestEntity, testEntity, TestId } from '../utils/testEntity';

export type FilterAsserter = (filter: Filter<TestEntity>) => Promise<void>;

export interface Opts {
  readonly facade: Facade<TestId, TestEntity>;
  readonly assertFirstEntityFilter: FilterAsserter;
  readonly assertNoEntityFilter: FilterAsserter;
  readonly assertAllEntitiesFilter: FilterAsserter;
}
const firstId = { id: 'test_id_1' };
const secondId = { id: 'test_id_2' };
export const firstEntity = { ...testEntity, ...firstId, stringProp: 'a', numberProp: 1 };
export const secondEntity = { ...testEntity, ...secondId, stringProp: 'b', numberProp: 2 };

export default (opts: Opts) => {
  const createTestEntities = async () => {
    await opts.facade.createEntity({ id: firstId, entity: firstEntity });
    await opts.facade.createEntity({ id: secondId, entity: secondEntity });
  };

  it('should not filter when using no filter', async () => {
    await createTestEntities();
    await opts.assertAllEntitiesFilter({});
  });

  it('should not filter when using no filter', async () => {
    await createTestEntities();
    await opts.assertNoEntityFilter({ stringProp: 'c' });
  });

  it('should filter correctly when not using an operator', async () => {
    await createTestEntities();
    await opts.assertFirstEntityFilter({ stringProp: 'a' });
  });

  it('should filter correctly when using $eq operator', async () => {
    await createTestEntities();
    await opts.assertFirstEntityFilter({ stringProp: { $eq: 'a' } });
  });

  it('should filter correctly when using $ne operator', async () => {
    await createTestEntities();
    await opts.assertFirstEntityFilter({ stringProp: { $ne: 'b' } });
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
    await opts.assertFirstEntityFilter({ stringProp: { $in: ['a'] } });
  });

  it('should filter correctly when using $and operator', async () => {
    await createTestEntities();
    await opts.assertFirstEntityFilter({ $and: [{ stringProp: 'a' }, { numberProp: 1 }] });
  });

  it('should filter correctly when using $or operator', async () => {
    await createTestEntities();
    await opts.assertFirstEntityFilter({ $or: [{ stringProp: 'a' }, { numberProp: 1 }] });
  });

  it('should filter correctly when using $not operator', async () => {
    await createTestEntities();
    await opts.assertFirstEntityFilter({ $not: { stringProp: 'b' } });
  });
};
