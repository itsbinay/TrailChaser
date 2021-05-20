import {historyConstants} from '../constants';
import {historyService} from '../services';

export const historyActions = {
    fetchTimeline,
    selectTimeline,
};

function fetchTimeline(){

    return dispatch => {
        dispatch(request())
        historyService.fetchTimeline()
            .then(
                result =>{
                    dispatch(success(result));
                },
                error => {
                    dispatch(failure());
                }
            )
    }

    function request() {return {type: historyConstants.GET_TIMELINE_REQUEST }}
    function success(data) { return { type: historyConstants.GET_TIMELINE_SUCCESS, payload: data } }
    function failure() { return { type: historyConstants.GET_TIMELINE_FAILURE} }
}

function selectTimeline(data){
    return dispatch => {
        dispatch(success(data))
    }
    function success(data) { return { type: historyConstants.SELECT_TIMELINE_TILE, payload: data } }
}