export type GreaterFilter<Prop> = { readonly $gt: Prop } | { readonly $gte: Prop };
export type LesserFilter<Prop> = { readonly $lt: Prop } | { readonly $lte: Prop };
export type InFilter<Prop> = { readonly $in: Prop[] } | { readonly $nin: Prop[] };
export type EqualityFilter<Prop> = { readonly $eq: Prop } | { readonly $ne: Prop };
export interface NotFilter<Prop> { readonly $not: PropFilter<Prop>; }

export type PropFilter<Prop> = (
  GreaterFilter<Prop> |
  LesserFilter<Prop> |
  InFilter<Prop> |
  EqualityFilter<Prop> |
  NotFilter<Prop>
);

export type EntityFilter<Entity> = {
  readonly [P in keyof Entity]?: Entity[P] | PropFilter<Entity[P]>;
};

export interface AndFilter<Entity> {
  readonly $and: Filter<Entity>[];
}

export interface OrFilter<Entity> {
  readonly $or: Filter<Entity>[];
}

export type Filter<Entity> = (
  EntityFilter<Entity> |
  AndFilter<Entity> |
  OrFilter<Entity>
);

export default Filter;
