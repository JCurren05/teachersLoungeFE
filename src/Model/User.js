import React from "react";
import Friend from "./Friend";
import Post from "./Posts/Post";
import Comment from "./Posts/Comment";



class User {
  //The user's acutal name
  userName = "";
  //The user's username/email- we tried to refactor the name of this to be clearer but it broke everything
  userUserName = "";
  nickName = "";
  school = "";    
  userRole ="";
  color = "";
  image;
  constructor(email,first,last,school,role, color) {
    this.userName = first + " " + last;
    this.userUserName = email;
    this.nickName = first;
    this.school = school;
    this.userRole = role;
    this.post = [];
    this.color = color;
  }

  approveUser(){  
    if(this.userRole=="Guest")
      this.userRole = "Approved";
  }

  createPost(content,fileUrl) {
    newPost = new Post(
      this.userName,
      content,
      0,
      this.image,
      this.nickName,
      [],fileUrl
    );
    this.post.unshift(newPost);
  }

  changeUserName(newUserName) {
    this.userName = newUserName;
  }
  changeUserUserName(newUserUserName) {
    this.userUserName = newUserUserName;
  }
  changeSchool(newSchool) {
    this.school = newSchool;
  }
}

export default User;
