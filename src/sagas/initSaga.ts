import { takeLatest, put } from "redux-saga/effects";
import { getData, initApp } from "../reducers/app/appActions";
import { updateSetting } from '../reducers/settings/settingsActions'

const { fields } = window.__ABB

function* initWorker() {
    yield put(getData());
    yield put(updateSetting({
        setting: 'fields',
        data: fields?.map(field => ({ field })) || []
    }))
}

export function* initSaga() {
    yield takeLatest(initApp, initWorker);
}
