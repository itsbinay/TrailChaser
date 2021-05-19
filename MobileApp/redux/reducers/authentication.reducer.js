import {userConstants} from '../constants';

const initialState = { 
    isLoggedIn: false,
    user:{}
}

export function authentication(state=initialState,action){
    switch(action.type){
        case userConstants.REGISTER_FAILURE:
        case userConstants.REGISTER_REQUEST:
        case userConstants.LOGIN_REQUEST:
        case userConstants.LOGIN_FAILURE:
            return {
                ...state,
                user:{},
                isLoggedIn:false
            }
        case userConstants.REGISTER_SUCCESS:
            return {
                ...state,
                user: action.payload,
                isLoggedIn: true
            }
        case userConstants.LOGIN_SUCCESS:
            return {
                ...state,
                user:action.payload,
                isLoggedIn:true
            }
        default:
            return state;
    }
}