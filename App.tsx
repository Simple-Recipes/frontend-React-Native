import React from 'react';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {enableScreens} from 'react-native-screens';
import NavigationUtil from './js/util/NavigationUtil';
import LoginPage from './js/page/LoginPage';
import HomePage from './js/page/HomePage';
import ProfilePage from './js/page/ProfilePage';
import RegistrationPage from './js/page/RegistrationPage';
import ForgotPasswordPage from './js/page/ForgotPasswordPage';
import ResetPasswordPage from './js/page/ResetPasswordPage';

const Stack = createStackNavigator();
enableScreens();

export default function App() {
  return (
    <NavigationContainer
      ref={navigatorRef => {
        NavigationUtil.navigation = navigatorRef as NavigationContainerRef<any>;
      }}>
      <Stack.Navigator
        initialRouteName="LoginPage"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="LoginPage" component={LoginPage} />
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="ProfilePage" component={ProfilePage} />
        <Stack.Screen name="RegistrationPage" component={RegistrationPage} />
        <Stack.Screen
          name="ForgotPasswordPage"
          component={ForgotPasswordPage}
        />
        <Stack.Screen name="ResetPasswordPage" component={ResetPasswordPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
