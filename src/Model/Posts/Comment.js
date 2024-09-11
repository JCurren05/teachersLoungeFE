import React from "react";

class Comment {
  constructor(userName, image, commentContent, nickName) {
    //test user, connect with database later
    this.userName = userName;
    this.image = image;
    this.content = commentContent;
    this.nickName = nickName;
  }
}

export default Comment;
