import { takeLatest } from "redux-saga/effects";
import { getEmployees } from "../../reducers/app/appActions";
import { fetchWorker } from "../../tools/fetch-worker";
import * as api from "../../api";

function* fetchEmployeesWorker() {
    yield fetchWorker({
        api: api.getEmployees,
        action: getEmployees,
    });
}

export function* fetchEmployeesSaga() {
    yield takeLatest(getEmployees, fetchEmployeesWorker);
}
