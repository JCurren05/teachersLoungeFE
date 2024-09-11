class CreateNewChatCommand {
  user;
  constructor(user) {
    this.user = user;
  }

  CreateNewChat({ navigation }) {
    navigation.navigate("New Chat");
  }
}

export default CreateNewChatCommand;
