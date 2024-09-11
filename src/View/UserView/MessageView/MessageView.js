import React, { useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";

function MessageView({ userName, latestMessage, profileImage }) {
  // Make use of passed prop when profile images is setup properly
  const image = require("../../../../assets/Account.png");
  return (
    <View style={styles.post}>
      <View style={styles.header}>
        <Image style={styles.profilePic} source={image} />
        <View style={styles.info}>
          <Text style={styles.user}>{userName}</Text>
        </View>
      </View>
      <Text style={styles.contentText}>{latestMessage}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  post: {
    width: "100%",
    justifyContent: "center",
    alignItems: "left",
    backgroundColor: "white",
    marginBottom: 1,
    borderRadius: 1,
    borderWidth: 1,
    borderColor: "gray",
    paddingBottom: 15,
  },
  user: {
    color: "black",
    fontSize: 30,
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
    top: 10,
  },
});

export default MessageView;
