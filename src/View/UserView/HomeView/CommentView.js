import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { useRoute } from "@react-navigation/native";
import { addComment } from "../../../Controller/PostManager";


function CommentView(comment) {
  const route = useRoute();
  return (
    <View style={styles.postContainer}>
    <View style={styles.post}>
      <View style={styles.header}>
        <Image style={styles.profilePic} source={comment.comment.image} />
        <View style={styles.info}>
          <Text style={styles.user}>{comment.comment.userName + ":"}</Text>
          <Text style={styles.sub}>{'('+comment.comment.nickName+')'}</Text>
        </View>
      </View>
      
      <Text style={styles.contentText}> {comment.comment.content}</Text>
      
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  postContainer:
  {
    width: "100%",
    justifyContent: "center",
    alignItems: "left",
    backgroundColor: "#eddfbe",
    marginBottom: 1,
    borderRadius: 1,
    borderWidth: 1,
    left: 0,
    borderColor: "#411c00",
    paddingBottom: 16,
  },
  post: {
    width: "100%",
    justifyContent: "center",
    alignItems: "left",
    backgroundColor: "#fff3d7",
    marginTop:20,
    borderRadius: 20,
    borderWidth: 2,
    left: 0,
    borderColor: "#411c00",
    paddingBottom: 10,
  },
  user: {
    color: "#411c00",
    fontSize: 15,
  },
  sub: {
    color: "black",
    fontSize: 10,
  },
  info: {
    left: 5,
  },
  header: {
    left: 5,
    top: 10,
    flexDirection: "row",
  },
  profilePic: {
    height: 30,
    width: 30,
    borderRadius: 15,
  },
  contentText: {
    color: "black",
    fontSize: 15,
    left: 85,
    top: 10,
  },
});

export default CommentView;
