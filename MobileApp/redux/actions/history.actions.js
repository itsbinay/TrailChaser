import {historyConstants} from '../constants';
import {historyService} from '../services';

export const historyActions = {
    fetchTimeline
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