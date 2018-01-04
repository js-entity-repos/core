import Entity from '../types/Entity';

export interface Opts<E extends Entity> {
  readonly id: string;
  readonly patch: Partial<E>;
}

export interface Result<E extends Entity> {
  readonly entity: E;
}

export type Signature<E extends Entity> = (opts: Opts<E>) => Promise<Result<E>>;

export default Signature;
