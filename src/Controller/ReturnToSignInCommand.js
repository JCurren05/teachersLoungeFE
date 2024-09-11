import { Alert } from "react-native";
import Friend from "../Model/Friend";
import Post from "../Model/Posts/Post";
import User from "../Model/User";

class ReturnToSignInCommand{
    constructor() {}

    ReturnToSignIn({ navigation }) {
       
        navigation.navigate("Login");
      }
}

export default ReturnToSignInCommand;