import Axios from 'axios'
const API_URL = "https://10.0.2.2:5000"

export const homeService = {
    fetchAllTrails
}

async function fetchAllTrails(){
    
    try{
        console.log("enter")
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