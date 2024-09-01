// Start.js
// Imports from react native
import React, { useState } from "react";
// Imports from react native
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
// Google Firbase
import { getAuth, signInAnonymously } from "firebase/auth";

const Start = ({ navigation }) => {
  // State for storing the username input and selected background color
  const [name, setName] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF"); // Default background color
  // List of background colors for user selection
  const backgroundColorList = ["#090C08", "#474056", "#8A95A5", "#B9C6AE"];
  const auth = getAuth();

  // Function to handle anonymous sign-in and navigate to the Chat screen
  const signInUser = () => {
    signInAnonymously(auth)
      .then((result) => {
        navigation.navigate("Chat", {
          name: name,
          backgroundColor: backgroundColor,
          userID: result.user.uid,
        });
        Alert.alert("Signed in Successfully!");
      })
      .catch((error) => {
        Alert.alert("Unable to sign in, try later again.");
      });
  };

  return (
    <ImageBackground
      source={require("../img/bgimg.png")}
      style={[styles.container, { backgroundColor: backgroundColor }]}
    >
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>Chat App</Text>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.textInput}
            placeholder="Type your username here"
            placeholderTextColor="#757083"
            onChangeText={setName}
            value={name}
          />
        </View>
        <View>
          <Text style={styles.chooseColorText}>Choose a Background Color:</Text>
          <View style={styles.colorContainer}>
            {backgroundColorList.map((color, index) => (
              /*  added accessibility  */
              <TouchableOpacity
                accessible={true}
                accessibilityLabel="More options"
                accessibilityHint="Lets you choose to send an image or your geolocation."
                accessibilityRole="button"
                key={index}
                style={[
                  styles.colorOption,
                  {
                    backgroundColor: color,
                    borderWidth: backgroundColor === color ? 2 : 0,
                    borderColor: "#FFF",
                  },
                ]}
                onPress={() => setBackgroundColor(color)}
              />
            ))}
          </View>
        </View>

        <TouchableOpacity onPress={signInUser} style={styles.startButton}>
          <Text style={styles.startButtonText}>Go to Chat</Text>
        </TouchableOpacity>
      </View>

      {Platform.OS === "android" ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}

      {Platform.OS === "ios" ? (
        <KeyboardAvoidingView behavior="padding" />
      ) : null}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 45,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 300,
    marginTop: 20,
  },

  inputContainer: {
    width: "88%",
    backgroundColor: "#FFFFFF",
    padding: 20,
    height: "40%",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 40,
  },

  textInput: {
    width: "88%",
    padding: 15,
    borderWidth: 1,
    borderColor: "#757083",
    marginTop: 15,
    marginBottom: 15,
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    padding: 15,
    width: "88%",
    marginTop: 15,
    marginBottom: 15,
  },

  textInput: {
    flex: 1,
  },
  chooseColorText: {
    fontSize: 16,
    fontWeight: "300",
    color: "black",
    marginBottom: 15,
    opacity: 0.5,
  },
  colorContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  colorOption: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    marginLeft: 10,
  },
  startButton: {
    backgroundColor: "#757083",
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    width: "88%",
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    textAlign: "center",
  },
});

export default Start;
