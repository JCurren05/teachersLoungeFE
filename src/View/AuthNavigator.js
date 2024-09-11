import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignInView from "./SignInView";
import UserView from "./UserView/UserView";
import RegisterView from "./RegisterView";
import LogOutView from "./UserView/LogOutView";
import UploadView from "./UserView/HomeView/UploadView";
import CreatePostView from "./UserView/HomeView/CreatePostView";

const Stack = createStackNavigator();

function AuthNavigator({ route }) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={SignInView} />
        <Stack.Screen name="User" component={UserView} />
        <Stack.Screen name="Register" component={RegisterView} />

        <Stack.Screen name="LogOut" component={LogOutView}/>

        <Stack.Screen name="Upload" component={UploadView} />
      
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({});
export default AuthNavigator;
