import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import { connect, useDispatch } from 'react-redux';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import {homeActions} from '../../../redux/actions'
import { Card, Searchbar, Button, Title, Paragraph } from 'react-native-paper'
import {Dimensions, StyleSheet, View, ImageBackground, SafeAreaView, ScrollView, FlatList,RefreshControl, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
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
        width:"12%",
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
        width:"100%",
        flex: 1,
        
    },
    overlayStyle:{
        alignItems:"flex-start",
        height:400
    },
    filterListItem:{
        width:"100%",
        height:50
    },
    trailCard:{
        width:"100%",
        alignItems:"center",
        justifyContent: 'center',
        flexDirection: "column",
        marginBottom: 5
    }
});
function HomeScreenRoot(props:any){
    
    
    const heightTab = useBottomTabBarHeight()
    const dispatch = useDispatch();


    const [refreshing,setRefreshing] = useState(false);
    const [trails,setTrails] = useState([] as any)
    const [search, setSearchQuery] = useState('')
    const [filterTrails,setFilterTrails] = useState([] as any)

    const onRefresh = () =>{
        setRefreshing(true)
        dispatch(homeActions.fetchAllTrails())
    }
    useEffect(()=>{
        setRefreshing(false);
        setFilterTrails(props.trails)
        setTrails(props.trails)
    },[props.trails])

    useEffect(() => {
        dispatch(homeActions.fetchAllTrails());
    }, []);

    const onClickTrail = (trail:any) =>{
        props.navigation.navigate('IndividualTrail')
    }
    const onSearch = (val:any) => {
        setSearchQuery(val)

        if(val===''){
            setFilterTrails(trails)
            return;
        }
        let arr = []
        for(let i=0;i<trails.length;i++){
            if(trails[i].name.includes(val)){
                arr.push(trails[i])
            }
        }
        setFilterTrails(arr)  
    }
    const renderItem = ({item, index}:any) => (
        <TouchableOpacity
            style={styles.trailCard}
            key={index}
            onPress={()=>onClickTrail(item)}
            >  
            <Card    
            style={styles.card}
            key = {index}
            >

                <Card.Content>
                    <Title>{item.name}</Title>
                </Card.Content>
                <Card.Cover source={item.image ? {uri: item.image} : require('./hk.png')} />

            </Card>
        </TouchableOpacity>
    )
    
    return (
        <View style={{paddingBottom:heightTab}}>
            <View style={styles.searchfilterRoot}>
                 <View
                    style={styles.filterIconContainer}
                    >
                    <Button icon="filter-menu">
                    </Button>
                </View>
                <Searchbar
                    placeholder="Search for a trail"
                    onChangeText={onSearch}
                    inputStyle={{color:"black"}}
                    value={search}
                    />
            </View>
                <FlatList
                    data = {filterTrails}
                    renderItem = {renderItem}
                    keyExtractor = {(item, index) => index.toString()}
                />
        </View>
    )
}

const mapStateToProps = (state: any) => {
    return {
        trails: state.home.trails,
    }
}


export default connect(mapStateToProps)(HomeScreenRoot);

/** 
// {
                //     trails !== undefined ?
                //     filterTrails.map((e:any,index:number)=>{
                //         return <TouchableOpacity
                //                 style={styles.trailCard}
                //                 key={index}
                //                 onPress={()=>onClickTrail(e)}
                //                 >  
                //                 <Card    
                //                 style={styles.card}
                //                 >
                //                 <Card.Title title = {e.name}> </Card.Title>

                //             </Card>
                //         </TouchableOpacity>

                //     }):
                //     <Text>Hello</Text>
                // }
             </ScrollView> 
     <ScrollView
                contentContainerStyle={styles.container}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        />
                }
            > 
 */