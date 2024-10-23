import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useRoute, useIsFocused } from "@react-navigation/native";
import { TextInput } from "react-native-paper";
import { getUserInfo } from "../../../Controller/FriendsManager";
import Friend from "../../../Model/Friend.js";
import App_StyleSheet from "../../../Styles/App_StyleSheet.js";
import SafeArea from "../../SafeArea";
import {
  checkIfFriended,
  friendUser,
  unfriendUser,
} from "../../../Controller/FriendsManager";

function FriendView({ navigation }) {
  const route = useRoute();
  const isFocused = useIsFocused();
  const [friend, setFriend] = useState(
    new Friend(route.params.FriendEmail, "first", "last", "Id", "Role")
  );
  const [friended, setFriended] = useState(false);
  const [friendee, setFriendee] = useState(false);
  const loadFriend = async () => {
    console.log(route.params);
    const paramsString = JSON.stringify(route.params);
    const paramsArray = JSON.parse(paramsString);

    console.log("***********")
    console.log(paramsArray.FriendEmail);
    const data = await getUserInfo(paramsArray.FriendEmail);
    // console.log(route.params.User);
    // console.log(data);

    console.log(data);
    setFriend(data);
  };
  // Check if user friended
  const checkFriended = async () => {
    const data = await checkIfFriended(
      route.params.User.userUserName,
      route.params.FriendEmail
    );
    setFriended(data);
  };
  // Check if friendee friended
  const checkFriendee = async () => {
    const data = await checkIfFriended(
      route.params.FriendEmail,
      route.params.User.userUserName
    );
    setFriendee(data);
  };
  React.useEffect(() => {
    if (isFocused) {
      loadFriend();
      checkFriended();
      checkFriendee();
    }
  }, [isFocused]);
  let friendStatus = "";
  if (friended && friendee) {
    friendStatus = "friend";
  } else if (friended) {
    friendStatus = "pending";
  } else {
    friendStatus = "not friend"
  }
  return (
    <View style={App_StyleSheet.listings}>
      <SafeArea>
        <View>
          <View style={App_StyleSheet.profile_padding}>
            <Text style={App_StyleSheet.friend_userNameStyle}>
              {friend.firstName} {friend.lastName}
            </Text>
            <View style={App_StyleSheet.friend_info_padding}>
              <Text style={App_StyleSheet.friend_info_text}>
                Email: {friend.email}
              </Text>
              <Text style={App_StyleSheet.friend_info_text}>
                Role: {friend.role}
              </Text>
              <Text style={App_StyleSheet.friend_info_text}>
                School: {friend.schoolId}
              </Text>
              <Text style={App_StyleSheet.friend_info_text}>
                Status:{" "}
                {friendStatus}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={App_StyleSheet.small_button}
            onPress={() => {
              friended
                ? unfriendUser(
                  { navigation },
                  route.params.User.userUserName,
                  friend.email
                )
                : friendUser(
                  { navigation },
                  route.params.User.userUserName,
                  friend.email
                );
            }}
          >
            <Text style={App_StyleSheet.text}>
              {friended ? "Unfriend User" : "Friend User"}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeArea>
    </View>
  );
}

export default FriendView;
