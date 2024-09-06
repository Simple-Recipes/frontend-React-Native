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
import ProfilePage from '../page/ProfilePage';
import RegistrationPage from '../page/RegistrationPage';
import ForgotPasswordPage from '../page/ForgotPasswordPage';
import ResetPasswordPage from '../page/ResetPasswordPage';
import RecipeDetailsPage from '../page/RecipeDetailsPage';
import WeeklyMealRecommendations from '../page/WeeklyMealRecommendations';
import WeeklyMealPlanScreen from '../page/WeeklyMealPlanScreen'; // 导入新增的两个页面
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
      theme={MyTheme}>
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
        <Stack.Screen name="RecipeDetails" component={RecipeDetailsPage} />

        <Stack.Screen
          name="WeeklyMealRecommendations"
          component={WeeklyMealRecommendations}
        />
        <Stack.Screen
          name="WeeklyMealPlanScreen"
          component={WeeklyMealPlanScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
