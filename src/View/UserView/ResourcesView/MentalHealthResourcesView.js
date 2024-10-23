import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import SafeArea from "../../SafeArea";
import OpenMentalHealthResourcesCommand from "../../../Controller/OpenMentalHealthResourcesCommand";
import App_StyleSheet from "../../../Styles/App_StyleSheet";

function MentalHealthResourcesView({ navigation }) {
  const MHRView1 = "Mental Health First Aid";
  const MHRView2 = "Suicide & Crisis Lifeline";
  const route = useRoute();

  const a = new OpenMentalHealthResourcesCommand(route.params.User);

  return (
    <SafeArea>
      <View style = {App_StyleSheet.resource_backGround}>
          <TouchableOpacity 
            style={App_StyleSheet.resource_button}
            onPress={() => Linking.openURL("https://www.mentalhealthfirstaid.org/mental-health-resources/")}
          >
            <Text style={App_StyleSheet.resource_cardTitle}>{MHRView1}</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={App_StyleSheet.resource_button}
            onPress={() => Linking.openURL("https://988lifeline.org/")}
          >
            <Text style={App_StyleSheet.resource_cardTitle}>{MHRView2}</Text>
          </TouchableOpacity>
      </View>
    </SafeArea>
  );
}
export default MentalHealthResourcesView;
