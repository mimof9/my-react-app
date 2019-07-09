import { put, take, all } from 'redux-saga/effects'

const delay = (ms) => new Promise(res => setTimeout(res, ms))

function* increment() {
    while (true) {
        const action = yield take('INCREMENT_ASYNC')
        yield put({ type: 'isFetching', payload: true })
        yield delay(1000)
        yield put({ type: 'INCREMENT' })
        yield put({ type: 'isFetching', payload: false })
    }
}

function* decrement() {
    while (true) {
        const action = yield take('DECREMENT_ASYNC')
        yield put({ type: 'isFetching', payload: true })
        yield delay(1000)
        yield put({ type: 'DECREMENT' })
        yield put({ type: 'isFetching', payload: false })
    }
}

// saga拦截了请求
export default function* watcher() {
    yield all([
        increment(),
        decrement()
    ])
}
