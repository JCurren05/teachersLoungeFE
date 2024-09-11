import React from "react";
import { StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ConversationView from "./ConversationView";
import CreateNewChatView from "./CreateNewChatView";
import MessagesView from "./MessagesView";

const HomeStack = createStackNavigator();
MessagesNavigator.lastClick = null;

function MessagesNavigator({ navigation }) {
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
        name="Messages"
        component={MessagesView}
        initialParams={route.params}
        options={{
          headerLeft: () => null,
        }}
      />
      <HomeStack.Screen
        name="Conversation"
        component={ConversationView}
        initialParams={route.params}
      />
      <HomeStack.Screen
        name="New Chat"
        component={CreateNewChatView}
        initialParams={route.params}
      />
    </HomeStack.Navigator>
  );
}

const styles = StyleSheet.create({});

export default MessagesNavigator;
