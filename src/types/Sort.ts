import Entity from './Entity';
import SortOrder from './SortOrder';

type Sort<E extends Entity> = {
  readonly [P in keyof E]?: SortOrder;
};

export default Sort;
