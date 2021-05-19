import React,{useEffect,useState} from 'react';
import {View,Text,Platform,ToastAndroid,PermissionsAndroid, StyleSheet,Dimensions,Linking,Alert,ImageBackground, Image} from 'react-native';
import {connect} from 'react-redux';
import {Avatar} from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { StackActions } from '@react-navigation/routers';

import Geolocation from 'react-native-geolocation-service';

const defaultimage = require('./images/avatardefault.jpg')
const background = require('./images/hikingback2.png')

const {height,width} = Dimensions.get('window')

const styles = StyleSheet.create({
    root: {
        display:"flex",
        alignItems:"center",
        width:width,
        height:height,
        backgroundColor:"white"
    },
    image:{
        flex:1,
        resizeMode:"cover",
        alignItems:"center",
        width:width,
    },
    upperhalf: {
        width:width,
        alignItems:"center",
        backgroundColor:"white"
    },
    lowerhalf: {
        width:width,
        flex:1,
        alignItems:"center",
        backgroundColor:"#85b85c",
        borderTopLeftRadius:60,
        borderTopRightRadius: 60
    },
    nameStyle:{
        fontSize:25,
        fontWeight:"600"
    }
})
function Profile(props:any){
    const [location, setLocation] = useState(null);
    const navigation = useNavigation()

    const onPressAvatar = () =>{
        getLocation()
    }

    const hasPermissionIOS = async () => {
        const openSetting = () => {
          Linking.openSettings().catch(() => {
            Alert.alert('Unable to open settings');
          });
        };
        const status = await Geolocation.requestAuthorization('whenInUse');
    
        if (status === 'granted') {
          return true;
        }
    
        if (status === 'denied') {
          Alert.alert('Location permission denied');
        }
    
        if (status === 'disabled') {
          Alert.alert(
            `Turn on Location Services to allow TrailChaser to determine your location.`,
            '',
            [
              { text: 'Go to Settings', onPress: openSetting },
              { text: "Don't Use Location", onPress: () => {} },
            ],
          );
        }
    
        return false;
    };

    const hasLocationPermission = async () => {
        if (Platform.OS === 'ios') {
          const hasPermission = await hasPermissionIOS();
          return hasPermission;
        }
    
        if (Platform.OS === 'android' && Platform.Version < 23) {
          return true;
        }
    
        const hasPermission = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
    
        if (hasPermission) {
          return true;
        }
    
        const status = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
    
        if (status === PermissionsAndroid.RESULTS.GRANTED) {
          return true;
        }
    
        if (status === PermissionsAndroid.RESULTS.DENIED) {
          ToastAndroid.show(
            'Location permission denied by user.',
            ToastAndroid.LONG,
          );
        } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
          ToastAndroid.show(
            'Location permission revoked by user.',
            ToastAndroid.LONG,
          );
        }
    
        return false;
    };

    const getLocation = async () => {
        const hasPermission = await hasLocationPermission();
    
        if (!hasPermission) {
          return;
        }
    
        Geolocation.getCurrentPosition(
          (position) => {
            setLocation(position);
            console.log(position);
          },
          (error) => {
            Alert.alert(`Code ${error.code}`, error.message);
            setLocation(null);
            console.log(error);
          },
          {
            accuracy: {
              android: 'high',
              ios: 'best',
            },
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 10000,
            distanceFilter: 0,
            forceRequestLocation: true,
            showLocationDialog: true,
          },
        );
      };
    useEffect(()=>{
        if(!props.auth.isLoggedIn){
            navigation.dispatch(StackActions.replace('Root'))
        }
    },[])
    console.log("auth:",props.auth)
    return(
        <View style={styles.root}>
            <View style={{padding:10}}/>
            <Avatar
                rounded
                size={150}
                activeOpacity={0.7}
                onPress={onPressAvatar}
                source={defaultimage}
                />
            <View style={{padding:8}}/>
            <Text style={styles.nameStyle}>{props.auth.user.firstname+" "+props.auth.user.lastname}</Text>
            <View style={{padding:18}}/>

        </View>
    )
}

const mapStateToProps = function(state:any){
    return {
        auth: state.authentication
    }
}
export default connect(mapStateToProps)(Profile);