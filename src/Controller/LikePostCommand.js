import { apiUrl, likePostRoute } from "@env";
import { Alert } from "react-native";

import * as SecureStore from "expo-secure-store";

// Likes a post by given post id and user who liked it
const likePost = async (post, user) => {
  // Build like post url
  const likePostUrl = apiUrl + likePostRoute;

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
  if (response.status != 200) {
    Alert.alert("Error", "You have already liked this post!");
  } else {
    Alert.alert("Success", "Successfully liked the post!");
  }

  return response.status == 200;
};

export { likePost };
