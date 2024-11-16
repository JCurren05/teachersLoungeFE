import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import { TextInput } from "react-native-paper";
import SafeArea from "../../SafeArea";
import ProfileNavigator from "./ProfileNavigator";
import ChangeInfoCommand from "../../../Controller/ChangeInfoCommand";

let textContent = ""; // Global variable to store the input text

function EditView({ navigation }) {
  const route = useRoute();

  // Log route params and ProfileNavigator.lastClick to debug
  console.log("Route params User:", route.params.User);
  console.log("ProfileNavigator.lastClick:", ProfileNavigator.lastClick);

  // Ensure user object is correctly structured
  const user = {
    ...route.params.User,
    email: route.params.User.userUserName, // Map userUserName to email if email field is missing
  };

  // Log the updated user object
  console.log("Updated User Object:", user);

  const changeInfoCommand = new ChangeInfoCommand(user); // Pass updated user object to ChangeInfoCommand

  // Placeholder logic based on ProfileNavigator.lastClick
  let placeholderText = "";
  if (ProfileNavigator.lastClick === "Edit Name") {
    placeholderText = user.userName || ""; // Fallback to empty string if undefined
  } else if (ProfileNavigator.lastClick === "Edit Username") {
    placeholderText = user.userUserName || "";
  } else if (ProfileNavigator.lastClick === "Edit School") {
    placeholderText = user.school || "";
  }

  // Map lastClick to custom button text
  const buttonTextMap = {
    "Edit Name": "Change Name",
    "Edit Username": "Change Email",
    "Edit School": "Change School",
  };

  const buttonText = buttonTextMap[ProfileNavigator.lastClick] || "Change"; // Fallback to "Change" if lastClick is invalid

  // Render the UI
  return (
    <SafeArea>
      <TextInput
        placeholder={placeholderText}
        onChangeText={(value) => {
          textContent = value; // Update textContent on input
        }}
        style={styles.textInput} // Added styles for better appearance
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => {
            if (!textContent.trim()) {
              alert("Please enter a valid value."); // Prevent empty submissions
              return;
            }
            changeInfoCommand.ChangeInfo({ navigation }, textContent); // Call ChangeInfo
          }}
        >
          <Text style={styles.text}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
    </SafeArea>
  );
}

// Styles for the component
const styles = StyleSheet.create({
  textInput: {
    margin: 16,
    padding: 8,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    fontSize: 16,
  },
  buttonContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: "center",
  },
  buttonStyle: {
    height: 40,
    paddingHorizontal: 30,
    borderWidth: 3,
    borderRadius: 20,
    borderColor: "#fef3d7",
    overflow: "hidden",
    marginTop: 10,
    backgroundColor: "#411c00",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#ffffff",
    fontSize: 20,
  },
});

export default EditView;
