import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useRoute, useFocusEffect } from "@react-navigation/native";
import SafeArea from "../../SafeArea";
import MessageView from "./MessageView";
import MessagesNavigator from "./MessagesNavigator";
import App_StyleSheet from "../../../Styles/App_StyleSheet";
import { getUserConversations } from "../../../Controller/DirectMessagesManager";

function MessagesView({ navigation }) {
  const route = useRoute();
  const [conversations, setConversations] = useState([]);

  // Poll only when the screen is in focus
  useFocusEffect(
    React.useCallback(() => {
      const loadConversations = async () => {
        try {
          const data = await getUserConversations(route.params.User.userUserName);
          setConversations(data);
        } catch (error) {
          console.error("Error loading conversations:", error);
        }
      };

      // Initial load when the screen gains focus
      loadConversations();

      // Set up the polling interval (10-15 seconds)
      const intervalId = setInterval(() => {
        loadConversations();
      }, 5000); // Adjust to 15000 (15 seconds) if desired

      // Cleanup interval when the screen loses focus
      return () => clearInterval(intervalId);
    }, [route.params.User.userUserName]) // Dependency to re-run if the user changes
  );

  return (
    <SafeArea>
      <TouchableOpacity
        style={App_StyleSheet.large_button}
        onPress={() => navigation.navigate("New Chat")}
      >
        <Text style={App_StyleSheet.text}>{"Start New Chat..."}</Text>
      </TouchableOpacity>
      <View style={App_StyleSheet.listings}>
        {conversations && (
          <FlatList
            data={conversations}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  (MessagesNavigator.lastClick = item),
                    navigation.navigate("Conversation", {
                      conversationId: item.id,
                      username: item.title,
                    });
                }}
              >
                <MessageView
                  userName={item.title}
                  latestMessage={item.lastMessageText}
                  profileImage={"../../../../assets/Account.png"}
                />
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </SafeArea>
  );
}

export default MessagesView;
