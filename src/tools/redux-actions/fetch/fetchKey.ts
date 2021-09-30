import { FetchStateType, fetchReducerKey } from './fetchReducerKey';

type ReturnType<F,
    K extends string,
    S> = F extends typeof fetchReducerKey ? FetchStateType<K, S> : any

const fetchKey = <K extends string, S extends object | []>(
    key: K,
    initialValue: S,
) => <F extends Function>(
        fetchReducerFn: F,
    ): ReturnType<F, K, S> => fetchReducerFn(key, initialValue);

export default fetchKey;
