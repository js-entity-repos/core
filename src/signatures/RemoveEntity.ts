export interface Opts {
  readonly id: string;
}

export type Result = void;

export type Signature = (opts: Opts) => Promise<Result>;

export default Signature;
