import { apiUrl, createPostRoute } from "@env";
import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";

// Creates a new post and adds it to the database
async function CreatePost({ navigation }, content, file, user, category) {
  if (content) {
    const postUrl = `${apiUrl}${createPostRoute}`;
    
    const reqOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${await SecureStore.getItemAsync("token")}`,
      },
      body: JSON.stringify({
        content,
        filePath: file.url,  // Using filePath as stored in PostgreSQL
        email: user.userUserName,
        fileType: file.type,
        fileDisplayName: file.name,
        category,
      }),
    };
    
    try {
      const response = await fetch(postUrl, reqOptions);
      const data = await response.json();

      if (response.status === 200) {
        user.createPost(content, file.url);
        Alert.alert("Success", "Post created");
        navigation.navigate("Home");
      } else {
        Alert.alert("Error", "Unable to create post");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      Alert.alert("Error", "An error occurred while creating the post");
    }
  } else {
    Alert.alert("Error", "Post content cannot be empty");
  }
}

export default CreatePost;