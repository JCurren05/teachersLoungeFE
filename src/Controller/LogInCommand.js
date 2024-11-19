import { Alert } from "react-native";
import User from "../Model/User";
import * as SecureStore from 'expo-secure-store';
import { apiUrl, loginRoute } from "@env";

// Logs user into the app based on their email and password
async function login({ navigation }, email, password) {
  if (email != "" && password != "") {
    // URL for server
    let urlLogin = apiUrl + loginRoute;
    const reqOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: email, password: password }),
    };
    const response = await fetch(urlLogin, reqOptions);
    const data = await response.json();
    if (response.status != 200) {
      Alert.alert("Login Error: ", data.message);
    } else {
      console.log(data);
      if (data.user != null) {
        let user = new User(
          data.user.Email,
          data.user.FirstName,
          data.user.LastName,
          data.user.SchoolName,
          data.user.Role
        );

        try {
          console.log(user);
          // Store token in secure store
          await SecureStore.setItemAsync("token", data.token);
          // User role assignments
          if (user.userRole == "Approved" || user.userRole == "Admin" || user.userRole == "Guest") {
            // Show welcome alert with rules when login is successful
            Alert.alert(
              "Welcome!",
              "Teachers' Lounge is a social media app for teachers. Please keep all interactions respectful and professional. This app is meant to foster collaboration and support within the teaching community."
            );

            // Navigate to the user screen
            navigation.navigate("User", { User: user });
          } else {
            // Only approved users can login
            Alert.alert("Still awaiting approval to join the app");
          }
        } catch (error) {
          Alert.alert("Couldn't login, please try again");
        }

      } else {
        Alert.alert("Login Error: ", data.message);
      }
    }
  } else {
    Alert.alert("Error: ", "Email and password must not be blank");
  }
}

export { login };
