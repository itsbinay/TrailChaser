import {View, Text, StyleSheet, Button, FlatList, Animated, Image} from 'react-native';
import React, {useState, useEffect } from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { tutorial2Spech } from './theme';
const {ITEM_WIDTH, ITEM_HEIGHT, RADIUS, SPACING, FULL_SIZE} = tutorial2Spech; 
import Timeline from 'react-native-beautiful-timeline'
import { StackActions } from '@react-navigation/routers';

import {useDispatch,connect} from 'react-redux';
import {historyActions} from '../../../redux/actions';
import { useNavigation } from '@react-navigation/native';

function TimelinePage(props) {

    const navigation = useNavigation();

    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(historyActions.fetchTimeline())
    },[])

    const onPressTile = (data) =>{
        dispatch(historyActions.selectTimeline(data))
        navigation.dispatch(StackActions.replace('RouteMap'))
    }
    return (
        <SafeAreaView style={{flex: 1}}>
            <LinearGradient colors={["#fbfbfb", "#edf4ff"]} style={styles.container}>
            <View style={{width: "100%", height:"25%"}}>
            <Text style={styles.heading}>
                Timeline
            </Text>
            <Text style={styles.subheading}>
                Your Timeline of visited trails
            </Text>
            </View>
            <Timeline 
                data={props.data.timeline}
                onPressTile={onPressTile} 
                backgroundColor='transparent' 
                />
            </LinearGradient>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#F5FCFF",
        height: "100%",
        width: "100%",
    },
    heading: {
        color: '#000',
        fontSize: 40,
        width: "100%",
        top: SPACING * 5,
        left: SPACING * 2,
        fontWeight: '900',
        textAlign: 'left',
        fontFamily: 'sans-serif-light',
    },
    subheading: {
        color: '#808080',
        fontSize: 15,
        width: "100%",
        top: SPACING * 5,
        left: SPACING * 2.5,
        fontWeight: '900',
        textAlign: 'left',
        fontFamily: 'sans-serif-light',
    },
})
const mapStateToProps = function(state){
    return {
        data: state.history
    }
}
export default connect(mapStateToProps)(TimelinePage)