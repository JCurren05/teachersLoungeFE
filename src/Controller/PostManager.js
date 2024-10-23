import {
  apiUrl,
  approvedPostsRoute,
  pendingPostsRoute,
  deletePostRoute,
  approvePostRoute,
  addCommentRoute,
  getCommentRoute,
  addCommentToPostRoute,
  getCommentsByPostIdRoute,
  getCommentByCommentIDRoute,
} from "@env";
import Post from "../Model/Posts/Post.js";
import Comment from "../Model/Posts/Comment.js";
import { Alert } from "react-native";
import * as SecureStore from "expo-secure-store";

//Fetches all posts that have been approved, used for PostListingsView
async function getApprovedPosts(category) {
  let posts = [];
  let urlPosts = apiUrl + approvedPostsRoute + `?category=${category}`;
  console.log(urlPosts);
  const reqOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + (await SecureStore.getItemAsync("token")),
    },
  };
  const response = await fetch(urlPosts, reqOptions);
  const results = await response.json();
  console.log(results);
  var data = results.data;
  var count = 0;
  if (data) {
    while (data[count] != undefined) {
      posts.unshift(
        new Post(
          data[count].PostID,
          data[count].Email,
          data[count].Content,
          data[count].likesCount,
          "",
          "",
          [],
          data[count].FileUrl
        )
      );
      count = count + 1;
    }
  }
  return posts;
}

//Gets posts that are pending approval, used for PostModeratorView
async function getPendingPosts() {
  posts = [];
  let urlPosts = apiUrl + pendingPostsRoute;
  const reqOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + (await SecureStore.getItemAsync("token")),
    },
  };
  const response = await fetch(urlPosts, reqOptions);
  const results = await response.json();
  var data = results.data;
  var count = 0;
  if (data) {
    while (data[count] != undefined) {
      posts.unshift(
        new Post(
          data[count].PostID,
          data[count].Email,
          data[count].Content,
          0,
          "",
          "",
          [],
          data[count].FileUrl
        )
      );
      count = count + 1;
    }
  }
  return posts;
}

//Switches a post from pending to approved, called from PostModeratorView
async function approvePost(postID) {
  let urlApprove = apiUrl + approvePostRoute;
  const reqOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + (await SecureStore.getItemAsync("token")),
    },
    body: JSON.stringify({ id: postID }),
  };
  const response = await fetch(urlApprove, reqOptions);
  const results = await response.json();
  if (response.status == 200) {
    Alert.alert("Success", "Post is approved");
  } else {
    Alert.alert("Error", "Server error, try again" + response.status);
  }
}

//Delete a post from DB, called when a user deletes their own post or when a mod doesn't approve a post
async function deletePost(postID, fileID) {
  let urlDelete = apiUrl + deletePostRoute;
  const reqOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + (await SecureStore.getItemAsync("token")),
    },
    body: JSON.stringify({ id: postID, fileID: fileID }),
  };
  const response = await fetch(urlDelete, reqOptions);
  const results = await response.json();
  if (response.status == 200) {
    Alert.alert("Success", results.message);
  } else {
    Alert.alert("Error", "Server error, try again");
  }
}

async function addComment(content, email, time, postId) {
  let urlAddComment = apiUrl + addCommentRoute;
  const reqOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + (await SecureStore.getItemAsync("token")),
    },
    body: JSON.stringify({ content: content, email: email, time: time }),
  };
  const response = await fetch(urlAddComment, reqOptions);
  const results = await response.json();
  if (response.status == 200) {
    let commentId = await getComment(content, email);
    await addCommentToPost(commentId, email, postId);
  } else {
    Alert.alert("Error", results.message);
  }
}

async function addCommentToPost(commentId, email, postId) {
  let urlAddCommentToPost = apiUrl + addCommentToPostRoute;
  const reqOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + (await SecureStore.getItemAsync("token")),
    },
    body: JSON.stringify({
      email: email,
      commentId: commentId,
      postId: postId,
    }),
  };
  const response = await fetch(urlAddCommentToPost, reqOptions);
  const results = await response.json();
  if (response.status == 200) {
    Alert.alert("Success", "Comment added to post");
  } else {
    Alert.alert("Error", results.message);
  }
}

async function getComment(content, email) {
  let urlGetComment = apiUrl + getCommentRoute;
  const reqOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + (await SecureStore.getItemAsync("token")),
    },
    body: JSON.stringify({ content: content, email: email }),
  };
  const response = await fetch(urlGetComment, reqOptions);
  const results = await response.json();
  if (response.status == 200) {
    return results.data[0].CommentID;
  } else {
    Alert.alert("Error", results.message);
  }
}

async function getCommentByCommentID(commentId) {
  let urlGetCommentByCommentID = apiUrl + getCommentByCommentIDRoute;
  const reqOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + (await SecureStore.getItemAsync("token")),
    },
    body: JSON.stringify({ commentId: commentId }),
  };
  const response = await fetch(urlGetCommentByCommentID, reqOptions);
  const results = await response.json();
  if (response.status == 200) {
    return results.data[0];
  } else {
    Alert.alert("Error", results.message);
  }
}

async function getComments(postId) {
  if (isNaN(postId)) {
    Alert.alert("Error", "Invalid post ID");
    return;
  }

  let urlGetCommentsByPostId = apiUrl + getCommentsByPostIdRoute + `?postId=${postId}`;
  const reqOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + (await SecureStore.getItemAsync("token")),
    },
  };
  const response = await fetch(urlGetCommentsByPostId, reqOptions);
  const results = await response.json();

  if (response.status == 200) {
    return results.data; // Handle the comments data here
  } else {
    Alert.alert("Error", results.message);
  }
}

export {
  getApprovedPosts,
  getPendingPosts,
  approvePost,
  deletePost,
  addComment,
  addCommentToPost,
  getComment,
  getComments, // Replaced with getComments instead of getCommentsByPostId
  getCommentByCommentID
};