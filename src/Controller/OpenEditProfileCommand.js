import React from "react";
class OpenEditProfileCommand {
  user;
  constructor(user) {
    this.user = user;
  }

  OpenEditProfile({ navigation }) {
    navigation.navigate("Edit Profile");
  }
}

export default OpenEditProfileCommand;
