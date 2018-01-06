import 'mocha'; // tslint:disable-line:no-import-side-effect
import Facade from '../Facade';
import countEntitiesTest from './countEntities/test';
import createEntityTest from './createEntity/test';
import getEntitiesTest from './getEntities/test';
import getEntityTest from './getEntity/test';
import patchEntityTest from './patchEntity/test';
import removeEntitiesTest from './removeEntities/test';
import removeEntityTest from './removeEntity/test';
import replaceEntityTest from './replaceEntity/test';
import { TestEntity } from './utils/testEntity';

export default (facade: Facade<TestEntity>) => {
  describe('facade', () => {
    beforeEach(async () => {
      await facade.removeEntities({ filter: {} });
    });

    createEntityTest(facade);
    getEntityTest(facade);
    removeEntityTest(facade);
    replaceEntityTest(facade);
    patchEntityTest(facade);
    countEntitiesTest(facade);
    getEntitiesTest(facade);
    removeEntitiesTest(facade);
  });
};
