import { all } from "redux-saga/effects";
import { fetchSaga } from "./fetch";

import { initSaga } from "./initSaga";
import { settingsSaga } from "./settingsSaga";

export function* rootSaga() {
    yield all([initSaga(), fetchSaga(), settingsSaga()]);
}
