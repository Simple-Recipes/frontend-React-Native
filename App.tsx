import React from 'react';
import {Provider} from 'react-redux';
import store from './js/store';
import AppNavigator from './js/navigator/AppNavigator';

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
