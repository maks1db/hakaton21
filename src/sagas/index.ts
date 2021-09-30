import { all } from 'redux-saga/effects';

import { initSaga } from './initSaga'

export function* rootSaga() {
    yield all([
        initSaga(),
    ]);
}
