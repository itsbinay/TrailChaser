import {View, Text, StyleSheet, Button, FlatList, Animated, Image} from 'react-native';
import React, {useState, useEffect } from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { tutorial2Spech } from './theme';
const {ITEM_WIDTH, ITEM_HEIGHT, RADIUS, SPACING, FULL_SIZE} = tutorial2Spech; 
import Timeline from 'react-native-beautiful-timeline'
import Axios from 'axios';

const API_URL_PROD = require('../../../module.config').PROD_URL

const url = "http://10.0.2.2:5000"

export default function TimelinePage({navigation}) {

  const [data,setData] =useState([])

  useEffect(()=>{
    let mounted = true;
    
    Axios.get(url + '/timelineData')
      .then(function(response) {
          // handle response
        console.log(response.data);
        setData(response.data.result);
      }).catch(function(error) {
          // handle error
          console.log(error);
      })
    return () => mounted = false;
  },[])
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
          <Timeline data={data} backgroundColor='transparent' />
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