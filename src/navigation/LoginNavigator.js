import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainStackNavigator from "./MainStackNavigator";
import SignUpScreen from "../screens/SignUpScreen";
import LogInScreen from "../screens/LoginScreen";

const Stack = createNativeStackNavigator();

const LoginNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SignUp"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="LogIn" component={LogInScreen} />
        <Stack.Screen name="MainApp" component={MainStackNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default LoginNavigator;
