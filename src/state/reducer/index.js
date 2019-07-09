import { combineReducers } from 'redux'
import counter from 'state/reducer/x'
import isFetching from 'state/reducer/isFetching'

export default combineReducers({
    x: counter,
    isFetching
})
