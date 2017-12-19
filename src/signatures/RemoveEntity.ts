export interface Opts<Id> {
  readonly id: Id;
}

export type Result = void;

export type Signature<Id> = (opts: Opts<Id>) => Promise<Result>;

export default Signature;
