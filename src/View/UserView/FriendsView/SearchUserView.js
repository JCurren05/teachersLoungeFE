import React, { useState, useEffect } from "react";
import { FlatList, TextInput, View } from "react-native";
import SafeArea from "../../SafeArea";
import UserListing from "./userListing";
import { searchUser } from "../../../Controller/SearchUserCommand";
import { useRoute, useIsFocused } from "@react-navigation/native";
import App_StyleSheet from "../../../Styles/App_StyleSheet";

function SearchUserView({ navigation }) {
  const route = useRoute();
  const isFocused = useIsFocused();
  const [searchQuery, setSearchQuery] = useState("");
  const [listOfUsers, setListOfUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const array = await searchUser(searchQuery);
        // remove the current user from the results of the search
        const userIndex = array.findIndex((user) => user.email === route.params.User.userUserName);
        if (userIndex > -1) {
          array.splice(userIndex, 1);
        }
        setListOfUsers(array);
      } catch (error) {
        // Handle any errors here
        console.error("Error fetching users: ", error);
      }
    };
    fetchUsers();
  }, [searchQuery]);
  return (
    <SafeArea>
      <View style={App_StyleSheet.searchBar}>
        <View style={App_StyleSheet.searchContainer}>
          <TextInput
            style={App_StyleSheet.search}
            placeholder="Search a User"
            onChangeText={(value) => {
              const search = value;
              setSearchQuery(search);
            }}
          />
        </View>
      </View>
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
    </SafeArea>
  );
}

export default SearchUserView;
