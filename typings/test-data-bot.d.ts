/// <reference types="faker" />

declare module "test-data-bot" {
  export type BuilderFunction<T> = (overrideFields?: Partial<T>) => T;
  export interface Generator<T> {
    generate: () => T;
  }

  export type BuilderPrimitiveValue<T> = T | Generator<T> | Builder<T>;
  export type BuilderValue<T> = DeepBuilderValue<BuilderPrimitiveValue<T>>;

  export type DeepBuilderValue<T> = T extends any[]
    ? Array<DeepBuilderValueArray<T[number]>>
    : T extends object
    ? { readonly [P in keyof T]: T[P] }
    : T;

  export interface Builder<T extends object> extends BuilderFunction<T> {
    fields(fieldsParams: { [K in keyof T]: BuilderValue<T[K]> }): Builder<T>;
    map(fn: (fieldsParams: Pick<T, K>) => Pick<T, K>): Builder<T>;
  }

  export function build<T extends object>(name?: string): Builder<T>;
  export function bool(): Generator<boolean>;
  export function incrementingId<T extends number>(): Generator<T>;
  export function sequence<T>(sequenceFn: (id: number) => T): Generator<T>;
  export function perBuild<T>(buildFn: (...args: any[]) => T): Generator<T>;
  export function oneOf<T>(...oneOfOptions: T[]): Generator<T>;
  export function numberBetween(min: number, max: number): Generator<number>;
  export function arrayOf<T>(
    builder: BuilderValue<T>,
    count: number
  ): Generator<T[]>;
  export function fake<T>(fakeFn: (f: Faker.FakerStatic) => T): Generator<T>;
}
