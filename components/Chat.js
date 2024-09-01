// Chat.js
// React imports
import { useEffect, useState } from "react";
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
// Imports from react native
import { StyleSheet, View, Platform, KeyboardAvoidingView } from "react-native";
import CustomActions from "./CustomActions";
import MapView from "react-native-maps";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
// Google Firebase
import {
  onSnapshot,
  query,
  orderBy,
  collection,
  addDoc,
} from "firebase/firestore";
// AsyncStorage
import AsyncStorage from "@react-native-async-storage/async-storage";

// Chat function
const Chat = ({ route, navigation, db, isConnected, storage }) => {
  const { userID } = route.params;
  const { name, backgroundColor } = route.params;
  const [messages, setMessages] = useState([]);
  // Function to handle sending new messages
  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0]);
  };

  // Determine font color based on background color for better contrast
  const fontColor =
    backgroundColor === "#090C08" ||
    backgroundColor === "#474056" ||
    backgroundColor === "#000"
      ? "#fff"
      : "#000";

  // Custom rendering of message bubbles
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#000",
          },
          left: {
            backgroundColor: "#FFF",
          },
        }}
      />
    );
  };

  // Prevent users from sending messages when offline
  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    else return null;
  };

  // useEffect hook to handle real-time messages and offline cache
  let unsubMessages;
  useEffect(() => {
    // Set navigation options including header title and style
    navigation.setOptions({
      title: name,
      headerStyle: {
        backgroundColor: "#fff",
      },
      headerTintColor: "#000",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    });
    // Check if user is connected to the internet
    if (isConnected === true) {
      if (unsubMessages) unsubMessages();
      unsubMessages = null;

      // Query to fetch messages from Firestore, ordered by creation time
      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));

      // Set up a real-time listener for message updates
      unsubMessages = onSnapshot(q, async (documentsSnapshot) => {
        // Initialize an empty array to store the new messages
        let newMessages = [];
        // Iterate through each document in the snapshot
        documentsSnapshot.forEach((doc) => {
          newMessages.push({
            id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis()),
          });
        });
        cacheMessages(newMessages);
        setMessages(newMessages);
      });
    } else loadCachedMessages();
    // Clean up listener on component unmount
    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, [isConnected]);
  // Load messages from AsyncStorage
  const loadCachedMessages = async () => {
    const cachedMessages = (await AsyncStorage.getItem("messages")) || [];
    setMessages(JSON.parse(cachedMessages));
  };
  // Cache messages to AsyncStorage
  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem("messages", JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  };
  // Render custom actions for sending images or locations
  const renderCustomActions = (props) => {
    return <CustomActions onSend={onSend} storage={storage} {...props} />;
  };
  // Render custom view for displaying location on a map
  const renderCustomView = (props) => {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  };

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <ActionSheetProvider>
        <GiftedChat
          messages={messages}
          renderBubble={renderBubble}
          renderActions={renderCustomActions}
          renderCustomView={renderCustomView}
          renderInputToolbar={renderInputToolbar}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: userID,
            name: name,
          }}
        />
      </ActionSheetProvider>
      {Platform.OS === "android" ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
    </View>
  );
};

// Styles for the Chat component
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;
