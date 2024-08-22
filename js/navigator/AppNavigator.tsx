import React from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  Theme,
  NavigationContainerRef,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {enableScreens} from 'react-native-screens';
import NavigationUtil from '../util/NavigationUtil';
import WelcomePage from '../page/WelcomePage';
import HomePage from '../page/HomePage';
import LoginPage from '../page/LoginPage';
// import DynamicTabNavigator from './DynamicTabNavigator';
import ProfilePage from '../page/ProfilePage';
import RegistrationPage from '../page/RegistrationPage';
import ForgotPasswordPage from '../page/ForgotPasswordPage';
import ResetPasswordPage from '../page/ResetPasswordPage';
import theme from '../action/theme/index';

const Stack = createStackNavigator();
enableScreens();

const MyTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...theme.colors,
  },
};

export default function AppNavigator() {
  return (
    <NavigationContainer
      ref={navigatorRef => {
        NavigationUtil.navigation = navigatorRef as NavigationContainerRef<any>;
      }}
      theme={MyTheme} // 应用主题
    >
      <Stack.Navigator
        initialRouteName="WelcomePage"
        screenOptions={{headerShown: false}} // 全局禁用 header
      >
        <Stack.Screen
          name="WelcomePage"
          component={WelcomePage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LoginPage"
          component={LoginPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HomePage"
          component={HomePage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ProfilePage"
          component={ProfilePage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RegistrationPage"
          component={RegistrationPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ForgotPasswordPage"
          component={ForgotPasswordPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ResetPasswordPage"
          component={ResetPasswordPage}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
