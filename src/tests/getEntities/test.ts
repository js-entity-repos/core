import 'mocha'; // tslint:disable-line:no-import-side-effect
import Facade from '../../Facade';
import { TestEntity } from '../utils/testEntity';
import filterTest from './filterTest';
import paginationTest from './paginationTest';
import sortTest from './sortTest';

export default (facade: Facade<TestEntity>) => {
  describe('getEntities', () => {
    filterTest(facade);
    paginationTest(facade);
    sortTest(facade);
  });
};
