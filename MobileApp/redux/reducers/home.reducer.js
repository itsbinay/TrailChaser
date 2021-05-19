import {homeConstants} from '../constants';
const initialState = {
    trails: []
}

export function home(state = initialState, action){
    switch(action.type){
        case homeConstants.GET_TRAILS_REQUEST:
            return {
                ...state
            }
        case homeConstants.GET_TRAILS_SUCCESS:
            return {
                ...state,
                trails: action.payload,
            }
        
        case homeConstants.GET_TRAILS_FAILURE:
            return {
                ...state
            }
        default:
            return state

    }
}