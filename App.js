// App.js
// Import StyleSheet
import { StyleSheet } from "react-native";
// Import the screens used in the app
import Start from "./components/Start";
import Chat from "./components/Chat";
// Import React Navigation components for navigating between screens
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Create a stack navigator
const Stack = createNativeStackNavigator();

// Import Firebase functions and configuration
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  disableNetwork,
  enableNetwork,
} from "firebase/firestore";
import { useEffect } from "react";
import { LogBox, Alert } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";
import { getStorage } from "firebase/storage";

const App = () => {
  // Firebase configuration object
  const firebaseConfig = {
    apiKey: "AIzaSyAGMOxHAxll1IYsAZfeQKIpPOViXgFvm54",
    authDomain: "react-native-chat-350a4.firebaseapp.com",
    projectId: "react-native-chat-350a4",
    storageBucket: "react-native-chat-350a4.appspot.com",
    messagingSenderId: "1097551404902",
    appId: "1:1097551404902:web:9b5883fae5bc0b3ce3f2a7",
  };

  // Initialize Firebase with the provided configuration
  const app = initializeApp(firebaseConfig);
  // Initialize Firestore and get a reference to the service
  const db = getFirestore(app);
  // Initialize Firebase Storage and get a reference to the service
  const storage = getStorage(app);
  // Use NetInfo to monitor network connectivity
  const connectionStatus = useNetInfo();
  // Effect hook to manage network connectivity and Firestore access
  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {(props) => (
            <Chat
              isConnected={connectionStatus.isConnected}
              db={db}
              storage={storage}
              {...props}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Define styles for the app
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
