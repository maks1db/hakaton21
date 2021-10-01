import { all } from 'redux-saga/effects'
import { fetchEmployeesSaga } from './fetchEmployeesSaga'

export function* fetchSaga() {
    yield all([
        fetchEmployeesSaga()
    ])
}