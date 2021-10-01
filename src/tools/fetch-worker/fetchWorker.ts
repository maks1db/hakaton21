import {
    call, put, actionChannel, take,
} from 'redux-saga/effects';
import { getTypes } from '../redux-actions';
import { FetchType } from '../redux-actions/toFetchConst'
import { identity } from 'ramda';

interface AsyncAction {
    success(...args: any): any;
    error(...args: any): any;
}

export type Action = FetchType | AsyncAction;

type FetchWorkerParams = {
    action: Action,
    api: (params: any) => any,
    params?: object,
    /**
     * добавление request-параметров в success в ключ requestParams
     */
    enableRequestParams?: boolean,
    /**
     * массив типов, после которых будет выполнен запрос
     */
    awaitActions?: string[],
    postFetch?: (response: any[]) => any,
};

const isAsyncAction = (action: FetchWorkerParams['action']): action is AsyncAction => typeof action === 'function';

export const fetchWorker = function* ({
    action, api, params = {}, enableRequestParams, awaitActions, postFetch = identity,
}: FetchWorkerParams) {
    const [successType, errorType, successKey] = isAsyncAction(action)
        ? [...getTypes(action.success, action.error), 'payload']
        : [action.SUCCESS, action.ERROR, 'response'];

    let data;

    try {
        if (awaitActions) {
            const channel = yield actionChannel(awaitActions);
            while (true) {
                yield take(channel);
                break;
            }
        }
        data = yield call(api, params);

        yield put({
            type: successType,
            [successKey]: postFetch(data),
            ...(enableRequestParams && { requestParams: params }),
        });
    } catch (error) {
        yield put({ type: errorType, error });
    }

    return data;
};

