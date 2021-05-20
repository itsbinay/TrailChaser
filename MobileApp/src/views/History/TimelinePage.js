import {View, Text, StyleSheet, Button, FlatList, Animated, Image} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { tutorial2Spech } from './theme';
const {ITEM_WIDTH, ITEM_HEIGHT, RADIUS, SPACING, FULL_SIZE} = tutorial2Spech; 
import Timeline from 'react-native-beautiful-timeline'

const data = [
    {
      "date": 1618735011000,
      "data": [
        {
          "title": "High Junk Peak Country Trail",
          "subtitle": "Difficulty: Moderate \nDuration: 2 h 20 m",
          "date": 1618735011000
        }
      ]
    },
    {
      "date": 1619226291000,
      "data": [
        {
          "title": "Lantau Trail: Section 3",
          "subtitle": "Difficulty: Moderate \nDuration: 1 h 53 m",
          "date": 1619226291000
        },
        {
          "title": "Lantau Trail: Section 7 and 8",
          "subtitle": "Difficulty: Moderate \nDuration: 4 h 37 m",
          "date": 1619233071000
        }
      ]
    },
    {
      "date": 1619858631000,
      "data": [
        {
          "title": "Tai To Yan Trail",
          "subtitle": "Difficulty: Hard \nDuration: 4 h 32 m",
          "date": 1619858631000
        }
      ]
    },
    {
        "date": 1620516891000,
        "data": [
          {
            "title": "Rooster Ridge Hike",
            "subtitle": "Difficulty: Moderate \nDuration: 2 h 13 m",
            "date": 1620516891000
          }
        ]
      }
  ]

export default function TimelinePage({navigation}) {
    
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