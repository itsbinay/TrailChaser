import {userConstants} from '../constants';

const initialState = { 
    isLoggedIn: false,
    user:{},
    image:''
}

export function authentication(state=initialState,action){
    switch(action.type){
        case userConstants.REGISTER_FAILURE:
        case userConstants.REGISTER_REQUEST:
        case userConstants.LOGIN_REQUEST:
        case userConstants.LOGIN_FAILURE:
        case userConstants.FB_REG_LOGIN_REQUEST:
        case userConstants.FB_REG_LOGIN_FAILURE:
            return {
                ...state,
                user:{},
                isLoggedIn:false,
                image:''
            }
        case userConstants.REGISTER_SUCCESS:
            return {
                ...state,
                user: action.payload,
                isLoggedIn: true,
                image:''
            }
        case userConstants.LOGIN_SUCCESS:
            return {
                ...state,
                user:action.payload,
                isLoggedIn:true,
                image:''
            }
        case userConstants.FB_REG_LOGIN_SUCCESS:
            return {
                ...state,
                user:action.payload,
                isLoggedIn:true,
                image:action.payload2
            }
        default:
            return state;
    }
}