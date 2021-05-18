import React from 'react';
import {View,Text,Dimensions} from 'react-native'
import {IconButton} from 'react-native-paper'

const {height,width} = Dimensions.get('window')

function Login(){
    return(
        <View style={{height:height,width:width,backgroundColor:"white",display:"flex",alignItems:"center"}}>
            <Text style={{padding:5}}/>
            <View>
                <IconButton
                    icon="cross"
                />
            </View>
            <Text>
                Login
            </Text>
        </View>
    )
}

export default Login;