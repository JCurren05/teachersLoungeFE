import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import SafeArea from "../SafeArea";

function SettingsView({ image }) {
  return (
    <SafeArea>
      <View style={styles.post}>
        <TouchableOpacity>
          <View style={styles.header}>
            <Image
              style={styles.iconAccount}
              source={require("../../../assets/Account.png")}
            />
          </View>
          <View style={styles.info}>
            <Text style={styles.textAccount}> Account </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.post}>
        <TouchableOpacity>
          <View style={styles.header}>
            <Image
              style={styles.iconNotification}
              source={require("../../../assets/Notification.png")}
            />
          </View>
          <View style={styles.info}>
            <Text style={styles.textNotification}> Notification </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.post}>
        <TouchableOpacity>
          <View style={styles.header}>
            <Image
              style={styles.iconNotification}
              source={require("../../../assets/Appearance.png")}
            />
          </View>
          <View style={styles.info}>
            <Text style={styles.textNotification}> Appearance </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.post}>
        <TouchableOpacity>
          <View style={styles.header}>
            <Image
              style={styles.iconPrivacy}
              source={require("../../../assets/Privacy.png")}
            />
          </View>
          <View style={styles.info}>
            <Text style={styles.textPrivacy}> Privacy and Notification</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.post}>
        <TouchableOpacity>
          <View style={styles.header}>
            <Image
              style={styles.iconHelp}
              source={require("../../../assets/Help.png")}
            />
          </View>
          <View style={styles.info}>
            <Text style={styles.textHelp}> Help and Support</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.post}>
        <TouchableOpacity>
          <View style={styles.header}>
            <Image
              style={styles.iconAbout}
              source={require("../../../assets/About.png")}
            />
          </View>
          <View style={styles.info}>
            <Text style={styles.textAbout}> About</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeArea>

    /* wrap the views in a touchable opacity so that it will navigate to a different page. use a stack view to navigate to different pages*/
  );
}

const styles = StyleSheet.create({
  post: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    marginBottom: 1,
    borderRadius: 1,
    borderWidth: 1,
    borderColor: "gray",
    paddingBottom: 15,
  },
  header: {
    left: 10,
    top: 10,
    flexDirection: "row",
  },
  iconAccount: {
    left: -150,
    top: 10,
    height: 40,
    width: 40,
    borderRadius: 30,
  },
  iconNotification: {
    left: -135,
    top: 15,
    height: 40,
    width: 40,
    borderRadius: 30,
  },
  iconPrivacy: {
    left: -85,
    top: 15,
    height: 40,
    width: 40,
    borderRadius: 30,
  },
  iconHelp: {
    left: -115,
    top: 15,
    height: 40,
    width: 40,
    borderRadius: 30,
  },
  iconAbout: {
    left: -170,
    top: 15,
    height: 40,
    width: 40,
    borderRadius: 30,
  },
  textAccount: {
    color: "black",
    fontSize: 20,
    left: -100,
    top: -15,
  },
  textNotification: {
    color: "black",
    fontSize: 20,
    left: -90,
    top: -15,
  },
  textPrivacy: {
    color: "black",
    fontSize: 20,
    left: -35,
    top: -15,
  },
  textHelp: {
    color: "black",
    fontSize: 20,
    left: -65,
    top: -15,
  },
  textAbout: {
    color: "black",
    fontSize: 20,
    left: -120,
    top: -15,
  },
  info: {
    center: 5,
  },
});

export default SettingsView;
