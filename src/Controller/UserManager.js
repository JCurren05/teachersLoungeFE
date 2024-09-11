import {
  apiUrl,
  pendingUsersRoute,
  approvedUsersRoute,
  approveUserRoute,
  deleteUserRoute,
} from "@env";
import User from "../Model/User.js";
import { Alert } from "react-native";
import * as SecureStore from "expo-secure-store";

//Gets all user accounts that have not been approved yet
async function getPendingUsers() {
  users = [];
  let urlUsers = apiUrl + pendingUsersRoute;
  const reqOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + (await SecureStore.getItemAsync("token")),
    },
  };
  const response = await fetch(urlUsers, reqOptions);
  const results = await response.json();
  var data = results.data;
  var count = 0;
  //console.log(data);
  if (data) {
    while (data[count] != undefined) {
      users.unshift(
        new User(
          data[count].Email,
          data[count].FirstName,
          data[count].LastName,
          data[count].SchoolID,
          data[count].Role
        )
      );
      count = count + 1;
    }
  }
  return users;
}

//Gets all users that have been approved
async function getApprovedUsers() {
  users = [];
  let urlUsers = apiUrl + approvedUsersRoute;
  const reqOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + (await SecureStore.getItemAsync("token")),
    },
  };
  const response = await fetch(urlUsers, reqOptions);
  const results = await response.json();
  var data = results.data;
  var count = 0;
  if (data) {
    while (data[count] != undefined) {
      users.unshift(
        new User(
          data[count].Email,
          data[count].FirstName,
          data[count].LastName,
          data[count].SchoolID,
          data[count].Role
        )
      );
      count = count + 1;
    }
  }
  return users;
}

//Sets a user to Approved
async function approveUser(email) {
  let urlApprove = apiUrl + approveUserRoute;
  const reqOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + (await SecureStore.getItemAsync("token")),
    },
    body: JSON.stringify({ email: email }),
  };
  const response = await fetch(urlApprove, reqOptions);
  const results = await response.json();
  if (response.status == 200) {
    Alert.alert("Success", "User is approved");
  } else {
    Alert.alert("Error", "Server error, try again");
  }
}

//Deletes a user from the system
async function deleteUser(email) {
  let urlDelete = apiUrl + deleteUserRoute;
  const reqOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + (await SecureStore.getItemAsync("token")),
    },
    body: JSON.stringify({ email: email }),
  };
  const response = await fetch(urlDelete, reqOptions);
  const results = await response.json();
  if (response.status == 200) {
    Alert.alert("Success", "User has been deleted");
  } else {
    Alert.alert("Error", "Server error, try again");
  }
}

export { getPendingUsers, getApprovedUsers, approveUser, deleteUser };
