import {userConstants} from '../constants';

const initialState = { 
    isLoggedIn: false,
    user:{}
}

export function authentication(state=initialState,action){
    switch(action.type){
        case userConstants.REGISTER_FAILURE:
        case userConstants.REGISTER_REQUEST:
            return {
                ...state
            }
        case userConstants.REGISTER_SUCCESS:
            return {
                ...state,
                user: action.payload
            }
        default:
            return state;
    }
}