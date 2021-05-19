import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import { connect, useDispatch } from 'react-redux';
import {homeActions} from '../../../redux/actions'
import { StyleSheet, View, ImageBackground, SafeAreaView, ScrollView, FlatList,RefreshControl, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
    image:{
        width:"100%",
        height:200,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    trailTitle:{
        paddingLeft: 10,
        textAlign: 'left',
        fontWeight: 'bold',
        color: 'white',
        fontSize: 24
    },
    trailLocation:{
        paddingLeft: 10,
        textAlign: 'left',
        color: 'white',
        fontSize: 16
    },
    trailDifficulty:{
        paddingLeft: 10,
        textAlign: 'center',
        color: 'white',
        fontSize: 16
    },
    easy:{
        backgroundColor: "#597d35",
        marginLeft: 10,
        marginRight: 200
    },
    moderate:{
        backgroundColor: '#E1AD01',
        marginLeft: 10,
        marginRight: 200
    },
    hard:{
        backgroundColor: '#A00000',
        marginLeft: 10,
        marginRight: 200
    }
})
function IndividualTrailScreen(props:any){
    
    return (
        
        <View
        style={{flex:1}}
        >
        <ImageBackground
            source={props.trail.image ? {uri: props.trail.image} : require('./hk.png')} 
            style={styles.image}
        
        >
            <View style = {{justifyContent:'center', flex: 1}}>
                <Text style= {styles.trailTitle}>{props.trail.name}</Text>
            </View>
            <View style = {props.trail.difficulty === "easy" ? styles.easy : props.trail.difficulty === "moderate" ? styles.moderate : styles.hard}>
                <Text style= {styles.trailDifficulty}>{props.trail.difficulty}</Text>
            </View>
            <View style = {{justifyContent:'center',flex: 0.5}}>
                <Text style= {styles.trailLocation}>{props.trail.location}</Text>
            </View>
        </ImageBackground>
    </View>
    )
}

const mapStateToProps = (state: any) => {
    return {
        trail: state.home.selectedTrail,
    }
}


export default connect(mapStateToProps)(IndividualTrailScreen);