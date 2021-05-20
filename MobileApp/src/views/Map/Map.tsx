import React from 'react'
// import MapboxGL from '@react-native-mapbox-gl/maps';
import {StyleSheet, View,Text,Dimensions,Platform,TouchableOpacity,Alert,PermissionsAndroid, FlatList} from 'react-native'
import MapView, {Marker,Polyline, AnimatedRegion, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import haversine from "haversine";
import {Card,  Title, Paragraph,IconButton, Modal,Portal,Provider, TextInput} from 'react-native-paper';
import {homeActions} from '../../../redux/actions';
import {connect} from 'react-redux'

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
        backgroundColor:"tomato",
        alignItems:"center"
    },
    map: {
        flex:1,
        ...StyleSheet.absoluteFillObject,
    },
    bubble: {
        flex: 1,
        backgroundColor: "rgba(89, 125, 53,0.8)",
        width:"90%",
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
        width:"90%",
        backgroundColor: "transparent"
    },
    card:{
        width:"100%",
        flex: 1,
        color:"black"
    },
    trailCard:{
        width:"100%",
        alignItems:"center",
        justifyContent: 'center',
        flexDirection: "column",
        marginBottom: 5
    },
})

class Map extends React.Component{
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
            visible: false,
            searchInput: '',
            clickedTrail:{},
            selectedTrail:false
        }
        console.log("constructor called")
    console.log("trails:",this.props.trails)

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

          })
    }

    componentWillUnmount() {
        Geolocation.clearWatch(this.watchID);
    }

    onClickRequestRecord =()=>{
        console.log("logging:")
        this.props.searchTrails('')
        this.setState({
            visible: true
        })
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

    onDismiss = ()=>{
        console.log("called dismiss")
        this.setState({
            visible: false
        })
    }

    onSearch = (e:any) =>{
        this.setState({
            searchInput: e
        })
        this.props.searchTrails(e)
    }

    onClickTrail = (item:any) =>{
        this.setState({
            clickedTrail: item,
            selectedTrail:true
        })
        this.onDismiss()
    }
    renderItem = ({item, index}:any) => (
        <TouchableOpacity
            style={styles.trailCard}
            key={index}
            onPress={()=>this.onClickTrail(item)}
            >  
            <Card    
            style={styles.card}
            key = {index}
            >
                <Card.Content>
                    <Title>{item.name}</Title>
                    <Card.Cover source={item.image ? {uri: item.image} : require('../Home/hk.png')} />
                    <Paragraph>Difficulty: {item.difficulty}</Paragraph>
                    <Paragraph>Location: {item.location}</Paragraph>
                    <Paragraph>Length: {item.length}</Paragraph>
                    <Paragraph>Duration: {item.duration ? item.duration : "-"}</Paragraph>
                </Card.Content>

            </Card>
        </TouchableOpacity>
    )

    stopRecording = () =>{
        console.log("pressed stop")
        this.setState({
            selectedTrail:false,
            clickedTrail:{}
        })
    }
    render(){
        return(
            <Provider>
                <Portal>
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
                        <View style={{width:"90%",alignItems:"center",padding:10,backgroundColor: this.state.selectedTrail?"rgba(89, 125, 53,0.8)":"transparent",borderRadius: 20}}>
                            <Text numberOfLines={2} style={{fontSize:25,fontWeight:"bold",color:"white"}}>{this.state.selectedTrail?this.state.clickedTrail.name:''}</Text>
                        </View>
                        <View style={{flex:1}}></View>
                        {
                            this.state.selectedTrail?
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={[styles.bubble,{alignItems:"center",flexDirection:"row",justifyContent:"center"}]}>
                                    <Text style={{fontSize:16,fontWeight:"700",color:"white",paddingRight:20}}>
                                        Distance travelled: {parseFloat(this.state.distanceTravelled).toFixed(2)} km
                                    </Text>
                                    <IconButton
                                        icon="stop"
                                        color="white"
                                        size={25}
                                        onPress={this.stopRecording}
                                    />
                                </TouchableOpacity>
                            </View>
                            :<View style={styles.buttonContainer}>
                                <TouchableOpacity 
                                    onPress={this.onClickRequestRecord}
                                    style={[styles.bubble,{alignItems:"center"}]}>
                                    <Text style={{fontSize:16,fontWeight:"700",color:"white"}}>Click here to record</Text>
                                </TouchableOpacity>
                            </View>
                        }
                        
                    </View>
                </View>
                <Modal visible={this.state.visible} onDismiss={this.onDismiss} style={{alignItems:"center"}}>
                    <View style={{height:height*0.8,width:width*0.8,backgroundColor:"white",alignItems:"center"}}>
                        <View style={{width:"100%",alignItems:"flex-start"}}>
                            <IconButton
                                icon="close"
                                onPress={this.onDismiss}
                            />
                        </View>
                        <Text style={{fontSize:24,fontWeight:"bold"}}>Start tracking</Text>
                        <View style={{height:45,width:width*0.7}}>
                            <TextInput
                                style={{height:45}}
                                placeholder="Search your trail"
                                mode="outlined"
                                selectionColor="#597d35"
                                theme={{colors:{primary:"#597d35"}}}
                                value={this.state.searchInput}
                                onChangeText={this.onSearch}
                                />
                        </View>
                        <View style={{padding:8}}/>
                        <View style={{height:height*0.55,width:width*0.75}}>
                            <FlatList
                                data = {this.props.trails}
                                renderItem = {this.renderItem}
                                keyExtractor = {(item, index) => index.toString()}
                            />
                        </View>
                    </View>
                </Modal>
                </Portal>
            </Provider>
        )
    }
    
}

const mapStateToProps = (state) =>{
    return {
        trails: state.home.filteredTrails
    }
}
const mapDispatchToProps =(dispatch) =>{
    return {
        searchTrails: (val)=>dispatch(homeActions.searchTrails(val))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Map);
