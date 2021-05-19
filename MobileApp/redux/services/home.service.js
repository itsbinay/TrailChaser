import Axios from 'axios'

const API_URL = require('../../module.config').PROD_URL;
const API_URL_DEV = require('../../module.config').DEV_URL;
export const homeService = {
    fetchAllTrails
}

async function fetchAllTrails(){
    
    try{
        console.log("enter:")
        const returned_promise = Axios.get(API_URL + '/getTrails')
        
        const response = await returned_promise
        
        const result = response.data.result
        console.log("output: ", result.slice(0,10))
        return result

    }catch (err) {
        console.log("err", err)
    }
}