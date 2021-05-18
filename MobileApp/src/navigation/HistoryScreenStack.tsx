import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {HistoryScreenParamList} from './types'

import HistoryScreenRoot from '../views/History/HistoryScreenRoot';

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
        </HistoryScreenStack.Navigator>
    )
}