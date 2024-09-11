import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-paper";
import SafeArea from "../../SafeArea";
import { createCommunity } from "../../../Controller/CommunitiesManager";
import App_StyleSheet from "../../../Styles/App_StyleSheet";

function CreateCommunityView({ navigation }) {
  const [communityName, setCommunityName] = useState("");

  return (
    <SafeArea>
      <TextInput
        style={App_StyleSheet.postTextInput}
        placeholder={"Provide a community name..."}
        onChangeText={(value) => setCommunityName(value)}
        value={communityName}
        underlineColor="#808080"
        activeUnderlineColor="#808080"
      />
      <View style={App_StyleSheet.listings}>
        <TouchableOpacity
          style={App_StyleSheet.medium_button}
          onPress={() => createCommunity({ navigation }, communityName)}
        >
          <Text style={App_StyleSheet.text}>{"Submit"}</Text>
        </TouchableOpacity>
      </View>
    </SafeArea>
  );
}
export default CreateCommunityView;
