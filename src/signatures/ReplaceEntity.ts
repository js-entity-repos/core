import Entity from '../types/Entity';
import Filter from '../types/Filter';

export interface Opts<E extends Entity> {
  readonly id: string;
  readonly entity: E;
  readonly filter?: Filter<E>;
}

export interface Result<E extends Entity> {
  readonly entity: E;
}

export type Signature<E extends Entity> = (opts: Opts<E>) => Promise<Result<E>>;

export default Signature;
