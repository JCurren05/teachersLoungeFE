import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRoute, useIsFocused } from "@react-navigation/native";
import { SelectList } from "react-native-dropdown-select-list";
import SafeArea from "../../SafeArea";
import { getAllCommunities, joinCommunity } from "../../../Controller/CommunitiesManager";
import App_StyleSheet from "../../../Styles/App_StyleSheet";

function JoinCommunityView({ navigation }) {
  const [communityId, setCommunityId] = useState("");
  const [communities, setCommunities] = useState([{ key: "0", value: "Select a community" }]);
  const isFocused = useIsFocused();
  const route = useRoute();

  useEffect(() => {
    if (isFocused) {
      loadCommunities();
    }
  }, [isFocused]);

  const loadCommunities = async () => {
    try {
      const data = await getAllCommunities();
      console.log(data);
      setCommunities(
        data.map((c) => ({
          key: c.id.toString(),  // Use `id` from community object
          value: c.name          // Use `name` from community object
        }))
      );
    } catch (error) {
      console.error("Error loading communities:", error);
    }
  };

  return (
    <SafeArea>
      <SelectList
        data={communities}
        setSelected={setCommunityId}
        placeholder="View communities"
        boxStyles={App_StyleSheet.category_list}
        dropdownStyles={App_StyleSheet.category_list}
        defaultOption={'View communities'}  // Default option with placeholder
      />
      <View style={App_StyleSheet.listings}>
        <TouchableOpacity
          style={App_StyleSheet.medium_button}
          onPress={() =>
            joinCommunity(
              { navigation },
              communityId,
              route.params.User.userUserName
            )
          }
        >
          <Text style={App_StyleSheet.text}>{"Join"}</Text>
        </TouchableOpacity>
      </View>
    </SafeArea>
  );
}

export default JoinCommunityView;