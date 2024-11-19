import { React, useState } from "react";
import {
  changeUserColorRoute, apiUrl
} from "@env";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
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
  const [isColorPopupVisible, setColorPopupVisible] = useState(false);
  const handleColorSelect = async (color) => {
    console.log('Selected color:', color);
    setColorPopupVisible(false);

    route.params.User.color = color;

    let urlColor = apiUrl + changeUserColorRoute;
    const reqOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ color: route.params.User.color, email: route.params.User.userUserName }),
    };
    console.log(urlColor);
    const response = await fetch(urlColor, reqOptions);
    const data = await response.json();

    console.log(data);
  };

  const closeColorPopup = () => {
    setColorPopupVisible(false);
  };
  return (
    <View style={App_StyleSheet.listings}>
      <SafeArea>
        <View style={[styles.section, { height: 120 }]}>
          <Avatar.Image
            source={route.params.User.image}
            size={90}
            style={{ backgroundColor: route.params.User.color }}
          />

          <TouchableOpacity
            style={{
              bottom: 20,
              position: "absolute",
            }}
            onPress={() => {
              console.log("Edit profile pressed");
              console.log(route.params.User)
              setColorPopupVisible(!isColorPopupVisible);;
            }}
          >
            <Text>Edit</Text>
          </TouchableOpacity>
          {isColorPopupVisible && (
            <TouchableWithoutFeedback onPress={closeColorPopup}>
              <View style={styles.colorPopupContainer}>
                <View style={styles.colorOptions}>
                  {['pink', 'yellow', 'red', 'blue', 'green', 'purple', 'orange', 'brown'].map((color) => (
                    <TouchableOpacity
                      key={color}
                      style={[styles.colorCircle, { backgroundColor: color }]}
                      onPress={() => handleColorSelect(color)}
                    />
                  ))}
                </View>
              </View>
            </TouchableWithoutFeedback>
          )}

        </View>
        {!isColorPopupVisible && (
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
        )}

        {!isColorPopupVisible && (
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
        </View>)}
        { 
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
        }
      </SafeArea>
    </View>
  );
}

const styles = StyleSheet.create({
  userInfoStyle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#fef3d7",
    zIndex: 0
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
  colorPopupContainer: {
    position: 'absolute',
    top: 120,
    left: 100,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 5,
    padding: 10,
    width: 200,
    zIndex: 100
  },
  colorOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  colorCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    margin: 5,
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
