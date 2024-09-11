import React from "react";
import { StyleSheet, FlatList,TextInput,View, Text, TouchableOpacity} from "react-native";
import ReturnToSignInCommand from "../../Controller/ReturnToSignInCommand";
import SignInReturnCommand from "../../Controller/ReturnToSignInCommand";
import App_StyleSheet from "../../Styles/App_StyleSheet";

/*
* This is the Logout View, no functionality except to return to Landing Page
*/

//This is initialized to interact with the RTSignInCommand
const SignInCommand = new ReturnToSignInCommand();

function LogOutView({ navigation }) {
  return (
    <View style={App_StyleSheet.listings}>
        <Text style={App_StyleSheet.logout_section}>{"You've Successfully Logged Out"}</Text>

        <TouchableOpacity
          style = {App_StyleSheet.medium_button}
          onPress={() =>  {SignInCommand.ReturnToSignIn({ navigation })}}
        >
          <Text style={App_StyleSheet.text}>{"Return To Sign In"}</Text>
        </TouchableOpacity>
    </View>
  );
}
export default LogOutView;