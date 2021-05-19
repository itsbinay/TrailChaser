import {View, Text, StyleSheet, Button, FlatList, Animated, Image} from 'react-native';
import data from './location';
import {SafeAreaView} from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { tutorial2Spech } from './theme';
const {ITEM_WIDTH, ITEM_HEIGHT, RADIUS, SPACING, FULL_SIZE} = tutorial2Spech; 
import * as React from 'react';
import {SharedElement} from 'react-navigation-shared-element';

function HistoryScreenRoot({navigation}: {navigation: any}){

    const scrollx = React.useRef(new Animated.Value(0)).current;
    return (
        <SafeAreaView style={{flex: 1}}>
            <Animated.FlatList 
                data={data}
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

                    return <TouchableOpacity onPress={() => {
                        navigation.push('TravelListDetail', {item})
                    }} style={styles.itemContainer}> 
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
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        margin: SPACING
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
    }
})

export default HistoryScreenRoot;