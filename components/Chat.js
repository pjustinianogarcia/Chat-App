// Chat.js
import { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";
import { collection, addDoc, orderBy, onSnapshot, query} from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Chat = ({ route, navigation}) => {
  const { db, userID, name, bgColor, isConnected } = route.params;
  const [messages, setMessages] = useState([]);
  
  // Function to cache messages
  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem('cached_messages', JSON.stringify(messagesToCache));
    } catch (error) {
      console.error("Failed to cache messages:", error);
    }
  };

  // Function to load cached messages
  const loadCachedMessages = async () => {
    try {
      const cachedMessages = await AsyncStorage.getItem('cached_messages');
      if (cachedMessages) {
        setMessages(JSON.parse(cachedMessages));
      }
    } catch (error) {
      console.error("Failed to load cached messages:", error);
    }
  };

  useEffect(() => {
    navigation.setOptions({ title: name });

    if (isConnected) {

    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    const unsubMessages = onSnapshot(q, (docs) => {
      let newMessages = [];
      docs.forEach(doc => {
        newMessages.push({
          id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis())
        })
      })
      setMessages(newMessages);
      cacheMessages(newMessages);
    })
    return () => {
      if (unsubMessages) unsubMessages();
    };
  } else {
    loadCachedMessages();
  }
   }, [isConnected]);

   const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0])
  }

    // Function to render the InputToolbar only if connected
    const renderInputToolbar = (props) => {
      if (isConnected) {
        return <InputToolbar {...props} />;
      } else {
        return null;
      }
    };

 return (
  <View style={[styles.container, { backgroundColor: bgColor }]}>
         <GiftedChat
      messages={messages}
      renderBubble={renderBubble}
      renderInputToolbar={renderInputToolbar}
      onSend={messages => onSend(messages)}
      user={{
        _id: userID,
        name: name
      }}
    />
   
   </View>
 );
}

const renderBubble = (props) => {
  return <Bubble
    {...props}
    wrapperStyle={{
      right: {
        backgroundColor: "#000"
      },
      left: {
        backgroundColor: "#FFF"
      }
    }}
  />
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
     
    }
  });
  
  export default Chat;