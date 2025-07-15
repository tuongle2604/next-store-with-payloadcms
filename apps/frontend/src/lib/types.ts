export type NestedPick<
  TObj,
  TObjectKey extends string,
> = TObjectKey extends `${infer TKeyPrefix}.${infer TKeyRest}`
  ? TKeyPrefix extends keyof TObj
    ? { [NewKey in TKeyPrefix]: NestedPick<TObj[TKeyPrefix], TKeyRest> }
    : never
  : TObjectKey extends keyof TObj
    ? { [NewKey in TObjectKey]: TObj[TObjectKey] }
    : never;

export type UnionToIntersection<U> = (
  U extends unknown ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

export type Pretty2<T> = {
  [K in keyof T]: T[K] extends object ? { [K2 in keyof T[K]]: T[K][K2] } : T[K];
};

export interface PaginatedResult<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

export interface CartItem {
  id: string;
  name: string;
  images: string[];
  price: number;
  stock: number;
  variantId: string;
}
