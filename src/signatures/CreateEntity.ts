export interface Opts<Id, Entity extends Id> {
  readonly id: Id;
  readonly entity: Entity;
}

export interface Result<Entity> {
  readonly entity: Entity;
}

export type Signature<Id, Entity extends Id> =
  (opts: Opts<Id, Entity>) => Promise<Result<Entity>>;

export default Signature;
