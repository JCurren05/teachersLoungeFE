import { apiUrl, getCategoriesRoute } from "@env";
import * as SecureStore from "expo-secure-store";

async function getCategories() {
  let categories = [];
  let urlCategories = apiUrl + getCategoriesRoute;
  const reqOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + (await SecureStore.getItemAsync("token")),
    },
  };
  const response = await fetch(urlCategories, reqOptions);
  const results = await response.json();
  var data = results.data;
  var count = 0;
  if (data) {
    while (data[count] != undefined) {
      categories.unshift({
        key: data[count].CategoryID,
        value: data[count].Category,
      });
      count = count + 1;
    }
  }
  return categories;
}

export { getCategories };
