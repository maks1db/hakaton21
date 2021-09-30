import {
    append, filter, isNil, not, mergeDeepRight,
} from 'ramda';
import {
    applyMiddleware, createStore, Middleware, Reducer, Store,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import createSagaMiddleware, { Saga } from 'redux-saga';

import { pipe, flow } from 'fp-ts/lib/function';
import { initApp } from '../reducers/app/appActions';

const sagaMiddleware = createSagaMiddleware();

interface ConfigParams {
    routerMiddleware?: Middleware;
    rootSaga?: Saga<any>;
    rootReducer: Reducer;
    middlewares?: Middleware[];
    initialState?: object;
}

const notNil = flow(isNil, not);

export function configureStore({
    routerMiddleware,
    rootReducer,
    rootSaga,
    middlewares,
    initialState,
}: ConfigParams) {
    const middlewareList = pipe(
        [routerMiddleware],
        x => [...x, ...(middlewares || [])],
        append(rootSaga && sagaMiddleware),
        filter(notNil),
    );

    let store: Store;

    if (initialState) {
        /**
         * Сделаем hydrate всего state
         */
        const state = rootReducer({}, { type: '' });
        store = createStore(
            rootReducer,
            mergeDeepRight(state, initialState),
            // @ts-ignore
            composeWithDevTools(applyMiddleware(...middlewareList)),
        );
    } else {
        store = createStore(
            rootReducer,
            // @ts-ignore
            composeWithDevTools(applyMiddleware(...middlewareList)),
        );
    }

    if (rootSaga) {
        sagaMiddleware.run(rootSaga);
    }

    store.dispatch(initApp());

    return store;
}
