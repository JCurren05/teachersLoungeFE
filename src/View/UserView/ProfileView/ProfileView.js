import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Avatar, Title } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import SafeArea from "../../SafeArea";
import PostView from "../HomeView/PostView";
import OpenEditProfileCommand from "../../../Controller/OpenEditProfileCommand";
import OpenModeratorCommand from "../../../Controller/OpenModeratorCommand";
import LogOutCommand from "../../../Controller/LogOutCommand";
import App_StyleSheet from "../../../Styles/App_StyleSheet";

//This is declared in order to interact with the LogOutCommand in the Controller
const LogCommand = new LogOutCommand();

function ProfileView({ navigation }) {
  var route = useRoute();
  var a = new OpenEditProfileCommand(route.params.User);
  var b = new OpenModeratorCommand(route.params.User);
  return (
    <View style={App_StyleSheet.listings}>
      <SafeArea>
        <View>
          <View style={App_StyleSheet.profile_padding}>
            <View style={{ flexDirection: "row" }}>
              <Avatar.Image
                source={route.params.User.image}
                size={90}
                style={App_StyleSheet.profile_avatarImage}
              />
              <Text style={App_StyleSheet.profile_userNameStyle}>
                {route.params.User.userName}
              </Text>
            </View>
            <Text style={{ paddingTop: 15, fontSize: 25, fontWeight: "bold" }}>
              {route.params.User.userUserName}
            </Text>
            <Text style={{ paddingTop: 5, fontSize: 25, fontWeight: "bold" }}>
              {route.params.User.school}
            </Text>
          </View>
        </View>
        <View
          style={{
            paddingTop: 10,
            paddingBottom: 10,
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={
              (route.params.User.userRole == "Admin" &&
                App_StyleSheet.profile_button) ||
              App_StyleSheet.small_button
            }
            onPress={() => {
              a.OpenEditProfile({ navigation });
            }}
          >
            <Text style={App_StyleSheet.text}>{"Edit Profile"}</Text>
          </TouchableOpacity>

          {route.params.User.userRole == "Admin" && (
            <TouchableOpacity
              style={App_StyleSheet.profile_button}
              onPress={() => {
                navigation.navigate("Post Moderation");
              }}
            >
              <Text style={App_StyleSheet.text}>{"Post Moderation"}</Text>
            </TouchableOpacity>
          )}
          {route.params.User.userRole == "Admin" && (
            <TouchableOpacity
              style={App_StyleSheet.profile_button}
              onPress={() => {
                navigation.navigate("User Moderation");
              }}
            >
              <Text style={App_StyleSheet.text}>{"User Moderation"}</Text>
            </TouchableOpacity>
          )}
          {/*Button for navigation to Log Out Screen.*/}
          <TouchableOpacity
            style={
              (route.params.User.userRole == "Admin" &&
                App_StyleSheet.profile_button) ||
              App_StyleSheet.small_button
            }
            onPress={() => {
              LogCommand.LogOut({ navigation });
            }}
          >
            <Text style={App_StyleSheet.text}>{"Log Out"}</Text>
          </TouchableOpacity>
        </View>
        <View>
          <FlatList
            data={route.params.User.post}
            renderItem={({ item }) =>
              item.user == "Test User" ? (
                <PostView
                  navigation={navigation}
                  post={item}
                  userName={route.params.User.userName}
                  postContent={item.postContent}
                  image={item.image}
                  nickName={item.nickName}
                  comments={item.comments}
                  choice={"Profile"}
                />
              ) : null
            }
          />
        </View>
      </SafeArea>
    </View>
  );
}
export default ProfileView;
