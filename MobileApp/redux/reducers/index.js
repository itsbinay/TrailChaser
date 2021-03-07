import {combineReducers} from 'redux';

// Import your other state reducers here and put it inside this combineReducer
import {authentication} from './authentication.reducer';

const rootReducer = combineReducers({
    authentication
})

export default rootReducer;