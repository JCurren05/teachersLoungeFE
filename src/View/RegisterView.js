import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
 import { TextInput } from "react-native-paper";
// import LogInCommand from "../Controller/LogInCommand";
import {register} from "../Controller/RegisterCommand";
import App_StyleSheet from "../Styles/App_StyleSheet";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
let firstName = "";
let lastName = "";
let userName="";
let password="";
function RegisterView({ navigation, route }) {
  return (
    <View style={App_StyleSheet.register_signIn_background}>
        <View style={App_StyleSheet.block}>
            <TextInput
                style={App_StyleSheet.textBlock}
                placeholder="First Name"
                underlineColor={'transparent'}
                selectionColor={'black'}
                activeUnderlineColor={'transparent'}
                onChangeText={(value) => (firstName = value)}
            />
            <TextInput
                style={App_StyleSheet.textBlock}
                placeholder="Last Name"
                underlineColor={'transparent'}
                selectionColor={'black'}
                activeUnderlineColor={'transparent'}
                onChangeText={(value) => (lastName = value)}
            />
            <TextInput
                style={App_StyleSheet.textBlock}
                placeholder="Email"
                underlineColor={'transparent'}
                selectionColor={'black'}
                activeUnderlineColor={'transparent'}
                onChangeText={(value) => (userName = value)}
            />
            <TextInput
                secureTextEntry={true}
                style={App_StyleSheet.textBlock}
                underlineColor={'transparent'}
                selectionColor={'black'}
                activeUnderlineColor={'transparent'}
                placeholder="Password"
                onChangeText={(value) => (password = value)}
            />
            <TouchableOpacity
                style={App_StyleSheet.default_button}
                onPress={() => register({ navigation }, firstName, lastName, userName, password)}
            >
                <Text style={App_StyleSheet.text}>{"Confirm"}</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={App_StyleSheet.default_button}
                onPress={() => navigation.navigate("Login")}
            >
            <Text style={App_StyleSheet.text}>{"Back"}</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
}
export default RegisterView;
