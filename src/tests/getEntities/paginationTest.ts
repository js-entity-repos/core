import 'mocha'; // tslint:disable-line:no-import-side-effect
import * as assert from 'power-assert';
import Facade from '../../Facade';
import Cursor from '../../types/Cursor';
import Pagination from '../../types/Pagination';
import PaginationDirection, { backward, forward } from '../../types/PaginationDirection';
import { TestEntity, testEntity } from '../utils/testEntity';

export default (facade: Facade<TestEntity>) => {
  const firstId = 'test_id_1';
  const secondId = 'test_id_2';
  const firstEntity = { ...testEntity, id: firstId };
  const secondEntity = { ...testEntity, id: secondId };

  const createTestEntities = async () => {
    await facade.createEntity({ id: firstId, entity: firstEntity });
    await facade.createEntity({ id: secondId, entity: secondEntity });
  };

  const paginate = (cursor: Cursor, direction: PaginationDirection) => {
    const pagination: Pagination = { cursor, direction, limit: 1 };
    return facade.getEntities({ pagination });
  };

  it('should return all entities when pagination is not defined', async () => {
    await createTestEntities();
    const result = await facade.getEntities({});
    assert.deepEqual(result.entities, [firstEntity, secondEntity]);
  });

  it('should return first entity when there are two entities limitted to 1', async () => {
    await createTestEntities();
    const pagination: Pagination = { cursor: undefined, direction: forward, limit: 1 };
    const result = await facade.getEntities({ pagination });
    assert.deepEqual(result.entities, [firstEntity]);
  });

  it('should return first entity when paginating forward without cursor', async () => {
    await createTestEntities();
    const finalResult = await paginate(undefined, forward);
    assert.deepEqual(finalResult.entities, [firstEntity]);
  });

  it('should return second entity when paginating forward with first cursor', async () => {
    await createTestEntities();
    const firstResult = await paginate(undefined, forward);
    const finalResult = await paginate(firstResult.nextCursor, forward);
    assert.deepEqual(finalResult.entities, [secondEntity]);
  });

  it('should return no entities when paginating forward with second cursor', async () => {
    await createTestEntities();
    const firstResult = await paginate(undefined, forward);
    const secondResult = await paginate(firstResult.nextCursor, forward);
    const finalResult = await paginate(secondResult.nextCursor, forward);
    assert.deepEqual(finalResult.entities, []);
  });

  it('should return second entity when paginating backward without cursor', async () => {
    await createTestEntities();
    const finalResult = await paginate(undefined, backward);
    assert.deepEqual(finalResult.entities, [secondEntity]);
  });

  it('should return first entity when paginating backward with first cursor', async () => {
    await createTestEntities();
    const firstResult = await paginate(undefined, backward);
    const finalResult = await paginate(firstResult.previousCursor, backward);
    assert.deepEqual(finalResult.entities, [firstEntity]);
  });

  it('should return no entities when paginating backward with second cursor', async () => {
    await createTestEntities();
    const firstResult = await paginate(undefined, backward);
    const secondResult = await paginate(firstResult.previousCursor, backward);
    const finalResult = await paginate(secondResult.previousCursor, backward);
    assert.deepEqual(finalResult.entities, []);
  });
};
