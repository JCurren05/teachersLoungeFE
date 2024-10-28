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
import { Alert } from "react-native";
import * as SecureStore from "expo-secure-store";

// Fetches all communities
async function getAllCommunities() {
  const communities = [];
  const urlCommunities = `${apiUrl}${allCommunitiesRoute}`;
  const reqOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${await SecureStore.getItemAsync("token")}`,
    },
  };
  const response = await fetch(urlCommunities, reqOptions);
  const results = await response.json();
  const data = results.data;

  if (data) {
    data.forEach((community) => {
      communities.unshift(
        new Community(community.CommunityID, community.CommunityName)
      );
    });
  }
  return communities;
}

// Creates a new community
async function createCommunity({ navigation }, name) {
  if (name) {
    const communityUrl = `${apiUrl}${createCommunityRoute}`;
    const reqOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${await SecureStore.getItemAsync("token")}`,
      },
      body: JSON.stringify({
        communityName: name,
      }),
    };
    const response = await fetch(communityUrl, reqOptions);
    const data = await response.json();

    if (response.status === 201) {
      Alert.alert("Success", "Community created");
      navigation.navigate("Communities");
    } else {
      Alert.alert("Error", "Unable to create community");
    }
  } else {
    Alert.alert("Error", "Community name cannot be empty");
  }
}

// Joins a specified community
async function joinCommunity({ navigation }, communityId, email) {
  if (communityId) {
    const communityUrl = `${apiUrl}${joinCommunityRoute}`;
    const reqOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${await SecureStore.getItemAsync("token")}`,
      },
      body: JSON.stringify({
        communityID: communityId,
        userEmail: email,
      }),
    };
    const response = await fetch(communityUrl, reqOptions);
    const data = await response.json();

    if (response.status === 201) {
      Alert.alert("Success", "Community joined");
      navigation.navigate("Communities");
    } else {
      Alert.alert("Error", "Unable to join community");
    }
  } else {
    Alert.alert("Error", "Community ID is required");
  }
}

// Leaves a specified community
async function leaveCommunity({ navigation }, communityId, email) {
  if (communityId) {
    const communityUrl = `${apiUrl}${leaveCommunityRoute}?communityID=${communityId}&userEmail=${email}`;
    const reqOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${await SecureStore.getItemAsync("token")}`,
      },
    };
    const response = await fetch(communityUrl, reqOptions);
    const data = await response.json();

    if (response.status === 200) {
      Alert.alert("Success", "Community left");
      navigation.navigate("Communities");
    } else {
      Alert.alert("Error", "Unable to leave community");
    }
  } else {
    Alert.alert("Error", "Community ID is required");
  }
}

// Gets all communities a user has joined
async function getUserCommunities(email) {
  const communities = [];
  const urlCommunities = `${apiUrl}${userCommunitiesRoute}?email=${email}`;
  const reqOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${await SecureStore.getItemAsync("token")}`,
    },
  };
  const response = await fetch(urlCommunities, reqOptions);
  const results = await response.json();
  const data = results.data;

  if (data) {
    data.forEach((community) => {
      communities.unshift(
        new Community(community.CommunityID, community.CommunityName)
      );
    });
  }
  return communities;
}

// Gets all approved posts for a community
async function getCommunityPosts(communityID, categoryID) {
  const posts = [];
  const urlPosts = `${apiUrl}${communityPostsRoute}?communityID=${communityID}&category=${categoryID}`;
  const reqOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${await SecureStore.getItemAsync("token")}`,
    },
  };
  const response = await fetch(urlPosts, reqOptions);
  const results = await response.json();
  const data = results.data;

  if (data) {
    data.forEach((post) => {
      posts.unshift(
        new Post(
          post.PostID,
          post.Email,
          post.Content,
          post.likesCount,
          "",
          "",
          [],
          post.filePath  // Using filePath as retrieved from PostgreSQL
        )
      );
    });
  }
  return posts;
}

// Creates a new post within a community
async function createCommunityPost(
  { navigation },
  content,
  file,
  user,
  category,
  communityID
) {
  if (content) {
    const postUrl = `${apiUrl}${createCommunityPostRoute}`;
    const reqOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${await SecureStore.getItemAsync("token")}`,
      },
      body: JSON.stringify({
        content,
        filePath: file.url,  // Using filePath for PostgreSQL-based file storage
        email: user.userUserName,
        fileType: file.type,
        fileDisplayName: file.name,
        category,
        communityId: communityID,
      }),
    };
    
    try {
      const response = await fetch(postUrl, reqOptions);
      const data = await response.json();

      if (response.status === 200) {
        user.createPost(content, file.url);
        Alert.alert("Success", "Post created");
        navigation.goBack();
      } else {
        Alert.alert("Error", "Unable to create post");
      }
    } catch (error) {
      console.error("Error creating community post:", error);
      Alert.alert("Error", "An error occurred while creating the post");
    }
  } else {
    Alert.alert("Error", "Post content cannot be empty");
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