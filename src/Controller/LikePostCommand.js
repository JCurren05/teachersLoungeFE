import { apiUrl, likePostRoute, getPostLikesRoute, checkLikedPostRoute } from "@env";
import { Alert } from "react-native";

import * as SecureStore from "expo-secure-store";

// Likes a post by given post id and user who liked it
const likePost = async (post, user) => {
  // Build like post url
  // const likePostUrl = apiUrl + likePostRoute;
  const likePostUrl = `${apiUrl}${likePostRoute}`
  
  // console.log('Sending request to: ', likePostUrl); // debug

  // Set request options
  const reqOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + (await SecureStore.getItemAsync("token")),
    },
    body: JSON.stringify({ userEmail: user, postId: post.id }),
  };

  // Make request
  const response = await fetch(likePostUrl, reqOptions);

  // console.log('Response received: ', response); // debug

  const results = await response.json();
  
  if (response.status === 200) {
    Alert.alert("Success", "Successfully liked the post!");
  } else {
    Alert.alert("Error", results.message);
  }

  return response.status == 200;
};

async function getPostLikes(post, user) {
  const urlPostLikes = apiUrl + getPostLikesRoute;
  const reqOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await SecureStore.getItemAsync("token")}`,
    },
    body: JSON.stringify({ userEmail: user, postId: post.id }),
  };

  const response = await fetch(urlPostLikes, reqOptions);
  const results = await response.json();
  // const data = results.data;

  if (response.status === 200) {
    return results.rows[0].likecount;
  } else {
    Alert.alert("Error", results.message);
  }
}

async function checkLikedPost(post, user) {
  const urlCheckLiked = apiUrl + checkLikedPostRoute;
  const reqOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await SecureStore.getItemAsync("token")}`,
    },
    body: JSON.stringify({ userEmail: user, postId: post.id }),
  };

  console.log(urlCheckLiked); // debug: good
  // PROBLEM:
  const response = await fetch(urlCheckLiked, reqOptions);
  // console.log(response); // debug: not reached
  const results = await response.json();
  
  console.log('Response received: ', response);

  if (response.status != 200) {
    Alert.alert("Error", "You have already liked this post!");
  } else {
    Alert.alert("Success", "Successfully liked the post!");
  }
}

export { likePost, getPostLikes, checkLikedPost };
