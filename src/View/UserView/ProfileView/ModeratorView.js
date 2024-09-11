import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, FlatList, View } from "react-native";
import { useRoute, useIsFocused } from "@react-navigation/native";
import SafeArea from "../../SafeArea";
import {getPendingUsers,approveUser,deleteUser} from "../../../Controller/UserManager.js"
import User from '../../../Model/User.js'
import App_StyleSheet from "../../../Styles/App_StyleSheet";


function ModeratorView({ navigation }) {
  const isFocused = useIsFocused();

  React.useEffect(()=>{
  if(isFocused){
    loadUsers();
  }
  },[isFocused])
  const [users,setUsers] = useState([]);
  const loadUsers = async () => {
    const data = await getPendingUsers();
    setUsers(data);
  }
  return (
    <SafeArea>  
    <View>
      {users &&
      (<FlatList
        style={App_StyleSheet.listings}
        data={users}
        extraData={users}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text >Email:{item.userUserName}</Text>
            <Text >Name:{item.userName}</Text>            
            <Text >School:{item.school}</Text>
            <TouchableOpacity 
              style = {App_StyleSheet.moderator_button}
              onPress={() => {
                approveUser(item.userUserName);
                loadUsers();
              }}>
              <Text style={App_StyleSheet.text}>{"Approve"}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style = {App_StyleSheet.moderator_button}
              onPress={() => {
                deleteUser(item.userUserName);
                loadUsers();
              }}>
              <Text style={App_StyleSheet.text}>{"Decline"}</Text>
            </TouchableOpacity>
          </View>
        )}      
      />)}
      </View>
    </SafeArea>
  );
  }

  
const styles = StyleSheet.create({
  card:{
    width:"100%",
    flexWrap: "wrap",
    alignItems: "left",    
    justifyContent: "center",
    backgroundColor: "#eddfbe",
    marginBottom: 1,
    borderRadius: 1,
    borderWidth: 2,
    borderColor: "#411c00",
    paddingBottom: 10,
  }  
  
  
});
export default ModeratorView;
