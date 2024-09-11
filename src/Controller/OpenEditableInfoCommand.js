import React from "react";
import ProfileNavigator from "../View/UserView/ProfileView/ProfileNavigator";

class OpenEditableInfoCommand {
  user;
  constructor(user) {
    this.user = user;
  }

  OpenEditableInfo({ navigation }) {
    navigation.navigate(ProfileNavigator.lastClick);
  }
}

export default OpenEditableInfoCommand;
