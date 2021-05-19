import React from 'react';
import {View,Text,TouchableOpacity,Image} from 'react-native';
import {LoginManager,AccessToken,Profile} from "react-native-fbsdk-next";

const fblogo = require('./fblogo.png')

function FacebookLogin(props:any){

    const onClickLogin = () =>{
        LoginManager.logInWithPermissions(["public_profile"]).then(
            function(result){
                if(result.isCancelled){
                    console.log("login cancelled");
                }else{

                }
            },
            function(error){
                console.log("Login fail with error: "+error)
            }
        )
        Profile.getCurrentProfile().then(
            function(currentProfile){
                if(currentProfile){
                    const profileImageurl = currentProfile.imageURL
                    const firstName = currentProfile.firstName
                    const lastName = currentProfile.lastName
                    const userId = currentProfile.userID
                    
                    console.log("profile:",currentProfile)
                }
            }
        )
    }
    return(
        <TouchableOpacity
            onPress={onClickLogin}
            >
            <View style={{backgroundColor:"#3a559f",display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",paddingVertical:10,paddingRight:20,paddingLeft:10,borderRadius:5}}>
                <Image
                    source={fblogo}
                    style={{height:25,width:25,resizeMode:"contain"}}
                    
                />
                <View style={{paddingHorizontal:7}}/>
                <Text>Welcome back.</Text>
                <Text>Login and let's get going.</Text>
                <Text style={{color:"white",fontSize:15,fontWeight:"bold"}}>Continue with Facebook</Text>
            </View>
        </TouchableOpacity>

    )
}

export default FacebookLogin;
