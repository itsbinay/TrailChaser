import {userConstants} from '../constants';

const initialState = { 
    isLoggedIn: false,
    user:{}
}

export function authentication(state=initialState,action){
    switch(action.type){
        default:
            return state;
    }
}