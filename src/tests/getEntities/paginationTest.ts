import 'mocha'; // tslint:disable-line:no-import-side-effect
import * as assert from 'power-assert';
import Facade from '../../Facade';
import Cursor from '../../types/Cursor';
import Pagination from '../../types/Pagination';
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

  const paginate = (cursor: Cursor, forward: boolean) => {
    const pagination: Pagination = { cursor, forward, limit: 1 };
    return facade.getEntities({ pagination });
  };

  it('should return all entities when pagination is not defined', async () => {
    await createTestEntities();
    const result = await facade.getEntities({});
    assert.deepEqual(result.entities, [firstEntity, secondEntity]);
  });

  it('should return first entity when there are two entities limitted to 1', async () => {
    await createTestEntities();
    const pagination: Pagination = { cursor: undefined, forward: true, limit: 1 };
    const result = await facade.getEntities({ pagination });
    assert.deepEqual(result.entities, [firstEntity]);
  });

  it('should return first entity when paginating forward without cursor', async () => {
    await createTestEntities();
    const finalResult = await paginate(undefined, true);
    assert.deepEqual(finalResult.entities, [firstEntity]);
  });

  it('should return second entity when paginating forward with first cursor', async () => {
    await createTestEntities();
    const firstResult = await paginate(undefined, true);
    const finalResult = await paginate(firstResult.nextCursor, true);
    assert.deepEqual(finalResult.entities, [secondEntity]);
  });

  it('should return no entities when paginating forward with second cursor', async () => {
    await createTestEntities();
    const firstResult = await paginate(undefined, true);
    const secondResult = await paginate(firstResult.nextCursor, true);
    const finalResult = await paginate(secondResult.nextCursor, true);
    assert.deepEqual(finalResult.entities, []);
  });

  it('should return second entity when paginating backward without cursor', async () => {
    await createTestEntities();
    const finalResult = await paginate(undefined, false);
    assert.deepEqual(finalResult.entities, [secondEntity]);
  });

  it('should return first entity when paginating backward with first cursor', async () => {
    await createTestEntities();
    const firstResult = await paginate(undefined, false);
    const finalResult = await paginate(firstResult.previousCursor, false);
    assert.deepEqual(finalResult.entities, [firstEntity]);
  });

  it('should return no entities when paginating backward with second cursor', async () => {
    await createTestEntities();
    const firstResult = await paginate(undefined, false);
    const secondResult = await paginate(firstResult.previousCursor, false);
    const finalResult = await paginate(secondResult.previousCursor, false);
    assert.deepEqual(finalResult.entities, []);
  });
};
