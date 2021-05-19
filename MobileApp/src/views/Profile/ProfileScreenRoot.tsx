import React,{useState} from 'react'
import {View,Text, Dimensions, StyleSheet, Platform, Image,} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {Button,Modal,Portal,Provider} from 'react-native-paper'
import Login from './Login'

const image1 = require('./images/hiking1.jpg')
const image2 = require('./images/hiking2.jpg')
const image3 = require('./images/hiking3.jpg')
const image4 = require('./images/hiking4.jpg')


const styles = StyleSheet.create({
    item: {
      width: Dimensions.get('window').width,
      height:250,
      display:"flex",
      justifyContent:"center",
      alignItems:"flex-start",
      flexDirection:"column"
    },
    imageContainer: {
      marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
      backgroundColor: 'white',
      borderRadius: 8,
      alignContent:"center",
      height:250,
      width:"95%"
    },
    image: {
      resizeMode: 'contain',
      height:400
    },
    carouselContainer: {
        marginTop: 5,
    },
    titleStyle:{
        fontSize:26,
        fontWeight:"700",
        paddingBottom:10
    },
    messageStyle:{
        fontSize:18,
        fontWeight:"500"
    }
  })

  const {width: screenWidth} = Dimensions.get('window');

function ProfileScreenRoot(){
    const defaultImages = [
        image1,image2,image3,image4
    ]
    const defaultText = [
        {
            title:"Keep track of your favorite trails",
            message: "Save the trails you want to explore and the ones you think are beautiful."
        },
        {
            title:"Navigate and share your adventures",
            message: "Turn your phone into a GPS tracker to guide you along the trail, then share your stats and pictures with friends."
        },
        {
            title:"Follow your friends for inspiration",
            message: "Check out the trails your friends have explored and which ones they have rated highly."
        },
        {
            title:"Share your experiences and pay it forward",
            message:"Rate trails, write reviews, and upload phoots. Share your activities so that others can be inspired by your adventure."
        }
    
    ]
    const [activeSlide,setActiveSlide] = useState(0)
    const [currentImage,setCurrentImage] = useState(defaultImages)
    const [visible,setVisible] = useState(false);

    const hideModal = () => setVisible(false);

    const onPressLogin = () =>{
        setVisible(true)
    }
    const onPressSignUp = () =>{

    }


    const _renderItem = ({item,index}:any,parallaxProps:any) => {
        return (
            <View style={styles.item}>
                <Image
                    source={item}
                    style={{...styles.imageContainer,resizeMode:"center"}}
                    />
            </View>
        );
    }


    return (
        <Provider>
            <Portal>
                <View style={{flex:1,backgroundColor:"white",alignItems:"center"}}>
                    <Text style={{fontSize:25,padding:10}}>Profile</Text>
                    <View style={{padding:20}}/>
                    <View
                        style={{display:"flex",height:250}}
                        >
                        <Carousel
                            sliderWidth={screenWidth}
                            itemWidth={screenWidth-20}
                            renderItem={_renderItem}
                            data={currentImage}
                            enableMomentum={false}
                            loop={true}
                            lockScrollWhileSnapping={true}
                            onSnapToItem={(index)=>setActiveSlide(index)}
                        />
                    </View>
                    <Pagination
                        dotsLength={currentImage.length}
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
                    <View style={{padding:15,display:"flex",flex:1}}>
                        <Text style={styles.titleStyle} numberOfLines={2}>{defaultText[activeSlide].title}</Text>
                        <Text style={styles.messageStyle} numberOfLines={3}>{defaultText[activeSlide].message}</Text>
                    </View>
                    <View style={{paddingBottom:20,display:"flex",flexDirection:"row"}}>
                        <View style={{padding:10}}/>
                        <Button 
                            mode="outlined" 
                            color="#597d35" 
                            style={{display:"flex",flex:1,padding:3}}
                            onPress={onPressLogin}
                            >
                            Log in
                        </Button>
                        <View style={{padding:10}}/>
                        <Button mode="contained" color="#597d35" style={{display:"flex",flex:1,padding:3}}>
                            Sign up
                        </Button>
                        <View style={{padding:10}}/>
                    </View>
                </View>
                <Modal visible={visible} onDismiss={hideModal}>
                    {
                        <Login onClose={hideModal}/>
                    }
                </Modal>
            </Portal>
        </Provider>
    )
}

export default ProfileScreenRoot;