export type FetchKey<T> = Record<'isFetching', boolean> &
    Record<'data', T> & { error?: boolean };
export type FetchStateType<K extends string, T> = Record<K, FetchKey<T>>;

export function fetchReducerKey<K extends string, T>(
    key: K,
    initialValue: T,
): FetchStateType<K, T>;
export function fetchReducerKey(key: string, initialValue: object | []) {
    return {
        [key]: {
            data: initialValue,
            error: false,
            isFetching: false,
        },
    };
}
