import * as assertRejects from 'assert-rejects';
import 'mocha'; // tslint:disable-line:no-import-side-effect
import MissingEntityError from '../../errors/MissingEntityError';
import Facade from '../../Facade';
import { TestEntity, testEntity, testId, TestId } from '../utils/testEntity';

export default (facade: Facade<TestId, TestEntity>) => {
  describe('removeEntity', () => {
    it('should error when identifier does not exist', async () => {
      const promise = facade.removeEntity({ id: testId });
      await assertRejects(promise, MissingEntityError);
    });

    it('should not error when identifier does exist', async () => {
      await facade.createEntity({ entity: testEntity });
      await facade.removeEntity({ id: testId });
      const promise = facade.getEntity({ id: testId });
      await assertRejects(promise, MissingEntityError);
    });
  });
};
