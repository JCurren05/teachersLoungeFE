import { apiUrl, createPostRoute } from "@env";
import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";

/**
 * Creates a new post and adds it to the database.
 * @param {object} navigation - Navigation object for routing.
 * @param {string} content - The post content.
 * @param {string | null} file - The file path or URL (if any).
 * @param {object} user - User object containing user details.
 * @param {number | null} category - The category ID (if applicable).
 */

async function CreateCommunityPost(content, file, user, category, communityId, navigation) {
  console.log('------new community post--------');
  if (content) {
    const postUrl = `${apiUrl}${createCommunityPostRoute}`;

    const reqOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await SecureStore.getItemAsync("token")}`,
      },
      body: JSON.stringify({
        content,
        filePath: file || null,
        email: user.userUserName,
        fileType: file ? "File" : "None",
        fileDisplayName: file ? "File" : "None",
        category: category || null,
        communityId, // Pass the communityId
      }),
    };

    try {
      const response = await fetch(postUrl, reqOptions);
      const data = await response.json();

      if (response.status === 201) {
        Alert.alert("Success", "Community post created");
        navigation.navigate("Community", { communityId }); // Navigate to community
      } else {
        Alert.alert("Success", "Community post created");
      }
    } catch (error) {
      console.error("Error creating community post:", error);
      Alert.alert("Error", "An error occurred while creating the community post");
    }
  } else {
    Alert.alert("Error", "Post content cannot be empty");
  }
}

async function CreatePost({ navigation }, content, file, user, category) {
  console.log("------new post--------");
  console.log("Content:", content);

  if (!content) {
    Alert.alert("Error", "Post content cannot be empty");
    return;
  }

  const postUrl = `${apiUrl}${createPostRoute}`;

  try {
    // Prepare request options
    const token = await SecureStore.getItemAsync("token");
    if (!token) {
      Alert.alert("Error", "Authentication token is missing");
      return;
    }

    const reqOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        content,
        filePath: file || null, // Ensure null is sent if no file is provided
        email: user.userUserName,
        fileType: file ? "File" : "None",
        fileDisplayName: file ? "File" : "None",
        category: category || null, // Ensure null is sent if no category is provided
      }),
    };

    // Send the request
    const response = await fetch(postUrl, reqOptions);
    const data = await response.json();

    if (response.ok) {
      // Update user state or perform local updates
      if (user.createPost) {
        user.createPost(content, file);
      }

      Alert.alert("Success", "Post created successfully!");
      navigation.navigate("Home");
    } else {
      console.error("Error response from server:", data);
      Alert.alert("Error", data.message || "Success", "Community post created");
    }
  } catch (error) {
    console.error("Error creating post:", error);
    Alert.alert("Error", "An unexpected error occurred while creating the post");
  }
}

export default CreatePost;