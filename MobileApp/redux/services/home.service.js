import Axios from 'axios'

const API_URL = require('../../module.config').PROD_URL;
const API_URL_DEV = require('../../module.config').DEV_URL;
export const homeService = {
    fetchAllTrails,
    fetchDiffTrails,
    fetchMinMaxLTrails
}

async function fetchAllTrails(){
    
    try{
        console.log("enter:")
        const returned_promise = Axios.get(API_URL + '/getTrails')
        
        const response = await returned_promise
        
        const result = response.data.result
        console.log("output: ", result.slice(0,2))
        return result

    }catch (err) {
        console.log("err", err)
    }
}

async function fetchDiffTrails(diff){
    let formData = new FormData()
    formData.append('difficulty', diff)
    try{
        console.log("enter diff:", diff)
        const returned_promise = Axios.post(
                API_URL+'/getDifficultTrails',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
        )
        
        const response = await returned_promise
        
        const result = response.data.result
        console.log("output diff: ", result.slice(0,2))
        return result

    }catch (err) {
        console.log("err", err)
    }
}

async function fetchMinMaxLTrails(minL, maxL){
    let formData = new FormData()
    formData.append('minLength', minL)
    formData.append('maxLength', maxL)
    try{
        console.log("enter len: ", minL, maxL)
        const returned_promise = Axios.post(
                API_URL+'/getLengthTrails',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
        )
        
        const response = await returned_promise
        
        const result = response.data.result
        console.log("output len: ", result.slice(0,2))
        return result

    }catch (err) {
        console.log("err", err)
    }
}