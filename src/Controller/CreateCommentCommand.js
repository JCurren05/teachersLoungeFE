import Comment from "../Model/Posts/Comment";
class CreateCommentCommand {
  constructor(comments) {
    this.comments = comments;
  }

  addComment(navigation, userName, image, content, nickName, choice) {
    if (content != "") {
      this.comments.push(new Comment(userName, image, content, nickName));
      if (choice == "Profile") {
        navigation.navigate("Profile");
      } else {
        navigation.navigate("Home");
      }
    }
  }



}

export default CreateCommentCommand;