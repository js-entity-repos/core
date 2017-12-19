import * as assertRejects from 'assert-rejects';
import 'mocha'; // tslint:disable-line:no-import-side-effect
import ConflictingEntityError from '../../errors/ConflictingEntityError';
import Facade from '../../Facade';
import { TestEntity, testEntity, TestId } from '../utils/testEntity';

export default (facade: Facade<TestId, TestEntity>) => {
  describe('createEntity', () => {
    it('should not error when identifier does not exist', async () => {
      await facade.createEntity({ entity: testEntity });
    });

    it('should error when identifier does exist', async () => {
      await facade.createEntity({ entity: testEntity });
      const promise = facade.createEntity({ entity: testEntity });
      await assertRejects(promise, ConflictingEntityError);
    });
  });
};
