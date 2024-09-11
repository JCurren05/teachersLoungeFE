import React from "react";

class Message {
  constructor(messageId, conversationId, content, sender, time) {
    this.messageId = messageId;
    this.conversationId = conversationId;
    this.sender = sender;
    this.content = content;
    this.time = time;
  }
}

export default Message;
