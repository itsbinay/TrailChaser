import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import HomeScreenNavigator from './HomeScreenStack';

import {BottomTabParamList, RootStackParamList} from './types';
import ProfileScreenNavigator from './ProfileScreenStack';

import Icon from 'react-native-vector-icons/AntDesign';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

function BottomTabNavigator() { 
    
    return (
        <BottomTab.Navigator
            initialRouteName="Home"
            tabBarOptions={{
                activeTintColor:'#000' ,
                inactiveTintColor:'#000'
                }}>
                <BottomTab.Screen
                    name="Home"
                    component={HomeScreenNavigator}
                    options={{
                        tabBarIcon: ()=> <Icon name="profile" size={30}/>
                    }}
                />
                <BottomTab.Screen
                    name="Profile"
                    component={ProfileScreenNavigator}
                    options={{
                        tabBarIcon: ()=> <Icon name="profile" size={30}/>
                    }}
                />
        </BottomTab.Navigator>
    )
}

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator(){
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Root" component={BottomTabNavigator}/>
        </Stack.Navigator>
    )
}
export default function Navigation(){
    return(
        <NavigationContainer>
            <RootNavigator/>
        </NavigationContainer>
    )
}