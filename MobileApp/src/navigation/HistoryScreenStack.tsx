import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {HistoryScreenParamList} from './types'

import HistoryScreenRoot from '../views/History/HistoryScreenRoot';
import TravelListDetail from '../views/History/TravelListDetail';

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
                    headerTitle:'History'
                }}
            />
            <HistoryScreenStack.Screen
                name="TravelListDetail"
                component={TravelListDetail}
            />
        </HistoryScreenStack.Navigator>
    )
}