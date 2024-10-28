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
      let uploadData = new FormData();
      
      // Append file details for the upload
      uploadData.append('file', {
        uri: result.assets[0].uri,
        type: result.assets[0].mimeType,
        name: result.assets[0].name,
      });

      const response = await fetch(urlUpload, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${await SecureStore.getItemAsync("token")}`
        },
        body: uploadData,
      });

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