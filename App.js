import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';


//try baby 
import HomeScreen from './screens/HomeScreen';
import ImportScreen from './screens/ImportScreen';
import ExportScreen from './screens/ExportScreen';

import { createStackNavigator, StackNavigator } from '@react-navigation/stack';


const ProductStack = createStackNavigator();

function ProductStackScreen(){
  return (
    <ProductStack.Navigator>
      <ProductStack.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
      <ProductStack.Screen name="Export" component={ExportScreen} options={{headerShown:false}}  />
    </ProductStack.Navigator>
  );
}


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
                
        <Tab.Screen
          name="IZDELKI"
          component={ProductStackScreen}
          
          options={{
            tabBarLabel: 'IZDELKI',
            headerShown:false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="cube-outline" color={color} size={size} />
            ),
          }}
        />

        <Tab.Screen
          name="UVOZ"
          component={ImportScreen}
          options={{
            tabBarLabel: 'UVOZ',
            headerShown:false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="add-outline" color={color} size={size} />
            ),
          }}
        />


      </Tab.Navigator>
    </NavigationContainer>
  );
}