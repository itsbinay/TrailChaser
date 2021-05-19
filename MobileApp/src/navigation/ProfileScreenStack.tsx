import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {ProfileScreenParamList} from './types';

import ProfileScreenRoot from '../views/Profile/ProfileScreenRoot';
import ProfileScreen from '../views/Profile/Profile';
import {connect} from 'react-redux';

const ProfileScreenStack = createStackNavigator<ProfileScreenParamList>();


function ProfileScreenNavigator(props:any) {

    return (
        <ProfileScreenStack.Navigator
            initialRouteName={"Root"}
            screenOptions={{
                headerTitleStyle:{color:"black"},
                headerShown: props.auth.isLoggedIn
            }}
            >
            <ProfileScreenStack.Screen
                name="Root"
                component={ProfileScreenRoot}
                options={{headerTitle:'Profile'}}
                />
            <ProfileScreenStack.Screen
                name="Profile2"
                component={ProfileScreen}
                options={{
                    headerTitle:"Profile"
                }}
            />
        </ProfileScreenStack.Navigator>
    )
}

const mapStateToProps = function(state:any){
    return {
        auth: state.authentication
    }
}
export default connect(mapStateToProps)(ProfileScreenNavigator);