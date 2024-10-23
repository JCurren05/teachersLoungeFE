import React from "react";
import { StyleSheet, Text, View, Linking } from "react-native";
import { useRoute } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import SafeArea from "../../SafeArea";
import Resources from "../../../Model/Resources";
import App_StyleSheet from "../../../Styles/App_StyleSheet";

function ERMiddleAndHighSchoolView({ navigation }) {
  const a = new Resources();

  return (
    <SafeArea>
      <View style={App_StyleSheet.listings}>
        <FlatList
          data={a.sources2}
          renderItem={({ item }) => (
            <View style={App_StyleSheet.resource_post}>
              <Text
                style={App_StyleSheet.text}
                onPress={() => Linking.openURL(item.link)}
              >
                {item.sourceName}
              </Text>
            </View>
          )}
        />
      </View>
    </SafeArea>
  );
}
export default ERMiddleAndHighSchoolView;
