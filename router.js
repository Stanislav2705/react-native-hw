import React from 'react'
import { AntDesign, Feather, MaterialIcons } from '@expo/vector-icons';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const AuthStack = createNativeStackNavigator();
const MainTab = createBottomTabNavigator();

import LoginScreen from './screens/auth/LoginScreen.jsx';
import RegistrationScreen from "./screens/auth/RegistrationScreen.jsx";

import PostsScreen from './screens/mainScreen/PostsScreen/PostsScreen.jsx';
import CreatePostsScreen from './screens/mainScreen/CreatePostsScreen/CreatePostsScreen.jsx';
import ProfileScreen from './screens/mainScreen/ProfileScreen/ProfileScreen.jsx';

 export const useRoute = (isAuth) => {
    if (!isAuth) {
      return <AuthStack.Navigator>
      <AuthStack.Screen
        options={{
          headerShown: false,
        }}
        name='Login'
        component={LoginScreen}
      />
      <AuthStack.Screen
        options={{
          headerShown: false,
        }}
        name='Register'
        component={RegistrationScreen}
      />
    </AuthStack.Navigator>
    }
   return (
       <MainTab.Navigator
         screenOptions={{
           tabBarActiveTintColor: '#FFFFFF',
           tabBarActiveBackgroundColor: '#FF6C00',
           tabBarInactiveTintColor: '#212121',
           tabBarShowLabel: false,
           tabBarStyle: {
             height: 60,
             paddingHorizontal: 60,
             paddingVertical: 8,
             elevation: 0,
             borderTopColor: "#E5E5E5",
             borderTopWidth: 1,
             display: "flex",
           },
           tabBarItemStyle: {
             borderRadius: 20,
             height: 40,
           },
           headerTitleAlign: 'center',
           headerTintColor: "#212121",
           headerStyle: {
            backgroundColor: "#FFFFFF",
            borderBottomWidth: 1,
            borderBottomColor: "#E5E5E5",
            elevation: 0,
           },
           headerShadowVisible: true,
         }}
         >
         <MainTab.Screen options={{
           tabBarIcon: ({ focused, color }) => (
            <AntDesign name="appstore-o" size={24} color={color} /> 
         ),
           headerShown: false,
           headerRight: () => (
          <MaterialIcons name="logout" size={24} color='#BDBDBD' onPress={() => alert('Login')} style={{marginRight: 10}} />
           ),
         }} name='Posts' component={PostsScreen} />
         <MainTab.Screen options={{
                 tabBarIcon: ({ focused, color }) => (
            <AntDesign name="plus" size={24} color={color} /> 
         )}} name='CreatePosts' component={CreatePostsScreen} />
         <MainTab.Screen options={{
                 tabBarIcon: ({ focused, color }) => (
            <Feather name="user" size={24} color={color} /> 
         )}} name='Profile' component={ProfileScreen} />
       </MainTab.Navigator>
     );
  }