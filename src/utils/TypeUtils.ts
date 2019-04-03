export type Diff<T, U> = T extends U ? never : T;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type Wrap<Org, Over> = Omit<Org, Extract<keyof Org, keyof Over>> & Over;
export type Mapper<Inner, Outer> = (input: Inner) => Outer;
export type RequireOne<T, K extends keyof T = keyof T> = K extends keyof T
  ? PartialRequire<T, K>
  : never;
export type PartialRequire<O, K extends keyof O> = { [P in K]-?: O[P] } & O;
