import React from 'react';
import {View,Text,Dimensions,Image, StyleSheet} from 'react-native'
import {Button, IconButton,TextInput} from 'react-native-paper'

const logo1 = require('../../logo.png')
import FacebookLogin from '../../components/FacebookLogin';
import GoogleLogin from '../../components/GoogleLogin';

const {height,width} = Dimensions.get('window')

const styles = StyleSheet.create({
    mainHeader: {
        fontSize: 24,
        fontWeight:"500"
    },
    subHeader: {
        fontSize: 24,
        fontWeight: "500"
    },
    divider:{
        height:2,
        backgroundColor:"#ccc",
        flex:1
    }
})
function Login(props:any){

    const onClickClose = () =>{
        props.onClose();
    }

    const onPressLogin = () =>{

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
            <View style={{padding:15}}/>
            <Image
                source={logo1}
                style={{height:100,width:100}}
                resizeMode="contain"
            />
            <View style={{padding:15}}/> 
            <View style={{width:width*0.7,alignItems:"center"}}>
                <Text style={styles.mainHeader}>Welcome back.</Text>
                <Text style={styles.subHeader}>Login and let's get going.</Text>
            </View> 
            <View style={{padding:10}}/>
            <View style={{width:width*0.9}}>
                <TextInput
                    style={{height:60}}
                    placeholder="Username"
                    mode="outlined"
                    selectionColor="#597d35"
                    theme={{colors:{primary:"#597d35"}}}
                    />
                <View style={{padding:5}}/>  
                <TextInput
                    style={{height:60}}
                    mode="outlined"
                    placeholder="Password"
                    selectionColor="#597d35"
                    secureTextEntry={true}
                    theme={{colors:{primary:"#597d35"}}}
                    />    
            </View>  
            <View style={{padding:10}}/>  
            <Button
                style={{width:width*0.9,paddingVertical:4}}
                mode="contained"
                color="#597d35"
                onPress={onPressLogin}
            >
                Log In
            </Button>
            <View style={{padding:10}}/>  
            <View style={{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",width: width*0.9}}>
                <View style={styles.divider}/>
                <Text style={{paddingHorizontal:20}}>or</Text>
                <View style={styles.divider}/>
            </View>
            <View style={{padding:10}}/>  
            <FacebookLogin/>
            <View style={{padding:10}}/>
            <GoogleLogin/>
        </View>
    )
}

export default Login;