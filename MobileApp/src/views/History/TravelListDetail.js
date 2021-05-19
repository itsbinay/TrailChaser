import * as React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {tutorial2Spech, width} from './theme';
// import {AntDesign} from '@expo/vector-icons';
const {ITEM_WIDTH, ITEM_HEIGHT, RADIUS, SPACING, FULL_SIZE} = tutorial2Spech; 
import {SharedElement} from 'react-navigation-shared-element';
import * as Animatable from 'react-native-animatable'
import { FlatList } from 'react-native-gesture-handler';

const zoomIn = {
    0: {
        opacity: 0,
        scale: 0,
    },
    1: {
        opacity: 1,
        scale: 1,
    },
}

const TravelListDetail = ( {navigation, route}) => {
    const {item} = route.params;
    return (
        <SafeAreaView style={{flex: 1}}>
            {/* <AntDesign
            name='arrowleft'
            size={24}
            color='#333'
            style={{
                paddingHorizontal: SPACING,
                position: 'absolute',
                top: 50,
                left: 10,
                zIndex: 2,
            }}
            // onPress={{navigation.goBack}}
            /> */}
            <SharedElement 
                    id={`item.${item.key}.photo`} 
                    style={[StyleSheet.absoluteFillObject]}>
            <View style={[StyleSheet.absoluteFillObject, {borderRadius: 0}]}>
                <Image
                source={{uri: item.image}}
                style={[
                    StyleSheet.absoluteFillObject,
                    {
                        resizeMode: 'cover',
                    },
                ]}
                />
            </View>
            </SharedElement>
            <SharedElement id={`item.${item.key}.location`}>
            <Text style={styles.location}>
                {item.location}
            </Text>
            </SharedElement>
            <View style={{position: 'absolute', bottom: 120}}>
                <Text style={[
                    { 
                        fontSize: 16, 
                        width: '100%', 
                        textTransform: 'uppercase', 
                        fontWeight: '800',
                        color: '#fff',
                        marginHorizontal: SPACING,
                        },
                    ]}
                >
                    Activities
                </Text>
                <FlatList
                    data={[...Array(8).keys()]}
                    keyExtractor={item => String(item)}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{padding: SPACING}}
                    renderItem={({item, index}) => {
                        return <Animatable.View 
                        duration={700}
                        animation={zoomIn}
                        delay={400 + (index * 400)}
                        style={{
                            backgroundColor: 'white', 
                            padding: SPACING, 
                            width: width * 0.33, 
                            height: width * 0.4, 
                            marginRight: SPACING}}
                            >
                            <Image 
                            source={{uri: 'https://images.unsplash.com/photo-1550626847-1df7517db9cb?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8d2F0ZXIlMjBuYXR1cmV8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=60'}} 
                            style={{width:'100%', height: '70%', resizeMode: 'cover', marginBottom: SPACING}}
                            />
                            <Text>Activity #{item + 1}</Text>
                        </Animatable.View>
                    }}
                    />
            </View>
        </SafeAreaView>
    ); 
};

const styles = StyleSheet.create({
    location: {
        fontSize: 30,
        color: '#fff',
        fontWeight: '800',
        width: ITEM_WIDTH * 0.8,
        textTransform: 'uppercase',
        position: 'absolute',
        top: 100,
        left: SPACING * 2,
    },
})

TravelListDetail.SharedElements = (route) => {
    const {item} = route.params;
    return [
        {
            id: `item.${item.key}.photo`,
        },
        {
            id: `item.${item.key}.location`,
        },
    ];
};

export default TravelListDetail;