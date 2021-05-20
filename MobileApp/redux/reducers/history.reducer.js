import {historyConstants} from '../constants';

const initialState = { 
    timeline: []
}

export function history(state=initialState,action){
    switch(action.type){
        case historyConstants.GET_TIMELINE_REQUEST:
        case historyConstants.GET_TIMELINE_FAILURE:
            return {
                ...state,
            }
        case historyConstants.GET_TIMELINE_SUCCESS:
            return {
                ...state,
                timeline: action.payload
            }
        default:
            return state
    }
}