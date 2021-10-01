import { all } from "redux-saga/effects";
import { fetchSaga } from "./fetch";

import { initSaga } from "./initSaga";

export function* rootSaga() {
    yield all([initSaga(), fetchSaga()]);
}
