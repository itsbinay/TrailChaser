import {View, Text, StyleSheet, Button, FlatList, Animated, Image} from 'react-native';
import React from 'react'
import {
    LineChart,
    ProgressChart,
  } from "react-native-chart-kit";
import {Dimensions} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { tutorial2Spech } from './theme';
import {ringData, lineData} from './Screen';
const {ITEM_WIDTH, ITEM_HEIGHT, RADIUS, SPACING, FULL_SIZE} = tutorial2Spech; 

export default function DistanceChart({navigation}) {
    
    return (
        <SafeAreaView style={{flex: 1}}>
        <LinearGradient colors={["#43a047", "#43a047"]} style={styles.container}>
        <View style={{width: "100%", height:"50%", margin: SPACING}}>
        <Text style={styles.heading}>
            Travelled Distance
        </Text>
    <LineChart
        data={lineData}
        width={Dimensions.get("window").width} // from react-native
        height={220}
        yAxisLabel=""
        yAxisSuffix="m"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
        backgroundColor: "#26872a",
        backgroundGradientFrom: "#66bb6a",
        backgroundGradientTo: "#66bb6a",
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
            borderRadius: 16
        },
        propsForDots: {
            r: "3",
            strokeWidth: "2",
            stroke: "#fff"
        }
        }}
        bezier
        style={{
        marginVertical: 8,
        borderRadius: 16,
        margin: SPACING, 
        marginTop: "15%"
        }}
    />
    </View>
    <View style={{width: "100%", height:"50%", margin: SPACING}}>
    <Text style={styles.subheading}>
            Difficulty
        </Text>
        <ProgressChart
        data={ringData}
        width={Dimensions.get("window").width}
        height={220}
        strokeWidth={16}
        radius={32}
        chartConfig={{
        backgroundColor: "#26872a",
        backgroundGradientFrom: "#66bb6a",
        backgroundGradientTo: "#66bb6a",
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        style={{
            marginVertical: 8,
            borderRadius: 16,
            margin: SPACING, 
            marginTop: "0%",
            }}
        hideLegend={false}
        />
        </View>
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
        color: '#fff',
        fontSize: 30,
        width: "100%",
        top: SPACING * 4,
        left: SPACING * 2,
        fontWeight: '900',
        textAlign: 'left',
        fontFamily: 'sans-serif-light',
    },
    subheading: {
        color: '#fff',
        fontSize: 30,
        width: "100%",
        top: -SPACING*2,
        left: SPACING * 2,
        fontWeight: '900',
        textAlign: 'left',
        fontFamily: 'sans-serif-light',
    },
})