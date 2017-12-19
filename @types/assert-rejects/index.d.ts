declare module 'assert-rejects' {
  const x: <Result>(promise: Promise<Result>, constructor: Function) => Promise<void>;
  export = x;
}
