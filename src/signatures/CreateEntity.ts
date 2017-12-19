export interface Opts<Entity> {
  readonly entity: Entity;
}

export interface Result<Entity> {
  readonly entity: Entity;
}

export type Signature<Entity> = (opts: Opts<Entity>) => Promise<Result<Entity>>;

export default Signature;
