import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  View,
} from "react-native";
import { useRoute, useIsFocused } from "@react-navigation/native";
import { SelectList } from "react-native-dropdown-select-list";
import PostView from "./PostView";
import SafeArea from "../../SafeArea";
import {
  getApprovedPosts,
  deletePost,
} from "../../../Controller/PostManager.js";
import { getCategories } from "../../../Controller/CategoriesManager";
import Post from "../../../Model/Posts/Post.js";
import App_StyleSheet from "../../../Styles/App_StyleSheet";

function PostListingsView({ navigation }) {
  const route = useRoute();
  const isFocused = useIsFocused();

  React.useEffect(() => {
    if (isFocused) {
      loadPosts();
      loadCategories();
    }
  }, [isFocused]);
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([{ key: "0", value: "" }]);
  const [selected, setSelected] = useState("0");
  const loadPosts = async () => {
    const data = await getApprovedPosts(selected);
    setPosts(data);
  };
  const loadCategories = async () => {
    const data = await getCategories();
    setCategories(data);
    console.log(categories);
  };

  return (
    <SafeArea>
      <View style={{ marginBottom: 400 }}>
        <View
          style={{
            paddingTop: 5,
            paddingBottom: 5,
            alignItems: "left",
          }}
        >
          <TouchableOpacity
            style={App_StyleSheet.medium_button}
            onPress={() => navigation.navigate("Communities")}
          >
            <Text style={App_StyleSheet.text}>{"Communities"}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={App_StyleSheet.large_button}
          onPress={() => navigation.navigate("Create Post")}
        >
          <Text style={App_StyleSheet.text}>{"+  Create Post"}</Text>
        </TouchableOpacity>
        <SelectList
          data={categories}
          setSelected={setSelected}
          onSelect={() => loadPosts(selected)}
          placeholder="Filter category"
          boxStyles={App_StyleSheet.category_list}
          dropdownStyles={App_StyleSheet.category_list}
          defaultOption={{ key: "0", value: "" }}
        />
        <View style={App_StyleSheet.post_listing_view}>
          {posts && (
            <FlatList
              style={App_StyleSheet.listings}
              ListEmptyComponent={
                <Text style={App_StyleSheet.postlist_msg_state}>
                  {"No posts yet!"}
                </Text>
              }
              ListFooterComponent={
                posts[0] && (
                  <Text style={App_StyleSheet.postlist_msg_state}>
                    {"You've viewed all posts!"}
                  </Text>
                )
              }
              data={posts}
              extraData={posts}
              renderItem={({ item }) => (
                <View style={App_StyleSheet.post_listing_view}>
                  <PostView
                    navigation={navigation}
                    post={item}
                    userName={item.user}
                    postContent={item.postContent}
                    image={item.image}
                    nickName={item.nickName}
                    commentName={route.params.User.userUserName}
                    fileUrl={item.fileUrl}
                    choice={"Home"}
                  />
                  {item.user == route.params.User.userUserName && (
                    <TouchableOpacity
                      style={App_StyleSheet.small_button}
                      onPress={() => {
                        deletePost(item.id, item.fileUrl);
                        setPosts([]);
                        loadPosts(selected);
                      }}
                    >
                      <Text style={App_StyleSheet.text}>{"Delete Post"}</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
            />
          )}
        </View>
      </View>
    </SafeArea>
  );
}
export default PostListingsView;
