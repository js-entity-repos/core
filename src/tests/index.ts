import Facade from '../Facade';
import createEntityTest from './createEntity/test';
import getEntityTest from './getEntity/test';
import overwriteEntityTest from './overwriteEntity/test';
import removeEntityTest from './removeEntity/test';
import { TestEntity, TestId } from './testEntity';

export default (facade: Facade<TestId, TestEntity>) => {
  createEntityTest(facade);
  getEntityTest(facade);
  removeEntityTest(facade);
  overwriteEntityTest(facade);
};
