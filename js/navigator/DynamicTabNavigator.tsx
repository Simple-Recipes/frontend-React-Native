import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTheme} from '@react-navigation/native';
import TabIcon from '../common/TabIcon';

import ShoppingListPage from '../page/ShoppingListPage';
import ProfilePage from '../page/ProfilePage';
import PopularPage from '../page/PopularPage';
import RecommendationPage from '../page/RecommendationPage';
import WeeklyMealPlanScreen from '../page/WeeklyMealPlanScreen';
import InventoryPage from '../page/InventoryPage';

const Tab = createBottomTabNavigator();

const DynamicTabNavigator = () => {
  const {colors} = useTheme(); // 获取主题颜色

  return (
    <Tab.Navigator
      initialRouteName="Recipes"
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName = '';
          let iconType: 'MaterialIcons' | 'Ionicons' | 'Entypo' =
            'MaterialIcons';

          switch (route.name) {
            case 'Recipes':
              iconName = 'restaurant';
              iconType = 'MaterialIcons';
              break;
            case 'Recommendation': // 替换 Inventory 为 Recommendation
              iconName = 'star'; // 合适的图标，表示推荐
              iconType = 'MaterialIcons';
              break;
            case 'WeeklyMealPlanScreen': // 使用 WeeklyMealPlanScreen 替换 MealPlan
              iconName = 'calendar';
              iconType = 'Ionicons';
              break;
            case 'ShoppingList':
              iconName = 'list';
              iconType = 'Entypo';
              break;
            case 'Profile':
              iconName = 'user';
              iconType = 'Entypo';
              break;
            default:
              break;
          }

          return (
            <TabIcon
              name={iconName}
              type={iconType}
              size={size}
              color={color}
            />
          );
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen
        name="Recipes"
        component={PopularPage}
        options={{
          tabBarLabel: 'Recipes',
          tabBarIcon: ({color, size}) => (
            <TabIcon
              name="restaurant"
              type="MaterialIcons"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Recommendation"
        component={RecommendationPage}
        options={{
          tabBarLabel: 'Recommendation',
          tabBarIcon: ({color, size}) => (
            <TabIcon
              name="star"
              type="MaterialIcons"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="WeeklyMealPlan"
        component={WeeklyMealPlanScreen}
        options={{
          tabBarLabel: 'Meal Plan',
          tabBarIcon: ({color, size}) => (
            <TabIcon
              name="calendar"
              type="Ionicons"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Inventory"
        component={InventoryPage}
        options={{
          tabBarLabel: 'Inventory',
          tabBarIcon: ({color, size}) => (
            <TabIcon name="list" type="Entypo" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfilePage}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <TabIcon name="user" type="Entypo" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default DynamicTabNavigator;
