import React from 'react';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {enableScreens} from 'react-native-screens';
import NavigationUtil from '../util/NavigationUtil';
import WelcomePage from '../page/WelcomePage';
import LoginPage from '../page/LoginPage';
import HomePage from '../page/HomePage';
import ProfilePage from '../page/ProfilePage';
import RegistrationPage from '../page/RegistrationPage';
import ForgotPasswordPage from '../page/ForgotPasswordPage';
import ResetPasswordPage from '../page/ResetPasswordPage';

const Stack = createStackNavigator();
enableScreens();

export default function AppNavigator() {
  return (
    <NavigationContainer
      ref={navigatorRef => {
        NavigationUtil.navigation = navigatorRef as NavigationContainerRef<any>;
      }}>
      <Stack.Navigator
        initialRouteName="WelcomePage"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="WelcomePage" component={WelcomePage} />
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
