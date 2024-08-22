import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTheme} from '@react-navigation/native';
import TabIcon from '../common/TabIcon';

import InventoryPage from '../page/InventoryPage';
import MealPlanPage from '../page/MealPlanPage';
import ShoppingListPage from '../page/ShoppingListPage';
import ProfilePage from '../page/ProfilePage';
import PopularPage from '../page/PopularPage';

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
            case 'Inventory':
              iconName = 'inventory';
              iconType = 'MaterialIcons';
              break;
            case 'MealPlan':
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
      <Tab.Screen name="Inventory" component={InventoryPage} />
      <Tab.Screen name="MealPlan" component={MealPlanPage} />
      <Tab.Screen name="ShoppingList" component={ShoppingListPage} />
      <Tab.Screen name="Profile" component={ProfilePage} />
    </Tab.Navigator>
  );
};

export default DynamicTabNavigator;
