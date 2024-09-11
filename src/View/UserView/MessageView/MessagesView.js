import React, { useEffect, useState } from "react";
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
import OpenMessageCommand from "../../../Controller/OpenMessageCommand";
import App_StyleSheet from "../../../Styles/App_StyleSheet";
import { getUserConversations } from "../../../Controller/DirectMessagesManager";

function MessagesView({ navigation }) {
  const route = useRoute();
  const [conversations, setConversations] = useState([]);


  useFocusEffect(() => {
    loadConversations();
  })

  const loadConversations = async () => {
    const data = await getUserConversations(route.params.User.userUserName);
    setConversations(data);
  };

  return (
    <SafeArea>
      <TouchableOpacity
        style={App_StyleSheet.large_button}
        onPress={() => navigation.navigate("New Chat")}
      >
        <Text style={App_StyleSheet.text}>{"Start New Chat..."}</Text>
      </TouchableOpacity>
      <View style={App_StyleSheet.listings}>
        {conversations && <FlatList
          data={conversations}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                (MessagesNavigator.lastClick = item),
                  navigation.navigate("Conversation", {conversationId: item.id, username: item.title});
              }}
            >
              <MessageView
                  userName={item.title}
                  latestMessage={item.lastMessageText}
                  profileImage={"../../../../assets/Account.png"}
                />
            </TouchableOpacity>
          )}
        />}
      </View>
    </SafeArea>
  );
}
export default MessagesView;
