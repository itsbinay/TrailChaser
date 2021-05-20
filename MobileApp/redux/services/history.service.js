import Axios from 'axios'

const API_URL = require('../../module.config').PROD_URL;

export const historyService = {
    fetchTimeline,
    fetchLocation,
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

async function fetchLocation(){
    
    console.log("only:",API_URL+'/locationData')
    console.log("service called")
    try{
        return await Axios.get(
            API_URL+'/locationData'
        )
        .then(response=>response.data)
        .then(data=>{
            return data.result
        })

    }catch (err) {
        console.log("err", err)
        throw new Error("error")
    }
}