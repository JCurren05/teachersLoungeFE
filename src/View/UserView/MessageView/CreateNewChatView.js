import React, { useState, useEffect } from "react";
import { TouchableOpacity, FlatList, View, Text } from "react-native";
import { useRoute, useIsFocused } from "@react-navigation/native";
import SafeArea from "../../SafeArea";
import UserListing from "../FriendsView/userListing";
import MessagesNavigator from "./MessagesNavigator";
import FriendsListView from "./FriendsListView";
import OpenMessageCommand from "../../../Controller/OpenMessageCommand";
import App_StyleSheet from "../../../Styles/App_StyleSheet";
import { Alert } from "react-native";
import {
  checkIfFriended,
  getFriendsList,
} from "../../../Controller/FriendsManager";
import { createConversation } from "../../../Controller/DirectMessagesManager";

function CreateNewChatView({ navigation }) {
  const route = useRoute();
  const isFocused = useIsFocused();
  const [listOfUsers, setListOfUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (isFocused) {
        const array = await getFriendsList(route.params.User.userUserName);
        setListOfUsers(array);
      }
    };
    fetchUsers();
  }, [isFocused]);
  return (listOfUsers.length > 0) ? (
    <View style={App_StyleSheet.listings}>
      <SafeArea>
        <FlatList
          data={listOfUsers}
          renderItem={({ item }) => (
            <UserListing
              user={item}
              onClick={async () => {
                const created = await createConversation(route.params.User.userUserName, item.email);
                if (created) {
                  Alert.alert("Success", "Conversation created");
                }else{
                  Alert.alert("Error", "Conversation already exists!");
                }
              }}
            />
          )}
        />
      </SafeArea>
    </View>
  )
  : 
  (<View style={App_StyleSheet.listings}>
    <SafeArea>
      <Text style={App_StyleSheet.moderation_view}>
      You need to have at least 1 friend in order to create a chat.
      </Text>
    </SafeArea>
  </View>);
}

export default CreateNewChatView;
