import { apiUrl, createPostRoute } from "@env";
import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";

//Creates a new post and adds to the database
async function CreatePost({ navigation }, content, file, user, category) {
  if (content != "") {
    let postUrl = apiUrl + createPostRoute;
    const reqOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + (await SecureStore.getItemAsync("token")),
      },
      body: JSON.stringify({
        content: content,
        fileUrl: file.url,
        email: user.userUserName,
        fileType: file.type,
        fileDisplayName: file.name,
        category: category,
      }),
    };
    const response = await fetch(postUrl, reqOptions);
    const data = await response.json();
    if (response.status != 200) {
      Alert.alert("Error", "Unable to create post");
    } else {
      user.createPost(content, file.url);
      Alert.alert("Success", "Post created");
      navigation.navigate("Home");
    }
  }
}

export default CreatePost;
