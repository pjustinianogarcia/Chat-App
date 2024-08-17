// Chat.js
import { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";
import { collection, addDoc, orderBy, onSnapshot, query} from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomActions from './CustomActions';
import MapView from 'react-native-maps';

const Chat = ({ storage, route, navigation}) => {
  const { db, userID, name, bgColor, isConnected } = route.params;
  const [messages, setMessages] = useState([]);
  


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

    const renderCustomActions = (props) => {
      return <CustomActions userID={userID} storage={storage} {...props} />;
    };

    const renderCustomView = (props) => {
      const { currentMessage } = props;
      if (currentMessage.location) {
        return (
          <MapView
            style={{
              width: 150,
              height: 100,
              borderRadius: 13,
              margin: 3
            }}
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
    }

 return (
  <View style={[styles.container, { backgroundColor: bgColor }]}>
         <GiftedChat
      messages={messages}
      renderBubble={renderBubble}
      renderInputToolbar={renderInputToolbar}
      onSend={messages => onSend(messages)}
      renderActions={renderCustomActions}
      renderCustomView={renderCustomView}
      user={{
        _id: userID,
        name: name
      }}
    />
   
   </View>
 );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
     
    }
  });
  
  export default Chat;