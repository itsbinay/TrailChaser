import React from 'react';
import {View,Text,Dimensions,Image} from 'react-native'
import {IconButton,Button} from 'react-native-paper'

const logo1 = require('../../logo.png')
import FacebookLogin from '../../components/FacebookLogin';

const {height,width} = Dimensions.get('window')

function Login(props:any){

    const onClickClose = () =>{
        props.onClose();
    }
    return(
        <View style={{height:height,width:width,backgroundColor:"white",display:"flex",alignItems:"center"}}>
            <Text style={{padding:5}}/>
            <View style={{width:"100%",alignItems:"flex-start"}}>
                <IconButton
                    icon="close"
                    onPress={onClickClose}
                />
            </View>
            <View style={{padding:45}}/>
            <Image
                source={logo1}
                style={{height:100,width:100}}
                resizeMode="contain"
            />
            <View style={{padding:45}}/>  
            <FacebookLogin/>
        </View>
    )
}

export default Login;