import {
  apiUrl,
  getUserInfoRoute,
  checkIfFriendedRoute,
  friendUserRoute,
  unfriendUserRoute,
  getFriendsListRoute,
} from "@env";
import Friend from "../Model/Friend.js";
import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";

// Use userEmail to get user info
async function getUserInfo(userEmail) {
  console.log('This is the user email' + userEmail);
  if (userEmail != "") {
    try {
      let userInfoUrl = `${apiUrl}${getUserInfoRoute}?userEmail=${userEmail}`;
      console.log(userInfoUrl);
      const reqOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + (await SecureStore.getItemAsync("token")),
        },
      };
      const response = await fetch(userInfoUrl, reqOptions);
      const results = await response.json();
      var data = results.data;
      console.log("------This is the data --------");
      console.log(data[0]);
      var friend;
      if (data[0]) {
        friend = new Friend(
          data[0].email,
          data[0].firstname,
          data[0].lastname,
          data[0].schoolid,
          data[0].role
        );
      }
      console.log("------This is the friend --------");
      console.log(friend);
      console.log("------This is the friend --------");
      return friend;
    } catch (error) {
      console.error("ERROR in getUserInfo", error.message);
      throw error;
    }
  }
}

// Check if user friended another user (DOES NOT MEAN THEY ARE FRIENDS, REQUIRES BOTH WAYS)
async function checkIfFriended(frienderEmail, friendeeEmail) {
  try {
    let checkIfFriendedUrl = `${apiUrl}${checkIfFriendedRoute}?friendeeEmail=${friendeeEmail}&frienderEmail=${frienderEmail}`;
    console.log(checkIfFriendedUrl);
    const reqOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + (await SecureStore.getItemAsync("token")),
      },
    };
    const response = await fetch(checkIfFriendedUrl, reqOptions);
    const results = await response.json();
    var data = results.data;
    return !!data.length;
  } catch (error) {
    console.error("ERROR in checkIfFriended", error.message);
    throw error;
  }
}

async function friendUser({ navigation }, frienderEmail, friendeeEmail) {
  console.log('-------------');
  console.log(friendeeEmail);
  console.log(frienderEmail);
  if (friendeeEmail && frienderEmail) {

    let friendUserUrl = apiUrl + friendUserRoute;
    console.log(friendUserUrl);
    const reqOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + (await SecureStore.getItemAsync("token")),
      },
      body: JSON.stringify({
        frienderEmail: frienderEmail,
        friendeeEmail: friendeeEmail,
      }),
    };
    const response = await fetch(friendUserUrl, reqOptions);
    const data = await response.json();
    if (response.status != 201) {
      Alert.alert("Error", "Unable to friend user");
    } else {
      Alert.alert("Success", "User friended");
      navigation.navigate("Friend", {
        FriendEmail: friendeeEmail,
      });
    }
  }
}

async function unfriendUser({ navigation }, frienderEmail, friendeeEmail) {
  if (friendeeEmail && frienderEmail) {
    let unfriendUserUrl = `${apiUrl}${unfriendUserRoute}?friendeeEmail=${friendeeEmail}&frienderEmail=${frienderEmail}`;
    console.log(unfriendUserUrl);
    const reqOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + (await SecureStore.getItemAsync("token")),
      },
    };
    const response = await fetch(unfriendUserUrl, reqOptions);
    const data = await response.json();
    if (response.status != 201) {
      Alert.alert("Error", "Unable to unfriend user");
    } else {
      Alert.alert("Success", "User unfriended");
      navigation.navigate("Friend", {
        FriendEmail: friendeeEmail,
      });
    }
  }
}

async function getFriendsList(userEmail) {
  if (userEmail != "") {
    var friends = [];
    let friendsUrl = apiUrl + getFriendsListRoute + `?userEmail=${userEmail}`;
    console.log(friendsUrl);
    const reqOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + (await SecureStore.getItemAsync("token")),
      },
    };
    const response = await fetch(friendsUrl, reqOptions);
    const results = await response.json();
    var data = results.data;
    var count = 0;
    if (data) {
      while (data[count] != undefined) {
        friends.unshift(
          new Friend(
            data[count].email,
            data[count].firstname,
            data[count].lastname,
            data[count].schoolid,
            data[count].role
          )
        );
        count = count + 1;
      }
    }
    return friends;
  }
}

export {
  getUserInfo,
  checkIfFriended,
  friendUser,
  unfriendUser,
  getFriendsList,
};
