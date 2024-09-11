import React from "react";
import { StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileView from "./ProfileView";
import EditProfileView from "./EditProfileView";
import EditView from "./EditView";
import PostListingsView from "../HomeView/PostListingsView";
import PostModeratorView from "../ProfileView/PostModeratorView";
import UserModeratorView from "../ProfileView/UserModeratorView";
const HomeStack = createStackNavigator();
ProfileNavigator.lastClick = null;

function ProfileNavigator({ navigation }) {
  const route = useRoute();
  return (
    <HomeStack.Navigator
      screenOptions={{
        activeBackgroundColor: "blue",
        activeTintColor: "white",
        inactiveBackgroundColor: "gray",
        inactiveTintColor: "black",
        headerStyle: {
          backgroundColor: "#411c00",
        },
        headerTintColor: "#fff3d7",
      }}
    >
      <HomeStack.Screen
        name="Profile"
        component={ProfileView}
        initialParams={route.params}
        options={{
          headerLeft: () => null,
        }}
      />
      <HomeStack.Screen
        name="Edit Profile"
        component={EditProfileView}
        initialParams={route.params}
      />
      <HomeStack.Screen
        name="Edit Name"
        component={EditView}
        initialParams={route.params}
      />
      <HomeStack.Screen
        name="Edit Username"
        component={EditView}
        initialParams={route.params}
      />
      <HomeStack.Screen
        name="Edit School"
        component={EditView}
        initialParams={route.params}
      />
      <HomeStack.Screen
        name="Home"
        component={PostListingsView}
        initialParams={route.params}
      />
      <HomeStack.Screen
        name="User Moderation"
        component={UserModeratorView}
        initialParams={route.params}
      />
      <HomeStack.Screen
        name="Post Moderation"
        component={PostModeratorView}
        initialParams={route.params}
      />
    </HomeStack.Navigator>
  );
}

const styles = StyleSheet.create({});

export default ProfileNavigator;
