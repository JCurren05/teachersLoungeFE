import { apiUrl, createPostRoute } from "@env";
import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";

// Creates a new post and adds it to the database
async function CreatePost({ navigation }, content, file, user, category) {
  console.log('------new post--------');
  console.log(content);
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
        filePath: file,
        email: user.userUserName,
        fileType: 'None',
        fileDisplayName: 'File',
        category,
      }),
    };
    
    try {
      const response = await fetch(postUrl, reqOptions);
      const data = await response.json();

      if (response.status === 200) {
        user.createPost(content, file);
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