import Facade from '../Facade';
import countEntitiesTest from './countEntities/test';
import createEntityTest from './createEntity/test';
import getEntitiesTest from './getEntities/test';
import getEntityTest from './getEntity/test';
import overwriteEntityTest from './overwriteEntity/test';
import patchEntityTest from './patchEntity/test';
import removeEntitiesTest from './removeEntities/test';
import removeEntityTest from './removeEntity/test';
import { TestEntity, TestId } from './utils/testEntity';

export default (facade: Facade<TestId, TestEntity>) => {
  createEntityTest(facade);
  getEntityTest(facade);
  removeEntityTest(facade);
  overwriteEntityTest(facade);
  patchEntityTest(facade);
  countEntitiesTest(facade);
  getEntitiesTest(facade);
  removeEntitiesTest(facade);
};
