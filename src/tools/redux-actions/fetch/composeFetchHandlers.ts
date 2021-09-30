import { createReducer } from '../createReducer';
import fetchHandlers from './fetchHandlers';
import fetchKey from './fetchKey';
import { FetchKeysParams } from './types';

const composeFetchHandlers = (fetchKeys: FetchKeysParams) => {
    const handlers = Object.keys(fetchKeys).reduce((accum, key) => {
        const tuple = fetchKeys[key];
        return { ...accum, ...fetchKey(key, tuple[1])(fetchHandlers(tuple[0])) };
    }, {}) as any;
    return createReducer({}, handlers) as <S>(state: S, action: any) => S;
};

export default composeFetchHandlers;
