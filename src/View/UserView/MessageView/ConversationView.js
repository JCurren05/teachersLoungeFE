import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRoute, useFocusEffect } from "@react-navigation/native";
import { TextInput } from "react-native-paper";
import SafeArea from "../../SafeArea";
import MessagesNavigator from "./MessagesNavigator";
import TextBox from "./TextBox";
import MessageBox from "./MessageBox";
import { getMessages } from "../../../Controller/DirectMessagesManager";
import { useHeaderHeight } from "@react-navigation/elements";

function ConversationView({ navigation }) {
  const route = useRoute();
  const [messages, setMessages] = useState([]);
  const image = require("../../../../assets/Account.png");

  useFocusEffect(() => {
    loadMessages(route.params.conversationId);
  });

  // Populates messages array
  const loadMessages = async (conversationId) => {
    try {
      const data = await getMessages(conversationId);
      data.reverse();
      setMessages(data);
    } catch (error) {
      console.log(error);
    }
  };
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
        <TextBox navigation={navigation} details={route.params}></TextBox>
      </KeyboardAvoidingView>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  bottom: {
    flex: 3,
  },
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
