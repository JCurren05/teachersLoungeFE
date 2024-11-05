import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  Alert,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { useRoute, useIsFocused } from "@react-navigation/native";
import { TextInput } from "react-native-paper";
import SafeArea from "../../SafeArea";
import CreatePost from "../../../Controller/CreatePostCommand";
import { createCommunityPost } from "../../../Controller/CommunitiesManager";
import { getCategories } from "../../../Controller/CategoriesManager";
import UploadFileCommand from "../../../Controller/UploadFileCommand";
import { selectDoc } from "../../../Controller/DocumentPicker";
import App_StyleSheet from "../../../Styles/App_StyleSheet";

function CreatePostView({ navigation }) {
  const route = useRoute();
  const isFocused = useIsFocused();
  React.useEffect(() => {
    if (isFocused) {
      loadCategories();
    }
  }, [isFocused]);
  let [file, setFile] = useState("");
  const [fileName, setFileName] = useState("");
  const [postContent, setPostContent] = useState("");
  const [selected, setSelected] = useState("");
  const [categories, setCategories] = useState([{ key: "0", value: "" }]);
  const loadCategories = async () => {
    const data = await getCategories();
    setCategories(data);
    console.log(categories);
  };

  return (
    <SafeArea>
      <TextInput
        style={App_StyleSheet.postTextInput}
        placeholder={
          route.params?.Community === undefined
            ? "Write a post..."
            : `Write a post to ${route.params?.Community?.name}...`
        }
        onChangeText={(value) => setPostContent(value)}
        value={postContent}
        underlineColor="#808080"
        activeUnderlineColor="#808080"
        multiline
      />
      {file.url != "" && <Text>{file.url}</Text>}
      <SelectList
        data={categories}
        setSelected={setSelected}
        placeholder="Set category"
        boxStyles={App_StyleSheet.category_list}
        dropdownStyles={App_StyleSheet.category_list}
        defaultOption={{ key: "9", value: "Other" }}
      />
      <View style={App_StyleSheet.listings}>
      <TextInput
            style={App_StyleSheet.textInput}  // Add styling for the input
            placeholder="Enter file URI here"
            value={fileName}
            onChangeText={(text) => setFileName(text)}  // use state to track input
          />
        {/* <TouchableOpacity
          style={App_StyleSheet.medium_button}
          onPress={async () => {
            let file = await selectDoc();
            setFile(file);
          }}
        >
          <TextInput
            style={App_StyleSheet.textInput}  // Add styling for the input
            placeholder="Type here"
            value={fileName}
            onChangeText={(text) => setFileName(text)}  // use state to track input
          />

        </TouchableOpacity> */}

        <TouchableOpacity
          style={App_StyleSheet.medium_button}
          onPress={() =>
            route.params?.Community === undefined
              ? CreatePost(
                { navigation },
                postContent,
                fileName,
                route.params.User,
                selected
              )
              : createCommunityPost(
                { navigation },
                postContent,
                fileName,
                route.params.User,
                selected,
                route.params?.Community?.id
              )
          }
        >
          <Text style={App_StyleSheet.text}>{"Submit"}</Text>
        </TouchableOpacity>
      </View>
    </SafeArea>
  );
}
export default CreatePostView;
