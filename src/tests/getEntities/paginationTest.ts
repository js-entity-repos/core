// tslint:disable:max-file-line-count
import 'mocha'; // tslint:disable-line:no-import-side-effect
import * as assert from 'power-assert';
import Facade from '../../Facade';
import Cursor, { start } from '../../types/Cursor';
import Pagination from '../../types/Pagination';
import PaginationDirection, { backward, forward } from '../../types/PaginationDirection';
import Sort from '../../types/Sort';
import { asc } from '../../types/SortOrder';
import createCursorFromEntity from '../../utils/createCursorFromEntity';
import { TestEntity, testEntity } from '../utils/testEntity';

export default (facade: Facade<TestEntity>) => {
  const sort: Sort<TestEntity> = { id: asc };
  const firstId = 'test_id_1';
  const secondId = 'test_id_2';
  const firstEntity = { ...testEntity, id: firstId };
  const secondEntity = { ...testEntity, id: secondId };
  const firstCursor = createCursorFromEntity(firstEntity, sort);
  const secondCursor = createCursorFromEntity(secondEntity, sort);

  const createTestEntities = async () => {
    await facade.createEntity({ id: firstId, entity: firstEntity });
    await facade.createEntity({ id: secondId, entity: secondEntity });
  };

  const paginate = async (cursor: Cursor, direction: PaginationDirection) => {
    const pagination: Pagination = { cursor, direction, limit: 1 };
    await createTestEntities();
    return facade.getEntities({ pagination, sort });
  };

  it('should return all entities when pagination is not defined', async () => {
    await createTestEntities();
    const result = await facade.getEntities({});
    assert.deepEqual(result, {
      backwardCursor: firstCursor,
      entities: [firstEntity, secondEntity],
      forwardCursor: secondCursor,
      hasMoreBackward: false,
      hasMoreForward: false,
    });
  });

  it('should return first entity when paginating forward with start cursor', async () => {
    const result = await paginate(start, forward);
    assert.deepEqual(result, {
      backwardCursor: firstCursor,
      entities: [firstEntity],
      forwardCursor: firstCursor,
      hasMoreBackward: false,
      hasMoreForward: true,
    });
  });

  it('should return second entity when paginating forward with first cursor', async () => {
    const result = await paginate(firstCursor, forward);
    assert.deepEqual(result, {
      backwardCursor: secondCursor,
      entities: [secondEntity],
      forwardCursor: secondCursor,
      hasMoreBackward: true,
      hasMoreForward: false,
    });
  });

  it('should return no entities when paginating forward with second cursor', async () => {
    const result = await paginate(secondCursor, forward);
    assert.deepEqual(result, {
      backwardCursor: secondCursor,
      entities: [],
      forwardCursor: secondCursor,
      hasMoreBackward: true,
      hasMoreForward: false,
    });
  });

  it('should return second entity when paginating backward with start cursor', async () => {
    const result = await paginate(start, backward);
    assert.deepEqual(result, {
      backwardCursor: secondCursor,
      entities: [secondEntity],
      forwardCursor: secondCursor,
      hasMoreBackward: true,
      hasMoreForward: false,
    });
  });

  it('should return first entity when paginating backward with second cursor', async () => {
    const result = await paginate(secondCursor, backward);
    assert.deepEqual(result, {
      backwardCursor: firstCursor,
      entities: [firstEntity],
      forwardCursor: firstCursor,
      hasMoreBackward: false,
      hasMoreForward: true,
    });
  });

  it('should return no entities when paginating backward with first cursor', async () => {
    const result = await paginate(firstCursor, backward);
    assert.deepEqual(result, {
      backwardCursor: firstCursor,
      entities: [],
      forwardCursor: firstCursor,
      hasMoreBackward: false,
      hasMoreForward: true,
    });
  });
};
