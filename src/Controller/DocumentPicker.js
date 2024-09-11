
import * as DocumentPicker from 'expo-document-picker';
import File from "../Model/File.js";
import * as SecureStore from 'expo-secure-store';
import { Alert } from "react-native";
import {apiUrl,fileUploadRoute} from "@env";

//Allows users to select a document then upload to s3 

async function selectDoc() {
  //URL for server 
  let urlUpload = apiUrl+fileUploadRoute;
  var result = await DocumentPicker.getDocumentAsync({});
  if(result){
    let uploadData = new FormData();
    uploadData.append('file', {
      uri: result.assets[0].uri,
      type: result.assets[0].mimeType,
      name: result.assets[0].name
    });
    const responseOfFileUpload = await fetch(urlUpload, {
      method: 'POST',
      headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': "Bearer "+ await SecureStore.getItemAsync("token")
      },
      body: uploadData,
    });
    let bucket = "";
    let fileUrl = "";
    if (responseOfFileUpload.status == 200) { 
      let responseUpload = await responseOfFileUpload.json();
      bucket = responseUpload.bucket;
      fileUrl = responseUpload.file;
    }else{
      console.log("Unable to connect to server when uploading file, check that the url is correct and the the server is running...");
      Alert.alert('Failed to upload file')
    }     
    //This url assumes us-east-2......
    let publicFileUrl = "https://"+bucket+".s3.us-east-2.amazonaws.com/"+fileUrl;    
    return new File(publicFileUrl,publicFileUrl,result.mimeType);
  }else
    return new File("","","");
}




export {selectDoc};