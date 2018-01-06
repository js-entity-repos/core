import Entity from '../types/Entity';

export interface Opts {
  readonly id: string;
}

export interface Result<E extends Entity> {
  readonly entity: E;
}

export type Signature<E extends Entity> = (opts: Opts) => Promise<Result<E>>;

export default Signature;
