
//App.js
// import the screens
import Start from './components/Start';
import Chat from './components/Chat';

// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// imports from firestore/firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyAGMOxHAxll1IYsAZfeQKIpPOViXgFvm54",
    authDomain: "react-native-chat-350a4.firebaseapp.com",
    projectId: "react-native-chat-350a4",
    storageBucket: "react-native-chat-350a4.appspot.com",
    messagingSenderId: "1097551404902",
    appId: "1:1097551404902:web:9b5883fae5bc0b3ce3f2a7"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

   // Initialize Cloud Firestore and get a reference to the service
   const db = getFirestore(app);


  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
      >
        <Stack.Screen
          name="Start"
          component={Start}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
          initialParams={{ db }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
