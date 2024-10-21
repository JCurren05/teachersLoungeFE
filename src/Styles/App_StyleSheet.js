import { StyleSheet } from "react-native";

const UI_Colors = {
  brown: "#411c00",
  cream: "#fff3d7",
  white: "#ffffff",
  light_cream: "#fff7e6",
};

const App_StyleSheet = StyleSheet.create({
  register_signIn_background: {
    height: "100%",
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
    backgroundColor: UI_Colors.cream,
  },
  steam_container: {
    backgroundColor: "transparent",
    flexDirection: "row",
  },
  logoStyle: {
    marginLeft: 20,
    resizeMode: "contain",
    height: "40%",
    width: "100%",
  },
  text: {
    color: UI_Colors.cream,
    fontSize: 20,
    fontWeight: "bold",
  },
  textBlock: {
    height: 40,
    margin: 5,
    marginTop: 5,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: UI_Colors.brown,
    backgroundColor: UI_Colors.cream,
  },
  postTextInput: {
    backgroundColor: UI_Colors.cream,
    fontSize: 16,
  },
  block: {
    height: "50%",
    width: "60%",
    backgroundColor: "transparent",
    justifyContent: "center",
    alignContent: "center",
  },
  listings: {
    height: "100%",
    backgroundColor: UI_Colors.cream,
    marginBottom: 1,
  },
  logout_section: {
    marginTop: "30%",
    fontSize: 24,
    height: 100,
    textAlign: "center",
  },
  moderation_view: {
    padding: 10,
  },
  post_listing_view: {
    marginTop: 10,
    marginBottom: 10,
  },
  // Used for category selection
  category_list: {
    marginRight: "1%",
    marginLeft: "1%",
    marginBottom: "1%",
  },
  // Used for communities page
  community_listing_view: {
    marginTop: 10,
    marginBottom: 10,
  },
  community_list_msg_state: {
    textAlign: "center",
    paddingTop: 200,
  },
  community_label: {
    marginTop: 10,
    marginBottom: 10,
    fontWeight: "bold",
    fontSize: 25,
    textAlign: "center",
    color: UI_Colors.brown,
  },
  //Currently used for register & signIn pages
  default_button: {
    width: "100%",
    height: "10%",
    borderRadius: 30,
    marginTop: 10,
    backgroundColor: UI_Colors.brown,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0,
  },
  small_button: {
    marginTop: 10,
    marginLeft: "5%",
    width: "40%",
    height: 40,
    borderRadius: 30,
    backgroundColor: UI_Colors.brown,
    borderWidth: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  medium_button: {
    marginTop: 10,
    marginLeft: "10%",
    marginRight: "10%",
    width: "80%",
    height: 40,
    borderRadius: 30,
    backgroundColor: UI_Colors.brown,
    borderWidth: 0,
    alignItems: "center",
    justifyContent: "center",
  },

  //Used in friends, message, and postlistings Views
  large_button: {
    width: "94%",
    height: 80,
    marginTop: 10,
    borderRadius: 40,
    backgroundColor: UI_Colors.brown,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0,
    marginBottom: 10,
    marginLeft: "3%",
    marginRight: "3%",
  },

  //Search Bar for Friends Search
  searchContainer: {
    flex: 1,
  },
  searchButtonContainer: {
    flex: 1,
  },
  searchBar: {
    height: 50,
    width: "97%",
    borderWidth: 2,
    borderRadius: 20,
    borderColor: UI_Colors.brown,
    flexDirection: "row",
    marginTop: 2,
    marginHorizontal: 5,
  },
  search: {
    height: "100%",
    width: "90%",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    fontSize: 20,
    padding: 10,
  },
  searchButton: {
    height: 40,
  },
  postlist_msg_state: {
    textAlign: "center",
    paddingTop: 200,
  },
  //Profile View page
  profile_padding: {
    paddingVertical: 30,
    paddingHorizontal: 30,
  },
  profile_avatarImage: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderRadius: 50,
    borderColor: "black",
  },
  profile_userNameStyle: {
    fontSize: 25,
    fontWeight: "bold",
    paddingTop: 30,
    paddingHorizontal: 30,
    color: UI_Colors.brown,
  },
  profile_button: {
    marginTop: 5,
    height: "15%",
    width: "50%",
    paddingHorizontal: 30,
    borderRadius: 20,
    backgroundColor: UI_Colors.brown,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  //Resource View
  resource_backGround: {
    backgroundColor: "#fef3d7",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  resource_cardTitle: {
    fontWeight: "bold",
    fontSize: 25,
    textAlign: "center",
    color: "#fef3d7",
  },
  resource_button: {
    width: "90%",
    height: "12.5%",
    borderRadius: 30,
    marginTop: 5,
    backgroundColor: "#411c00",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    borderWidth: 0,
  },
  resource_post: {
    width: "97%",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#411c00",
    margin: 3,
    borderRadius: 15,
    paddingBottom: 20,
    fontSize: 20,
  },
  //ModeratorView
  moderator_button: {
    marginTop: 5,
    width: "60%",
    paddingHorizontal: 30,
    borderRadius: 20,
    backgroundColor: "#411c00",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  moderator_userText: {
    marginTop: 3,
    color: "#411c00",
    fontSize: 25,
  },
  //FriendView
  friend_userNameStyle: {
    fontSize: 36,
    fontWeight: "bold",
    color: UI_Colors.brown,
  },
  friend_info_padding: {
    paddingVertical: 20,
  },
  friend_info_text: {
    fontSize: 22,
    fontWeight: "bold",
    paddingVertical: 3,
  },
  friends_list_header: {
    fontSize: 24,
    marginVertical: 10,
    color: UI_Colors.cream,
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  friends_list_block: {
    marginHorizontal: 10,
    marginVertical: 10,
    backgroundColor: UI_Colors.brown,
    borderRadius: 5,
    borderColor: UI_Colors.brown,
    borderWidth: 1,
  },
  // User listings
  user_listings_post: {
    width: "97%",
    justifyContent: "center",
    alignItems: "left",
    backgroundColor: UI_Colors.light_cream,
    marginBottom: 1,
    borderRadius: 1,
    borderWidth: 1,
    borderColor: UI_Colors.brown,
    paddingBottom: 20,
    marginVertical: 5,
    marginHorizontal: 5,
    borderRadius: 3,
  },
  user_listings_user: {
    color: "black",
    fontSize: 20,
  },
  user_listings_sub: {
    color: "black",
    fontSize: 10,
  },
  user_listings_info: {
    left: 5,
  },
  user_listings_header: {
    left: 10,
    top: 10,
    flexDirection: "row",
  },
  user_listings_profilePic: {
    height: 30,
    width: 30,
    borderRadius: 15,
  },
});

export default App_StyleSheet;
