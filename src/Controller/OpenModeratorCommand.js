import React from "react";
class OpenModeratorCommand {
  user;
  constructor(user) {
    this.user = user;
  }

  OpenModerator({ navigation }) {
    navigation.navigate("Moderator");
  }
}

export default OpenModeratorCommand;