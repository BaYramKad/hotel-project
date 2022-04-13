import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../sagas'

import setUser from './redusers/setUser'

const sagaMiddleware = createSagaMiddleware()
const redusers = combineReducers({
    setUser
})
const store = createStore( 
    redusers,
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(applyMiddleware(sagaMiddleware))
)

sagaMiddleware.run(rootSaga)

export default store