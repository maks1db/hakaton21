import { all } from 'redux-saga/effects'
import { fetchDataSaga } from './fetchDataSaga'

export function* fetchSaga() {
    yield all([
        fetchDataSaga()
    ])
}