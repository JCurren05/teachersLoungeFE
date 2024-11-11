import User from "../Model/User";
import { Alert } from "react-native";
import { apiUrl, registerRoute, PASSWORD_ENCRYPTER } from "@env";

// Helper function to check if an email ends in .edu
function isEduEmail(email) {
  return email.endsWith(".edu");
}

// Called from the RegisterView, creates a new user
async function register({ navigation }, fName, lName, email, password) {
  if (fName !== "" && lName !== "" && email !== "" && password !== "") {
    // Check if the email ends with .edu
    if (!isEduEmail(email)) {
      Alert.alert("Invalid Email", "Please use a .edu email address to register.");
      return;
    }

    let urlRegister = apiUrl + registerRoute;
    const reqOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ firstName: fName, lastName: lName, username: email, password: password, role: "Guest" })
    };

    try {
      const response = await fetch(urlRegister, reqOptions);
      const data = await response.json();

      if (response.status !== 200) {
        Alert.alert("Failed to register", data.message);
      } else {
        let user = new User(email, fName, lName);
        navigation.navigate("Login");
        Alert.alert("Account Created!");
      }
    } catch (error) {
      Alert.alert("Registration Error", "An error occurred while trying to register. Please try again later.");
    }
  } else {
    Alert.alert("Error", "Fields cannot be blank");
  }
}

export { register };