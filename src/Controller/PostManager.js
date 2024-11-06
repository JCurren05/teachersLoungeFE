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

// Fetches all posts that have been approved, used for PostListingsView
async function getApprovedPosts(category) {
  let posts = [];
  let urlPosts = `${apiUrl}${approvedPostsRoute}?category=${category}`;
  console.log(urlPosts);
  const reqOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await SecureStore.getItemAsync("token")}`,
    },
  };
  const response = await fetch(urlPosts, reqOptions);
  const results = await response.json();
  const data = results.data;

  if (data) {
    data.forEach((post) => {
      posts.unshift(
        new Post(
          post.postid,
          post.email,
          post.content,
          post.likesCount,
          "",
          "",
          [],
          post.fileurl // Adjusted to use filePath retrieved from PostgreSQL
        )
      );
    });
  }
  return posts;
}

// Gets posts that are pending approval, used for PostModeratorView
async function getPendingPosts() {
  let posts = [];
  const urlPosts = `${apiUrl}${pendingPostsRoute}`;
  const reqOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await SecureStore.getItemAsync("token")}`,
    },
  };
  const response = await fetch(urlPosts, reqOptions);
  const results = await response.json();
  const data = results.data;

  if (data) {
    data.forEach((post) => {
      posts.unshift(
        new Post(
          post.postID,
          post.email,
          post.content,
          0,
          "",
          "",
          [],
          post.filePath
        )
      );
    });
  }
  return posts;
}

// Switches a post from pending to approved, called from PostModeratorView
async function approvePost(postID) {
  const urlApprove = `${apiUrl}${approvePostRoute}`;
  const reqOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await SecureStore.getItemAsync("token")}`,
    },
    body: JSON.stringify({ id: postID }),
  };
  const response = await fetch(urlApprove, reqOptions);
  const results = await response.json();
  if (response.status === 200) {
    Alert.alert("Success", "Post is approved");
  } else {
    Alert.alert("Error", `Server error, try again: ${response.status}`);
  }
}

// Deletes a post from the database
async function deletePost(postID) {
  console.log('---------postID---------');
  console.log(postID);
  const urlDelete = `${apiUrl}${deletePostRoute}`;
  const reqOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await SecureStore.getItemAsync("token")}`,
    },
    body: JSON.stringify({ id: postID }),
  };
  const response = await fetch(urlDelete, reqOptions);
  const results = await response.json();
  if (response.status === 200) {
    Alert.alert("Success", results.message);
  } else {
    Alert.alert("Error", "Server error, try again");
  }
}

async function addComment(content, email, time, postId) {
  const urlAddComment = `${apiUrl}${addCommentRoute}`;
  const reqOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await SecureStore.getItemAsync("token")}`,
    },
    body: JSON.stringify({ content, email, time }),
  };
  const response = await fetch(urlAddComment, reqOptions);
  const results = await response.json();
  if (response.status === 200) {
    const commentId = await getComment(content, email);
    await addCommentToPost(commentId, email, postId);
  } else {
    Alert.alert("Error", results.message);
  }
}

async function addCommentToPost(commentId, email, postId) {
  const urlAddCommentToPost = `${apiUrl}${addCommentToPostRoute}`;
  const reqOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await SecureStore.getItemAsync("token")}`,
    },
    body: JSON.stringify({ email, commentId, postId }),
  };
  const response = await fetch(urlAddCommentToPost, reqOptions);
  const results = await response.json();
  if (response.status === 200) {
    Alert.alert("Success", "Comment added to post");
  } else {
    Alert.alert("Error", results.message);
  }
}

async function getComment(content, email) {
  const urlGetComment = `${apiUrl}${getCommentRoute}`;
  const reqOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await SecureStore.getItemAsync("token")}`,
    },
    body: JSON.stringify({ content, email }),
  };
  const response = await fetch(urlGetComment, reqOptions);
  const results = await response.json();
  if (response.status === 200) {
    return results.data[0].CommentID;
  } else {
    Alert.alert("Error", results.message);
  }
}

async function getCommentByCommentID(commentId) {
  const urlGetCommentByCommentID = `${apiUrl}${getCommentByCommentIDRoute}`;
  const reqOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await SecureStore.getItemAsync("token")}`,
    },
    body: JSON.stringify({ commentId }),
  };
  const response = await fetch(urlGetCommentByCommentID, reqOptions);
  const results = await response.json();
  if (response.status === 200) {
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

  const urlGetCommentsByPostId = `${apiUrl}${getCommentsByPostIdRoute}?postId=${postId}`;
  const reqOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await SecureStore.getItemAsync("token")}`,
    },
  };
  const response = await fetch(urlGetCommentsByPostId, reqOptions);
  const results = await response.json();

  if (response.status === 200) {
    return results.data;
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
  getComments,
  getCommentByCommentID,
};