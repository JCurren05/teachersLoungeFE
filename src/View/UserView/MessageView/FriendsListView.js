import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

function FriendsListView({ userName, image }) {
  return (
    <View style={styles.post}>
      <View style={styles.header}>
        <Image style={styles.profilePic} source={image} />
        <View style={styles.info}>
          <Text style={styles.user}>{userName}</Text>
        </View>
      </View>
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
});

export default FriendsListView;
