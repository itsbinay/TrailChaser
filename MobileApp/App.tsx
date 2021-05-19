/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
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

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(persistedReducer, applyMiddleware(thunk))
const persistor = persistStore(store)

Settings.initializeSDK()


const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <Navigation/>
          <StatusBar/>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>

  );
};

export default App;
