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

export type EntityFilter<Entity> = {
  readonly [P in keyof Entity]?: Entity[P] | PropFilter<Entity[P]>;
};

export interface ConditionFilter<Entity> {
  readonly $and?: Filter<Entity>[];
  readonly $or?: Filter<Entity>[];
  readonly $nor?: Filter<Entity>[];
}

export type Filter<Entity> = (
  EntityFilter<Entity> &
  ConditionFilter<Entity>
);

export default Filter;
