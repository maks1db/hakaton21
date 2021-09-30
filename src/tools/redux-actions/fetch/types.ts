import { FetchType } from '../toFetchConst';

export type FetchTuple<T> = [FetchType, T];

export type FetchKeysParams = { [K: string]: [FetchType, any] };
