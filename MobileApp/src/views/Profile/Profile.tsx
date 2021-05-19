import React from 'react';
import {View,Text} from 'react-native';
import {connect} from 'react-redux';
import {Avatar} from 'react-native-elements';
import StickyParalaxHeader from 'react-native-sticky-parallax-header'
const defaultimage = require('./images/avatardefault.jpg')

function Profile(props:any){

    console.log("auth:",props.auth.user.firstname)
    return(
        <View>

        </View>
    )
}

const mapStateToProps = function(state:any){
    return {
        auth: state.authentication
    }
}
export default connect(mapStateToProps)(Profile);