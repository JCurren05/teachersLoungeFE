import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { TextInput } from "react-native-paper";
import App_StyleSheet from "../../../Styles/App_StyleSheet";

/*

Pass a function to UserListing that does navigation instead of passing navigation


*/
function UserListing({ user, onClick }) {
  return (
    <View style={App_StyleSheet.user_listings_post}>
      <TouchableOpacity onPress={onClick}>
        <View style={App_StyleSheet.user_listings_header}>
          <View style={App_StyleSheet.user_listings_info}>
            <Text style={App_StyleSheet.user_listings_user}>
              {user.firstName} {user.lastName}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default UserListing;
