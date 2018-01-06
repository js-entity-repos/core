import 'mocha'; // tslint:disable-line:no-import-side-effect
import Facade from '../../Facade';
import { TestEntity } from '../utils/testEntity';
import filterTest from './filterTest';
import idTest from './idTest';

export default (facade: Facade<TestEntity>) => {
  describe('removeEntity', () => {
    idTest(facade);
    filterTest(facade);
  });
};
