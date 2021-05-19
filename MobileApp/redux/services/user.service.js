import Axios from 'axios';
const API_URL = require('../../module.config').PROD_URL;
const local = "http://192.168.3.3:5000/"
export const userService = {
    register
}

async function register(data){
    try{
        return await Axios.get(
            local+'/register'
        )
        .then(result=> result.data)
        .then(data => {
            return data
        })

    }catch (err) {
        console.log("err", err)
    }
}

