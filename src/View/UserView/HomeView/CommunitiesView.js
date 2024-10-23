import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Avatar, Title } from "react-native-paper";
import { useRoute, useIsFocused } from "@react-navigation/native";
import { SelectList } from "react-native-dropdown-select-list";
import SafeArea from "../../SafeArea";
import PostView from "./PostView";
import App_StyleSheet from "../../../Styles/App_StyleSheet";
import {
  getApprovedPosts,
  deletePost,
} from "../../../Controller/PostManager.js";
import { getUserCommunities } from "../../../Controller/CommunitiesManager.js";
import Community from "../../../Model/Community.js";

function CommunitiesView({ navigation }) {
  var route = useRoute();
  const isFocused = useIsFocused();

  React.useEffect(() => {
    if (isFocused) {
      loadPosts();
    }
  }, [isFocused]);
  React.useEffect(() => {
    if (isFocused) {
      loadCommunities();
    }
  }, [isFocused]);
  const [posts, setPosts] = useState([]);
  const [communities, setCommunities] = useState([{ key: "0", value: "" }]);
  const [communityId, setCommunityId] = useState("");

  const loadPosts = async () => {
    const data = await getApprovedPosts("0");
    setPosts(data);
  };

  const loadCommunities = async () => {
    console.log("----Username----")
    console.log(route.params.User.userUserName);
    console.log("----Username----")
    const data = await getUserCommunities(route.params.User.userUserName);
    console.log("----Communities----")
    console.log(data);
    console.log("----Communities End----")
    setCommunities(
      data.map((c) => {
        return { ["key"]: c.id, ["value"]: c.name };
      })
    );
  };
  return (
    <SafeArea>
      <View
        style={{
          paddingTop: 5,
          paddingBottom: 5,
        }}
      >
        <TouchableOpacity
          style={App_StyleSheet.medium_button}
          onPress={() => navigation.navigate("Create Community")}
        >
          <Text style={App_StyleSheet.text}>{"Create Community"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={App_StyleSheet.medium_button}
          onPress={() => navigation.navigate("Join Community")}
        >
          <Text style={App_StyleSheet.text}>{"Join Community"}</Text>
        </TouchableOpacity>
      </View>
      <View style={App_StyleSheet.community_listing_view}>
        {posts && (
          <FlatList
            style={App_StyleSheet.listings}
            ListEmptyComponent={
              <Text style={App_StyleSheet.community_list_msg_state}>
                {"No communities joined"}
              </Text>
            }
            data={communities}
            extraData={communities}
            renderItem={({ item }) => (
              <View style={App_StyleSheet.community_listing_view}>
                <TouchableOpacity
                  style={App_StyleSheet.large_button}
                  onPress={() =>
                    navigation.navigate("Community", {
                      Community: new Community(item.key, item.value),
                    })
                  }
                >
                  <Text style={App_StyleSheet.text}>{item.value}</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </View>
    </SafeArea>
  );
}
export default CommunitiesView;
