import Entity from '../../types/Entity';

export interface TestEntity extends Entity {
  readonly stringProp: string;
  readonly numberProp: number;
  readonly booleanProp: boolean;
}

export const testId = 'test_id';

export const testEntity: TestEntity = {
  booleanProp: true,
  id: testId,
  numberProp: 1,
  stringProp: 'test_string_prop',
};

export default testEntity;
