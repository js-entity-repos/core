import Entity from './Entity';

type Sort<E extends Entity> = {
  readonly [P in keyof E]?: boolean;
};

export default Sort;
