/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React,{useEffect} from 'react';
import 'react-native-gesture-handler';

import {
  StatusBar,
} from 'react-native';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import Navigation from './src/navigation';


import { persistStore, persistReducer } from 'redux-persist'
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from './redux/reducers'
import {Provider} from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { Settings } from 'react-native-fbsdk-next';
import { PermissionsAndroid } from 'react-native';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(persistedReducer, applyMiddleware(thunk))
const persistor = persistStore(store)

Settings.initializeSDK()


const App = () => {
  useEffect(()=>{
    const requestLocationPermissions = async () => {
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
        } else {
          console.log("location permission denied");
        }
      } catch (err) {
        console.warn(err);
      }
    };
    requestLocationPermissions();
  },[])
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <Navigation/>
          <StatusBar backgroundColor="black"/>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>

  );
};

export default App;
