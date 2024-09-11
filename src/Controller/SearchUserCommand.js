import { apiUrl, searchUserRoute } from "@env";
import React from "react";
import Friend from "../Model/Friend";

import * as SecureStore from "expo-secure-store";

const searchUser = async (searchQuery) => {
  var users = [];
  let urlUser = apiUrl + searchUserRoute + `?searchQuery=${searchQuery}`;
  console.log(urlUser);
  const reqOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + (await SecureStore.getItemAsync("token")),
    },
  };
  const response = await fetch(urlUser, reqOptions);
  const results = await response.json();
  var data = results.data;
  var count = 0;
  if (data) {
    while (data[count] != undefined) {
      users.unshift(
        new Friend(
          data[count].Email,
          data[count].FirstName,
          data[count].LastName,
          data[count].SchoolID,
          data[count].Role
        )
      );
      count += 1;
    }
  }
  return users;
};

export { searchUser };
