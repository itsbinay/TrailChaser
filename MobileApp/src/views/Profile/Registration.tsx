import React,{useState} from 'react';
import {View,Text,StyleSheet,Dimensions,Image,ScrollView} from 'react-native';

import {Button, IconButton,TextInput} from 'react-native-paper'


const logo1 = require('../../logo.png')
import FacebookLogin from '../../components/FacebookLogin';
import GoogleLogin from '../../components/GoogleLogin';
const {height,width} = Dimensions.get('window')

const styles = StyleSheet.create({
    mainHeader: {
        fontSize: 24,
        fontWeight:"500",
        textAlign:"center"
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
function Registration(props:any){

    const [firstName,setFirstName] = useState("")
    const [lastName,setLastName] = useState("")
    const [emailAddress,setEmailAddress] = useState("")
    const [password,setPassword] = useState("")

    const onChangeFirstName = (e:any) => {
        setFirstName(e)
    }

    const onChangelastName = (e:any) => {
        setLastName(e)
    }

    const onChangeemailAddress = (e:any) => {
        setEmailAddress(e)
    }

    const onChangepassword = (e:any) => {
        setPassword(e)
    }
    const onClickClose = () =>{
        props.onClose();
    }

    const onPressRegister = () =>{
        if(firstName!== '' 
            && lastName!==''
            && emailAddress!==''
            && password!==''){
                
        }
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
            <ScrollView contentContainerStyle={{alignItems:"center",paddingBottom:90}}>
                <View style={{padding:15}}/>
                <Image
                    source={logo1}
                    style={{height:100,width:100}}
                    resizeMode="contain"
                />
                <View style={{padding:15}}/> 
                <View style={{width:width*0.7,alignItems:"center"}}>
                    <Text style={styles.mainHeader} numberOfLines={2}>Create an account to save your progress.</Text>
                </View> 
                <View style={{padding:10}}/>
                <View style={{width:width*0.9}}>
                    <TextInput
                        style={{height:45}}
                        placeholder="First Name"
                        mode="outlined"
                        selectionColor="#597d35"
                        value={firstName}
                        onChangeText={onChangeFirstName}
                        theme={{colors:{primary:"#597d35"}}}
                        />
                    <View style={{padding:5}}/>
                    <TextInput
                        style={{height:45}}
                        placeholder="Last Name"
                        mode="outlined"
                        selectionColor="#597d35"
                        value={lastName}
                        onChangeText={onChangelastName}
                        theme={{colors:{primary:"#597d35"}}}
                        />
                    <View style={{padding:5}}/>
                    <TextInput
                        style={{height:45}}
                        placeholder="Email Address"
                        mode="outlined"
                        selectionColor="#597d35"
                        value={emailAddress}
                        onChangeText={onChangeemailAddress}
                        theme={{colors:{primary:"#597d35"}}}
                        />
                    <View style={{padding:5}}/>     
                    <TextInput
                        style={{height:45}}
                        mode="outlined"
                        placeholder="Password"
                        selectionColor="#597d35"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={onChangepassword}
                        theme={{colors:{primary:"#597d35"}}}
                        />    
                </View>  
                <View style={{padding:10}}/>  
                <Button
                    style={{width:width*0.9,paddingVertical:4}}
                    mode="contained"
                    color="#597d35"
                    onPress={onPressRegister}
                >
                    Sign Up
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
            </ScrollView>
        </View>
    )
}

export default Registration;