/*import { Alert } from "react-native";
import User from "../Model/User";
import * as SecureStore from 'expo-secure-store';
import { apiUrl, loginRoute } from "@env";

//Logs user into the app based on their email and password
async function login({ navigation }, email, password) {
  if (email != "" && password != "") {
    //URL for server
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
      if (data.user != null) {
        let user = new User(
          data.user.Email,
          data.user.FirstName,
          data.user.LastName,
          data.user.SchoolID,
          data.user.Role
        );

        try {
          // Store token in secure store
          await SecureStore.setItemAsync("token", data.token);
          if (user.userRole == "Approved" || user.userRole == "Admin"){
            navigation.navigate("User", { User: user });
          }else {
            //Only approved users can login
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

export { login };*/
import { Alert } from "react-native";
import User from "../Model/User";
import * as SecureStore from 'expo-secure-store';
import getEnvVars from '../../environment'; // Assuming environment.js file setup
const { apiUrl, loginRoute } = getEnvVars(); // Fetching env variables dynamically

//Logs user into the app based on their email and password
async function login({ navigation }, email, password) {
  if (email !== "" && password !== "") {
    //URL for server
    let urlLogin = `${apiUrl}${loginRoute}`;
    const reqOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: email, password: password }),
    };
    
    try {
      const response = await fetch(urlLogin, reqOptions);
      const data = await response.json();
      
      if (response.status !== 200) {
        Alert.alert("Login Error: ", data.message);
      } else {
        if (data.user != null) {
          let user = new User(
            data.user.Email,
            data.user.FirstName,
            data.user.LastName,
            data.user.SchoolID,
            data.user.Role
          );

          // Store token in secure store
          await SecureStore.setItemAsync("token", data.token);
          
          if (user.userRole === "Approved" || user.userRole === "Admin") {
            navigation.navigate("User", { User: user });
          } else {
            //Only approved users can login
            Alert.alert("Still awaiting approval to join the app");
          }
        } else {
          Alert.alert("Login Error: ", data.message);
        }
      }
    } catch (error) {
      Alert.alert("Network Error", "Unable to connect to the server. Please try again.");
    }
  } else {
    Alert.alert("Error: ", "Email and password must not be blank");
  }
}

export { login };
