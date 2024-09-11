import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Avatar, Title } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import SafeArea from "../../SafeArea";
import ProfileNavigator from "./ProfileNavigator";
import OpenEditableInfoCommand from "../../../Controller/OpenEditableInfoCommand";
import App_StyleSheet from "../../../Styles/App_StyleSheet";

function EditProfileView({ navigation }) {
  var route = useRoute();
  var openEdit = new OpenEditableInfoCommand(route.params.User);
  return (
    <View style={App_StyleSheet.listings}>
      <SafeArea>
        <View style={[styles.section, { height: 120 }]}>
          <Avatar.Image
            source={route.params.User.image}
            size={90}
            style={styles.avatarImage}
          />
          <TouchableOpacity
            style={{
              bottom: 20,
              position: "absolute",
            }}
            onPress={() => {
              null;
            }}
          >
            <Text>Edit</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.section}>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text style={styles.userInfoStyle}>{"\tName"}</Text>
          </View>
          <View
            style={{
              flex: 1.6,
              justifyContent: "center",
              height: 50,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                (ProfileNavigator.lastClick = "Edit Name"),
                  openEdit.OpenEditableInfo({ navigation });
              }}
            >
              <Text style={styles.editableInfoStyle}>
                {route.params.User.userName}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.section}>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text style={styles.userInfoStyle}>{"\tUsername"}</Text>
          </View>
          <View
            style={{
              flex: 1.6,
              justifyContent: "center",
              height: 50,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                (ProfileNavigator.lastClick = "Edit Username"),
                  openEdit.OpenEditableInfo({ navigation });
              }}
            >
              <Text style={styles.editableInfoStyle}>
                {route.params.User.userUserName}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.section}>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text style={styles.userInfoStyle}>{"\tSchool"}</Text>
          </View>
          <View
            style={{
              flex: 1.6,
              justifyContent: "center",
              height: 50,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                (ProfileNavigator.lastClick = "Edit School"),
                  openEdit.OpenEditableInfo({ navigation });
              }}
            >
              <Text style={styles.editableInfoStyle}>
                {route.params.User.school}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeArea>
    </View>
  );
}

const styles = StyleSheet.create({
  userInfoStyle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#fef3d7"
  },
  editableInfoStyle: {
    fontSize: 15,
    textAlign: "left",
    color: "#411c00",
  },
  section: {
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  avatarImage: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 47,
    borderRadius: 50,
    borderColor: "white",
  },
});

export default EditProfileView;
