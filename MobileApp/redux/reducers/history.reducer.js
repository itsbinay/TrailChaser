import {historyConstants} from '../constants';

const timelineData = require('../../src/views/History/data/Timeline.json')

const initialState = { 
    timeline: timelineData,
    selected: {}
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
                timeline: action.payload,
                selected: {}
            }
        case historyConstants.SELECT_TIMELINE_TILE:
            return {
                ...state,
                selected:action.payload
            }
        default:
            return state
    }
}