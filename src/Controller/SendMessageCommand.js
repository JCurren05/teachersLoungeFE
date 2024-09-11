import MessageBox from "../View/UserView/MessageView/MessageBox";

class SendMessageCommnad {
  user;
  constructor(user) {
    this.user = user;
  }

  SendMessage({ navigation, messageToSend }) {
    return <MessageBox navigation={navigation} message={messageToSend} />;
  }
}

export default SendMessageCommnad;
