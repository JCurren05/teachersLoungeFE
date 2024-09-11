import React from "react";
class OpenMessageCommand {
  user;
  constructor(user) {
    this.user = user;
  }

  OpenMessage({ navigation }) {
    navigation.navigate("Conversation");
  }
}

export default OpenMessageCommand;
