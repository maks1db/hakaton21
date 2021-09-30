import fetchKey from './fetchKey';
import { fetchReducerKey, FetchKey } from './fetchReducerKey';
import { FetchKeysParams } from './types';

export type FetchInitialStateType<T extends FetchKeysParams> = {
    [K in keyof T]: FetchKey<T[K][1]>
};

const fetchInitialState = <T extends FetchKeysParams>(fetchKeys: T) => Object.keys(fetchKeys)
    .reduce(
        (accum, key) => ({
            ...accum,
            ...fetchKey(key, fetchKeys[key][1])(fetchReducerKey),
        }),
        {},
    ) as FetchInitialStateType<T>;

export default fetchInitialState;
