import React from "react";
import { StyleSheet, SafeAreaView, FlatList,TextInput,View, Text, TouchableOpacity} from "react-native";
import { RNS3 } from 'react-native-aws3';

let doc = 
{
  // `uri` can also be a file system path (i.e. file://)
  uri: "C:/Users/John/Desktop/01%20-%20Introduction.pdf",
  type: "image/jpeg",
  name: "Introduction.pdf"
}

function UploadView({ navigation }, postContent) {
    return (
      <View>
        <View
          style={{
            paddingTop: 50,
            paddingBottom: 10,
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={styles.createPostButton}
            onPress={() => {
              console.log(doc.uri, doc.name, doc.type) 
             
            }}
          >
            <Text style={styles.text}>{"Attach File"}</Text>
          </TouchableOpacity> 
            <TouchableOpacity
            style={styles.createPostButton}
            onPress={() => navigation.navigate("Create Post")}
            >
                <Text style={styles.text}>{"Back"}</Text>
            </TouchableOpacity>

            <SafeAreaView style={styles.box}>
              <TextInput
                style={styles.input}
                placeholder="uri"
                onChangeText={(value) => (doc.uri = "C:/Users/John/Desktop/01%20-%20Introduction.pdf")}
                />
                <TextInput
                style={styles.input}
                placeholder="name"
                onChangeText={(value) => (doc.name = "Introduction.pdf")}
                />
                <TextInput
                  style={styles.input}
                  placeholder="doc-type (pdf)"
                  onChangeText={(value) => (doc.type = "pdf")}
                />
              </SafeAreaView>


        </View>
      </View>
    
    );

    /*
    function uploadFile()
    {
      
      const s3_config = {
        keyPrefix: "s3",
        bucket: "teachers-app-s3",
        region: "us-east-2",
        accessKey: "AKIASJ37ZCJHEDONTD7A",
        secretKey: "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",
        successActionStatus: 201
      }

      
      RNS3.put(doc, s3_config)
      .then( (response)=>
      {console.log(response)});
      
    }
    */
  }
  
  const styles = StyleSheet.create({
    createPostButton: {
      width: "100%",
      height: "10%",
      borderRadius: 30,
      marginTop: 10,
      backgroundColor: "#411c00",
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 0,
      },
      text: {
        color: "blue",
        fontSize: 30,
      },
      listings: {
        height: "90%",
      },
      input: {
        height: 40,
        margin: 5,
        borderWidth: 2,
        borderColor: "royalblue",
        backgroundColor: "white",
        padding: 10,
      },
      box:{
        margin:20,
        borderWidth: 2,
        borderRadius: 12,
        backgroundColor: "orange",
        width: "75%",
        height:160,
      },
    });
  
  export default UploadView;