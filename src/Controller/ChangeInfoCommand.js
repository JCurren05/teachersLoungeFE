import React from "react";
import ProfileNavigator from "../View/UserView/ProfileView/ProfileNavigator";
import { useRoute } from "@react-navigation/native";

class ChangeInfoCommand {
  user;
  constructor(user) {
    this.user = user;
  }

  ChangeInfo({ navigation }, content) {
    if (ProfileNavigator.lastClick == "Edit Name") {
      this.user.changeUserName(content);
    } else if (ProfileNavigator.lastClick == "Edit Username") {
      this.user.userUserName = content;
    } else if (ProfileNavigator.lastClick == "Edit School") {
      this.user.school = content;
    }
    navigation.navigate("Profile");
    navigation.navigate("Edit Profile");
  }
}

export default ChangeInfoCommand;
