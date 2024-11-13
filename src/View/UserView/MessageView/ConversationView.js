import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRoute, useFocusEffect } from "@react-navigation/native";
import SafeArea from "../../SafeArea";
import MessageBox from "./MessageBox";
import { getMessages } from "../../../Controller/DirectMessagesManager";
import { useHeaderHeight } from "@react-navigation/elements";
import TextBox from "./TextBox";

function ConversationView({ navigation }) {
  const route = useRoute();
  const [messages, setMessages] = useState([]);
  const image = require("../../../../assets/Account.png");

  const loadMessages = async (conversationId) => {
    try {
      const data = await getMessages(conversationId);
      data.reverse();
      setMessages(data);
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      // Load messages initially when the screen gains focus
      loadMessages(route.params.conversationId);

      // Set up polling interval to refresh messages every 10 seconds
      const intervalId = setInterval(() => {
        loadMessages(route.params.conversationId);
      }, 3000); // Poll every 10 seconds; adjust to 15000 for 15 seconds if desired

      // Cleanup interval when the screen loses focus
      return () => clearInterval(intervalId);
    }, [route.params.conversationId]) // Dependency to re-run if the conversation changes
  );

  const height = useHeaderHeight();

  return (
    <SafeArea
      style={{
        backgroundColor: "#fff",
      }}
    >
      <View style={styles.friendNameHeader}>
        <Image style={styles.profilePic} source={image} />
        <Text style={styles.user}>{route.params.username}</Text>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "position" : "height"}
        keyboardVerticalOffset={height}
        enabled
      >
        <View style={{ height: 460 }}>
          <FlatList
            data={messages}
            renderItem={({ item }) => (
              <MessageBox
                navigation={navigation}
                message={item.content}
                incoming={
                  route.params.User.userUserName === item.sender ? false : true
                }
              />
            )}
            inverted={true}
          />
        </View>
        <TextBox navigation={navigation} details={route.params} />
      </KeyboardAvoidingView>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  friendNameHeader: {
    justifyContent: "center",
    alignItems: "center",
    textAlignVertical: "center",
    backgroundColor: "aquamarine",
    flexDirection: "row",
  },
  user: {
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    textAlignVertical: "center",
    color: "black",
    fontSize: 30,
  },
  profilePic: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginRight: 10,
  },
});

export default ConversationView;
