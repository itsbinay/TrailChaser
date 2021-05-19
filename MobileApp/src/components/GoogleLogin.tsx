import React from 'react';
import {View, Text,Dimensions,Image, StyleSheet} from 'react-native';
import {GoogleSignin,statusCodes} from '@react-native-google-signin/google-signin';
import { TouchableOpacity } from 'react-native-gesture-handler';

const width = Dimensions.get('window').width
GoogleSignin.configure({
    webClientId:'863831967595-021017alslcppqr6n09ol70t6amdrd8v.apps.googleusercontent.com',
    offlineAccess: true
})
const googlelogo = require('./googlelogo.png')

const styles = StyleSheet.create({
    mainView:{
        backgroundColor:"white",
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        paddingVertical:10,
        paddingRight:20,
        paddingLeft:10,
        borderRadius:5,
        width:width*0.9,
        borderColor:"gray",
        borderWidth:0.5
    }
})
function GoogleLogin(props:any){

    const onclicklogin = () =>{
        const signIn = async()=>{
            try{
                await GoogleSignin.hasPlayServices();
                const userInfo = await GoogleSignin.signIn();
                console.log("userinfo:",userInfo)
            } catch(error){
                if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                    // user cancelled the login flow
                    console.log("signInCancelled")
                  } else if (error.code === statusCodes.IN_PROGRESS) {
                    // operation (e.g. sign in) is in progress already
                    console.log("signin in progresss")

                  } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                    // play services not available or outdated
                    console.log("playservices not available")
                  } else {
                    // some other error happened
                    console.log("error:",error)
                  }
            }
        }
        signIn()
    }

    return (
        <TouchableOpacity
            onPress={onclicklogin}
            >
            <View style={styles.mainView}>
                <Image
                    source={googlelogo}
                    style={{height:25,width:25,resizeMode:"contain"}}
                />
                <View style={{paddingHorizontal:width*0.1}}/>
                    <Text style={{color:"black",fontSize:15,fontWeight:"bold"}}>Continue with Google</Text>
            </View>
        </TouchableOpacity>
    )
}

export default GoogleLogin;
