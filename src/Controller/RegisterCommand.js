/*
import User from "../Model/User";
import { Alert } from "react-native";
import {apiUrl,registerRoute, PASSWORD_ENCRYPTER} from "@env";


//Called from the RegisterView, creates a new user
async function register({navigation}, fName, lName, email, password){
  if((fName!="")&&(lName!="")&&(email!="")&&(password!="")){
    let urlRegister = apiUrl+registerRoute;
    const reqOptions = {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'},
      body: JSON.stringify({firstName: fName, lastName: lName, username:email,password:password,role:"Guest"})
    };
    const response = await fetch(urlRegister, reqOptions);
    const data = await response.json();
    if(response.status !=200){
      Alert.alert("Failed to register: ",data.message);
    }else{
        let user = new User(email,fName,lName);
        navigation.navigate("Login");
        Alert.alert("Account Created!");
      
    }
  }else{
    Alert.alert("Error: ","Fields cannot be blank");
  }
}

export {register};*/
import User from "../Model/User";
import { Alert } from "react-native";
import { apiUrl, registerRoute } from "@env";  // Ensure you're importing from your .env

//Called from the RegisterView, creates a new user
async function register({navigation}, fName, lName, email, password) {
  // Validate that all fields are filled
  if (fName !== "" && lName !== "" && email !== "" && password !== "") {
    try {
      // Construct the full registration URL from .env variables
      let urlRegister = `${apiUrl}${registerRoute}`;

      const reqOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: fName,
          lastName: lName,
          username: email,
          password: password,  // Consider adding encryption if needed
          role: "Guest"
        })
      };

      // Make the fetch request
      const response = await fetch(urlRegister, reqOptions);
      const data = await response.json();

      // Handle the response
      if (!response.ok) {
        // Handle non-200 responses by displaying the server's error message
        Alert.alert("Failed to register", data.message);
      } else {
        // If successful, navigate to login and display success alert
        let user = new User(email, fName, lName);
        navigation.navigate("Login");
        Alert.alert("Account Created!");
      }
    } catch (error) {
      // Handle network or other errors gracefully
      Alert.alert("Error", "Something went wrong. Please try again.");
      console.error("Registration error:", error);
    }
  } else {
    // Alert if any fields are blank
    Alert.alert("Error", "Fields cannot be blank");
  }
}

export { register };
