import {homeConstants} from '../constants';
const initialState = {
    trails: [],
    selectedTrail: {}
}

export function home(state = initialState, action){
    switch(action.type){
        case homeConstants.GET_DIFF_REQUEST:
        case homeConstants.GET_LENGTH_REQUEST:
        case homeConstants.GET_TRAILS_REQUEST:
            return {
                ...state
            }
        case homeConstants.GET_LENGTH_SUCCESS:
        case homeConstants.GET_DIFF_SUCCESS:
        case homeConstants.GET_TRAILS_SUCCESS:
            return {
                ...state,
                trails: action.payload,
            }
        case homeConstants.GET_LENGTH_FAILURE:
        case homeConstants.GET_DIFF_FAILURE:
        case homeConstants.GET_TRAILS_FAILURE:
            return {
                ...state
            }
        case homeConstants.SELECT_TRAIL:
            return {
                ...state,
                selectedTrail: action.payload
            }
        default:
            return state

    }
}