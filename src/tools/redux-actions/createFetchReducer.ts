import { FetchKeysParams } from './fetch/types';
import { composeFetchHandlers, fetchInitialState } from './fetch';
import { FetchInitialStateType } from './fetch/fetchInitialState';

const createFetchReducer = <T extends FetchKeysParams>(
    fetchKeys: T,
): [FetchInitialStateType<T>, (state: any, action: any) => any] => [
        fetchInitialState(fetchKeys),
        composeFetchHandlers(fetchKeys),
    ];

export default createFetchReducer;
