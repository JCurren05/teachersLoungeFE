import React from "react";
import { StyleSheet, Text, View, Linking } from "react-native";
import { useRoute } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SafeArea from "../../SafeArea";
import { FlatList } from "react-native-gesture-handler";
import Resources from "../../../Model/Resources";
import App_StyleSheet from "../../../Styles/App_StyleSheet";

function ERPreKAndElementaryView({ navigation }) {
  const a = new Resources();

  return (
    <SafeArea>
      <View style={App_StyleSheet.listings}>
        
        
        <FlatList
          data={a.sources1}
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
export default ERPreKAndElementaryView;
