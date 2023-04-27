import React from "react";
import { moduleName } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import DefaultScreenPosts from "../../nestedScreens/DefaultScreenPosts/DefaultScreenPosts";
import CommentsScreen from "../../nestedScreens/CommentsScreen/CommentsScreen";
import MapScreen from "../../nestedScreens/MapScreen/MapScreen";



const NestedStack = createStackNavigator();

const PostsScreen = () => {
 return (
    <NestedStack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
        <NestedStack.Screen name='DefaultScreen' component={DefaultScreenPosts} />
        <NestedStack.Screen name="Comments" component={CommentsScreen} />
        <NestedStack.Screen name='Map' component={MapScreen}/>
    </NestedStack.Navigator>
 )
}

export default PostsScreen;

