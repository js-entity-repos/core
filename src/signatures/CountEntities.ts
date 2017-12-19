import Filter from '../types/Filter';

export interface Opts<Entity> {
  readonly filter: Filter<Entity>;
}

export interface Result {
  readonly count: number;
}

export type Signature<Entity> = (opts: Opts<Entity>) => Promise<Result>;

export default Signature;
