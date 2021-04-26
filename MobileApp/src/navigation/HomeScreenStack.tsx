import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {HomeScreenParamList} from './types';

import HomeScreenRoot from '../views/Home/HomeScreenRoot';

const HomeScreenStack = createStackNavigator<HomeScreenParamList>();


export default function HomeScreenNavigator() {
    return (
        <HomeScreenStack.Navigator
            initialRouteName="Root"
            screenOptions={{
                headerTitleStyle:{color:"black",}
            }}
            >
            <HomeScreenStack.Screen
                name="Root"
                component={HomeScreenRoot}
                options={{headerTitle:'Home'}}
                />
        </HomeScreenStack.Navigator>
    )
}