
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model VotingSession
 * 
 */
export type VotingSession = $Result.DefaultSelection<Prisma.$VotingSessionPayload>
/**
 * Model Idea
 * 
 */
export type Idea = $Result.DefaultSelection<Prisma.$IdeaPayload>
/**
 * Model Vote
 * 
 */
export type Vote = $Result.DefaultSelection<Prisma.$VotePayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more VotingSessions
 * const votingSessions = await prisma.votingSession.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more VotingSessions
   * const votingSessions = await prisma.votingSession.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.votingSession`: Exposes CRUD operations for the **VotingSession** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VotingSessions
    * const votingSessions = await prisma.votingSession.findMany()
    * ```
    */
  get votingSession(): Prisma.VotingSessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.idea`: Exposes CRUD operations for the **Idea** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Ideas
    * const ideas = await prisma.idea.findMany()
    * ```
    */
  get idea(): Prisma.IdeaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.vote`: Exposes CRUD operations for the **Vote** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Votes
    * const votes = await prisma.vote.findMany()
    * ```
    */
  get vote(): Prisma.VoteDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.10.0
   * Query Engine version: aee10d5a411e4360c6d3445ce4810ca65adbf3e8
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    VotingSession: 'VotingSession',
    Idea: 'Idea',
    Vote: 'Vote'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "votingSession" | "idea" | "vote"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      VotingSession: {
        payload: Prisma.$VotingSessionPayload<ExtArgs>
        fields: Prisma.VotingSessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VotingSessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotingSessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VotingSessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotingSessionPayload>
          }
          findFirst: {
            args: Prisma.VotingSessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotingSessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VotingSessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotingSessionPayload>
          }
          findMany: {
            args: Prisma.VotingSessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotingSessionPayload>[]
          }
          create: {
            args: Prisma.VotingSessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotingSessionPayload>
          }
          createMany: {
            args: Prisma.VotingSessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VotingSessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotingSessionPayload>[]
          }
          delete: {
            args: Prisma.VotingSessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotingSessionPayload>
          }
          update: {
            args: Prisma.VotingSessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotingSessionPayload>
          }
          deleteMany: {
            args: Prisma.VotingSessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VotingSessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VotingSessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotingSessionPayload>[]
          }
          upsert: {
            args: Prisma.VotingSessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotingSessionPayload>
          }
          aggregate: {
            args: Prisma.VotingSessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVotingSession>
          }
          groupBy: {
            args: Prisma.VotingSessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<VotingSessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.VotingSessionCountArgs<ExtArgs>
            result: $Utils.Optional<VotingSessionCountAggregateOutputType> | number
          }
        }
      }
      Idea: {
        payload: Prisma.$IdeaPayload<ExtArgs>
        fields: Prisma.IdeaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.IdeaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IdeaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.IdeaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IdeaPayload>
          }
          findFirst: {
            args: Prisma.IdeaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IdeaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.IdeaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IdeaPayload>
          }
          findMany: {
            args: Prisma.IdeaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IdeaPayload>[]
          }
          create: {
            args: Prisma.IdeaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IdeaPayload>
          }
          createMany: {
            args: Prisma.IdeaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.IdeaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IdeaPayload>[]
          }
          delete: {
            args: Prisma.IdeaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IdeaPayload>
          }
          update: {
            args: Prisma.IdeaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IdeaPayload>
          }
          deleteMany: {
            args: Prisma.IdeaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.IdeaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.IdeaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IdeaPayload>[]
          }
          upsert: {
            args: Prisma.IdeaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IdeaPayload>
          }
          aggregate: {
            args: Prisma.IdeaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateIdea>
          }
          groupBy: {
            args: Prisma.IdeaGroupByArgs<ExtArgs>
            result: $Utils.Optional<IdeaGroupByOutputType>[]
          }
          count: {
            args: Prisma.IdeaCountArgs<ExtArgs>
            result: $Utils.Optional<IdeaCountAggregateOutputType> | number
          }
        }
      }
      Vote: {
        payload: Prisma.$VotePayload<ExtArgs>
        fields: Prisma.VoteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VoteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VoteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotePayload>
          }
          findFirst: {
            args: Prisma.VoteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VoteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotePayload>
          }
          findMany: {
            args: Prisma.VoteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotePayload>[]
          }
          create: {
            args: Prisma.VoteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotePayload>
          }
          createMany: {
            args: Prisma.VoteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VoteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotePayload>[]
          }
          delete: {
            args: Prisma.VoteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotePayload>
          }
          update: {
            args: Prisma.VoteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotePayload>
          }
          deleteMany: {
            args: Prisma.VoteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VoteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VoteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotePayload>[]
          }
          upsert: {
            args: Prisma.VoteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotePayload>
          }
          aggregate: {
            args: Prisma.VoteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVote>
          }
          groupBy: {
            args: Prisma.VoteGroupByArgs<ExtArgs>
            result: $Utils.Optional<VoteGroupByOutputType>[]
          }
          count: {
            args: Prisma.VoteCountArgs<ExtArgs>
            result: $Utils.Optional<VoteCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    votingSession?: VotingSessionOmit
    idea?: IdeaOmit
    vote?: VoteOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type VotingSessionCountOutputType
   */

  export type VotingSessionCountOutputType = {
    ideas: number
    votes: number
  }

  export type VotingSessionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ideas?: boolean | VotingSessionCountOutputTypeCountIdeasArgs
    votes?: boolean | VotingSessionCountOutputTypeCountVotesArgs
  }

  // Custom InputTypes
  /**
   * VotingSessionCountOutputType without action
   */
  export type VotingSessionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VotingSessionCountOutputType
     */
    select?: VotingSessionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * VotingSessionCountOutputType without action
   */
  export type VotingSessionCountOutputTypeCountIdeasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: IdeaWhereInput
  }

  /**
   * VotingSessionCountOutputType without action
   */
  export type VotingSessionCountOutputTypeCountVotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VoteWhereInput
  }


  /**
   * Models
   */

  /**
   * Model VotingSession
   */

  export type AggregateVotingSession = {
    _count: VotingSessionCountAggregateOutputType | null
    _avg: VotingSessionAvgAggregateOutputType | null
    _sum: VotingSessionSumAggregateOutputType | null
    _min: VotingSessionMinAggregateOutputType | null
    _max: VotingSessionMaxAggregateOutputType | null
  }

  export type VotingSessionAvgAggregateOutputType = {
    maxPriorities: number | null
  }

  export type VotingSessionSumAggregateOutputType = {
    maxPriorities: number | null
  }

  export type VotingSessionMinAggregateOutputType = {
    id: string | null
    title: string | null
    maxPriorities: number | null
  }

  export type VotingSessionMaxAggregateOutputType = {
    id: string | null
    title: string | null
    maxPriorities: number | null
  }

  export type VotingSessionCountAggregateOutputType = {
    id: number
    title: number
    maxPriorities: number
    _all: number
  }


  export type VotingSessionAvgAggregateInputType = {
    maxPriorities?: true
  }

  export type VotingSessionSumAggregateInputType = {
    maxPriorities?: true
  }

  export type VotingSessionMinAggregateInputType = {
    id?: true
    title?: true
    maxPriorities?: true
  }

  export type VotingSessionMaxAggregateInputType = {
    id?: true
    title?: true
    maxPriorities?: true
  }

  export type VotingSessionCountAggregateInputType = {
    id?: true
    title?: true
    maxPriorities?: true
    _all?: true
  }

  export type VotingSessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VotingSession to aggregate.
     */
    where?: VotingSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VotingSessions to fetch.
     */
    orderBy?: VotingSessionOrderByWithRelationInput | VotingSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VotingSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VotingSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VotingSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VotingSessions
    **/
    _count?: true | VotingSessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VotingSessionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VotingSessionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VotingSessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VotingSessionMaxAggregateInputType
  }

  export type GetVotingSessionAggregateType<T extends VotingSessionAggregateArgs> = {
        [P in keyof T & keyof AggregateVotingSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVotingSession[P]>
      : GetScalarType<T[P], AggregateVotingSession[P]>
  }




  export type VotingSessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VotingSessionWhereInput
    orderBy?: VotingSessionOrderByWithAggregationInput | VotingSessionOrderByWithAggregationInput[]
    by: VotingSessionScalarFieldEnum[] | VotingSessionScalarFieldEnum
    having?: VotingSessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VotingSessionCountAggregateInputType | true
    _avg?: VotingSessionAvgAggregateInputType
    _sum?: VotingSessionSumAggregateInputType
    _min?: VotingSessionMinAggregateInputType
    _max?: VotingSessionMaxAggregateInputType
  }

  export type VotingSessionGroupByOutputType = {
    id: string
    title: string
    maxPriorities: number
    _count: VotingSessionCountAggregateOutputType | null
    _avg: VotingSessionAvgAggregateOutputType | null
    _sum: VotingSessionSumAggregateOutputType | null
    _min: VotingSessionMinAggregateOutputType | null
    _max: VotingSessionMaxAggregateOutputType | null
  }

  type GetVotingSessionGroupByPayload<T extends VotingSessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VotingSessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VotingSessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VotingSessionGroupByOutputType[P]>
            : GetScalarType<T[P], VotingSessionGroupByOutputType[P]>
        }
      >
    >


  export type VotingSessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    maxPriorities?: boolean
    ideas?: boolean | VotingSession$ideasArgs<ExtArgs>
    votes?: boolean | VotingSession$votesArgs<ExtArgs>
    _count?: boolean | VotingSessionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["votingSession"]>

  export type VotingSessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    maxPriorities?: boolean
  }, ExtArgs["result"]["votingSession"]>

  export type VotingSessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    maxPriorities?: boolean
  }, ExtArgs["result"]["votingSession"]>

  export type VotingSessionSelectScalar = {
    id?: boolean
    title?: boolean
    maxPriorities?: boolean
  }

  export type VotingSessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "maxPriorities", ExtArgs["result"]["votingSession"]>
  export type VotingSessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ideas?: boolean | VotingSession$ideasArgs<ExtArgs>
    votes?: boolean | VotingSession$votesArgs<ExtArgs>
    _count?: boolean | VotingSessionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type VotingSessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type VotingSessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $VotingSessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VotingSession"
    objects: {
      ideas: Prisma.$IdeaPayload<ExtArgs>[]
      votes: Prisma.$VotePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      maxPriorities: number
    }, ExtArgs["result"]["votingSession"]>
    composites: {}
  }

  type VotingSessionGetPayload<S extends boolean | null | undefined | VotingSessionDefaultArgs> = $Result.GetResult<Prisma.$VotingSessionPayload, S>

  type VotingSessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VotingSessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VotingSessionCountAggregateInputType | true
    }

  export interface VotingSessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VotingSession'], meta: { name: 'VotingSession' } }
    /**
     * Find zero or one VotingSession that matches the filter.
     * @param {VotingSessionFindUniqueArgs} args - Arguments to find a VotingSession
     * @example
     * // Get one VotingSession
     * const votingSession = await prisma.votingSession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VotingSessionFindUniqueArgs>(args: SelectSubset<T, VotingSessionFindUniqueArgs<ExtArgs>>): Prisma__VotingSessionClient<$Result.GetResult<Prisma.$VotingSessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one VotingSession that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VotingSessionFindUniqueOrThrowArgs} args - Arguments to find a VotingSession
     * @example
     * // Get one VotingSession
     * const votingSession = await prisma.votingSession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VotingSessionFindUniqueOrThrowArgs>(args: SelectSubset<T, VotingSessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VotingSessionClient<$Result.GetResult<Prisma.$VotingSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VotingSession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VotingSessionFindFirstArgs} args - Arguments to find a VotingSession
     * @example
     * // Get one VotingSession
     * const votingSession = await prisma.votingSession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VotingSessionFindFirstArgs>(args?: SelectSubset<T, VotingSessionFindFirstArgs<ExtArgs>>): Prisma__VotingSessionClient<$Result.GetResult<Prisma.$VotingSessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VotingSession that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VotingSessionFindFirstOrThrowArgs} args - Arguments to find a VotingSession
     * @example
     * // Get one VotingSession
     * const votingSession = await prisma.votingSession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VotingSessionFindFirstOrThrowArgs>(args?: SelectSubset<T, VotingSessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__VotingSessionClient<$Result.GetResult<Prisma.$VotingSessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more VotingSessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VotingSessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VotingSessions
     * const votingSessions = await prisma.votingSession.findMany()
     * 
     * // Get first 10 VotingSessions
     * const votingSessions = await prisma.votingSession.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const votingSessionWithIdOnly = await prisma.votingSession.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VotingSessionFindManyArgs>(args?: SelectSubset<T, VotingSessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VotingSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a VotingSession.
     * @param {VotingSessionCreateArgs} args - Arguments to create a VotingSession.
     * @example
     * // Create one VotingSession
     * const VotingSession = await prisma.votingSession.create({
     *   data: {
     *     // ... data to create a VotingSession
     *   }
     * })
     * 
     */
    create<T extends VotingSessionCreateArgs>(args: SelectSubset<T, VotingSessionCreateArgs<ExtArgs>>): Prisma__VotingSessionClient<$Result.GetResult<Prisma.$VotingSessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many VotingSessions.
     * @param {VotingSessionCreateManyArgs} args - Arguments to create many VotingSessions.
     * @example
     * // Create many VotingSessions
     * const votingSession = await prisma.votingSession.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VotingSessionCreateManyArgs>(args?: SelectSubset<T, VotingSessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VotingSessions and returns the data saved in the database.
     * @param {VotingSessionCreateManyAndReturnArgs} args - Arguments to create many VotingSessions.
     * @example
     * // Create many VotingSessions
     * const votingSession = await prisma.votingSession.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VotingSessions and only return the `id`
     * const votingSessionWithIdOnly = await prisma.votingSession.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VotingSessionCreateManyAndReturnArgs>(args?: SelectSubset<T, VotingSessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VotingSessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a VotingSession.
     * @param {VotingSessionDeleteArgs} args - Arguments to delete one VotingSession.
     * @example
     * // Delete one VotingSession
     * const VotingSession = await prisma.votingSession.delete({
     *   where: {
     *     // ... filter to delete one VotingSession
     *   }
     * })
     * 
     */
    delete<T extends VotingSessionDeleteArgs>(args: SelectSubset<T, VotingSessionDeleteArgs<ExtArgs>>): Prisma__VotingSessionClient<$Result.GetResult<Prisma.$VotingSessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one VotingSession.
     * @param {VotingSessionUpdateArgs} args - Arguments to update one VotingSession.
     * @example
     * // Update one VotingSession
     * const votingSession = await prisma.votingSession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VotingSessionUpdateArgs>(args: SelectSubset<T, VotingSessionUpdateArgs<ExtArgs>>): Prisma__VotingSessionClient<$Result.GetResult<Prisma.$VotingSessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more VotingSessions.
     * @param {VotingSessionDeleteManyArgs} args - Arguments to filter VotingSessions to delete.
     * @example
     * // Delete a few VotingSessions
     * const { count } = await prisma.votingSession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VotingSessionDeleteManyArgs>(args?: SelectSubset<T, VotingSessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VotingSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VotingSessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VotingSessions
     * const votingSession = await prisma.votingSession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VotingSessionUpdateManyArgs>(args: SelectSubset<T, VotingSessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VotingSessions and returns the data updated in the database.
     * @param {VotingSessionUpdateManyAndReturnArgs} args - Arguments to update many VotingSessions.
     * @example
     * // Update many VotingSessions
     * const votingSession = await prisma.votingSession.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more VotingSessions and only return the `id`
     * const votingSessionWithIdOnly = await prisma.votingSession.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VotingSessionUpdateManyAndReturnArgs>(args: SelectSubset<T, VotingSessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VotingSessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one VotingSession.
     * @param {VotingSessionUpsertArgs} args - Arguments to update or create a VotingSession.
     * @example
     * // Update or create a VotingSession
     * const votingSession = await prisma.votingSession.upsert({
     *   create: {
     *     // ... data to create a VotingSession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VotingSession we want to update
     *   }
     * })
     */
    upsert<T extends VotingSessionUpsertArgs>(args: SelectSubset<T, VotingSessionUpsertArgs<ExtArgs>>): Prisma__VotingSessionClient<$Result.GetResult<Prisma.$VotingSessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of VotingSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VotingSessionCountArgs} args - Arguments to filter VotingSessions to count.
     * @example
     * // Count the number of VotingSessions
     * const count = await prisma.votingSession.count({
     *   where: {
     *     // ... the filter for the VotingSessions we want to count
     *   }
     * })
    **/
    count<T extends VotingSessionCountArgs>(
      args?: Subset<T, VotingSessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VotingSessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VotingSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VotingSessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VotingSessionAggregateArgs>(args: Subset<T, VotingSessionAggregateArgs>): Prisma.PrismaPromise<GetVotingSessionAggregateType<T>>

    /**
     * Group by VotingSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VotingSessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VotingSessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VotingSessionGroupByArgs['orderBy'] }
        : { orderBy?: VotingSessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VotingSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVotingSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VotingSession model
   */
  readonly fields: VotingSessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VotingSession.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VotingSessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    ideas<T extends VotingSession$ideasArgs<ExtArgs> = {}>(args?: Subset<T, VotingSession$ideasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IdeaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    votes<T extends VotingSession$votesArgs<ExtArgs> = {}>(args?: Subset<T, VotingSession$votesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the VotingSession model
   */
  interface VotingSessionFieldRefs {
    readonly id: FieldRef<"VotingSession", 'String'>
    readonly title: FieldRef<"VotingSession", 'String'>
    readonly maxPriorities: FieldRef<"VotingSession", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * VotingSession findUnique
   */
  export type VotingSessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VotingSession
     */
    select?: VotingSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VotingSession
     */
    omit?: VotingSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VotingSessionInclude<ExtArgs> | null
    /**
     * Filter, which VotingSession to fetch.
     */
    where: VotingSessionWhereUniqueInput
  }

  /**
   * VotingSession findUniqueOrThrow
   */
  export type VotingSessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VotingSession
     */
    select?: VotingSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VotingSession
     */
    omit?: VotingSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VotingSessionInclude<ExtArgs> | null
    /**
     * Filter, which VotingSession to fetch.
     */
    where: VotingSessionWhereUniqueInput
  }

  /**
   * VotingSession findFirst
   */
  export type VotingSessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VotingSession
     */
    select?: VotingSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VotingSession
     */
    omit?: VotingSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VotingSessionInclude<ExtArgs> | null
    /**
     * Filter, which VotingSession to fetch.
     */
    where?: VotingSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VotingSessions to fetch.
     */
    orderBy?: VotingSessionOrderByWithRelationInput | VotingSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VotingSessions.
     */
    cursor?: VotingSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VotingSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VotingSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VotingSessions.
     */
    distinct?: VotingSessionScalarFieldEnum | VotingSessionScalarFieldEnum[]
  }

  /**
   * VotingSession findFirstOrThrow
   */
  export type VotingSessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VotingSession
     */
    select?: VotingSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VotingSession
     */
    omit?: VotingSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VotingSessionInclude<ExtArgs> | null
    /**
     * Filter, which VotingSession to fetch.
     */
    where?: VotingSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VotingSessions to fetch.
     */
    orderBy?: VotingSessionOrderByWithRelationInput | VotingSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VotingSessions.
     */
    cursor?: VotingSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VotingSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VotingSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VotingSessions.
     */
    distinct?: VotingSessionScalarFieldEnum | VotingSessionScalarFieldEnum[]
  }

  /**
   * VotingSession findMany
   */
  export type VotingSessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VotingSession
     */
    select?: VotingSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VotingSession
     */
    omit?: VotingSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VotingSessionInclude<ExtArgs> | null
    /**
     * Filter, which VotingSessions to fetch.
     */
    where?: VotingSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VotingSessions to fetch.
     */
    orderBy?: VotingSessionOrderByWithRelationInput | VotingSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VotingSessions.
     */
    cursor?: VotingSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VotingSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VotingSessions.
     */
    skip?: number
    distinct?: VotingSessionScalarFieldEnum | VotingSessionScalarFieldEnum[]
  }

  /**
   * VotingSession create
   */
  export type VotingSessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VotingSession
     */
    select?: VotingSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VotingSession
     */
    omit?: VotingSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VotingSessionInclude<ExtArgs> | null
    /**
     * The data needed to create a VotingSession.
     */
    data: XOR<VotingSessionCreateInput, VotingSessionUncheckedCreateInput>
  }

  /**
   * VotingSession createMany
   */
  export type VotingSessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VotingSessions.
     */
    data: VotingSessionCreateManyInput | VotingSessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VotingSession createManyAndReturn
   */
  export type VotingSessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VotingSession
     */
    select?: VotingSessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VotingSession
     */
    omit?: VotingSessionOmit<ExtArgs> | null
    /**
     * The data used to create many VotingSessions.
     */
    data: VotingSessionCreateManyInput | VotingSessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VotingSession update
   */
  export type VotingSessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VotingSession
     */
    select?: VotingSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VotingSession
     */
    omit?: VotingSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VotingSessionInclude<ExtArgs> | null
    /**
     * The data needed to update a VotingSession.
     */
    data: XOR<VotingSessionUpdateInput, VotingSessionUncheckedUpdateInput>
    /**
     * Choose, which VotingSession to update.
     */
    where: VotingSessionWhereUniqueInput
  }

  /**
   * VotingSession updateMany
   */
  export type VotingSessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VotingSessions.
     */
    data: XOR<VotingSessionUpdateManyMutationInput, VotingSessionUncheckedUpdateManyInput>
    /**
     * Filter which VotingSessions to update
     */
    where?: VotingSessionWhereInput
    /**
     * Limit how many VotingSessions to update.
     */
    limit?: number
  }

  /**
   * VotingSession updateManyAndReturn
   */
  export type VotingSessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VotingSession
     */
    select?: VotingSessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VotingSession
     */
    omit?: VotingSessionOmit<ExtArgs> | null
    /**
     * The data used to update VotingSessions.
     */
    data: XOR<VotingSessionUpdateManyMutationInput, VotingSessionUncheckedUpdateManyInput>
    /**
     * Filter which VotingSessions to update
     */
    where?: VotingSessionWhereInput
    /**
     * Limit how many VotingSessions to update.
     */
    limit?: number
  }

  /**
   * VotingSession upsert
   */
  export type VotingSessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VotingSession
     */
    select?: VotingSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VotingSession
     */
    omit?: VotingSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VotingSessionInclude<ExtArgs> | null
    /**
     * The filter to search for the VotingSession to update in case it exists.
     */
    where: VotingSessionWhereUniqueInput
    /**
     * In case the VotingSession found by the `where` argument doesn't exist, create a new VotingSession with this data.
     */
    create: XOR<VotingSessionCreateInput, VotingSessionUncheckedCreateInput>
    /**
     * In case the VotingSession was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VotingSessionUpdateInput, VotingSessionUncheckedUpdateInput>
  }

  /**
   * VotingSession delete
   */
  export type VotingSessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VotingSession
     */
    select?: VotingSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VotingSession
     */
    omit?: VotingSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VotingSessionInclude<ExtArgs> | null
    /**
     * Filter which VotingSession to delete.
     */
    where: VotingSessionWhereUniqueInput
  }

  /**
   * VotingSession deleteMany
   */
  export type VotingSessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VotingSessions to delete
     */
    where?: VotingSessionWhereInput
    /**
     * Limit how many VotingSessions to delete.
     */
    limit?: number
  }

  /**
   * VotingSession.ideas
   */
  export type VotingSession$ideasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Idea
     */
    select?: IdeaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Idea
     */
    omit?: IdeaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IdeaInclude<ExtArgs> | null
    where?: IdeaWhereInput
    orderBy?: IdeaOrderByWithRelationInput | IdeaOrderByWithRelationInput[]
    cursor?: IdeaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: IdeaScalarFieldEnum | IdeaScalarFieldEnum[]
  }

  /**
   * VotingSession.votes
   */
  export type VotingSession$votesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null
    where?: VoteWhereInput
    orderBy?: VoteOrderByWithRelationInput | VoteOrderByWithRelationInput[]
    cursor?: VoteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VoteScalarFieldEnum | VoteScalarFieldEnum[]
  }

  /**
   * VotingSession without action
   */
  export type VotingSessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VotingSession
     */
    select?: VotingSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VotingSession
     */
    omit?: VotingSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VotingSessionInclude<ExtArgs> | null
  }


  /**
   * Model Idea
   */

  export type AggregateIdea = {
    _count: IdeaCountAggregateOutputType | null
    _min: IdeaMinAggregateOutputType | null
    _max: IdeaMaxAggregateOutputType | null
  }

  export type IdeaMinAggregateOutputType = {
    id: string | null
    title: string | null
    sessionId: string | null
  }

  export type IdeaMaxAggregateOutputType = {
    id: string | null
    title: string | null
    sessionId: string | null
  }

  export type IdeaCountAggregateOutputType = {
    id: number
    title: number
    sessionId: number
    _all: number
  }


  export type IdeaMinAggregateInputType = {
    id?: true
    title?: true
    sessionId?: true
  }

  export type IdeaMaxAggregateInputType = {
    id?: true
    title?: true
    sessionId?: true
  }

  export type IdeaCountAggregateInputType = {
    id?: true
    title?: true
    sessionId?: true
    _all?: true
  }

  export type IdeaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Idea to aggregate.
     */
    where?: IdeaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ideas to fetch.
     */
    orderBy?: IdeaOrderByWithRelationInput | IdeaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: IdeaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ideas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ideas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Ideas
    **/
    _count?: true | IdeaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: IdeaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: IdeaMaxAggregateInputType
  }

  export type GetIdeaAggregateType<T extends IdeaAggregateArgs> = {
        [P in keyof T & keyof AggregateIdea]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateIdea[P]>
      : GetScalarType<T[P], AggregateIdea[P]>
  }




  export type IdeaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: IdeaWhereInput
    orderBy?: IdeaOrderByWithAggregationInput | IdeaOrderByWithAggregationInput[]
    by: IdeaScalarFieldEnum[] | IdeaScalarFieldEnum
    having?: IdeaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: IdeaCountAggregateInputType | true
    _min?: IdeaMinAggregateInputType
    _max?: IdeaMaxAggregateInputType
  }

  export type IdeaGroupByOutputType = {
    id: string
    title: string
    sessionId: string
    _count: IdeaCountAggregateOutputType | null
    _min: IdeaMinAggregateOutputType | null
    _max: IdeaMaxAggregateOutputType | null
  }

  type GetIdeaGroupByPayload<T extends IdeaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<IdeaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof IdeaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], IdeaGroupByOutputType[P]>
            : GetScalarType<T[P], IdeaGroupByOutputType[P]>
        }
      >
    >


  export type IdeaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    sessionId?: boolean
    session?: boolean | VotingSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["idea"]>

  export type IdeaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    sessionId?: boolean
    session?: boolean | VotingSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["idea"]>

  export type IdeaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    sessionId?: boolean
    session?: boolean | VotingSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["idea"]>

  export type IdeaSelectScalar = {
    id?: boolean
    title?: boolean
    sessionId?: boolean
  }

  export type IdeaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "sessionId", ExtArgs["result"]["idea"]>
  export type IdeaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | VotingSessionDefaultArgs<ExtArgs>
  }
  export type IdeaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | VotingSessionDefaultArgs<ExtArgs>
  }
  export type IdeaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | VotingSessionDefaultArgs<ExtArgs>
  }

  export type $IdeaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Idea"
    objects: {
      session: Prisma.$VotingSessionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      sessionId: string
    }, ExtArgs["result"]["idea"]>
    composites: {}
  }

  type IdeaGetPayload<S extends boolean | null | undefined | IdeaDefaultArgs> = $Result.GetResult<Prisma.$IdeaPayload, S>

  type IdeaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<IdeaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: IdeaCountAggregateInputType | true
    }

  export interface IdeaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Idea'], meta: { name: 'Idea' } }
    /**
     * Find zero or one Idea that matches the filter.
     * @param {IdeaFindUniqueArgs} args - Arguments to find a Idea
     * @example
     * // Get one Idea
     * const idea = await prisma.idea.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends IdeaFindUniqueArgs>(args: SelectSubset<T, IdeaFindUniqueArgs<ExtArgs>>): Prisma__IdeaClient<$Result.GetResult<Prisma.$IdeaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Idea that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {IdeaFindUniqueOrThrowArgs} args - Arguments to find a Idea
     * @example
     * // Get one Idea
     * const idea = await prisma.idea.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends IdeaFindUniqueOrThrowArgs>(args: SelectSubset<T, IdeaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__IdeaClient<$Result.GetResult<Prisma.$IdeaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Idea that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IdeaFindFirstArgs} args - Arguments to find a Idea
     * @example
     * // Get one Idea
     * const idea = await prisma.idea.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends IdeaFindFirstArgs>(args?: SelectSubset<T, IdeaFindFirstArgs<ExtArgs>>): Prisma__IdeaClient<$Result.GetResult<Prisma.$IdeaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Idea that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IdeaFindFirstOrThrowArgs} args - Arguments to find a Idea
     * @example
     * // Get one Idea
     * const idea = await prisma.idea.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends IdeaFindFirstOrThrowArgs>(args?: SelectSubset<T, IdeaFindFirstOrThrowArgs<ExtArgs>>): Prisma__IdeaClient<$Result.GetResult<Prisma.$IdeaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Ideas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IdeaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Ideas
     * const ideas = await prisma.idea.findMany()
     * 
     * // Get first 10 Ideas
     * const ideas = await prisma.idea.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const ideaWithIdOnly = await prisma.idea.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends IdeaFindManyArgs>(args?: SelectSubset<T, IdeaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IdeaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Idea.
     * @param {IdeaCreateArgs} args - Arguments to create a Idea.
     * @example
     * // Create one Idea
     * const Idea = await prisma.idea.create({
     *   data: {
     *     // ... data to create a Idea
     *   }
     * })
     * 
     */
    create<T extends IdeaCreateArgs>(args: SelectSubset<T, IdeaCreateArgs<ExtArgs>>): Prisma__IdeaClient<$Result.GetResult<Prisma.$IdeaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Ideas.
     * @param {IdeaCreateManyArgs} args - Arguments to create many Ideas.
     * @example
     * // Create many Ideas
     * const idea = await prisma.idea.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends IdeaCreateManyArgs>(args?: SelectSubset<T, IdeaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Ideas and returns the data saved in the database.
     * @param {IdeaCreateManyAndReturnArgs} args - Arguments to create many Ideas.
     * @example
     * // Create many Ideas
     * const idea = await prisma.idea.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Ideas and only return the `id`
     * const ideaWithIdOnly = await prisma.idea.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends IdeaCreateManyAndReturnArgs>(args?: SelectSubset<T, IdeaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IdeaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Idea.
     * @param {IdeaDeleteArgs} args - Arguments to delete one Idea.
     * @example
     * // Delete one Idea
     * const Idea = await prisma.idea.delete({
     *   where: {
     *     // ... filter to delete one Idea
     *   }
     * })
     * 
     */
    delete<T extends IdeaDeleteArgs>(args: SelectSubset<T, IdeaDeleteArgs<ExtArgs>>): Prisma__IdeaClient<$Result.GetResult<Prisma.$IdeaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Idea.
     * @param {IdeaUpdateArgs} args - Arguments to update one Idea.
     * @example
     * // Update one Idea
     * const idea = await prisma.idea.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends IdeaUpdateArgs>(args: SelectSubset<T, IdeaUpdateArgs<ExtArgs>>): Prisma__IdeaClient<$Result.GetResult<Prisma.$IdeaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Ideas.
     * @param {IdeaDeleteManyArgs} args - Arguments to filter Ideas to delete.
     * @example
     * // Delete a few Ideas
     * const { count } = await prisma.idea.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends IdeaDeleteManyArgs>(args?: SelectSubset<T, IdeaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Ideas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IdeaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Ideas
     * const idea = await prisma.idea.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends IdeaUpdateManyArgs>(args: SelectSubset<T, IdeaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Ideas and returns the data updated in the database.
     * @param {IdeaUpdateManyAndReturnArgs} args - Arguments to update many Ideas.
     * @example
     * // Update many Ideas
     * const idea = await prisma.idea.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Ideas and only return the `id`
     * const ideaWithIdOnly = await prisma.idea.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends IdeaUpdateManyAndReturnArgs>(args: SelectSubset<T, IdeaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IdeaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Idea.
     * @param {IdeaUpsertArgs} args - Arguments to update or create a Idea.
     * @example
     * // Update or create a Idea
     * const idea = await prisma.idea.upsert({
     *   create: {
     *     // ... data to create a Idea
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Idea we want to update
     *   }
     * })
     */
    upsert<T extends IdeaUpsertArgs>(args: SelectSubset<T, IdeaUpsertArgs<ExtArgs>>): Prisma__IdeaClient<$Result.GetResult<Prisma.$IdeaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Ideas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IdeaCountArgs} args - Arguments to filter Ideas to count.
     * @example
     * // Count the number of Ideas
     * const count = await prisma.idea.count({
     *   where: {
     *     // ... the filter for the Ideas we want to count
     *   }
     * })
    **/
    count<T extends IdeaCountArgs>(
      args?: Subset<T, IdeaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], IdeaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Idea.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IdeaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends IdeaAggregateArgs>(args: Subset<T, IdeaAggregateArgs>): Prisma.PrismaPromise<GetIdeaAggregateType<T>>

    /**
     * Group by Idea.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IdeaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends IdeaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: IdeaGroupByArgs['orderBy'] }
        : { orderBy?: IdeaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, IdeaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetIdeaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Idea model
   */
  readonly fields: IdeaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Idea.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__IdeaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    session<T extends VotingSessionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, VotingSessionDefaultArgs<ExtArgs>>): Prisma__VotingSessionClient<$Result.GetResult<Prisma.$VotingSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Idea model
   */
  interface IdeaFieldRefs {
    readonly id: FieldRef<"Idea", 'String'>
    readonly title: FieldRef<"Idea", 'String'>
    readonly sessionId: FieldRef<"Idea", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Idea findUnique
   */
  export type IdeaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Idea
     */
    select?: IdeaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Idea
     */
    omit?: IdeaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IdeaInclude<ExtArgs> | null
    /**
     * Filter, which Idea to fetch.
     */
    where: IdeaWhereUniqueInput
  }

  /**
   * Idea findUniqueOrThrow
   */
  export type IdeaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Idea
     */
    select?: IdeaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Idea
     */
    omit?: IdeaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IdeaInclude<ExtArgs> | null
    /**
     * Filter, which Idea to fetch.
     */
    where: IdeaWhereUniqueInput
  }

  /**
   * Idea findFirst
   */
  export type IdeaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Idea
     */
    select?: IdeaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Idea
     */
    omit?: IdeaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IdeaInclude<ExtArgs> | null
    /**
     * Filter, which Idea to fetch.
     */
    where?: IdeaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ideas to fetch.
     */
    orderBy?: IdeaOrderByWithRelationInput | IdeaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Ideas.
     */
    cursor?: IdeaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ideas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ideas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Ideas.
     */
    distinct?: IdeaScalarFieldEnum | IdeaScalarFieldEnum[]
  }

  /**
   * Idea findFirstOrThrow
   */
  export type IdeaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Idea
     */
    select?: IdeaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Idea
     */
    omit?: IdeaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IdeaInclude<ExtArgs> | null
    /**
     * Filter, which Idea to fetch.
     */
    where?: IdeaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ideas to fetch.
     */
    orderBy?: IdeaOrderByWithRelationInput | IdeaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Ideas.
     */
    cursor?: IdeaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ideas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ideas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Ideas.
     */
    distinct?: IdeaScalarFieldEnum | IdeaScalarFieldEnum[]
  }

  /**
   * Idea findMany
   */
  export type IdeaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Idea
     */
    select?: IdeaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Idea
     */
    omit?: IdeaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IdeaInclude<ExtArgs> | null
    /**
     * Filter, which Ideas to fetch.
     */
    where?: IdeaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ideas to fetch.
     */
    orderBy?: IdeaOrderByWithRelationInput | IdeaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Ideas.
     */
    cursor?: IdeaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ideas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ideas.
     */
    skip?: number
    distinct?: IdeaScalarFieldEnum | IdeaScalarFieldEnum[]
  }

  /**
   * Idea create
   */
  export type IdeaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Idea
     */
    select?: IdeaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Idea
     */
    omit?: IdeaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IdeaInclude<ExtArgs> | null
    /**
     * The data needed to create a Idea.
     */
    data: XOR<IdeaCreateInput, IdeaUncheckedCreateInput>
  }

  /**
   * Idea createMany
   */
  export type IdeaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Ideas.
     */
    data: IdeaCreateManyInput | IdeaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Idea createManyAndReturn
   */
  export type IdeaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Idea
     */
    select?: IdeaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Idea
     */
    omit?: IdeaOmit<ExtArgs> | null
    /**
     * The data used to create many Ideas.
     */
    data: IdeaCreateManyInput | IdeaCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IdeaIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Idea update
   */
  export type IdeaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Idea
     */
    select?: IdeaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Idea
     */
    omit?: IdeaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IdeaInclude<ExtArgs> | null
    /**
     * The data needed to update a Idea.
     */
    data: XOR<IdeaUpdateInput, IdeaUncheckedUpdateInput>
    /**
     * Choose, which Idea to update.
     */
    where: IdeaWhereUniqueInput
  }

  /**
   * Idea updateMany
   */
  export type IdeaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Ideas.
     */
    data: XOR<IdeaUpdateManyMutationInput, IdeaUncheckedUpdateManyInput>
    /**
     * Filter which Ideas to update
     */
    where?: IdeaWhereInput
    /**
     * Limit how many Ideas to update.
     */
    limit?: number
  }

  /**
   * Idea updateManyAndReturn
   */
  export type IdeaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Idea
     */
    select?: IdeaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Idea
     */
    omit?: IdeaOmit<ExtArgs> | null
    /**
     * The data used to update Ideas.
     */
    data: XOR<IdeaUpdateManyMutationInput, IdeaUncheckedUpdateManyInput>
    /**
     * Filter which Ideas to update
     */
    where?: IdeaWhereInput
    /**
     * Limit how many Ideas to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IdeaIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Idea upsert
   */
  export type IdeaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Idea
     */
    select?: IdeaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Idea
     */
    omit?: IdeaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IdeaInclude<ExtArgs> | null
    /**
     * The filter to search for the Idea to update in case it exists.
     */
    where: IdeaWhereUniqueInput
    /**
     * In case the Idea found by the `where` argument doesn't exist, create a new Idea with this data.
     */
    create: XOR<IdeaCreateInput, IdeaUncheckedCreateInput>
    /**
     * In case the Idea was found with the provided `where` argument, update it with this data.
     */
    update: XOR<IdeaUpdateInput, IdeaUncheckedUpdateInput>
  }

  /**
   * Idea delete
   */
  export type IdeaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Idea
     */
    select?: IdeaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Idea
     */
    omit?: IdeaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IdeaInclude<ExtArgs> | null
    /**
     * Filter which Idea to delete.
     */
    where: IdeaWhereUniqueInput
  }

  /**
   * Idea deleteMany
   */
  export type IdeaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Ideas to delete
     */
    where?: IdeaWhereInput
    /**
     * Limit how many Ideas to delete.
     */
    limit?: number
  }

  /**
   * Idea without action
   */
  export type IdeaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Idea
     */
    select?: IdeaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Idea
     */
    omit?: IdeaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IdeaInclude<ExtArgs> | null
  }


  /**
   * Model Vote
   */

  export type AggregateVote = {
    _count: VoteCountAggregateOutputType | null
    _min: VoteMinAggregateOutputType | null
    _max: VoteMaxAggregateOutputType | null
  }

  export type VoteMinAggregateOutputType = {
    id: string | null
    sessionId: string | null
    voterId: string | null
  }

  export type VoteMaxAggregateOutputType = {
    id: string | null
    sessionId: string | null
    voterId: string | null
  }

  export type VoteCountAggregateOutputType = {
    id: number
    sessionId: number
    voterId: number
    scores: number
    _all: number
  }


  export type VoteMinAggregateInputType = {
    id?: true
    sessionId?: true
    voterId?: true
  }

  export type VoteMaxAggregateInputType = {
    id?: true
    sessionId?: true
    voterId?: true
  }

  export type VoteCountAggregateInputType = {
    id?: true
    sessionId?: true
    voterId?: true
    scores?: true
    _all?: true
  }

  export type VoteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Vote to aggregate.
     */
    where?: VoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Votes to fetch.
     */
    orderBy?: VoteOrderByWithRelationInput | VoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Votes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Votes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Votes
    **/
    _count?: true | VoteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VoteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VoteMaxAggregateInputType
  }

  export type GetVoteAggregateType<T extends VoteAggregateArgs> = {
        [P in keyof T & keyof AggregateVote]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVote[P]>
      : GetScalarType<T[P], AggregateVote[P]>
  }




  export type VoteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VoteWhereInput
    orderBy?: VoteOrderByWithAggregationInput | VoteOrderByWithAggregationInput[]
    by: VoteScalarFieldEnum[] | VoteScalarFieldEnum
    having?: VoteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VoteCountAggregateInputType | true
    _min?: VoteMinAggregateInputType
    _max?: VoteMaxAggregateInputType
  }

  export type VoteGroupByOutputType = {
    id: string
    sessionId: string
    voterId: string
    scores: JsonValue
    _count: VoteCountAggregateOutputType | null
    _min: VoteMinAggregateOutputType | null
    _max: VoteMaxAggregateOutputType | null
  }

  type GetVoteGroupByPayload<T extends VoteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VoteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VoteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VoteGroupByOutputType[P]>
            : GetScalarType<T[P], VoteGroupByOutputType[P]>
        }
      >
    >


  export type VoteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    voterId?: boolean
    scores?: boolean
    session?: boolean | VotingSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vote"]>

  export type VoteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    voterId?: boolean
    scores?: boolean
    session?: boolean | VotingSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vote"]>

  export type VoteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    voterId?: boolean
    scores?: boolean
    session?: boolean | VotingSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vote"]>

  export type VoteSelectScalar = {
    id?: boolean
    sessionId?: boolean
    voterId?: boolean
    scores?: boolean
  }

  export type VoteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sessionId" | "voterId" | "scores", ExtArgs["result"]["vote"]>
  export type VoteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | VotingSessionDefaultArgs<ExtArgs>
  }
  export type VoteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | VotingSessionDefaultArgs<ExtArgs>
  }
  export type VoteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | VotingSessionDefaultArgs<ExtArgs>
  }

  export type $VotePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Vote"
    objects: {
      session: Prisma.$VotingSessionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sessionId: string
      voterId: string
      scores: Prisma.JsonValue
    }, ExtArgs["result"]["vote"]>
    composites: {}
  }

  type VoteGetPayload<S extends boolean | null | undefined | VoteDefaultArgs> = $Result.GetResult<Prisma.$VotePayload, S>

  type VoteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VoteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VoteCountAggregateInputType | true
    }

  export interface VoteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Vote'], meta: { name: 'Vote' } }
    /**
     * Find zero or one Vote that matches the filter.
     * @param {VoteFindUniqueArgs} args - Arguments to find a Vote
     * @example
     * // Get one Vote
     * const vote = await prisma.vote.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VoteFindUniqueArgs>(args: SelectSubset<T, VoteFindUniqueArgs<ExtArgs>>): Prisma__VoteClient<$Result.GetResult<Prisma.$VotePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Vote that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VoteFindUniqueOrThrowArgs} args - Arguments to find a Vote
     * @example
     * // Get one Vote
     * const vote = await prisma.vote.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VoteFindUniqueOrThrowArgs>(args: SelectSubset<T, VoteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VoteClient<$Result.GetResult<Prisma.$VotePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Vote that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoteFindFirstArgs} args - Arguments to find a Vote
     * @example
     * // Get one Vote
     * const vote = await prisma.vote.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VoteFindFirstArgs>(args?: SelectSubset<T, VoteFindFirstArgs<ExtArgs>>): Prisma__VoteClient<$Result.GetResult<Prisma.$VotePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Vote that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoteFindFirstOrThrowArgs} args - Arguments to find a Vote
     * @example
     * // Get one Vote
     * const vote = await prisma.vote.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VoteFindFirstOrThrowArgs>(args?: SelectSubset<T, VoteFindFirstOrThrowArgs<ExtArgs>>): Prisma__VoteClient<$Result.GetResult<Prisma.$VotePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Votes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Votes
     * const votes = await prisma.vote.findMany()
     * 
     * // Get first 10 Votes
     * const votes = await prisma.vote.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const voteWithIdOnly = await prisma.vote.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VoteFindManyArgs>(args?: SelectSubset<T, VoteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Vote.
     * @param {VoteCreateArgs} args - Arguments to create a Vote.
     * @example
     * // Create one Vote
     * const Vote = await prisma.vote.create({
     *   data: {
     *     // ... data to create a Vote
     *   }
     * })
     * 
     */
    create<T extends VoteCreateArgs>(args: SelectSubset<T, VoteCreateArgs<ExtArgs>>): Prisma__VoteClient<$Result.GetResult<Prisma.$VotePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Votes.
     * @param {VoteCreateManyArgs} args - Arguments to create many Votes.
     * @example
     * // Create many Votes
     * const vote = await prisma.vote.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VoteCreateManyArgs>(args?: SelectSubset<T, VoteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Votes and returns the data saved in the database.
     * @param {VoteCreateManyAndReturnArgs} args - Arguments to create many Votes.
     * @example
     * // Create many Votes
     * const vote = await prisma.vote.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Votes and only return the `id`
     * const voteWithIdOnly = await prisma.vote.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VoteCreateManyAndReturnArgs>(args?: SelectSubset<T, VoteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VotePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Vote.
     * @param {VoteDeleteArgs} args - Arguments to delete one Vote.
     * @example
     * // Delete one Vote
     * const Vote = await prisma.vote.delete({
     *   where: {
     *     // ... filter to delete one Vote
     *   }
     * })
     * 
     */
    delete<T extends VoteDeleteArgs>(args: SelectSubset<T, VoteDeleteArgs<ExtArgs>>): Prisma__VoteClient<$Result.GetResult<Prisma.$VotePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Vote.
     * @param {VoteUpdateArgs} args - Arguments to update one Vote.
     * @example
     * // Update one Vote
     * const vote = await prisma.vote.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VoteUpdateArgs>(args: SelectSubset<T, VoteUpdateArgs<ExtArgs>>): Prisma__VoteClient<$Result.GetResult<Prisma.$VotePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Votes.
     * @param {VoteDeleteManyArgs} args - Arguments to filter Votes to delete.
     * @example
     * // Delete a few Votes
     * const { count } = await prisma.vote.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VoteDeleteManyArgs>(args?: SelectSubset<T, VoteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Votes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Votes
     * const vote = await prisma.vote.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VoteUpdateManyArgs>(args: SelectSubset<T, VoteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Votes and returns the data updated in the database.
     * @param {VoteUpdateManyAndReturnArgs} args - Arguments to update many Votes.
     * @example
     * // Update many Votes
     * const vote = await prisma.vote.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Votes and only return the `id`
     * const voteWithIdOnly = await prisma.vote.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VoteUpdateManyAndReturnArgs>(args: SelectSubset<T, VoteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VotePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Vote.
     * @param {VoteUpsertArgs} args - Arguments to update or create a Vote.
     * @example
     * // Update or create a Vote
     * const vote = await prisma.vote.upsert({
     *   create: {
     *     // ... data to create a Vote
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Vote we want to update
     *   }
     * })
     */
    upsert<T extends VoteUpsertArgs>(args: SelectSubset<T, VoteUpsertArgs<ExtArgs>>): Prisma__VoteClient<$Result.GetResult<Prisma.$VotePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Votes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoteCountArgs} args - Arguments to filter Votes to count.
     * @example
     * // Count the number of Votes
     * const count = await prisma.vote.count({
     *   where: {
     *     // ... the filter for the Votes we want to count
     *   }
     * })
    **/
    count<T extends VoteCountArgs>(
      args?: Subset<T, VoteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VoteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Vote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VoteAggregateArgs>(args: Subset<T, VoteAggregateArgs>): Prisma.PrismaPromise<GetVoteAggregateType<T>>

    /**
     * Group by Vote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VoteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VoteGroupByArgs['orderBy'] }
        : { orderBy?: VoteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VoteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVoteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Vote model
   */
  readonly fields: VoteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Vote.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VoteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    session<T extends VotingSessionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, VotingSessionDefaultArgs<ExtArgs>>): Prisma__VotingSessionClient<$Result.GetResult<Prisma.$VotingSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Vote model
   */
  interface VoteFieldRefs {
    readonly id: FieldRef<"Vote", 'String'>
    readonly sessionId: FieldRef<"Vote", 'String'>
    readonly voterId: FieldRef<"Vote", 'String'>
    readonly scores: FieldRef<"Vote", 'Json'>
  }
    

  // Custom InputTypes
  /**
   * Vote findUnique
   */
  export type VoteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null
    /**
     * Filter, which Vote to fetch.
     */
    where: VoteWhereUniqueInput
  }

  /**
   * Vote findUniqueOrThrow
   */
  export type VoteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null
    /**
     * Filter, which Vote to fetch.
     */
    where: VoteWhereUniqueInput
  }

  /**
   * Vote findFirst
   */
  export type VoteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null
    /**
     * Filter, which Vote to fetch.
     */
    where?: VoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Votes to fetch.
     */
    orderBy?: VoteOrderByWithRelationInput | VoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Votes.
     */
    cursor?: VoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Votes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Votes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Votes.
     */
    distinct?: VoteScalarFieldEnum | VoteScalarFieldEnum[]
  }

  /**
   * Vote findFirstOrThrow
   */
  export type VoteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null
    /**
     * Filter, which Vote to fetch.
     */
    where?: VoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Votes to fetch.
     */
    orderBy?: VoteOrderByWithRelationInput | VoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Votes.
     */
    cursor?: VoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Votes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Votes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Votes.
     */
    distinct?: VoteScalarFieldEnum | VoteScalarFieldEnum[]
  }

  /**
   * Vote findMany
   */
  export type VoteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null
    /**
     * Filter, which Votes to fetch.
     */
    where?: VoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Votes to fetch.
     */
    orderBy?: VoteOrderByWithRelationInput | VoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Votes.
     */
    cursor?: VoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Votes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Votes.
     */
    skip?: number
    distinct?: VoteScalarFieldEnum | VoteScalarFieldEnum[]
  }

  /**
   * Vote create
   */
  export type VoteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null
    /**
     * The data needed to create a Vote.
     */
    data: XOR<VoteCreateInput, VoteUncheckedCreateInput>
  }

  /**
   * Vote createMany
   */
  export type VoteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Votes.
     */
    data: VoteCreateManyInput | VoteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Vote createManyAndReturn
   */
  export type VoteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null
    /**
     * The data used to create many Votes.
     */
    data: VoteCreateManyInput | VoteCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Vote update
   */
  export type VoteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null
    /**
     * The data needed to update a Vote.
     */
    data: XOR<VoteUpdateInput, VoteUncheckedUpdateInput>
    /**
     * Choose, which Vote to update.
     */
    where: VoteWhereUniqueInput
  }

  /**
   * Vote updateMany
   */
  export type VoteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Votes.
     */
    data: XOR<VoteUpdateManyMutationInput, VoteUncheckedUpdateManyInput>
    /**
     * Filter which Votes to update
     */
    where?: VoteWhereInput
    /**
     * Limit how many Votes to update.
     */
    limit?: number
  }

  /**
   * Vote updateManyAndReturn
   */
  export type VoteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null
    /**
     * The data used to update Votes.
     */
    data: XOR<VoteUpdateManyMutationInput, VoteUncheckedUpdateManyInput>
    /**
     * Filter which Votes to update
     */
    where?: VoteWhereInput
    /**
     * Limit how many Votes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Vote upsert
   */
  export type VoteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null
    /**
     * The filter to search for the Vote to update in case it exists.
     */
    where: VoteWhereUniqueInput
    /**
     * In case the Vote found by the `where` argument doesn't exist, create a new Vote with this data.
     */
    create: XOR<VoteCreateInput, VoteUncheckedCreateInput>
    /**
     * In case the Vote was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VoteUpdateInput, VoteUncheckedUpdateInput>
  }

  /**
   * Vote delete
   */
  export type VoteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null
    /**
     * Filter which Vote to delete.
     */
    where: VoteWhereUniqueInput
  }

  /**
   * Vote deleteMany
   */
  export type VoteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Votes to delete
     */
    where?: VoteWhereInput
    /**
     * Limit how many Votes to delete.
     */
    limit?: number
  }

  /**
   * Vote without action
   */
  export type VoteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const VotingSessionScalarFieldEnum: {
    id: 'id',
    title: 'title',
    maxPriorities: 'maxPriorities'
  };

  export type VotingSessionScalarFieldEnum = (typeof VotingSessionScalarFieldEnum)[keyof typeof VotingSessionScalarFieldEnum]


  export const IdeaScalarFieldEnum: {
    id: 'id',
    title: 'title',
    sessionId: 'sessionId'
  };

  export type IdeaScalarFieldEnum = (typeof IdeaScalarFieldEnum)[keyof typeof IdeaScalarFieldEnum]


  export const VoteScalarFieldEnum: {
    id: 'id',
    sessionId: 'sessionId',
    voterId: 'voterId',
    scores: 'scores'
  };

  export type VoteScalarFieldEnum = (typeof VoteScalarFieldEnum)[keyof typeof VoteScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type VotingSessionWhereInput = {
    AND?: VotingSessionWhereInput | VotingSessionWhereInput[]
    OR?: VotingSessionWhereInput[]
    NOT?: VotingSessionWhereInput | VotingSessionWhereInput[]
    id?: StringFilter<"VotingSession"> | string
    title?: StringFilter<"VotingSession"> | string
    maxPriorities?: IntFilter<"VotingSession"> | number
    ideas?: IdeaListRelationFilter
    votes?: VoteListRelationFilter
  }

  export type VotingSessionOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    maxPriorities?: SortOrder
    ideas?: IdeaOrderByRelationAggregateInput
    votes?: VoteOrderByRelationAggregateInput
  }

  export type VotingSessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: VotingSessionWhereInput | VotingSessionWhereInput[]
    OR?: VotingSessionWhereInput[]
    NOT?: VotingSessionWhereInput | VotingSessionWhereInput[]
    title?: StringFilter<"VotingSession"> | string
    maxPriorities?: IntFilter<"VotingSession"> | number
    ideas?: IdeaListRelationFilter
    votes?: VoteListRelationFilter
  }, "id">

  export type VotingSessionOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    maxPriorities?: SortOrder
    _count?: VotingSessionCountOrderByAggregateInput
    _avg?: VotingSessionAvgOrderByAggregateInput
    _max?: VotingSessionMaxOrderByAggregateInput
    _min?: VotingSessionMinOrderByAggregateInput
    _sum?: VotingSessionSumOrderByAggregateInput
  }

  export type VotingSessionScalarWhereWithAggregatesInput = {
    AND?: VotingSessionScalarWhereWithAggregatesInput | VotingSessionScalarWhereWithAggregatesInput[]
    OR?: VotingSessionScalarWhereWithAggregatesInput[]
    NOT?: VotingSessionScalarWhereWithAggregatesInput | VotingSessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"VotingSession"> | string
    title?: StringWithAggregatesFilter<"VotingSession"> | string
    maxPriorities?: IntWithAggregatesFilter<"VotingSession"> | number
  }

  export type IdeaWhereInput = {
    AND?: IdeaWhereInput | IdeaWhereInput[]
    OR?: IdeaWhereInput[]
    NOT?: IdeaWhereInput | IdeaWhereInput[]
    id?: StringFilter<"Idea"> | string
    title?: StringFilter<"Idea"> | string
    sessionId?: StringFilter<"Idea"> | string
    session?: XOR<VotingSessionScalarRelationFilter, VotingSessionWhereInput>
  }

  export type IdeaOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    sessionId?: SortOrder
    session?: VotingSessionOrderByWithRelationInput
  }

  export type IdeaWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: IdeaWhereInput | IdeaWhereInput[]
    OR?: IdeaWhereInput[]
    NOT?: IdeaWhereInput | IdeaWhereInput[]
    title?: StringFilter<"Idea"> | string
    sessionId?: StringFilter<"Idea"> | string
    session?: XOR<VotingSessionScalarRelationFilter, VotingSessionWhereInput>
  }, "id">

  export type IdeaOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    sessionId?: SortOrder
    _count?: IdeaCountOrderByAggregateInput
    _max?: IdeaMaxOrderByAggregateInput
    _min?: IdeaMinOrderByAggregateInput
  }

  export type IdeaScalarWhereWithAggregatesInput = {
    AND?: IdeaScalarWhereWithAggregatesInput | IdeaScalarWhereWithAggregatesInput[]
    OR?: IdeaScalarWhereWithAggregatesInput[]
    NOT?: IdeaScalarWhereWithAggregatesInput | IdeaScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Idea"> | string
    title?: StringWithAggregatesFilter<"Idea"> | string
    sessionId?: StringWithAggregatesFilter<"Idea"> | string
  }

  export type VoteWhereInput = {
    AND?: VoteWhereInput | VoteWhereInput[]
    OR?: VoteWhereInput[]
    NOT?: VoteWhereInput | VoteWhereInput[]
    id?: StringFilter<"Vote"> | string
    sessionId?: StringFilter<"Vote"> | string
    voterId?: StringFilter<"Vote"> | string
    scores?: JsonFilter<"Vote">
    session?: XOR<VotingSessionScalarRelationFilter, VotingSessionWhereInput>
  }

  export type VoteOrderByWithRelationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    voterId?: SortOrder
    scores?: SortOrder
    session?: VotingSessionOrderByWithRelationInput
  }

  export type VoteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: VoteWhereInput | VoteWhereInput[]
    OR?: VoteWhereInput[]
    NOT?: VoteWhereInput | VoteWhereInput[]
    sessionId?: StringFilter<"Vote"> | string
    voterId?: StringFilter<"Vote"> | string
    scores?: JsonFilter<"Vote">
    session?: XOR<VotingSessionScalarRelationFilter, VotingSessionWhereInput>
  }, "id">

  export type VoteOrderByWithAggregationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    voterId?: SortOrder
    scores?: SortOrder
    _count?: VoteCountOrderByAggregateInput
    _max?: VoteMaxOrderByAggregateInput
    _min?: VoteMinOrderByAggregateInput
  }

  export type VoteScalarWhereWithAggregatesInput = {
    AND?: VoteScalarWhereWithAggregatesInput | VoteScalarWhereWithAggregatesInput[]
    OR?: VoteScalarWhereWithAggregatesInput[]
    NOT?: VoteScalarWhereWithAggregatesInput | VoteScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Vote"> | string
    sessionId?: StringWithAggregatesFilter<"Vote"> | string
    voterId?: StringWithAggregatesFilter<"Vote"> | string
    scores?: JsonWithAggregatesFilter<"Vote">
  }

  export type VotingSessionCreateInput = {
    id?: string
    title: string
    maxPriorities: number
    ideas?: IdeaCreateNestedManyWithoutSessionInput
    votes?: VoteCreateNestedManyWithoutSessionInput
  }

  export type VotingSessionUncheckedCreateInput = {
    id?: string
    title: string
    maxPriorities: number
    ideas?: IdeaUncheckedCreateNestedManyWithoutSessionInput
    votes?: VoteUncheckedCreateNestedManyWithoutSessionInput
  }

  export type VotingSessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    maxPriorities?: IntFieldUpdateOperationsInput | number
    ideas?: IdeaUpdateManyWithoutSessionNestedInput
    votes?: VoteUpdateManyWithoutSessionNestedInput
  }

  export type VotingSessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    maxPriorities?: IntFieldUpdateOperationsInput | number
    ideas?: IdeaUncheckedUpdateManyWithoutSessionNestedInput
    votes?: VoteUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type VotingSessionCreateManyInput = {
    id?: string
    title: string
    maxPriorities: number
  }

  export type VotingSessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    maxPriorities?: IntFieldUpdateOperationsInput | number
  }

  export type VotingSessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    maxPriorities?: IntFieldUpdateOperationsInput | number
  }

  export type IdeaCreateInput = {
    id?: string
    title: string
    session: VotingSessionCreateNestedOneWithoutIdeasInput
  }

  export type IdeaUncheckedCreateInput = {
    id?: string
    title: string
    sessionId: string
  }

  export type IdeaUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    session?: VotingSessionUpdateOneRequiredWithoutIdeasNestedInput
  }

  export type IdeaUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
  }

  export type IdeaCreateManyInput = {
    id?: string
    title: string
    sessionId: string
  }

  export type IdeaUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
  }

  export type IdeaUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
  }

  export type VoteCreateInput = {
    id?: string
    voterId: string
    scores: JsonNullValueInput | InputJsonValue
    session: VotingSessionCreateNestedOneWithoutVotesInput
  }

  export type VoteUncheckedCreateInput = {
    id?: string
    sessionId: string
    voterId: string
    scores: JsonNullValueInput | InputJsonValue
  }

  export type VoteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    voterId?: StringFieldUpdateOperationsInput | string
    scores?: JsonNullValueInput | InputJsonValue
    session?: VotingSessionUpdateOneRequiredWithoutVotesNestedInput
  }

  export type VoteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    voterId?: StringFieldUpdateOperationsInput | string
    scores?: JsonNullValueInput | InputJsonValue
  }

  export type VoteCreateManyInput = {
    id?: string
    sessionId: string
    voterId: string
    scores: JsonNullValueInput | InputJsonValue
  }

  export type VoteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    voterId?: StringFieldUpdateOperationsInput | string
    scores?: JsonNullValueInput | InputJsonValue
  }

  export type VoteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    voterId?: StringFieldUpdateOperationsInput | string
    scores?: JsonNullValueInput | InputJsonValue
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type IdeaListRelationFilter = {
    every?: IdeaWhereInput
    some?: IdeaWhereInput
    none?: IdeaWhereInput
  }

  export type VoteListRelationFilter = {
    every?: VoteWhereInput
    some?: VoteWhereInput
    none?: VoteWhereInput
  }

  export type IdeaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type VoteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type VotingSessionCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    maxPriorities?: SortOrder
  }

  export type VotingSessionAvgOrderByAggregateInput = {
    maxPriorities?: SortOrder
  }

  export type VotingSessionMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    maxPriorities?: SortOrder
  }

  export type VotingSessionMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    maxPriorities?: SortOrder
  }

  export type VotingSessionSumOrderByAggregateInput = {
    maxPriorities?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type VotingSessionScalarRelationFilter = {
    is?: VotingSessionWhereInput
    isNot?: VotingSessionWhereInput
  }

  export type IdeaCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    sessionId?: SortOrder
  }

  export type IdeaMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    sessionId?: SortOrder
  }

  export type IdeaMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    sessionId?: SortOrder
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type VoteCountOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    voterId?: SortOrder
    scores?: SortOrder
  }

  export type VoteMaxOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    voterId?: SortOrder
  }

  export type VoteMinOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    voterId?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type IdeaCreateNestedManyWithoutSessionInput = {
    create?: XOR<IdeaCreateWithoutSessionInput, IdeaUncheckedCreateWithoutSessionInput> | IdeaCreateWithoutSessionInput[] | IdeaUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: IdeaCreateOrConnectWithoutSessionInput | IdeaCreateOrConnectWithoutSessionInput[]
    createMany?: IdeaCreateManySessionInputEnvelope
    connect?: IdeaWhereUniqueInput | IdeaWhereUniqueInput[]
  }

  export type VoteCreateNestedManyWithoutSessionInput = {
    create?: XOR<VoteCreateWithoutSessionInput, VoteUncheckedCreateWithoutSessionInput> | VoteCreateWithoutSessionInput[] | VoteUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: VoteCreateOrConnectWithoutSessionInput | VoteCreateOrConnectWithoutSessionInput[]
    createMany?: VoteCreateManySessionInputEnvelope
    connect?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
  }

  export type IdeaUncheckedCreateNestedManyWithoutSessionInput = {
    create?: XOR<IdeaCreateWithoutSessionInput, IdeaUncheckedCreateWithoutSessionInput> | IdeaCreateWithoutSessionInput[] | IdeaUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: IdeaCreateOrConnectWithoutSessionInput | IdeaCreateOrConnectWithoutSessionInput[]
    createMany?: IdeaCreateManySessionInputEnvelope
    connect?: IdeaWhereUniqueInput | IdeaWhereUniqueInput[]
  }

  export type VoteUncheckedCreateNestedManyWithoutSessionInput = {
    create?: XOR<VoteCreateWithoutSessionInput, VoteUncheckedCreateWithoutSessionInput> | VoteCreateWithoutSessionInput[] | VoteUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: VoteCreateOrConnectWithoutSessionInput | VoteCreateOrConnectWithoutSessionInput[]
    createMany?: VoteCreateManySessionInputEnvelope
    connect?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type IdeaUpdateManyWithoutSessionNestedInput = {
    create?: XOR<IdeaCreateWithoutSessionInput, IdeaUncheckedCreateWithoutSessionInput> | IdeaCreateWithoutSessionInput[] | IdeaUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: IdeaCreateOrConnectWithoutSessionInput | IdeaCreateOrConnectWithoutSessionInput[]
    upsert?: IdeaUpsertWithWhereUniqueWithoutSessionInput | IdeaUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: IdeaCreateManySessionInputEnvelope
    set?: IdeaWhereUniqueInput | IdeaWhereUniqueInput[]
    disconnect?: IdeaWhereUniqueInput | IdeaWhereUniqueInput[]
    delete?: IdeaWhereUniqueInput | IdeaWhereUniqueInput[]
    connect?: IdeaWhereUniqueInput | IdeaWhereUniqueInput[]
    update?: IdeaUpdateWithWhereUniqueWithoutSessionInput | IdeaUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: IdeaUpdateManyWithWhereWithoutSessionInput | IdeaUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: IdeaScalarWhereInput | IdeaScalarWhereInput[]
  }

  export type VoteUpdateManyWithoutSessionNestedInput = {
    create?: XOR<VoteCreateWithoutSessionInput, VoteUncheckedCreateWithoutSessionInput> | VoteCreateWithoutSessionInput[] | VoteUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: VoteCreateOrConnectWithoutSessionInput | VoteCreateOrConnectWithoutSessionInput[]
    upsert?: VoteUpsertWithWhereUniqueWithoutSessionInput | VoteUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: VoteCreateManySessionInputEnvelope
    set?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    disconnect?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    delete?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    connect?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    update?: VoteUpdateWithWhereUniqueWithoutSessionInput | VoteUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: VoteUpdateManyWithWhereWithoutSessionInput | VoteUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: VoteScalarWhereInput | VoteScalarWhereInput[]
  }

  export type IdeaUncheckedUpdateManyWithoutSessionNestedInput = {
    create?: XOR<IdeaCreateWithoutSessionInput, IdeaUncheckedCreateWithoutSessionInput> | IdeaCreateWithoutSessionInput[] | IdeaUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: IdeaCreateOrConnectWithoutSessionInput | IdeaCreateOrConnectWithoutSessionInput[]
    upsert?: IdeaUpsertWithWhereUniqueWithoutSessionInput | IdeaUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: IdeaCreateManySessionInputEnvelope
    set?: IdeaWhereUniqueInput | IdeaWhereUniqueInput[]
    disconnect?: IdeaWhereUniqueInput | IdeaWhereUniqueInput[]
    delete?: IdeaWhereUniqueInput | IdeaWhereUniqueInput[]
    connect?: IdeaWhereUniqueInput | IdeaWhereUniqueInput[]
    update?: IdeaUpdateWithWhereUniqueWithoutSessionInput | IdeaUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: IdeaUpdateManyWithWhereWithoutSessionInput | IdeaUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: IdeaScalarWhereInput | IdeaScalarWhereInput[]
  }

  export type VoteUncheckedUpdateManyWithoutSessionNestedInput = {
    create?: XOR<VoteCreateWithoutSessionInput, VoteUncheckedCreateWithoutSessionInput> | VoteCreateWithoutSessionInput[] | VoteUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: VoteCreateOrConnectWithoutSessionInput | VoteCreateOrConnectWithoutSessionInput[]
    upsert?: VoteUpsertWithWhereUniqueWithoutSessionInput | VoteUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: VoteCreateManySessionInputEnvelope
    set?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    disconnect?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    delete?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    connect?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    update?: VoteUpdateWithWhereUniqueWithoutSessionInput | VoteUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: VoteUpdateManyWithWhereWithoutSessionInput | VoteUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: VoteScalarWhereInput | VoteScalarWhereInput[]
  }

  export type VotingSessionCreateNestedOneWithoutIdeasInput = {
    create?: XOR<VotingSessionCreateWithoutIdeasInput, VotingSessionUncheckedCreateWithoutIdeasInput>
    connectOrCreate?: VotingSessionCreateOrConnectWithoutIdeasInput
    connect?: VotingSessionWhereUniqueInput
  }

  export type VotingSessionUpdateOneRequiredWithoutIdeasNestedInput = {
    create?: XOR<VotingSessionCreateWithoutIdeasInput, VotingSessionUncheckedCreateWithoutIdeasInput>
    connectOrCreate?: VotingSessionCreateOrConnectWithoutIdeasInput
    upsert?: VotingSessionUpsertWithoutIdeasInput
    connect?: VotingSessionWhereUniqueInput
    update?: XOR<XOR<VotingSessionUpdateToOneWithWhereWithoutIdeasInput, VotingSessionUpdateWithoutIdeasInput>, VotingSessionUncheckedUpdateWithoutIdeasInput>
  }

  export type VotingSessionCreateNestedOneWithoutVotesInput = {
    create?: XOR<VotingSessionCreateWithoutVotesInput, VotingSessionUncheckedCreateWithoutVotesInput>
    connectOrCreate?: VotingSessionCreateOrConnectWithoutVotesInput
    connect?: VotingSessionWhereUniqueInput
  }

  export type VotingSessionUpdateOneRequiredWithoutVotesNestedInput = {
    create?: XOR<VotingSessionCreateWithoutVotesInput, VotingSessionUncheckedCreateWithoutVotesInput>
    connectOrCreate?: VotingSessionCreateOrConnectWithoutVotesInput
    upsert?: VotingSessionUpsertWithoutVotesInput
    connect?: VotingSessionWhereUniqueInput
    update?: XOR<XOR<VotingSessionUpdateToOneWithWhereWithoutVotesInput, VotingSessionUpdateWithoutVotesInput>, VotingSessionUncheckedUpdateWithoutVotesInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type IdeaCreateWithoutSessionInput = {
    id?: string
    title: string
  }

  export type IdeaUncheckedCreateWithoutSessionInput = {
    id?: string
    title: string
  }

  export type IdeaCreateOrConnectWithoutSessionInput = {
    where: IdeaWhereUniqueInput
    create: XOR<IdeaCreateWithoutSessionInput, IdeaUncheckedCreateWithoutSessionInput>
  }

  export type IdeaCreateManySessionInputEnvelope = {
    data: IdeaCreateManySessionInput | IdeaCreateManySessionInput[]
    skipDuplicates?: boolean
  }

  export type VoteCreateWithoutSessionInput = {
    id?: string
    voterId: string
    scores: JsonNullValueInput | InputJsonValue
  }

  export type VoteUncheckedCreateWithoutSessionInput = {
    id?: string
    voterId: string
    scores: JsonNullValueInput | InputJsonValue
  }

  export type VoteCreateOrConnectWithoutSessionInput = {
    where: VoteWhereUniqueInput
    create: XOR<VoteCreateWithoutSessionInput, VoteUncheckedCreateWithoutSessionInput>
  }

  export type VoteCreateManySessionInputEnvelope = {
    data: VoteCreateManySessionInput | VoteCreateManySessionInput[]
    skipDuplicates?: boolean
  }

  export type IdeaUpsertWithWhereUniqueWithoutSessionInput = {
    where: IdeaWhereUniqueInput
    update: XOR<IdeaUpdateWithoutSessionInput, IdeaUncheckedUpdateWithoutSessionInput>
    create: XOR<IdeaCreateWithoutSessionInput, IdeaUncheckedCreateWithoutSessionInput>
  }

  export type IdeaUpdateWithWhereUniqueWithoutSessionInput = {
    where: IdeaWhereUniqueInput
    data: XOR<IdeaUpdateWithoutSessionInput, IdeaUncheckedUpdateWithoutSessionInput>
  }

  export type IdeaUpdateManyWithWhereWithoutSessionInput = {
    where: IdeaScalarWhereInput
    data: XOR<IdeaUpdateManyMutationInput, IdeaUncheckedUpdateManyWithoutSessionInput>
  }

  export type IdeaScalarWhereInput = {
    AND?: IdeaScalarWhereInput | IdeaScalarWhereInput[]
    OR?: IdeaScalarWhereInput[]
    NOT?: IdeaScalarWhereInput | IdeaScalarWhereInput[]
    id?: StringFilter<"Idea"> | string
    title?: StringFilter<"Idea"> | string
    sessionId?: StringFilter<"Idea"> | string
  }

  export type VoteUpsertWithWhereUniqueWithoutSessionInput = {
    where: VoteWhereUniqueInput
    update: XOR<VoteUpdateWithoutSessionInput, VoteUncheckedUpdateWithoutSessionInput>
    create: XOR<VoteCreateWithoutSessionInput, VoteUncheckedCreateWithoutSessionInput>
  }

  export type VoteUpdateWithWhereUniqueWithoutSessionInput = {
    where: VoteWhereUniqueInput
    data: XOR<VoteUpdateWithoutSessionInput, VoteUncheckedUpdateWithoutSessionInput>
  }

  export type VoteUpdateManyWithWhereWithoutSessionInput = {
    where: VoteScalarWhereInput
    data: XOR<VoteUpdateManyMutationInput, VoteUncheckedUpdateManyWithoutSessionInput>
  }

  export type VoteScalarWhereInput = {
    AND?: VoteScalarWhereInput | VoteScalarWhereInput[]
    OR?: VoteScalarWhereInput[]
    NOT?: VoteScalarWhereInput | VoteScalarWhereInput[]
    id?: StringFilter<"Vote"> | string
    sessionId?: StringFilter<"Vote"> | string
    voterId?: StringFilter<"Vote"> | string
    scores?: JsonFilter<"Vote">
  }

  export type VotingSessionCreateWithoutIdeasInput = {
    id?: string
    title: string
    maxPriorities: number
    votes?: VoteCreateNestedManyWithoutSessionInput
  }

  export type VotingSessionUncheckedCreateWithoutIdeasInput = {
    id?: string
    title: string
    maxPriorities: number
    votes?: VoteUncheckedCreateNestedManyWithoutSessionInput
  }

  export type VotingSessionCreateOrConnectWithoutIdeasInput = {
    where: VotingSessionWhereUniqueInput
    create: XOR<VotingSessionCreateWithoutIdeasInput, VotingSessionUncheckedCreateWithoutIdeasInput>
  }

  export type VotingSessionUpsertWithoutIdeasInput = {
    update: XOR<VotingSessionUpdateWithoutIdeasInput, VotingSessionUncheckedUpdateWithoutIdeasInput>
    create: XOR<VotingSessionCreateWithoutIdeasInput, VotingSessionUncheckedCreateWithoutIdeasInput>
    where?: VotingSessionWhereInput
  }

  export type VotingSessionUpdateToOneWithWhereWithoutIdeasInput = {
    where?: VotingSessionWhereInput
    data: XOR<VotingSessionUpdateWithoutIdeasInput, VotingSessionUncheckedUpdateWithoutIdeasInput>
  }

  export type VotingSessionUpdateWithoutIdeasInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    maxPriorities?: IntFieldUpdateOperationsInput | number
    votes?: VoteUpdateManyWithoutSessionNestedInput
  }

  export type VotingSessionUncheckedUpdateWithoutIdeasInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    maxPriorities?: IntFieldUpdateOperationsInput | number
    votes?: VoteUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type VotingSessionCreateWithoutVotesInput = {
    id?: string
    title: string
    maxPriorities: number
    ideas?: IdeaCreateNestedManyWithoutSessionInput
  }

  export type VotingSessionUncheckedCreateWithoutVotesInput = {
    id?: string
    title: string
    maxPriorities: number
    ideas?: IdeaUncheckedCreateNestedManyWithoutSessionInput
  }

  export type VotingSessionCreateOrConnectWithoutVotesInput = {
    where: VotingSessionWhereUniqueInput
    create: XOR<VotingSessionCreateWithoutVotesInput, VotingSessionUncheckedCreateWithoutVotesInput>
  }

  export type VotingSessionUpsertWithoutVotesInput = {
    update: XOR<VotingSessionUpdateWithoutVotesInput, VotingSessionUncheckedUpdateWithoutVotesInput>
    create: XOR<VotingSessionCreateWithoutVotesInput, VotingSessionUncheckedCreateWithoutVotesInput>
    where?: VotingSessionWhereInput
  }

  export type VotingSessionUpdateToOneWithWhereWithoutVotesInput = {
    where?: VotingSessionWhereInput
    data: XOR<VotingSessionUpdateWithoutVotesInput, VotingSessionUncheckedUpdateWithoutVotesInput>
  }

  export type VotingSessionUpdateWithoutVotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    maxPriorities?: IntFieldUpdateOperationsInput | number
    ideas?: IdeaUpdateManyWithoutSessionNestedInput
  }

  export type VotingSessionUncheckedUpdateWithoutVotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    maxPriorities?: IntFieldUpdateOperationsInput | number
    ideas?: IdeaUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type IdeaCreateManySessionInput = {
    id?: string
    title: string
  }

  export type VoteCreateManySessionInput = {
    id?: string
    voterId: string
    scores: JsonNullValueInput | InputJsonValue
  }

  export type IdeaUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
  }

  export type IdeaUncheckedUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
  }

  export type IdeaUncheckedUpdateManyWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
  }

  export type VoteUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    voterId?: StringFieldUpdateOperationsInput | string
    scores?: JsonNullValueInput | InputJsonValue
  }

  export type VoteUncheckedUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    voterId?: StringFieldUpdateOperationsInput | string
    scores?: JsonNullValueInput | InputJsonValue
  }

  export type VoteUncheckedUpdateManyWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    voterId?: StringFieldUpdateOperationsInput | string
    scores?: JsonNullValueInput | InputJsonValue
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}