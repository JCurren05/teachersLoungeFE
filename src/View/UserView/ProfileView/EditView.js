import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import { TextInput } from "react-native-paper";
import SafeArea from "../../SafeArea";
import ProfileNavigator from "./ProfileNavigator";
import ChangeInfoCommand from "../../../Controller/ChangeInfoCommand";

let textContent = ""; // Global variable to store the input text

function EditView({ navigation }) {
  const route = useRoute();
  const [errorMessage, setErrorMessage] = useState("");

  const user = {
    ...route.params.User,
    email: route.params.User.userUserName, // Map userUserName to email if email field is missing
  };

  const changeInfoCommand = new ChangeInfoCommand(user);

  let placeholderText = "";
  if (ProfileNavigator.lastClick === "Edit Name") {
    placeholderText = user.userName || ""; 
  } else if (ProfileNavigator.lastClick === "Edit Username") {
    placeholderText = user.userUserName || "";
  }

  const buttonTextMap = {
    "Edit Name": "Change Name",
    "Edit Username": "Change Email",
  };

  const buttonText = buttonTextMap[ProfileNavigator.lastClick] || "Change";

  return (
    <SafeArea>
      <TextInput
        placeholder={placeholderText}
        onChangeText={(value) => {
          textContent = value;
          setErrorMessage(""); // Clear error on input
        }}
        style={styles.textInput}
      />
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => {
            if (!textContent.trim()) {
              setErrorMessage("Please enter a valid value.");
              return;
            }

            if (
              ProfileNavigator.lastClick === "Edit Username" &&
              !textContent.endsWith(".edu")
            ) {
              setErrorMessage("Email must end in .edu");
              return;
            }

            changeInfoCommand.ChangeInfo({ navigation }, textContent);
          }}
        >
          <Text style={styles.text}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  textInput: {
    margin: 16,
    padding: 8,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    fontSize: 16,
  },
  errorText: {
    color: "red",
    marginLeft: 16,
    marginBottom: 8,
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
