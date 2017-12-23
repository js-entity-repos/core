import 'mocha'; // tslint:disable-line:no-import-side-effect
import Facade from '../Facade';
import countEntitiesTest from './countEntities/test';
import createEntityTest from './createEntity/test';
import getEntitiesTest from './getEntities/test';
import getEntityTest from './getEntity/test';
import overwriteEntityTest from './overwriteEntity/test';
import patchEntityTest from './patchEntity/test';
import removeEntitiesTest from './removeEntities/test';
import removeEntityTest from './removeEntity/test';
import upsertEntityTest from './upsertEntity/test';
import { TestEntity, TestId } from './utils/testEntity';

export default (facade: Facade<TestId, TestEntity>) => {
  describe('facade', () => {
    beforeEach(async () => {
      await facade.removeEntities({ filter: {} });
    });

    createEntityTest(facade);
    getEntityTest(facade);
    removeEntityTest(facade);
    overwriteEntityTest(facade);
    patchEntityTest(facade);
    countEntitiesTest(facade);
    getEntitiesTest(facade);
    removeEntitiesTest(facade);
    upsertEntityTest(facade);
  });
};
