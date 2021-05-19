import React, {useEffect, useState, useCallback, useRef} from 'react';
import {Text} from 'react-native';
import { connect, useDispatch } from 'react-redux';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import {homeActions} from '../../../redux/actions'
import {  Card, Searchbar, Button, Title, Paragraph, Portal, Modal, Provider } from 'react-native-paper'
import { ButtonGroup, Slider } from 'react-native-elements'
import {Dimensions, StyleSheet, View, ImageBackground, SafeAreaView, ScrollView, FlatList,RefreshControl, TouchableOpacity } from 'react-native';
import {Picker} from '@react-native-picker/picker';

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
    modal:{
        backgroundColor: 'white',
        alignItems:"center",
        justifyContent: 'center',
        flexDirection: "column",
        flex: 1,
        padding: 20,
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
    },
    diffButton:{
        backgroundColor: "#597d35"
    }
});
function HomeScreenRoot(props:any){
    
    
    const heightTab = useBottomTabBarHeight()
    const dispatch = useDispatch();
    

    const [refreshing,setRefreshing] = useState(false);
    const [trails,setTrails] = useState([] as any)
    const [search, setSearchQuery] = useState('')
    const [filterTrails,setFilterTrails] = useState([] as any)
    const buttons = ['Easy', 'Moderate', 'Hard']
    const [currentFilter, setCurrentFilter] = useState(null)
    const [index, setIndex] = useState(null)
    const [visible, setVisible] = useState(false)
    const [minValue, setMinValue] = useState(0)
    const [maxValue, setMaxValue] = useState(0)
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
        dispatch(homeActions.selectTrail(trail))
        props.navigation.navigate('IndividualTrail')
    }
    useEffect(()=>{
        if(currentFilter === null){
            setFilterTrails(trails)
        }else{
            console.log("here: ", currentFilter)
            let difficulty = ''
            if(currentFilter === 0){
                difficulty = 'easy'
            }else if(currentFilter === 1){
                difficulty = 'moderate'
            }else{
                difficulty = 'hard'
            }
            let filterTrails = []
            for(let i=0;i<trails.length;i++){
                if(trails[i].difficulty === difficulty){
                    filterTrails.push(trails[i])
                }
            }
            setFilterTrails(filterTrails);
        }
    },[currentFilter])
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
    const showModal = () => setVisible(true)
    const hideModal = () => {
        setVisible(false)
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
                    <Card.Cover source={item.image ? {uri: item.image} : require('./hk.png')} />
                    <Paragraph>Difficulty: {item.difficulty}</Paragraph>
                    <Paragraph>Location: {item.location}</Paragraph>
                    <Paragraph>Length: {item.length}</Paragraph>
                    <Paragraph>Duration: {item.duration ? item.duration : "-"}</Paragraph>
                </Card.Content>
                

            </Card>
        </TouchableOpacity>
    )
    const valueChange = (value: any) => {
        setMaxValue(value)
        dispatch(homeActions.fetchMinMaxLTrails(minValue, value));
        setFilterTrails(trails)
    }
    const removeFilter = () => {
        setCurrentFilter(null)
    }
    return (
        <Provider>
            
                <View style={{paddingBottom:heightTab}}>
                    <View style={styles.searchfilterRoot}>
                         <View
                            style={styles.filterIconContainer}
                            >
                            <Portal>
                                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modal}>
                                    <View style={styles.card}>
                                        <Title style={{textAlign:'center'}}>Filters</Title>
                                        <View style = {{flex: 1}}>
                                            <View style = {{flex: 1}}>
                                                <Title style={{textAlign:'left'}}>Difficulty</Title>
                                            </View>
                                            <View style = {{flex: 2}}>
                                            <ButtonGroup
                                                onPress = {setCurrentFilter}
                                                selectedIndex = {currentFilter}
                                                buttons = {buttons}
                                                selectedButtonStyle = {styles.diffButton}
                                            />
                                            </View>
                                        </View>
                                        <View style = {{flex: 2}}>
                                            <Title style={{textAlign:'center'}}>Minimum Trail Length</Title>
                                            <Picker
                                              dropdownIconColor = {"#597d35"}
                                              selectedValue={minValue}
                                              onValueChange={(itemValue:any) =>
                                                setMinValue(itemValue)
                                              }>
                                              <Picker.Item label="0" value="0" />
                                              <Picker.Item label="1" value="1" />
                                              <Picker.Item label="2" value="2" />
                                              <Picker.Item label="3" value="3" />
                                              <Picker.Item label="4" value="4" />
                                              <Picker.Item label="5" value="5" />
                                              <Picker.Item label="6" value="6" />
                                              <Picker.Item label="7" value="7" />
                                              <Picker.Item label="8" value="8" />
                                              <Picker.Item label="9" value="9" />
                                              <Picker.Item label="10" value="10" />
                                              <Picker.Item label="11" value="11" />

                                            </Picker>
                                        </View>
                                        <View style = {{flex: 2}}>
                                            <Title style={{textAlign:'center'}}>Maximum Trail Length</Title>
                                            <Picker
                                              dropdownIconColor = {"#597d35"}
                                              selectedValue={maxValue}
                                              onValueChange={valueChange}>
                                              <Picker.Item label="0" value="0" />
                                              <Picker.Item label="1" value="1" />
                                              <Picker.Item label="2" value="2" />
                                              <Picker.Item label="3" value="3" />
                                              <Picker.Item label="4" value="4" />
                                              <Picker.Item label="5" value="5" />
                                              <Picker.Item label="6" value="6" />
                                              <Picker.Item label="7" value="7" />
                                              <Picker.Item label="8" value="8" />
                                              <Picker.Item label="9" value="9" />
                                              <Picker.Item label="10" value="10" />
                                              <Picker.Item label="11" value="11" />
                                            </Picker>
                                        </View>
                                        <View style = {{flex: 0.5}}>
                                        <Button icon="filter-remove" onPress = {removeFilter} labelStyle={{color: "#597d35"}}>
                                            <Text style = {{color: "#597d35"}}>Remove Filter</Text>
                                        </Button>
                                        </View>
                                    </View>
                                </Modal>
                            </Portal>
                            <Button icon="filter-menu" onPress = {showModal} labelStyle={{color: "#597d35"}}>
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
            
        </Provider>
    )
}

const mapStateToProps = (state: any) => {
    return {
        trails: state.home.trails,
    }
}


export default connect(mapStateToProps)(HomeScreenRoot);
