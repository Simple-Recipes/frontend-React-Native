/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
import store from './js/store';
import AppNavigator from './js/navigator/AppNavigator';
import {name as appName} from './app.json';

const App = () => (
  <Provider store={store}>
    <AppNavigator />
  </Provider>
);

AppRegistry.registerComponent(appName, () => App);
