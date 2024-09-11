import React from "react";
import { StyleSheet, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CreatePostView from "./CreatePostView";
import PostListingsView from "./PostListingsView";
import ProfileView from "../ProfileView/ProfileView";
import CommunitiesView from "./CommunitiesView";
import CommunityView from "./CommunityView";
import CreateCommunityView from "./CreateCommunityView";
import JoinCommunityView from "./JoinCommunityView";

const HomeStack = createStackNavigator();

function HomeNavigator({ navigation }) {
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
        name="Home"
        component={PostListingsView}
        initialParams={route.params}
        options={{
          headerLeft: () => null,
        }}
      />
      <HomeStack.Screen
        name="Create Post"
        component={CreatePostView}
        initialParams={route.params}
      />
      <HomeStack.Screen
        name="Profile"
        component={ProfileView}
        initialParams={route.params}
      />
      <HomeStack.Screen
        name="Communities"
        component={CommunitiesView}
        initialParams={route.params}
      />
      <HomeStack.Screen
        name="Community"
        component={CommunityView}
        initialParams={route.params}
      />
      <HomeStack.Screen
        name="Create Community"
        component={CreateCommunityView}
        initialParams={route.params}
      />
      <HomeStack.Screen
        name="Join Community"
        component={JoinCommunityView}
        initialParams={route.params}
      />
    </HomeStack.Navigator>
  );
}

const styles = StyleSheet.create({});

export default HomeNavigator;
