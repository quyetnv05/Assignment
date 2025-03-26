// AppNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Login from './auth/login'; // Màn hình đăng nhập
import Register from './auth/Register'; // Màn hình đăng ký
import PlantShopApp from './plants/PlantShopApp '; // Màn hình chính sau khi đăng nhập
import plantlisttree from './plants/PlantsListTrees';
import Detail from './plants/PlantDetailScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={PlantShopApp} // Đây là màn hình chính sau khi đăng nhập
          options={{ headerShown: false }}
        />
           <Stack.Screen
          name="List"
          component={plantlisttree} 
          options={{ headerShown: false }}
        />
              <Stack.Screen
          name="PlantDetail"
          component={Detail} 
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
