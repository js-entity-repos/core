import * as assertRejects from 'assert-rejects';
import 'mocha'; // tslint:disable-line:no-import-side-effect
import * as assert from 'power-assert';
import MissingEntityError from '../../errors/MissingEntityError';
import Facade from '../../Facade';
import { TestEntity, testEntity, testId } from '../utils/testEntity';

export default (facade: Facade<TestEntity>) => {
  it('should error when identifier does not exist', async () => {
    const promise = facade.replaceEntity({ id: testId, entity: testEntity });
    await assertRejects(promise, MissingEntityError);
  });

  it('should replace when identifier does exist', async () => {
    const replacement: TestEntity = {
      booleanProp: false,
      id: testId,
      numberProp: 2,
      stringProp: 'test_string_prop_replace',
    };
    await facade.createEntity({ id: testId, entity: testEntity });
    const { entity: replacedEntity } = await facade.replaceEntity({
      entity: replacement,
      id: testId,
    });
    const { entity: retrievedEntity } = await facade.getEntity({ id: testId });
    assert.deepEqual(replacedEntity, replacement);
    assert.deepEqual(retrievedEntity, replacement);
  });
};
