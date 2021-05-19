import {combineReducers} from 'redux';

// Import your other state reducers here and put it inside this combineReducer
import {authentication} from './authentication.reducer';
import {home} from './home.reducer';

const rootReducer = combineReducers({
    home,
    authentication
})

export default rootReducer;