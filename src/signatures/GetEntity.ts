export interface Opts<Id> {
  readonly id: Id;
}

export interface Result<Entity> {
  readonly entity: Entity;
}

export type Signature<Id, Entity extends Id> = (opts: Opts<Id>) => Promise<Result<Entity>>;

export default Signature;
