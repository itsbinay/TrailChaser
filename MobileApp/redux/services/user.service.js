import Axios from 'axios';
const API_URL = require('../../module.config').PROD_URL;
export const userService = {
    register,
    login,
    fbloginreg
}

async function fbloginreg(body){
    try{
        return await Axios.post(
            API_URL+'/fbreglogin',
            body
        )
        .then(response=> response.data)
        .then(data => {
            console.log("response:",data.result)
            return data.result
        })

    }catch (err) {
        console.log("err", err)
        throw new Error(err)
    }
}

async function register(body){
    try{
        return await Axios.post(
            API_URL+'/register',
            body
        )
        .then(response=> response.data)
        .then(data => {
            console.log("response:",data.result)
            return data.result
        })

    }catch (err) {
        console.log("err", err)
        throw new Error(err)
    }
}

async function login(body){
    try{
        return await Axios.post(
            API_URL+'/login',
            body
        )
        .then(response=>response.data)
        .then(data=> {
            console.log("response:",data.result)
            return data.result
        })
    }catch(err){
        console.log("err",err)
        throw new Error(err)
    }
}

