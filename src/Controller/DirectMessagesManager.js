import {
  apiUrl,
  createConversationRoute,
  getConversationsRoute,
  sendMessageRoute,
  getMessagesRoute,
  getLastMessageRoute,
} from "@env";
import Conversation from "../Model/Conversation";
import Message from "../Model/Message";
import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";

// Fetches all conversations for a user
const getUserConversations = async (userEmail) => {
  let conversations = [];
  let getUserConversationsUrl =
    apiUrl + getConversationsRoute + `?userEmail=${userEmail}`;

  const reqOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + (await SecureStore.getItemAsync("token")),
    },
  };

  try {
    const response = await fetch(getUserConversationsUrl, reqOptions);
    const results = await response.json();
    let data = results.data;
    conversations = await Promise.all(
      data.map(async (conversation) => {
        const lastMessage = await getLastMessage(conversation.conversationId);
        return new Conversation(
          conversation.conversationId,
          conversation.title,
          conversation.members,
          lastMessage
        );
      })
    );
  } catch (error) {
    console.log(error);
  }

  return conversations;
};

// Fetches the last message for a conversation
const getLastMessage = async (conversationId) => {
  let lastMessage = "";
  let getLastMessageUrl =
    apiUrl + getLastMessageRoute + `?conversationId=${conversationId}`;

  const reqOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + (await SecureStore.getItemAsync("token")),
    },
  };

  try {
    const response = await fetch(getLastMessageUrl, reqOptions);
    const results = await response.json();
    let data = results.data;
    lastMessage = data[0]?.content;
  } catch (error) {
    console.log(error);
  }

  return lastMessage;
};

// Fetches all messages for a conversation
const getMessages = async (conversationId) => {
  let messages = [];
  let getMessagesUrl =
    apiUrl + getMessagesRoute + `?conversationId=${conversationId}`;

  const reqOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + (await SecureStore.getItemAsync("token")),
    },
  };

  try {
    const response = await fetch(getMessagesUrl, reqOptions);
    const results = await response.json();
    let data = results.data;

    messages = data.map((message) => {
      return new Message(
        message.messageID,
        message.conversationID,
        message.content,
        message.sender,
        message.time
      );
    });
  } catch (error) {
    console.log(error);
  }

  return messages;
};

// Sends a message to a conversation
const sendMessage = async (conversationId, message, senderEmail) => {
  let sendMessageUrl = apiUrl + sendMessageRoute;
  const reqOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + (await SecureStore.getItemAsync("token")),
    },
    body: JSON.stringify({
      conversationId: conversationId,
      message: message,
      senderEmail: senderEmail,
    }),
  };

  let response = null;

  try {
    response = await fetch(sendMessageUrl, reqOptions);
    const results = await response.json();
    return response.status == 200;
  } catch (error) {
    console.log(error);
  }

  return false;
};

const createConversation = async (senderEmail, receiverEmail) => {
  let createConversationUrl = apiUrl + createConversationRoute;
  console.log(createConversationUrl);
  console.log("JSON Parse");
  
  const reqOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + (await SecureStore.getItemAsync("token")),
    },
    body: JSON.stringify({
      senderEmail: senderEmail,
      receiverEmail: receiverEmail,
    }),
  };

  let response = null;
  try {
    response = await fetch(createConversationUrl, reqOptions);
    
    // Only read the response once as JSON
    const results = await response.json();
    console.log(results);

    // Check if the conversation was created successfully
    if (response.status === 200) {
      return true;
    } else {
      console.log("Error: " + results.message);  // Log the message from the server
      return false;
    }

  } catch (error) {
    Alert.alert("Error", "Unable to create conversation");
    console.log(error);
  }

  return false;
};


export { getUserConversations, getMessages, sendMessage, createConversation };
