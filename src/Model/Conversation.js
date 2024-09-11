class Conversation {
    constructor(id, title, members, lastMessageText) {
      // id is a arbitrary primary key (INTEGER type) for each conversation
      this.id = id;
      // title is the friend name of user, in VARCHAR(255) type
      this.title = title;

      // friendEmail is the email of the friend, in VARCHAR(255) type
      this.members = members;

      // lastMessageText is the last message text, in VARCHAR(255) type
      this.lastMessageText = lastMessageText;
    }

    setLastMessageText(lastMessageText) {
      this.lastMessageText = lastMessageText;
    }
  }
  
export default Conversation;
  