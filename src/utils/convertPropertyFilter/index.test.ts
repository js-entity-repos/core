import 'mocha'; // tslint:disable-line:no-import-side-effect
import * as assert from 'power-assert';
import { TestEntity } from '../../tests/utils/testEntity';
import { Filter } from '../../types/Filter';
import convertPropertyFilter from './index';

describe('convertPropertyFilter', () => {
  const originalValue = 10;
  const expectedValue = '10';
  const converter = (value: any) => value.toString();
  const propertyName = 'numberProp';

  it('should convert the property value when used inside a prop filter', () => {
    const filter: Filter<TestEntity> = { numberProp: { $gt: originalValue } };
    const newFilter = convertPropertyFilter({ converter, filter, propertyName });
    const expectedFilter = { numberProp: { $gt: expectedValue } };
    assert.deepEqual(newFilter, expectedFilter);
  });

  it('should convert the property value when used inside an entity filter', () => {
    const filter: Filter<TestEntity> = { numberProp: originalValue, stringProp: 'test_string' };
    const newFilter = convertPropertyFilter({ converter, filter, propertyName });
    const expectedFilter = { numberProp: expectedValue, stringProp: 'test_string' };
    assert.deepEqual(newFilter, expectedFilter);
  });

  it('should convert the property value when used inside a condition filter', () => {
    const filter: Filter<TestEntity> = { $and: [{ numberProp: originalValue }] };
    const newFilter = convertPropertyFilter({ converter, filter, propertyName });
    const expectedFilter = { $and: [{ numberProp: expectedValue }] };
    assert.deepEqual(newFilter, expectedFilter);
  });
});
