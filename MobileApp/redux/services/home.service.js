import Axios from 'axios'
const API_URL = "http://10.0.2.2:5000"

export const homeService = {
    fetchAllTrails
}

async function fetchAllTrails(){
    
    try{
        // console.log("enter:")
        // const returned_promise = Axios.get(API_URL + '/getTrails')
        
        // const response = await returned_promise
        // console.log("here", response)
        // const result = response.data.result
        // return result

        console.log("enter")
        fetch('http://10.0.2.2:5000/getTrails',{
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
        })
        .catch(err => console.error("err1", err))
        .then(response => response.json())
        .catch(err => console.error("err2", err))
        .then(data => {
            console.log("here: ", data);
        })
        .catch(err => console.error("err3", err));

    }catch (err) {
        console.log("err", err)
    }
}