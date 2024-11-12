import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useRoute, useIsFocused } from "@react-navigation/native";
import App_StyleSheet from "../../../Styles/App_StyleSheet.js";
import SafeArea from "../../SafeArea";
import { getFriendsList, getSentFriendRequests, getPendingFriendRequests } from "../../../Controller/FriendsManager";
import UserListing from "./userListing";
function FriendsView({ navigation }) {
  const route = useRoute();
  const isFocused = useIsFocused();
  const [listOfUsers, setListOfUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const array = await getFriendsList(route.params.User.userUserName);
      const array2 = await getSentFriendRequests(route.params.User.userUserName);
      const array3 = await getPendingFriendRequests(route.params.User.userUserName);
      console.log(array);
      console.log(array2);
      console.log(array3);
      array2.forEach(friend => {
        friend.isRequestSent = true;
        array.push(friend);
      })
      array3.forEach(friend => {
        friend.isRequest = true;
        array.push(friend);
      })
      setListOfUsers(array);
    };
    fetchUsers();
  }, [isFocused]);
  return (
    <SafeArea>
      <TouchableOpacity
        style={App_StyleSheet.large_button}
        onPress={() => navigation.navigate("Search")}
      >
        <Text style={App_StyleSheet.text}>{"Search User"}</Text>
      </TouchableOpacity>
      <View style={App_StyleSheet.friends_list_block}>
        <Text style={App_StyleSheet.friends_list_header}>Friends List</Text>
        <FlatList
          style={App_StyleSheet.listings}
          data={listOfUsers}
          renderItem={({ item }) => (
            <UserListing
              user={item}
              onClick={() => {
                if (navigation) {
                  navigation.navigate("Friend", {
                    FriendEmail: item.email,
                  });
                }
              }}
            />
          )}
        />
      </View>
    </SafeArea>
  );
}
export default FriendsView;
