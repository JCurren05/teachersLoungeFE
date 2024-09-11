import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

function MessageBox({ navigation, message, incoming }) {
  return (
    <View style={{ paddingRight: 10, marginTop: 10 }}>
      <View style={incoming ? styles.incomingMessages : styles.outgoingMessages}>
        <Text style={{ fontSize: 15 }}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // outgoingMessages: {
  //   width: 250,
  //   height: 40,
  //   alignItems: "center",
  //   flexDirection: "row",
  //   flex: 2,
  //   alignContent: "flex-start",
  //   alignSelf: "flex-end",
  //   justifyContent: "flex-start",
  //   paddingHorizontal: 20,
  //   paddingEnd: 30,
  //   borderWidth: 3,
  //   borderRadius: 20,
  //   borderColor: "black",
  //   shadowRadius: "aquamarine",
  //   backgroundColor: "deepskyblue",
  //   overflow: "hidden"
  // },
  // incomingMessages: {
  //   width: 250,
  //   height: 40,
  //   alignItems: "center",
  //   flexDirection: "row",
  //   flex: 2,
  //   alignContent: "flex-start",
  //   alignSelf: "flex-start",
  //   justifyContent: "flex-start",
  //   paddingHorizontal: 20,
  //   paddingEnd: 30,
  //   borderWidth: 3,
  //   borderRadius: 20,
  //   borderColor: "black",
  //   shadowRadius: "aquamarine",
  //   backgroundColor: "gold",
  //   overflow: "hidden",
  // },
  incomingMessages: {
    width: '60%',
    backgroundColor: "gold",
    padding: 10,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginBottom: 5,
    borderColor: "black",
    borderWidth: 3,
    marginLeft: 10
  },
  outgoingMessages: {
    width: '60%',
    backgroundColor: "deepskyblue",
    padding: 10,
    borderRadius: 10,
    alignSelf: 'flex-end',
    marginBottom: 5,
    borderColor: "black",
    borderWidth: 3,
  },
  bottom: {
    flex: 3,
  },
  friendNameHeader: {
    justifyContent: "center",
    alignItems: "center",
    textAlignVertical: "center",
    backgroundColor: "aquamarine",
  },
  user: {
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    textAlignVertical: "center",

    color: "black",
    fontSize: 30,
  },
  profilePic: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  text: {
    textAlign: "center",
  },
});
export default MessageBox;
