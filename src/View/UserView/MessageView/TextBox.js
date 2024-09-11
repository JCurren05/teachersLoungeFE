import React, { createRef, useEffect, useRef } from "react";
import { useState, setState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  KeyboardAvoidingView,
} from "react-native";
import { TextInput } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import ConversationView from "./ConversationView";
import { sendMessage } from "../../../Controller/DirectMessagesManager";

function TextBox({ navigation, details }) {
  const route = useRoute();
  const [message, setMessage] = useState("");

  const sendMessageHandler = async () => {
    try {
      const result = await sendMessage(
        details.conversationId,
        message,
        details.User.userUserName
      );
      if (result) {
        navigation.navigate("Conversation", details);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ flexDirection: "row" }}>
      <TextInput
        style={styles.bottom}
        placeholder="Type Message"
        multiline={true}
        defaultValue=""
        value={message}
        onChangeText={(value) => {
          setMessage(value);
        }}
      />
      <TouchableOpacity
        style={{
          flex: 1,
          borderColor: "black",
          backgroundColor: "aqua",
          borderWidth: 2,
          borderRadius: 20,
          justifyContent: "center",
        }}
        onPress={async () => {
          setMessage("");
          await sendMessageHandler();
        }}
      >
        <Text style={styles.text}>{"Send"}</Text>
      </TouchableOpacity>
    </View>
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
  },
  text: {
    textAlign: "center",
  },
});

export default TextBox;
