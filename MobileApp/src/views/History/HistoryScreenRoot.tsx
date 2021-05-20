import {View, Text, StyleSheet, Button, FlatList, Animated, Image} from 'react-native';
// import data from './location';
import {SafeAreaView} from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { tutorial2Spech } from './theme';
const {ITEM_WIDTH, ITEM_HEIGHT, RADIUS, SPACING, FULL_SIZE} = tutorial2Spech; 
import React, {useState, useEffect } from 'react';
import {SharedElement} from 'react-navigation-shared-element';
// import { Card } from 'react-native-shadow-cards';
import CardButton from '@paraboly/react-native-card-button';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch,connect} from 'react-redux';
import {historyActions} from '../../../redux/actions';

function HistoryScreenRoot(props){
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(historyActions.fetchLocation())
    },[])

    const scrollx = React.useRef(new Animated.Value(0)).current;
    return (
        <SafeAreaView style={{flex: 1}}>
        {/* <StickyParalaxHeader headerType="AvatarHeader" /> */}
        <LinearGradient colors={["#fbfbfb", "#edf4ff"]} style={styles.container}>
            <Text style={styles.heading}>
                Past Visits
            </Text>
            <Animated.FlatList 
                style={{height: '40%'}}
                data={props.location}
                keyExtractor={item => item.key}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToInterval={FULL_SIZE}
                decelerationRate='fast'
                onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {x: scrollx}}}],
                    { useNativeDriver: true}
                )}
                renderItem={({item, index}) => {
                    const inputRange = [
                        (index - 1) * FULL_SIZE, 
                        index * FULL_SIZE, 
                        (index + 1) * FULL_SIZE,
                    ];

                    const translateX = scrollx.interpolate({
                        inputRange,
                        outputRange: [ITEM_WIDTH, 0, -ITEM_WIDTH]
                    })
                    const scale = scrollx.interpolate({
                        inputRange,
                        outputRange: [1, 1.1, 1],
                    });

                    return <TouchableOpacity style={styles.itemContainer}> 
                    <View style={[StyleSheet.absoluteFillObject, {overflow: 'hidden', borderRadius: RADIUS}]}>
                        <Animated.Image 
                            source={{uri: item.image}} 
                            style={[StyleSheet.absoluteFillObject, {
                                resizeMode: 'cover',
                                transform: [{scale}]
                            }]}
                        />
                    </View>
                    <SharedElement 
                    id={`item.${item.key}.photo`} 
                    style={[StyleSheet.absoluteFillObject]}>
                        <View style={[
                            StyleSheet.absoluteFillObject,
                            {overflow: 'hidden', borderRadius: RADIUS},
                        ]}>
                            <Animated.Image
                                source={{uri: item.image}}
                                style={[
                                    StyleSheet.absoluteFillObject,
                                    {
                                        resizeMode: 'cover',
                                        transform: [{scale}],
                                    },
                                ]}
                                />
                        </View>
                    </SharedElement>
                    <SharedElement id={`item.${item.key}.location`}>
                    <Animated.Text style={[styles.location, {
                        transform: [{translateX}],
                    }]}>{item.location}</Animated.Text>
                    </SharedElement>
                    <View style={styles.days}>
                        <Text style={styles.daysValue}>{item.numberOfDays}</Text>
                        <Text style={styles.daysLabel}>days ago</Text>
                    </View>
                    </TouchableOpacity>
                }}
                />
        <View style={styles.containerGlue}>
          <View style={styles.buttonContainer}>
            <View style={styles.rowStyle}>
              <CardButton
                width={150}
                height={75}
                textSize={15}
                text="Timeline"
                iconSize={24}
                iconName="clock"
                iconColor="white"
                textColor="white"
                iconType="Entypo"
                rippleColor="white"
                end={{ x: 1, y: 1 }}
                start={{ x: 0, y: 0 }}
                onPress={() => {props.navigation.navigate('TimelinePage')}}
                gradientColors={["#43a047", "#66bb6a"]}
              />
              <CardButton
                width={150}
                height={75}
                textSize={15}
                iconSize={24}
                text="Total Distance Travelled"
                iconColor="white"
                textColor="white"
                iconType="Entypo"
                rippleColor="white"
                iconName="air"
                onPress={() => {props.navigation.navigate('DistanceChart')}}
                end={{ x: 1, y: 0 }}
                start={{ x: 0, y: 1 }}
                gradientColors={["#43a047", "#66bb6a"]}
              />
            </View>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView> 
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        marginTop: SPACING *3,
        marginRight: SPACING,
        marginLeft: SPACING,
    },
    location: {
        fontSize: 30,
        color: '#fff',
        fontWeight: '800',
        width: ITEM_WIDTH * 0.8,
        textTransform: 'uppercase',
        position: 'absolute',
        top: SPACING * 2,
        left: SPACING * 2,
    },
    days: {
        position: 'absolute',
        bottom: SPACING*2,
        left: SPACING*2,
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: 'tomato',
        justifyContent: 'center',
        alignItems: 'center',
    },
    daysValue: {
        fontWeight: '800',
        color: '#fff', 
        fontSize: 30,
    },
    daysLabel: {
        color: '#fff',
        fontSize: 10,
        bottom: 5
    },
    rowStyle: {
        width: 350,
        alignSelf: "center",
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "space-around"
    }, 
    buttonContainer: {
        height: 350,
        marginTop: "10%",
        flexDirection: "column",
    },
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#F5FCFF"
      },
    containerGlue: {
        flex: 1,
        marginTop: "0%",
        flexDirection: "column",
    },
    heading: {
        color: '#000',
        fontSize: 40,
        width: "100%",
        top: SPACING * 2,
        left: SPACING * 2,
        fontWeight: '900',
        textAlign: 'left',
        fontFamily: 'sans-serif-light',
    }

})

const mapStateToProps = function(state){
    return {
        location: state.history.location
    }
}
export default connect(mapStateToProps)(HistoryScreenRoot);