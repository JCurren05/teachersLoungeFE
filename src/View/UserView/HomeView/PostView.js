import React, { createRef, useEffect, useRef } from "react";
import { useState, setState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Linking,
} from "react-native";
import { TextInput, Avatar } from "react-native-paper";
import { useRoute, useIsFocused, useFocusEffect } from "@react-navigation/native";
import CommentView from "./CommentView";
import CreateCommentCommand from "../../../Controller/CreateCommentCommand";
import App_StyleSheet from "../../../Styles/App_StyleSheet";
import {
  deletePost,
  addComment,
  getCommentsByPostId,
} from "../../../Controller/PostManager";
import { likePost } from "../../../Controller/LikePostCommand";
import { Alert } from "react-native";

PostView.buttonPressed = false;

function PostView({
  navigation,
  post,
  userName,
  postContent,
  image,
  nickName,
  commentName,
  choice,
  fileUrl,
}) {
  let commentContent = "";
  // const createComment = new CreateCommentCommand(comments);
  const route = useRoute();
  const isFocused = useIsFocused();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useFocusEffect(() => {
    loadComments();
    
  });

  let likeImg = require("../../../../assets/like.png");
  const loadComments = async () => {
    const data = await getCommentsByPostId(post.id);
    setComments(data);
  };
  return (
    <View style={styles.post}>
      <View style={styles.header}>
        <Avatar.Image
          source={route.params.User.image}
          size={50}
          style={App_StyleSheet.profile_avatarImage}
        />
        <View style={styles.info}>
          <Text style={styles.user}>{userName}</Text>
          <Text style={styles.sub}>{nickName}</Text>
        </View>
      </View>
      <Text style={styles.contentText}>{postContent}</Text>
      {fileUrl != "" && fileUrl != null && (
        <Text style={styles.linkText} onPress={() => Linking.openURL(fileUrl)}>
          {"Open Image File"}
        </Text>
      )}
      <View style={styles.comments}>
        <FlatList
          data={comments}
          renderItem={({ item }) => <CommentView comment={item} />}
        />
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.likeContainer}
            onPress={async () => {
              // Like post
              const isLiked = await likePost(
                post,
                route.params.User.userUserName
              );

              // Increment likes if post is liked
              if (isLiked) {
                post.likes++;
                if (choice === "Community") {
                  navigation.navigate("Community", {
                    Community: route.params.Community,
                  });
                } else {
                  navigation.navigate("Home");
                }
              }
            }}
          >
            <Image style={styles.like} source={likeImg} />
            <Text>{post.likes}</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.commentText}
            placeholder="Comment on Post"
            underlineColor="transparent"
            activeUnderlineColor="#808080"
            defaultValue=""
            returnKeyType="done"
            value={comment}
            onChangeText={(value) => {
              setComment(value)
              navigation.navigate("Home");
            }}
          />
          <TouchableOpacity
            style={styles.createPostButton}
            onPress={async () => {
              
              if (comment.trim() != "") {
                console.log("pressed");
                // PostView.buttonPressed = true;
                await addComment(comment, commentName, null, post.id);

                navigation.navigate("Home");
              }
            }}
          >
            <Text style={styles.text}>{"+"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  likeContainer: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    left: 10,
  },
  like: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    width: 30,
    height: 30,
  },
  post: {
    width: "100%",
    justifyContent: "center",
    alignItems: "left",
    backgroundColor: "#eddfbe",
    marginBottom: 1,
    borderRadius: 1,
    borderWidth: 2,
    borderColor: "#411c00",
    paddingBottom: 10,
  },
  user: {
    color: "black",
    fontSize: 20,
  },
  sub: {
    color: "black",
    fontSize: 10,
  },
  info: {
    left: 5,
  },
  header: {
    left: 10,
    top: 10,
    flexDirection: "row",
  },
  profilePic: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  contentText: {
    color: "black",
    fontSize: 15,
    left: 55,
    width: "85%",
    top: 10,
    marginBottom: 5,
  },
  linkText: {
    color: "blue",
    fontSize: 15,
    left: 55,
    width: "85%",
    top: 10,
    marginTop: 1,
    marginBottom: 1,
  },
  comments: {
    left: 0,
    top: 10,
    flex: 1,
    width: "100%",
  },
  commentText: {
    left: 10,
    flex: 8,
    width: "50%",
    backgroundColor: "#fff3d7",
    marginLeft: 5,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5,
  },
  createPostButton: {
    height: 50,
    width: 20,
    top: 10,
    flex: 1,
    borderRadius: 25,
    backgroundColor: "#eddfbe",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "black",
    marginRight: 5,
  },
  footer: {
    flexDirection: "row",
    flex: 1,
    borderRadius: 20,
  },
  text: {
    fontSize: 10,
  },
});

export default PostView;
