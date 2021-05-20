import React,{useEffect, useState,useRef} from 'react'
// import MapboxGL from '@react-native-mapbox-gl/maps';
import {StyleSheet, View,Text,Dimensions,Platform,TouchableOpacity,Alert,PermissionsAndroid} from 'react-native'
import MapView, {Marker,Polyline, AnimatedRegion, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import haversine from "haversine";

const {height,width} = Dimensions.get('window')
// MapboxGL.setAccessToken("pk.eyJ1IjoiaXRzYmluYXkiLCJhIjoiY2tvdnJkNzl1MDlpZTJwcGF0dW1xa3hudiJ9.Jhd-dk1rdjNEe4rTqw8Cug")

const styles = StyleSheet.create({
    root: {
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    container: {
        height:height-100,
        width:width,
        backgroundColor:"tomato"
    },
    map: {
        flex:1,
        ...StyleSheet.absoluteFillObject,
    },
    bubble: {
        flex: 1,
        backgroundColor: "rgba(255,255,255,0.7)",
        width:"100%",
        paddingVertical: 12,
        borderRadius: 20
    },
    latlng: {
        width: 200,
        alignItems: "stretch"
    },
        button: {
        width: 80,
        paddingHorizontal: 12,
        alignItems: "center",
        marginHorizontal: 10
    },
    buttonContainer: {
        flexDirection: "row",
        marginVertical: 20,
        backgroundColor: "transparent"
    }
})

class Map extends React.Component< {},$FlowFixMeState,>{
    watchID: any;
    constructor(props:any){
        super(props);
        this.state = {
            latitude: 22.3099,
            longitude: 114.169,
            routeCoordinates: [],
            distanceTravelled: 0,
            prevLatLng: {},
            coordinate: new AnimatedRegion({
                latitude: 22.3099,
                longitude: 114.169,
                latitudeDelta: 0,
                longitudeDelta: 0
            }),
            haslocationPermission: false,
            enableRecording: false,
        }
        console.log("constructor called")
        this.marker = React.createRef();
    }

    componentDidMount(){
        console.log("mounting called")
        const {coordinate} = this.state;
        this.requestCameraPermission()
        Geolocation.getCurrentPosition(
            (position:any) => {
                console.log("position")
                const lat = position.coords.latitude
                const long = (position.coords.longitude) 
                this.setState({
                    latitude:lat,
                    longitude:long
                })
                const newCoordinate = {
                    latitude:lat,
                    longitude:long
                }
                console.log("calling update")
                // if(this.marker){
                //     this.marker.current.animateMarkerToCoordinate(
                //         newCoordinate,
                //         500
                //     );
                // }
            },
            (error:any) => Alert.alert('Error', JSON.stringify(error)),
            {
                enableHighAccuracy: true, 
                timeout: 20000, 
                maximumAge: 1000
            },
        )
        this.watchID = Geolocation.watchPosition((position:any) => {
            console.log("positionChanging")
            const lat = position.coords.latitude
            const long = position.coords.longitude
            
            const newCoordinate = {
                latitude:lat,
                longitude:long
            }
            if (Platform.OS === "android") {
                if (this.marker!==undefined) {
                    this.marker.current.animateMarkerToCoordinate(
                    newCoordinate,
                    500
                  );
                }
            } else {
                this.coordinate.timing(newCoordinate).start();
            }
            this.setState({
                latitude:lat,
                longitude:long,
                routeCoordinates: routeCoordinates.concat([newCoordinate]),
                distanceTravelled: distanceTravelled + this.calcDistance(newCoordinate),
                prevLatLng: newCoordinate
              });
            // setLat(lat)
            // setLong(long)
            // setRouteCoordinates([...routeCoordinates,newCoordinate])
            // setDistanceTravelled(distanceTravelled+calcDistance(newCoordinate))
            // setPrevLatLng(newCoordinate)

          })
    }

    componentWillUnmount() {
        Geolocation.clearWatch(this.watchID);
    }

    onClickRequestRecord =()=>{
        console.log("logging:")
    }
    requestCameraPermission = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: "TrailChaser Location Permission",
              message:
                "TrailChaser needs access to your location " +
                "to track your trails.",
              buttonNeutral: "Ask Me Later",
              buttonNegative: "Cancel",
              buttonPositive: "OK"
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use the location");
            this.setState({haslocationPermission:true})
          } else {
            console.log("location permission denied");
            this.setState({haslocationPermission:false})

          }
        } catch (err) {
          console.warn(err);
        }
      };



    calcDistance = (newLatLng:any) => {   
        return haversine(prevLatLng, newLatLng) || 0;
    };

    render(){
        return(
            <View style={styles.root}>
                <View style={styles.container}>
                    {/* <MapboxGL.MapView style={styles.map}/> */}
                    <MapView
                        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                        style={styles.map}
                        region={{
                            latitude: this.state.latitude,
                            longitude: this.state.longitude,
                            latitudeDelta: 0.009,
                            longitudeDelta: 0.009,
                        }}
                        showsUserLocation
                        loadingEnabled
                        followsUserLocation
                    >
                        <Polyline coordinates={this.state.routeCoordinates} strokeWidth={5} />
                        <Marker.Animated
                            ref={this.marker}
                            coordinate={this.state.coordinate}
                            />
                    </MapView>
                    <View style={{width:"100%",alignItems:"center"}}>
                        <Text>Hello World</Text>
                    </View>
                    <View style={{flex:1}}></View>
                    {
                        this.state.enableRecording?
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={[styles.bubble, styles.button]}>
                                <Text style={styles.bottomBarContent}>
                                    {parseFloat(this.state.distanceTravelled).toFixed(2)} km
                                </Text>
                            </TouchableOpacity>
                        </View>
                        :<View style={styles.buttonContainer}>
                            <TouchableOpacity 
                                onPress={this.onClickRequestRecord}
                                style={[styles.bubble,{alignItems:"center"}]}>
                                <Text>Hello</Text>
                            </TouchableOpacity>
                        </View>
                    }
                    
                </View>
            </View>
        )
    }
    
}


export default Map;
