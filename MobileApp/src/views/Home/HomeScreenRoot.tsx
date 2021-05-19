import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import { connect, useDispatch } from 'react-redux';
import {homeActions} from '../../../redux/actions'
import { Card } from 'react-native-paper'
import {Dimensions, StyleSheet, View, ImageBackground, SafeAreaView, ScrollView, FlatList,RefreshControl, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    searchfilterRoot:{
        display:"flex", 
        flexDirection:"row",
        alignItems:"center",
        backgroundColor:"white"
    },
    filterIconContainer:{
        width:"10%",
        alignItems:"center",
    },
    searchContainerStyling: {
        width:"90%",
        backgroundColor:"white",
        borderBottomColor:"transparent",
        borderTopColor:"transparent"
    },
    searchInputContainerStyling:{
        borderRadius:20
    },
    root:{
        paddingBottom:150
    },
    card:{
        width:"90%"
    },
    overlayStyle:{
        alignItems:"flex-start",
        height:400
    },
    filterListItem:{
        width:"100%",
        height:50
    }
});
function HomeScreenRoot(props:any){
    const [refreshing,setRefreshing] = useState(false);
    const [trails,setTrails] = useState([] as any)
    const { width } = Dimensions.get('window');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(homeActions.fetchAllTrails());
        setTrails(props.trails)
    }, []);

    const onRefresh = () =>{
        setRefreshing(true)
        dispatch(homeActions.fetchAllTrails())
    }
    useEffect(()=>{
        setRefreshing(false);
    },[props.trails])

    const onClickTrail = (trail:any) =>{
        props.navigation.navigate('IndividualTrail')
    }
    return (
        <View style={{flex:1}}>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        />
                }
            >
                {
                    trails !== undefined ?
                    trails.map((e:any,index:number)=>{
                        return <TouchableOpacity
                                style={{width:width}}
                                key={index}
                                onPress={()=>onClickTrail(e)}
                                >  
                            <Card    
                                style={styles.card}
                                >
                                <Card.Title title = {e.name}> </Card.Title>

                            </Card>
                        </TouchableOpacity>

                    }):
                    <Text>Hello</Text>
                }
            </ScrollView>
        </View>
    )
}

const mapStateToProps = (state: any) => {
    return {
        trails: state.home.trails,
    }
}


export default connect(mapStateToProps)(HomeScreenRoot);