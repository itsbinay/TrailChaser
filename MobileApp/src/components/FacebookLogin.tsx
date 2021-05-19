import React from 'react';
import {View,Text,TouchableOpacity,Image, Dimensions} from 'react-native';
import {LoginManager,AccessToken,Profile} from "react-native-fbsdk-next";
import {useDispatch} from 'react-redux'
import {userActions} from '../../redux/actions';


const fblogo = require('./fblogo.png')
const width = Dimensions.get('window').width

function FacebookLogin(props:any){

    const dispatch = useDispatch();

    const onClickLogin = () =>{
        LoginManager.logInWithPermissions(["public_profile"]).then(
            function(result:any){
                if(result.isCancelled){
                    console.log("login cancelled");
                }else{
                    console.log("success")
                    Profile.getCurrentProfile().then(
                        function(currentProfile:any){
                            if(currentProfile){
                                const profileImageurl = currentProfile.imageURL
                                const firstName = currentProfile.firstName
                                const lastName = currentProfile.lastName
                                const userId = currentProfile.userID
                                
                                const user = {
                                    'username': userId,
                                    'firstname':firstName,
                                    'lastname': lastName,
                                    'type': 'facebook'
                                }
                                dispatch(userActions.fbloginreg(user,profileImageurl))
                            }
                        }
                    )
                }
            },
            function(error:any){
                console.log("Login fail with error: "+error)
            }
        )

    }
    return(
        <TouchableOpacity
            onPress={onClickLogin}
            >
            <View style={{backgroundColor:"#3a559f",display:"flex",flexDirection:"row",alignItems:"center",paddingVertical:10,paddingRight:20,paddingLeft:10,borderRadius:5,width:width*0.9}}>
                <Image
                    source={fblogo}
                    style={{height:25,width:25,resizeMode:"contain"}}
                    
                />
                <View style={{paddingHorizontal:width*0.1}}/>
                <Text style={{color:"white",fontSize:15,fontWeight:"bold"}}>Continue with Facebook</Text>
            </View>
        </TouchableOpacity>

    )
}

export default FacebookLogin;
