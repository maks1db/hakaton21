import { takeLatest, put } from "redux-saga/effects";
import { getData, initApp } from "../reducers/app/appActions";

function* initWorker() {
    yield put(getData());
}

export function* initSaga() {
    yield takeLatest(initApp, initWorker);
}
