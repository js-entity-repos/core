type Sort<Entity> = {
  readonly [P in keyof Entity]: boolean | undefined;
};

export default Sort;
