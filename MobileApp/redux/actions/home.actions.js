import { homeService } from '../services';
import {homeConstants} from '../constants';
export const homeActions = {
    fetchAllTrails,
    fetchDiffTrails,
    fetchMinMaxLTrails,
    selectTrail,
    weatherAPI,
    searchTrails
};

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
function weatherAPI(){
    return dispatch => {
        dispatch(request())
        homeService.weatherAPI()
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

    function request() {return {type: homeConstants.WEATHER_REQUEST }}
    function success(data) { return { type: homeConstants.WEATHER_SUCCESS, payload: data } }
    function failure() { return { type: homeConstants.WEATHER_FAILURE} }
}
function selectTrail(trail){
    return dispatch=>{
        dispatch(success(trail))
    }
    function success(data) {return {type:homeConstants.SELECT_TRAIL,payload:data}}
}
function fetchDiffTrails(value){
    let difficulty = ""
    if(value === 0){
        difficulty = "easy"
    }
    else if(value === 1){
        difficulty = "moderate"
    }
    else{
        difficulty = "hard"
    }
    return dispatch => {
        dispatch(request())
        homeService.fetchDiffTrails(difficulty)
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

    function request() {return {type: homeConstants.GET_DIFF_REQUEST }}
    function success(data) { return { type: homeConstants.GET_DIFF_SUCCESS, payload: data } }
    function failure() { return { type: homeConstants.GET_DIFF_FAILURE} }
}

function fetchMinMaxLTrails(min, max){
    let minL = min.toString() + ' km'
    let maxL = max.toString() + ' km'
    console.log("action")
    return dispatch => {
        dispatch(request())
        console.log("dispatch")
        homeService.fetchMinMaxLTrails(minL, maxL)
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

    function request() {return {type: homeConstants.GET_LENGTH_REQUEST }}
    function success(data) { return { type: homeConstants.GET_LENGTH_SUCCESS, payload: data } }
    function failure() { return { type: homeConstants.GET_LENGTH_FAILURE} }
}

function searchTrails(dat) {
    return dispatch =>{
        dispatch(success(dat))
    }
    function success(data) { return {type:homeConstants.SEARCH_TRAILS,payload:data}}
}