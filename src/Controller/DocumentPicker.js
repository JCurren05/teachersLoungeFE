import * as DocumentPicker from 'expo-document-picker';
import File from "../Model/File.js";
import * as SecureStore from 'expo-secure-store';
import { Alert } from "react-native";
import { apiUrl, fileUploadRoute } from "@env";

// Allows users to select a document and upload it to the server (now PostgreSQL-based)
async function selectDoc() {
  // URL for server file upload endpoint
  let urlUpload = `${apiUrl}${fileUploadRoute}`;
  
  try {
    const result = await DocumentPicker.getDocumentAsync({});
    
    if (result && result.assets && result.assets.length > 0) {
      console.log("-----------------")
      console.log(result);
      let uploadData = new FormData();
      
      // Append file details for the upload
      uploadData.append('file', {
        uri: result.assets[0].uri,
        type: result.assets[0].mimeType,
        name: result.assets[0].name,
      });

      console.log(uploadData);

      const response1 = await fetch('https://file.io', {
        method: 'POST',
        body: uploadData,
      });

      const data = await response1.json();
      if (data.success) {
        console.log("File uploaded successfully. Access it here:", data.link);
        const response = await fetch(urlUpload, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${await SecureStore.getItemAsync("token")}`
          },
          body: result,
        });
      } else {
        console.error("File upload failed:", data);
      }

      if (response.status === 200) { 
        const responseUpload = await response.json();
        
        // Assuming the backend now returns `filePath` for the PostgreSQL-stored file
        const filePath = responseUpload.filePath;

        return new File(filePath, result.assets[0].name, result.assets[0].mimeType);
      } else {
        console.log("Failed to upload file, verify server connection...");
        Alert.alert('File Upload Failed');
        return new File("", "", "");
      }
    } else {
      return new File("", "", "");
    }
  } catch (error) {
    console.error("Error during file selection/upload:", error);
    Alert.alert("Error", "An error occurred while uploading the file");
    return new File("", "", "");
  }
}

export { selectDoc };