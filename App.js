import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import SettingScreen from "./screens/SettingScreen";
import ChangePasswordScreen from "./screens/ChangePasswordScreen";
import ChangeNameScreen from "./screens/ChangeNameScreen";
import DailyReadScreen from "./screens/DailyReadScreen";
import HolyBibleScreen from "./screens/HolyBibleScreen";
import BibleVerseScreen from "./screens/BibleVerseScreen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Stack = createNativeStackNavigator();
// Create a client
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={LoginScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Home"
            component={HomeScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Register"
            component={RegisterScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Setting"
            component={SettingScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="ChangePassword"
            component={ChangePasswordScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="ChangeName"
            component={ChangeNameScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="DailyRead"
            component={DailyReadScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="HolyBible"
            component={HolyBibleScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="BibleVerse"
            component={BibleVerseScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
});
