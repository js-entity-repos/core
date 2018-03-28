import 'mocha'; // tslint:disable-line:no-import-side-effect
import * as assert from 'power-assert';
import Facade from '../../Facade';
import Cursor, { end, start } from '../../types/Cursor';
import Pagination from '../../types/Pagination';
import PaginationDirection, { backward, forward } from '../../types/PaginationDirection';
import Sort from '../../types/Sort';
import { asc } from '../../types/SortOrder';
import createCursorFromEntity from '../../utils/createCursorFromEntity';
import { TestEntity, testEntity } from '../utils/testEntity';

export default (facade: Facade<TestEntity>) => {
  const firstId = 'test_id_1';
  const secondId = 'test_id_2';
  const firstEntity = { ...testEntity, id: firstId };
  const secondEntity = { ...testEntity, id: secondId };
  const sort: Sort<TestEntity> = { id: asc };

  const createTestEntities = async () => {
    await facade.createEntity({ id: firstId, entity: firstEntity });
    await facade.createEntity({ id: secondId, entity: secondEntity });
  };

  const paginate = (cursor: Cursor, direction: PaginationDirection) => {
    const pagination: Pagination = { cursor, direction, limit: 1 };
    return facade.getEntities({ pagination, sort });
  };

  it('should return all entities when pagination is not defined', async () => {
    await createTestEntities();
    const result = await facade.getEntities({});
    assert.deepEqual(result.entities, [firstEntity, secondEntity]);
    assert.equal(result.previousCursor, createCursorFromEntity(firstEntity, sort));
    assert.equal(result.nextCursor, end);
  });

  it('should return first entity when paginating forward with start cursor', async () => {
    await createTestEntities();
    const finalResult = await paginate(start, forward);
    assert.deepEqual(finalResult.entities, [firstEntity]);
    assert.equal(finalResult.previousCursor, end);
    assert.equal(finalResult.nextCursor, createCursorFromEntity(firstEntity, sort));
  });

  it('should return second entity when paginating forward with first cursor', async () => {
    await createTestEntities();
    const firstResult = await paginate(start, forward);
    const finalResult = await paginate(firstResult.nextCursor, forward);
    assert.deepEqual(finalResult.entities, [secondEntity]);
    assert.equal(finalResult.previousCursor, createCursorFromEntity(secondEntity, sort));
    assert.equal(finalResult.nextCursor, end);
  });

  it('should return no entities when paginating forward with end cursor', async () => {
    await createTestEntities();
    const finalResult = await paginate(end, forward);
    assert.deepEqual(finalResult.entities, []);
    assert.equal(finalResult.previousCursor, start);
    assert.equal(finalResult.nextCursor, end);
  });

  it('should return second entity when paginating backward with start cursor', async () => {
    await createTestEntities();
    const finalResult = await paginate(start, backward);
    assert.deepEqual(finalResult.entities, [secondEntity]);
    assert.equal(finalResult.previousCursor, createCursorFromEntity(secondEntity, sort));
    assert.equal(finalResult.nextCursor, end);
  });

  it('should return first entity when paginating backward with first cursor', async () => {
    await createTestEntities();
    const firstResult = await paginate(start, backward);
    const finalResult = await paginate(firstResult.previousCursor, backward);
    assert.deepEqual(finalResult.entities, [firstEntity]);
    assert.equal(finalResult.previousCursor, end);
    assert.equal(finalResult.nextCursor, createCursorFromEntity(firstEntity, sort));
  });

  it('should return no entities when paginating backward with end cursor', async () => {
    await createTestEntities();
    const finalResult = await paginate(end, backward);
    assert.deepEqual(finalResult.entities, []);
    assert.equal(finalResult.previousCursor, end);
    assert.equal(finalResult.nextCursor, start);
  });
};
