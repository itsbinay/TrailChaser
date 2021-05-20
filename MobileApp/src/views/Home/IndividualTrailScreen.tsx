import React, {useEffect, useState} from 'react';
import {Text,Dimensions} from 'react-native';
import { connect, useDispatch } from 'react-redux';
import {homeActions} from '../../../redux/actions'
import { StyleSheet, View, ImageBackground, SafeAreaView, ScrollView, FlatList,RefreshControl, TouchableOpacity } from 'react-native';
import {  Card, Searchbar, Button, Title, Paragraph, Portal, Modal, Provider } from 'react-native-paper'
import Carousel, {Pagination} from 'react-native-snap-carousel';
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
    },
    item: {
        width: Dimensions.get('window').width,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"column"
      },
      card:{
        backgroundColor: '#597d35',
        width:"100%",
    },
})
const {width: screenWidth} = Dimensions.get('window');
function IndividualTrailScreen(props:any){
    const dispatch = useDispatch();
    const [activeSlide,setActiveSlide] = useState(0)
    useEffect(() => {
        dispatch(homeActions.weatherAPI());
    }, []);
    const _renderItem = ({item, index}:any) => {
        let day = item.forecastDate.slice(6,8)
        let month = item.forecastDate.slice(4,6)
        let date = day+'/'+month
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!

        let today_date = dd + '/' + mm;
        let week = item.week
        if(today_date === date){
            week = 'Today'
        }
        return (
            
            <View style={styles.item}>
                <Card    
                    style={styles.card}
                    key = {index}
                    >
                    <Card.Content>
                        <View>
                            <Title style={{textAlign: 'left', color: 'white'}}>{week}</Title>
                        </View>
                        <Paragraph style={{color: 'white'}}>{date}</Paragraph>
                        <Paragraph style={{color: 'white'}}>Min. Temperature: {item.forecastMintemp.value}&deg;C</Paragraph>
                        <Paragraph style={{color: 'white'}}>Max. Temperature: {item.forecastMaxtemp.value}&deg;C</Paragraph>
                        <Paragraph style={{color: 'white'}}>Max. Rainfall: {item.forecastMaxrh.value}%</Paragraph>
                        <Paragraph style={{color: 'white'}}>Min. Rainfall: {item.forecastMinrh.value}%</Paragraph>
                    </Card.Content>
                    </Card>
            </View>
        );
    }
    return (
        <View style={{flexDirection: 'column'}}>    
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
            <View style={{width: '100%', marginTop: 220,alignItems:'center',flexDirection: 'row', justifyContent: 'center'}}>
                {
                    props.weather !== undefined ?
                            <Carousel
                                sliderWidth={screenWidth}
                                itemWidth={screenWidth-20}
                                data={props.weather}
                                renderItem={_renderItem}
                                lockScrollWhileSnapping={true}
                                onSnapToItem={(index)=>setActiveSlide(index)}
                            />
                    :
                    <Text>Weather</Text>
                }
            </View>
            <Pagination
                    dotsLength={props.weather.length}
                    activeDotIndex={activeSlide}
                    containerStyle={{width:"100%",backgroundColor:"transparent"}}
                    dotStyle={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        marginHorizontal: 8,
                        backgroundColor: 'rgba(0, 0, 0, 0.92)'
                    }}
                />
        </View>
    )
}   

const mapStateToProps = (state: any) => {
    return {
        trail: state.home.selectedTrail,
        weather: state.home.weather
    }
}


export default connect(mapStateToProps)(IndividualTrailScreen);