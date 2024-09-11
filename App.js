import React from "react";
import AuthNavigator from "./src/View/AuthNavigator";
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

export default function App() {
  return <AuthNavigator />;
}
