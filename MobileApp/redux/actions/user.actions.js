import {userConstants} from '../constants';
import { userService } from '../services';

export const userActions = {
    register,
    login,
    fbloginreg,
    logout
}

function fbloginreg(data,imageurl){
    return dispatch => {
        dispatch(request())
        userService.fbloginreg(data)
            .then(
                result =>{
                    dispatch(success(result,imageurl));
                },
                error => {
                    console.log('error: ', error)
                    dispatch(failure()); 
                }
            )
    }
    function request() {return {type: userConstants.FB_REG_LOGIN_REQUEST }}
    function success(data,url) { return { type: userConstants.FB_REG_LOGIN_SUCCESS, payload: data,payload2:url } }
    function failure() { return { type: userConstants.FB_REG_LOGIN_FAILURE} }
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

function logout(){
    return dispatch =>{
        dispatch(request())
    }

    function request() {return {type: userConstants.LOGOUT_REQUEST }}
   
}