import {userConstants} from '../constants';
import { userService } from '../services';

export const userActions = {
    register,
    login
}

function register(data){
    return dispatch => {
        dispatch(request())
        userService.register(data)
            .then(
                result =>{
                    dispatch(success(result));
                },
                error => {
                    console.log('error: ', error)
                    dispatch(failure()); 
                }
            )
    }
    function request() {return {type: userConstants.REGISTER_REQUEST }}
    function success(data) { return { type: userConstants.REGISTER_SUCCESS, payload: data } }
    function failure() { return { type: userConstants.REGISTER_FAILURE} }
}

function login(data){
    return dispatch =>{
        dispatch(request())
        userService.login(data)
            .then(
                result=>{
                    dispatch(success(result))
                },
                error =>{
                    console.log("error: ", error)
                    dispatch(failure())
                }
            )
    }

    function request() {return {type: userConstants.LOGIN_REQUEST }}
    function success(data) { return { type: userConstants.LOGIN_SUCCESS, payload: data } }
    function failure() { return { type: userConstants.LOGIN_FAILURE} }
}