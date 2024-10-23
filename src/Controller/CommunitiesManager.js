import {
  apiUrl,
  createCommunityRoute,
  allCommunitiesRoute,
  joinCommunityRoute,
  leaveCommunityRoute,
  userCommunitiesRoute,
  communityPostsRoute,
  createCommunityPostRoute,
} from "@env";
import Community from "../Model/Community.js";
import Post from "../Model/Posts/Post.js";
import Comment from "../Model/Posts/Comment.js";
import { Alert } from "react-native";
import * as SecureStore from "expo-secure-store";

// Fetches all communities
// Later should implement approval for communities
async function getAllCommunities() {
  var communities = [];
  let urlCommunities = apiUrl + allCommunitiesRoute;
  console.log(urlCommunities);
  const reqOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + (await SecureStore.getItemAsync("token")),
    },
  };
  const response = await fetch(urlCommunities, reqOptions);
  const results = await response.json();
  var data = results.data;
  var count = 0;
  if (data) {
    while (data[count] != undefined) {
      communities.unshift(
        new Community(data[count].communityid, data[count].communityname)
      );
      count = count + 1;
    }
  }
  return communities;
}

async function createCommunity({ navigation }, name) {
  // Need to implement function to check if a community exists before creating it
  if (name != "") {
    let communityUrl = apiUrl + createCommunityRoute;
    const reqOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + (await SecureStore.getItemAsync("token")),
      },
      body: JSON.stringify({
        communityName: name,
      }),
    };
    const response = await fetch(communityUrl, reqOptions);
    const data = await response.json();
    if (response.status != 201) {
      Alert.alert("Error", "Unable to create community");
    } else {
      Alert.alert("Success", "Community created");
      navigation.navigate("Communities");
    }
  }
}

async function joinCommunity({ navigation }, communityId, email) {
  if (communityId != "") {
    let communityUrl = apiUrl + joinCommunityRoute;
    console.log(communityUrl);
    const reqOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + (await SecureStore.getItemAsync("token")),
      },
      body: JSON.stringify({
        communityID: communityId,
        userEmail: email,
      }),
    };
    console.log(reqOptions);
    const response = await fetch(communityUrl, reqOptions);
    const data = await response.json();
    console.log(data);
    if (response.status != 201) {
      Alert.alert("Error", "Unable to join community");
    } else {
      Alert.alert("Success", "Community joined");
      navigation.navigate("Communities");
    }
  }
}

// Does not work yet!
async function leaveCommunity({ navigation }, communityId, email) {
  if (communityId != "") {
    const communityUrl = `${apiUrl}${leaveCommunityRoute}?communityID=${communityId}&userEmail=${email}`;
    console.log(communityUrl);
    const reqOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + (await SecureStore.getItemAsync("token")),
      },
    };
    const response = await fetch(communityUrl, reqOptions);
    const data = await response.json();
    console.log(data);
    if (response.status != 200) {
      Alert.alert("Error", "Unable to leave community");
    } else {
      Alert.alert("Success", "Community left");
      navigation.navigate("Communities");
    }
  }
}

async function getUserCommunities(email) {
  if (email != "") {
    var communities = [];
    let urlCommunities = apiUrl + userCommunitiesRoute + `?email=${email}`;
    console.log(urlCommunities);
    const reqOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + (await SecureStore.getItemAsync("token")),
      },
    };
    const response = await fetch(urlCommunities, reqOptions);
    const results = await response.json();
    var data = results.data;
    var count = 0;
    if (data) {
      while (data[count] != undefined) {
        communities.unshift(
          new Community(data[count].CommunityID, data[count].CommunityName)
        );
        count = count + 1;
      }
    }
    return communities;
  }
}

async function getCommunityPosts(communityID, categoryID) {
  let posts = [];
  let urlPosts =
    apiUrl +
    communityPostsRoute +
    `?communityID=${communityID}&category=${categoryID}`;
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

async function createCommunityPost(
  { navigation },
  content,
  file,
  user,
  category,
  communityID
) {
  if (content != "") {
    let postUrl = apiUrl + createCommunityPostRoute;
    console.log(postUrl);
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
        communityId: communityID,
      }),
    };
    const response = await fetch(postUrl, reqOptions);
    const data = await response.json();
    console.log(data);
    if (response.status != 200) {
      Alert.alert("Error", "Unable to create post");
    } else {
      user.createPost(content, file.url);
      Alert.alert("Success", "Post created");
      navigation.goBack();
    }
  }
}

export {
  getAllCommunities,
  createCommunity,
  joinCommunity,
  leaveCommunity,
  getUserCommunities,
  getCommunityPosts,
  createCommunityPost,
};
