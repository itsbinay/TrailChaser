import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {HistoryScreenParamList} from './types';
import {StyleSheet} from 'react-native';

import HistoryScreenRoot from '../views/History/HistoryScreenRoot';
import DistanceChart from '../views/History/DistanceChart';
import TimelinePage from '../views/History/TimelinePage';
import RouteMap from '../views/History/RouteMap';

const HistoryScreenStack = createStackNavigator<HistoryScreenParamList>();

export default function HistoryScreenNavigator(){
    return(
        <HistoryScreenStack.Navigator
            initialRouteName="Root"
            screenOptions={{
                headerTitleStyle:{color:"black"}
            }}
            >
            <HistoryScreenStack.Screen
                name="Root"
                component={HistoryScreenRoot}
                
                options={{
                    headerShown: false
                }}
            />
            <HistoryScreenStack.Screen
                name="DistanceChart"
                component={DistanceChart}

                options={{
                    headerTransparent: true,
                    headerTitle: "",
                    headerTintColor: '#fff'
                }}
            />
            <HistoryScreenStack.Screen
                name="TimelinePage"
                component={TimelinePage}

                options={{
                    headerTransparent: true,
                    headerTitle: "",
                    headerTintColor: '#000'
                }}
            />
            <HistoryScreenStack.Screen
                name="RouteMap"
                component={RouteMap}

                options={{
                    headerTransparent: true,
                    headerTitle: "",
                    headerTintColor: '#000'
                }}
            />
        </HistoryScreenStack.Navigator>
    )
}