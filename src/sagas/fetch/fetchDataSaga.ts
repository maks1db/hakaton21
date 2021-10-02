import { takeLatest } from "redux-saga/effects";
import { getData } from "../../reducers/app/appActions";
import { fetchWorker } from "../../tools/fetch-worker";
import * as api from "../../api";

function* fetchDataWorker() {
    yield fetchWorker({
        api: api.getFromSource,
        action: getData,
    });
}

export function* fetchDataSaga() {
    yield takeLatest(getData, fetchDataWorker);
}
