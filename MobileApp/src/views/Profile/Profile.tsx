import React,{useEffect,useState} from 'react';
import {View,Text,SafeAreaView, StyleSheet,Dimensions,Linking,Alert,ImageBackground, Image} from 'react-native';
import {ListItem} from 'react-native-elements'

import {connect,useDispatch} from 'react-redux';
import { userActions } from '../../../redux/actions';

import {Avatar} from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { StackActions } from '@react-navigation/routers';

import LinearGradient from 'react-native-linear-gradient';

import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import Icon from 'react-native-vector-icons/Entypo';

const defaultimage = require('./images/avatardefault.jpg')

const {height,width} = Dimensions.get('window')

Geocoder.init("AIzaSyCtejmc4L0-GdpYoKwV4UC-MsUMq-MjEjw")

function Profile(props:any){
    const navigation = useNavigation()
    const dispatch = useDispatch();

    const [location,setLocation] =useState('')

    const [initialPosition,setInitialPostion] = useState('unknown')
    const [lastPosition,setLastPosition] = useState('unknown')

    const onPressLogout = () =>{
      dispatch(userActions.logout())
      navigation.dispatch(StackActions.replace('Root'))
    } 

    let watchId = null
    useEffect(()=>{
      Geolocation.getCurrentPosition(
        (position:any) => {
          const initialPosition = JSON.stringify(position)
          setInitialPostion(initialPosition)
          const lat = Math.round((position.coords.latitude) * 100) / 100
          const long = Math.round((position.coords.longitude) * 100) / 100
          console.log("long:",long)
          console.log("lat:",lat)
          Geocoder.from({latitude: lat,longitude:long})
            .then((json:any)=>{
                let addresscomponent = json.results[0].address_components[0];
                setLocation(addresscomponent['short_name'])
            })
            .catch((error:any)=>console.log("error:",error))
        },
        (error:any) => Alert.alert('Error', JSON.stringify(error)),
        {
          enableHighAccuracy: true, 
          timeout: 20000, 
          maximumAge: 1000
        },
      )

      watchId = Geolocation.watchPosition((position:any) => {
        const lastPosition = JSON.stringify(position);
        const lat = Math.round((position.coords.latitude) * 100) / 100
        const long = Math.round((position.coords.longitude) * 100) / 100
        Geocoder.from({latitude: lat,longitude:long})
            .then((json:any)=>{
                let addresscomponent = json.results[0].address_components[0];
                console.log("shortName:",addresscomponent['short_name'])
                setLocation(addresscomponent['short_name'])
            })
            .catch((error:any)=>console.log("error:",error))
        setLastPosition(lastPosition);
      });
      if(!props.auth.isLoggedIn){
          navigation.dispatch(StackActions.replace('Root'))
      }
    },[])

    useEffect(()=>{
      if(!props.auth.isLoggedIn){
        navigation.dispatch(StackActions.replace('Root'))
      }
    },[props.auth.isLoggedIn])

    return(
      <SafeAreaView style={{flex: 1}}>
        <LinearGradient colors={["#fbfbfb", "#edf4ff"]} style={styles.container}>
          <View style={{padding:10}}/>
          <Avatar
              rounded
              size={150}
              activeOpacity={0.7}
              source={props.auth.image==''?defaultimage:{uri:props.auth.image}}
              />
          <View style={{padding:8}}/>
          <Text style={styles.nameStyle}>{props.auth.user.firstname+" "+props.auth.user.lastname}</Text>
          <View style={{padding:8}}/>
          <View style={{display:"flex",width:"100%",flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
            <Icon name="location-pin" size={30} color="black"/>
            <Text numberOfLines={2}style={{paddingLeft:5,fontSize:15}}>{location}</Text>
          </View>
          <View style={{padding:18}}/>  
          <View style={{width:"100%",paddingHorizontal:10}}>
            {
              props.auth.user.type=="facebook"?
              null:
              <ListItem key={0} bottomDivider>    
                <ListItem.Content>
                  <ListItem.Title>Username</ListItem.Title>
                  <ListItem.Subtitle>{props.auth.user.username}</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            }
            
            <ListItem key={1} bottomDivider>
              <ListItem.Content>
                <ListItem.Title>First Name</ListItem.Title>
                <ListItem.Subtitle>{props.auth.user.firstname}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
            <ListItem key={2} bottomDivider>
              <ListItem.Content>
                <ListItem.Title style={{color:"black"}}>Last Name</ListItem.Title>
                <ListItem.Subtitle>{props.auth.user.lastname}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
            <View style={{padding:30}}/>
            <ListItem key={3} 
              onPress={onPressLogout}
              bottomDivider>
              <ListItem.Content>
                <ListItem.Title style={{color:"black"}}>Logout</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          </View>
        </LinearGradient>
      </SafeAreaView>
    )
}

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
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
})

const mapStateToProps = function(state:any){
    return {
        auth: state.authentication
    }
}
export default connect(mapStateToProps)(Profile);