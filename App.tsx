import React from 'react';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {enableScreens} from 'react-native-screens';
import NavigationUtil from './js/navigator/NavigationUtil';
import LoginPage from './js/page/LoginPage';
import HomePage from './js/page/HomePage';
import ProfilePage from './js/page/ProfilePage';
import RegistrationPage from './js/page/RegistrationPage';

const Stack = createStackNavigator();
enableScreens();

export default function App() {
  return (
    <NavigationContainer
      ref={navigatorRef => {
        NavigationUtil.navigation = navigatorRef as NavigationContainerRef<any>;
      }}>
      <Stack.Navigator initialRouteName="LoginPage">
        <Stack.Screen name="LoginPage" component={LoginPage} />
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="ProfilePage" component={ProfilePage} />
        <Stack.Screen name="RegistrationPage" component={RegistrationPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
