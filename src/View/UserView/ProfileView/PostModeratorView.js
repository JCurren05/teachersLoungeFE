import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  View,
} from "react-native";
import { useRoute, useIsFocused } from "@react-navigation/native";
import SafeArea from "../../SafeArea";
import {
  getPendingPosts,
  deletePost,
  approvePost,
} from "../../../Controller/PostManager.js";
import App_StyleSheet from "../../../Styles/App_StyleSheet";
import PostView from "../HomeView/PostView.js";

function PostModeratorView({ navigation }) {
  const isFocused = useIsFocused();

  React.useEffect(() => {
    if (isFocused) {
      loadPosts();
    }
  }, [isFocused]);

  const [posts, setPosts] = useState([]);

  const loadPosts = async () => {
    const data = await getPendingPosts();
    setPosts(data);
  };
  return (
    <SafeArea>
      <View style={App_StyleSheet.moderation_view}>
        {posts && (
          <FlatList
            style={App_StyleSheet.listings}
            data={posts}
            extraData={posts}
            ListEmptyComponent={<Text>{"No posts to approve!"}</Text>}
            renderItem={({ item }) => (
              <View>
                <PostView
                  navigation={navigation}
                  post={item}
                  userName={item.user}
                  postContent={item.postContent}
                  image={item.image}
                  nickName={item.nickName}
                  comments={item.comments}
                  fileUrl={item.fileUrl}
                />
                <TouchableOpacity
                  style={App_StyleSheet.moderator_button}
                  onPress={() => {
                    approvePost(item.id);
                    loadPosts();
                  }}
                >
                  <Text style={App_StyleSheet.text}>{"Approve"}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={App_StyleSheet.moderator_button}
                  onPress={() => {
                    deletePost(item.id, item.fileUrl);
                    loadPosts();
                  }}
                >
                  <Text style={App_StyleSheet.text}>{"Decline"}</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </View>
    </SafeArea>
  );
}

export default PostModeratorView;
