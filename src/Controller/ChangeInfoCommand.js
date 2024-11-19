import { apiUrl, updateUserInfoRoute } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProfileNavigator from "../View/UserView/ProfileView/ProfileNavigator";

class ChangeInfoCommand {
  user;

  constructor(user) {
    this.user = user;
  }

  async ChangeInfo({ navigation }, content) {
    const endpoint = apiUrl + updateUserInfoRoute;
    const email = this.user?.email; // Current email of the user

    if (!email) {
      console.error("Email is undefined for user:", this.user);
      alert("User email is not defined. Please try again.");
      return;
    }

    const updateData = {};

    if (ProfileNavigator.lastClick === "Edit Name") {
      const [firstname, lastname] = content.split(" "); // Assuming name is split into first and last
      updateData.firstname = firstname || this.user.firstname;
      updateData.lastname = lastname || this.user.lastname;
    } else if (ProfileNavigator.lastClick === "Edit Username") {
      if (!content.endsWith(".edu")) {
        alert("Email must end in .edu");
        return;
      }
      updateData.newEmail = content;
    } else if (ProfileNavigator.lastClick === "Edit School") {
      updateData.schoolName = content.trim() // Add the school name to updateData
    }

    console.log("Payload being sent to backend:", {
      email: email,
      ...updateData,
    });

    try {
      const response = await fetch(endpoint, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email, // Current email
          ...updateData,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Clear token and user data to log the user out
        await AsyncStorage.removeItem("userToken");
        alert("Information updated successfully! You will now be logged out.");
        
        // Navigate to the login screen
        navigation.navigate("Login");
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error updating user info:", error);
      alert("An error occurred. Please try again.");
    }
  }
}

export default ChangeInfoCommand;
