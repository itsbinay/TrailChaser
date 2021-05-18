import { homeService } from '../services';
import {homeConstants} from '../constants';
export const homeActions = {
    fetchAllTrails,
};
//string: 15.8km
function fetchAllTrails(){
    return dispatch => {
        dispatch(request())
        homeService.fetchAllTrails()
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

    function request() {return {type: homeConstants.GET_TRAILS_REQUEST }}
    function success(data) { return { type: homeConstants.GET_TRAILS_SUCCESS, payload: data } }
    function failure() { return { type: homeConstants.GET_TRAILS_FAILURE} }
}