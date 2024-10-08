import React from "react";
import { StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ResourcesView from "./ResourcesView";
import EducationalResourcesView from "./EducationalResourcesView";
import ERPreKAndElementaryView from "./ERPreKAndElementaryView";
import ERMiddleAndHighSchoolView from "./ERMiddleAndHighSchoolView";
import ERAdultLearningAndHigherView from "./ERAdultLearningAndHigherView";
import TeachersLoungeView from "./TeachersLoungeView";

const HomeStack = createStackNavigator();

function ResourcesNavigator({ navigation }) {
  const route = useRoute();
  return (
    <HomeStack.Navigator
      screenOptions={{
        activeBackgroundColor: "blue",
        activeTintColor: "white",
        inactiveBackgroundColor: "gray",
        inactiveTintColor: "black",
        headerStyle: {
          backgroundColor: "#411c00",
        },
        headerTintColor: "#fff3d7",
      }}
    >
      <HomeStack.Screen
        name="Resources"
        component={ResourcesView}
        initialParams={route.params}
        options={{
          headerLeft: () => null,
        }}
      />
      <HomeStack.Screen
        name="Educational Resources"
        component={EducationalResourcesView}
        initialParams={route.params}
      />
      <HomeStack.Screen
        name="Pre-K And Elementary"
        component={ERPreKAndElementaryView}
        initialParams={route.params}
      />
      <HomeStack.Screen
        name="Middle And High School"
        component={ERMiddleAndHighSchoolView}
        initialParams={route.params}
      />
      <HomeStack.Screen
        name="Adult Learning And Higher Education"
        component={ERAdultLearningAndHigherView}
        initialParams={route.params}
      />
      <HomeStack.Screen
        name="Teachers' Lounge"
        component={TeachersLoungeView}
        initialParams={route.params}
      />
    </HomeStack.Navigator>
  );
}

const styles = StyleSheet.create({});

export default ResourcesNavigator;
