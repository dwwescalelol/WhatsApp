import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import LoginNavigator from "./src/navigation/LoginNavigator";


export default function App() {
  return (
    <View style={styles.container}>
      <LoginNavigator/>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "whitesmoke",
    justifyContent: "center",
  },
});
