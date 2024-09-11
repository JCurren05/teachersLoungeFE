import { Alert } from "react-native";
import Friend from "../Model/Friend";
import Post from "../Model/Posts/Post";
import User from "../Model/User";
import * as SecureStore from "expo-secure-store";

class LogOutCommand {
  constructor() {}

  async LogOut({ navigation }) {
    //navigation.navigate("User", { User: user });

    try {
      // Remove token from Secure Store
      await SecureStore.deleteItemAsync("token");

      // Navigate to logout screen
      navigation.navigate("LogOut");
    } catch (error) {
      Alert.alert("Couldn't logout, please try again");
    }
  }
}

export default LogOutCommand;
