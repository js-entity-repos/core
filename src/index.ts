import * as errors from './errors';
import FacadeInterface from './Facade';
import * as signatures from './signatures';
import * as tests from './tests';
import * as types from './types';
import * as utils from './utils';

export type Facade<Id, Entity> = FacadeInterface<Id, Entity>;

export default {
  errors,
  signatures,
  tests,
  types,
  utils,
};
