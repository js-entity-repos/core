export interface TestId {
  readonly id: string;
}

export interface TestEntity extends TestId {
  readonly stringProp: string;
  readonly numberProp: number;
  readonly booleanProp: boolean;
}

export const testId: TestId = {
  id: 'test_id',
};

export const testEntity: TestEntity = {
  ...testId,
  booleanProp: true,
  numberProp: 1,
  stringProp: 'test_string_prop',
};

export default testEntity;
