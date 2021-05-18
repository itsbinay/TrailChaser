import React from 'react';
import {View,Text,TouchableOpacity} from 'react-native';

export default function CustomNavigationTab({state,descriptors,navigation}:any){

    const tintColor = "#597d35"

    const fontActiveTintColor = "#f7fffe"
    const fontInAtiveTintColor = "#92a4ae"
    return(
        <View
            style={{
                    flexDirection:'row',
                    height:75,
                    backgroundColor:'#ffffff',
                    borderTopLeftRadius:30,
                    borderTopRightRadius:30,
                    shadowColor: "#597d35",
                    shadowOffset: {
                        width: 0,
                        height: 5,
                    },
                    shadowOpacity: 0.64,
                    shadowRadius: 6.27,
                    elevation: 10,
                }}>
                {
                    state.routes.map((route:any,index:any)=>{
                        const { options } = descriptors[route.key];
                        const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                            ? options.title
                            : route.name;

                        const isFocused = state.index === index;
                        
                        const onPress = () => {
                            const event = navigation.emit({
                                type: 'tabPress',
                                target: route.key,
                            });

                            if (!isFocused && !event.defaultPrevented) {
                                navigation.navigate(route.name);
                            }
                        };

                        const onLongPress = () => {
                            navigation.emit({
                                type: 'tabLongPress',
                                target: route.key,
                            });
                        };

                        return (
                            <TouchableOpacity
                                accessibilityRole="button"
                                accessibilityState={isFocused ? { selected: true } : {}}
                                accessibilityLabel={options.tabBarAccessibilityLabel}
                                testID={options.tabBarTestID}
                                onPress={onPress}
                                onLongPress={onLongPress}
                                style={{flex:1, justifyContent:"center",alignItems:"center",}}
                                key={index}
                            >
                                <View style={{justifyContent:"center",alignItems:"center",borderRadius:60,backgroundColor: isFocused?tintColor:'white',width:65,height:65}}>
                                    <Text style={{textAlign:"center",color: isFocused?fontActiveTintColor:fontInAtiveTintColor,fontWeight:"bold"}}>
                                        {label}
                                    </Text>
                                    <options.tabBarIcon color={isFocused?fontActiveTintColor:fontInAtiveTintColor}/>
                                </View>
                            </TouchableOpacity>
                        );
                    })
                }
            </View>
    )
}