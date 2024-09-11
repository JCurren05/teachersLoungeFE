import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
  Image
} from "react-native";
import { Link, useRoute } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SafeArea from "../../SafeArea";
import OpenEducationalResourcesCommand from "../../../Controller/OpenEducationalResourcesCommand";
import App_StyleSheet from "../../../Styles/App_StyleSheet";

const HomeStack = createStackNavigator();

function ResourcesView({ navigation }) {
  const route = useRoute();
  const a = new OpenEducationalResourcesCommand(route.params.User);
  const ERView = "Educational Resources";
  const TLView = "Teachers' Lounge";
  let healthImg = require("../../../../assets/mentalhealth.jpg");
  let eduImg = require("../../../../assets/edu.jpg");
  let profImg = require("../../../../assets/prof.jpg");
  let logo = require("../../../../assets/Logo_rev.jpg");
  return (
    <SafeArea>
      <View style={App_StyleSheet.resource_backGround}>
      
      <Image style={ResourcesImage} source={healthImg} />

        <TouchableOpacity 
          style={App_StyleSheet.resource_button}
          onPress={() => 
            Linking.openURL("https://www.mentalhealthfirstaid.org/mental-health-resources/")
          }
        > 
          <Text style={App_StyleSheet.resource_cardTitle}>{"Mental Health Resources"}</Text>
        </TouchableOpacity>

      <Image style={ResourcesImage} source={eduImg} />
       

        <TouchableOpacity 
          style={App_StyleSheet.resource_button}
          onPress={() => a.OpenResources({navigation}, ERView)}
        >
          <Text style={App_StyleSheet.resource_cardTitle}>{"Educational Resources"}</Text>
        </TouchableOpacity>


        <Image style={ResourcesImage} source={profImg} />


        <TouchableOpacity 
          style={App_StyleSheet.resource_button}
          onPress={() => Linking.openURL("https://www.teachingchannel.com/")}
        >
          <Text style={App_StyleSheet.resource_cardTitle}>{"Professional Resources"}</Text>
        </TouchableOpacity>

        <Image style={ResourcesImage} source={logo} />

        <TouchableOpacity 
          style={App_StyleSheet.resource_button}
          onPress= {() => a.OpenResources({navigation}, TLView) }
        >
          <Text style={App_StyleSheet.resource_cardTitle}>{"About Teachers' Lounge"}</Text>
        </TouchableOpacity>
        
      </View>
    </SafeArea>
  );
}
const ResourcesImage = StyleSheet.create({justifyContent: "center",
alignContent: "center",
alignItems: "center",
width: 70,
height: 70,})
export default ResourcesView;

