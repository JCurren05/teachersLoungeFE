import React from "react";
import { StyleSheet, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeNavigator from "./HomeView/HomeNavigator.js";
import ProfileView from "./ProfileView/ProfileView.js";
import FriendsView from "./FriendsView/FriendsView.js";
import MessagesNavigator from "./MessageView/MessagesNavigator.js";
import ResourcesView from "./ResourcesView/ResourcesView.js";
import ResourcesNavigator from "./ResourcesView/ResourcesNavigator.js";
import ProfileNavigator from "./ProfileView/ProfileNavigator.js";
import FriendsNavigator from "./FriendsView/FriendsNavigator.js";

const Tab = createBottomTabNavigator();
function TabNavigator() {
  const route = useRoute();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        activeBackgroundColor: "#411c00",
        activeTintColor: "#fef3d7",
        inactiveBackgroundColor: "#411c00",
        inactiveTintColor: "black",
        headerStyle: {
          backgroundColor: "#411c00",
        },
        headerTintColor: "#411c00",
      }}
    >
      <Tab.Screen
        name="Friends"
        initialParams={route.params}
        component={FriendsNavigator}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Entypo name="magnifying-glass" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Messages"
        initialParams={route.params}
        component={MessagesNavigator}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Entypo name="message" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Home"
        initialParams={route.params}
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Entypo name="home" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        initialParams={route.params}
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Entypo name="user" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Resources"
        initialParams={route.params}
        component={ResourcesNavigator}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Entypo name="open-book" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  
  );
}

function UserView({ route }) {
  return <TabNavigator />;
}

const styles = StyleSheet.create({});

export default UserView;
