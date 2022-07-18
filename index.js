/**
 * @format
 */

import React from 'react';
import {AppRegistry, Text} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import store, {persistor} from './src/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import {RootSiblingParent} from 'react-native-root-siblings';

function Root() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <NavigationContainer>
          <RootSiblingParent>
            <App />
          </RootSiblingParent>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => Root);
