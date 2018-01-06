import Entity from '../types/Entity';
import Filter from '../types/Filter';

export interface Opts<E extends Entity> {
  readonly filter?: Filter<E>;
}

export interface Result {
  readonly count: number;
}

export type Signature<E extends Entity> = (opts: Opts<E>) => Promise<Result>;

export default Signature;
