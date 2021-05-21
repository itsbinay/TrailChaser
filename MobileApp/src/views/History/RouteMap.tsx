import React, { useEffect,useState } from 'react';
import {View,Text,StyleSheet,Dimensions,ActivityIndicator} from 'react-native'
import {connect} from 'react-redux'
import MapView, {Marker,Polyline, AnimatedRegion, PROVIDER_GOOGLE } from 'react-native-maps';

const {height,width} = Dimensions.get('window')

const styles = StyleSheet.create({
    root:{
        display:"flex",
        alignItems:"center",
        flex:1
    },
    container:{
        height:height-100,
        width:width,
    },
    map: {
        flex:1,
        ...StyleSheet.absoluteFillObject,
    },
})

function RouteMap(props:any){
    
    const [routes,setRoutes] = useState([])

    useEffect(()=>{
        console.log("props:",props.history.selected[0].route)
    },[])

    useEffect(()=>{
        const arr = []
        for(let i=0;i<props.history.selected[0].route.length;i+=2){
            arr.push({
                longitude:props.history.selected[0].route[i],
                latitude:props.history.selected[0].route[i+1]
            })
        }
        setRoutes(arr)
    },[props.history])
    return(
        <View style={styles.root}>
            <View style={styles.container}>
                {
                    routes.length==0?
                    <View style={{flex:1,height:height-100,justifyContent:"center"}}>
                        <ActivityIndicator size="large" color="#597d35"/>
                    </View>:
                    <MapView
                        // provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        region={{
                            latitude: routes[0].latitude,
                            longitude: routes[0].longitude,
                            latitudeDelta: 0.009,
                            longitudeDelta: 0.009
                        }}
                        showsUserLocation
                        loadingEnabled
                        >
                    <Polyline coordinates={routes} strokeWidth={5} strokeColor="tomato" />
                    </MapView>
                }

            </View>
        </View>
    )
}

const mapStateToProps = function(state:any){
    return {
        history: state.history
    }
}
export default connect(mapStateToProps)(RouteMap);