import {View, Text, StyleSheet, Button, FlatList, Animated, Image} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Graph from "./Graph";


export default function DistanceChart({navigation}) {
    return (
        <View style={styles.container}>
            <Graph/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
      justifyContent: "space-between"
    },
  });