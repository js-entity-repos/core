type Sort<Entity> = {
  readonly [P in keyof Entity]?: boolean;
};

export default Sort;
