import { takeLatest, put } from "redux-saga/effects";
import { getEmployees, initApp } from "../reducers/app/appActions";

function* initWorker() {
    yield put(getEmployees());
}

export function* initSaga() {
    yield takeLatest(initApp, initWorker);
}
