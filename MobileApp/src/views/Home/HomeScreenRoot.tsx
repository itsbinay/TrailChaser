import React, {useEffect, useState} from 'react';
import {View,Text} from 'react-native';
import { connect, useDispatch } from 'react-redux';

function HomeScreenRoot(){

    return (
        <View style={{flex:1}}>
            <Text>Hello Home</Text>
        </View>
    )
}

export default HomeScreenRoot;