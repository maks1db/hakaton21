import { takeLatest } from "redux-saga/effects";
import { initApp } from "../reducers/app/appActions";

function initWorker() {
    console.log("START APP");
}

export function* initSaga() {
    yield takeLatest(initApp, initWorker);
}
