import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {ProfileScreenParamList} from './types';

import ProfileScreenRoot from '../views/Profile/ProfileScreenRoot';

const ProfileScreenStack = createStackNavigator<ProfileScreenParamList>();


export default function ProfileScreenNavigator() {
    return (
        <ProfileScreenStack.Navigator
            initialRouteName="Root"
            >
            <ProfileScreenStack.Screen
                name="Root"
                component={ProfileScreenRoot}
                options={{headerTitle:'Profile'}}
                />
        </ProfileScreenStack.Navigator>
    )
}