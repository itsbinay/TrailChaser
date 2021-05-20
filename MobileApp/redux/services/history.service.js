import Axios from 'axios'

const API_URL = require('../../module.config').PROD_URL;

export const historyService = {
    fetchTimeline
}

async function fetchTimeline(){
    
    console.log("only:",API_URL+'/timelineData')
    console.log("service called")
    try{
        return await Axios.get(
            API_URL+'/timelineData'
        )
        .then(response=>response.data)
        .then(data=>{
            console.log("data:",data[0].data)
            return data
        })

    }catch (err) {
        console.log("err", err)
        throw new Error("error")
    }
}