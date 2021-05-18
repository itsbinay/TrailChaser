import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import {BottomTabParamList, RootStackParamList} from './types';

import ProfileScreenNavigator from './ProfileScreenStack';
import HomeScreenNavigator from './HomeScreenStack';
import HistoryScreenNavigator from './HistoryScreenStack';

import Icon from 'react-native-vector-icons/Feather';
import CustomNavigationTab from './CustomNavigationTab';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

function BottomTabNavigator() { 
    
    return (
        <BottomTab.Navigator
            initialRouteName="Home"
            tabBar={props=><CustomNavigationTab {...props}/>}
            tabBarOptions={{
                activeTintColor:'#3dd79a' ,
                inactiveTintColor:'#96a8b2'
                
                }}>
                <BottomTab.Screen
                    name="Home"
                    component={HomeScreenNavigator}
                    options={{
                        tabBarIcon: ({color}:any)=> <Icon name="home" size={25} color={color}/>
                    }}
                />
                <BottomTab.Screen
                    name="History"
                    component={HistoryScreenNavigator}
                    options={{
                        tabBarIcon: ({color}:any)=> <Icon name="map-pin" size={25} color={color}/>
                    }}
                />
                <BottomTab.Screen
                    name="Profile"
                    component={ProfileScreenNavigator}
                    options={{
                        tabBarIcon: ({color}:any)=> <Icon name="user" size={25} color={color}/>
                    }}
                />
        </BottomTab.Navigator>
    )
}

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator(){
    return (
        <Stack.Navigator screenOptions={{
                headerShown: false,
                cardStyle:{backgroundColor:"white"}
            }}>
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