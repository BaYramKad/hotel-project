
import { call, all, put, takeEvery, take, takeLatest } from 'redux-saga/effects'


function* workerSaga() {
    yield put({type: 'SUCCESS'})
}

function* watherSaga() {
    yield takeEvery('LOAD_DATA', workerSaga)
}

function* rootSaga() {
    yield all([
        watherSaga()
    ])
}

export default rootSaga