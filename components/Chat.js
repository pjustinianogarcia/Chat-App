// Chat.js
import { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import { collection, addDoc, orderBy, onSnapshot, query} from "firebase/firestore";

const Chat = ({ route, navigation}) => {
  const { db, userID, name, bgColor } = route.params;
  const [messages, setMessages] = useState([]);
  

  useEffect(() => {
    navigation.setOptions({ title: name });
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
    })
    return () => {
      if (unsubMessages) unsubMessages();
    }
   }, []);

   const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0])
  }

 return (
  <View style={[styles.container, { backgroundColor: bgColor }]}>
         <GiftedChat
      messages={messages}
      renderBubble={renderBubble}
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