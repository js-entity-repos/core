export interface Opts<Id, Entity> {
  readonly id: Id;
  readonly entity: Entity;
}

export interface Result<Entity> {
  readonly entity: Entity;
}

export type Signature<Id, Entity> = (opts: Opts<Id, Entity>) => Promise<Result<Entity>>;

export default Signature;