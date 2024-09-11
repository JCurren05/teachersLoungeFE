import React from "react";
import Comment from "./Comment";

class Post {
  constructor(id,user, postContent, likes, image, nickName, comments,fileUrl) {
    this.id = id;
    this.postContent = postContent;
    this.likes = likes;
    this.user = user;
    this.image = image;
    this.nickName = nickName;
    this.comments = comments;
    this.fileUrl = fileUrl;
  }
}

export default Post;
