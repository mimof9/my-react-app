import { createStore, applyMiddleware } from 'redux'
import reducer from 'state/reducer'
import createSagaMiddleware from 'redux-saga'
import watcher from 'state/saga'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(reducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(watcher)

export default store
