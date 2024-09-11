import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useRoute, useIsFocused } from "@react-navigation/native";
import { TextInput } from "react-native-paper";
import { SelectList } from "react-native-dropdown-select-list";
import SafeArea from "../../SafeArea";
import {
  getAllCommunities,
  joinCommunity,
} from "../../../Controller/CommunitiesManager";
import App_StyleSheet from "../../../Styles/App_StyleSheet";

function JoinCommunityView({ navigation }) {
  const [communityId, setCommunityId] = useState("");
  const isFocused = useIsFocused();
  var route = useRoute();
  React.useEffect(() => {
    if (isFocused) {
      loadCommunities();
    }
  }, [isFocused]);
  const [communities, setCommunities] = useState([{ key: "0", value: "" }]);
  const loadCommunities = async () => {
    const data = await getAllCommunities();
    setCommunities(
      data.map((c) => {
        return { ["key"]: c.id, ["value"]: c.name };
      })
    );
  };

  return (
    <SafeArea>
      <SelectList
        data={communities}
        setSelected={setCommunityId}
        placeholder="View communities"
        boxStyles={App_StyleSheet.category_list}
        dropdownStyles={App_StyleSheet.category_list}
        defaultOption={{ key: "0", value: "" }}
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
