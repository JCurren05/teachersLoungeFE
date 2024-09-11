import { React, useEffect, useRef, useState } from "react";
import { Text, View, TouchableOpacity, Animated, Image, KeyboardAvoidingView } from "react-native";
import { TextInput } from "react-native-paper";
//import LogInCommand from "../Controller/LogInCommand";
import { login } from "../Controller/LogInCommand";
import App_StyleSheet from "../Styles/App_StyleSheet";

let email = "";
let password = "";
let logo = require("../../assets/Logo_rev2.png");

function SignInView({ navigation }) {
  // This provides animation for any element within an Animated.View
  const translation = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    // Animate the translation in the y axis(upwards) over 4 secs in a loop
    Animated.loop(
      Animated.timing(translation, {
        toValue: -100,
        duration: 4000,
        useNativeDriver: false, // Set to true if possible
      })
    ).start();
  }, []);

  return (
    
    <View style={App_StyleSheet.register_signIn_background}>
      <View style={App_StyleSheet.block}>
        <View style={App_StyleSheet.steam_container}>
          <Animated.View
            style={{
              width: 5,
              height: 75,
              backgroundColor: "#411c00",
              marginLeft: 100,
              opacity: translation.interpolate({
                inputRange: [0, 100],
                outputRange: [0.2, 1],
              }),
              transform: [{ translateY: translation }],
            }}
          ></Animated.View>
          <Animated.View
            style={{
              width: 5,
              height: 30,
              backgroundColor: "#411c00",
              marginLeft: 20,
              marginTop: 45,
              opacity: translation.interpolate({
                inputRange: [0, 100],
                outputRange: [0.11, 1],
              }),
              transform: [{ translateY: translation }],
            }}
          ></Animated.View>
          <Animated.View
            style={{
              width: 5,
              height: 50,
              backgroundColor: "#411c00",
              marginTop: 10,
              marginLeft: 20,
              opacity: translation.interpolate({
                inputRange: [0, 100],
                outputRange: [0.16, 1],
              }),
              transform: [{ translateY: translation }],
            }}
          ></Animated.View>
        </View>
        <Image style={App_StyleSheet.logoStyle} source={logo} />
        <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={60}
      >
        <TextInput
          style={App_StyleSheet.textBlock}
          placeholder="Email"
          underlineColor={"transparent"}
          selectionColor={"black"}
          activeUnderlineColor={"transparent"}
          multiline={false}
          returnKeyType="done"
          onChangeText={(value) => (email = value)}
          autoCapitalize="none"
        />
        <TextInput
          secureTextEntry={true}
          style={App_StyleSheet.textBlock}
          placeholder="Password"
          underlineColor={"transparent"}
          selectionColor={"black"}
          activeUnderlineColor={"transparent"}
          multiline={false}
          returnKeyType="done"
          onChangeText={(value) => (password = value)}
        />
        </KeyboardAvoidingView>
        <TouchableOpacity
          style={App_StyleSheet.default_button}
          onPress={
            async () => {
              let user = await login({ navigation }, email, password);
            }
            //LogCommand.LogIn({ navigation }, email,password,userPasswordMap)
          }
        >
          <Text style={App_StyleSheet.text}>{"Sign In"}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={App_StyleSheet.default_button}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={App_StyleSheet.text}>{"Sign Up"}</Text>
        </TouchableOpacity>
        
      </View>
    </View>
  );
}
export default SignInView;
