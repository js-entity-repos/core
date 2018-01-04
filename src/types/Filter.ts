import Entity from './Entity';

export interface PropFilter<Prop> {
  readonly $gt?: Prop;
  readonly $gte?: Prop;
  readonly $lt?: Prop;
  readonly $lte?: Prop;
  readonly $in?: Prop[];
  readonly $nin?: Prop[];
  readonly $eq?: Prop;
  readonly $ne?: Prop;
  readonly $not?: PropFilter<Prop>;
}

export type EntityFilter<E extends Entity> = {
  readonly [P in keyof E]?: E[P] | PropFilter<E[P]>;
};

export interface ConditionFilter<E extends Entity> {
  readonly $and?: Filter<E>[];
  readonly $or?: Filter<E>[];
  readonly $nor?: Filter<E>[];
}

export type Filter<E extends Entity> = (
  EntityFilter<E> &
  ConditionFilter<E>
);

export default Filter;
