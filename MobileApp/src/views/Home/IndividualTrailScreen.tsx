import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import { connect, useDispatch } from 'react-redux';
import {homeActions} from '../../../redux/actions'
import { StyleSheet, View, ImageBackground, SafeAreaView, ScrollView, FlatList,RefreshControl, TouchableOpacity } from 'react-native';


function IndividualTrailScreen(props:any){
    
    return (
        <View style={{flex:1}}>
            <Text>
                Trail
            </Text>
        </View>
    )
}

const mapStateToProps = (state: any) => {
    return {
        trails: state.home.trails,
    }
}


export default connect(mapStateToProps)(IndividualTrailScreen);