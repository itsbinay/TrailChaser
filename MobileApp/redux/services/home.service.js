import Axios from 'axios'

const API_URL = require('../../module.config').PROD_URL;

export const homeService = {
    fetchAllTrails
}

async function fetchAllTrails(){
    
    try{
        // return await Axios.get(
        //     'http://10.0.2.2:5000/getTrails')
        // .then(result=> result.data)
        // .then(data => {
        //     return data.result
        // })
        const returned_promise = Axios.get(
            API_URL + '/getTrails'
        )
        console.log("ERROR")
        const response = await returned_promise
        const result = response.data.result
        return result

    }catch (err) {
        console.log("err", err)
      }
}