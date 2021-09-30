import toFetchConst, { FetchType } from './toFetchConst';
import { createAction } from './createAction';
import { makeActionCreator } from './makeActionCreator';

export interface AsyncActions<S> {
    clear(): { type: string };
    error<E>(error: E): { type: string, error: E };
    fetchKey(initialValue: [] | {}): [FetchType, S];
}

export function makeAsyncActionCreator<S>(
    type: string
): AsyncActions<S> & {
    (): { type: string },
    success(payload: S): { type: string, payload: S },
};

export function makeAsyncActionCreator<S, R>(
    type: string
): AsyncActions<S> & {
    (payload: R): { type: string, payload: R },
    success(payload: S): { type: string, payload: S },
};

export function makeAsyncActionCreator(type) {
    const fetchTypes = toFetchConst(type);

    const requestActionCreator: any = createAction(fetchTypes.REQUEST);
    requestActionCreator.success = createAction(fetchTypes.SUCCESS);
    requestActionCreator.error = makeActionCreator(fetchTypes.ERROR, 'error');
    requestActionCreator.clear = makeActionCreator(fetchTypes.CLEAR);
    requestActionCreator.fetchKey = initialValue => [
        fetchTypes,
        initialValue,
    ];

    return requestActionCreator;
}
