// CustomActions.js
// Imports from react native
import { TouchableOpacity, View, Text, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { useActionSheet } from "@expo/react-native-action-sheet";
// Google Firbase
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Custome actions function
const CustomActions = ({
  wrapperStyle,
  iconTextStyle,
  onSend,
  storage,
  userID,
}) => {
  const { showActionSheetWithOptions } = useActionSheet();

  // Function to display action sheet with options for selecting media or location
  const onActionPress = () => {
    const options = [
      "Choose From Library",
      "Take Picture",
      "Send Location",
      "Cancel",
    ];

    const cancelButtonIndex = options.length - 1;
    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            pickImage();
            return;
          case 1:
            takePhoto();
            return;
          case 2:
            getLocation();
          default:
        }
      }
    );
  };

  // Function to generate a unique reference name for the image
  const generateReference = (uri) => {
    const timeStamp = new Date().getTime();
    const imageName = uri.split("/").pop();
    return `${userID}-${timeStamp}-${imageName}`;
  };

  // Function to upload the image to Firebase and send its URL
  const uploadAndSendImage = async (imageURI) => {
    try {
      const uniqueRefString = generateReference(imageURI);
      const newUploadRef = ref(storage, uniqueRefString);
      const response = await fetch(imageURI);

      if (!response.ok) {
        throw new Error("Failed to fetch the image from the URI.");
      }
      const blob = await response.blob();
      await uploadBytes(newUploadRef, blob);
      const imageURL = await getDownloadURL(newUploadRef);
      onSend({ image: imageURL });
    } catch (error) {
      console.error("Error uploading and sending image:", error.message);
      Alert.alert("Error uploading image:", error.message);
    }
  };

  // Function to pick an image from the library
  const pickImage = async () => {
    let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissions?.granted) {
      let result = await ImagePicker.launchImageLibraryAsync();
      if (!result.canceled) await uploadAndSendImage(result.assets[0].uri);
      else Alert.alert("Permissions haven't been granted.");
    }
  };

  // Function to take a photo using the camera
  const takePhoto = async () => {
    let permissions = await ImagePicker.requestCameraPermissionsAsync();
    if (permissions?.granted) {
      let result = await ImagePicker.launchCameraAsync();
      if (!result.canceled) await uploadAndSendImage(result.assets[0].uri);
      else Alert.alert("Permissions haven't been granted.");
    }
  };

  // Function to get the current location and send it
  const getLocation = async () => {
    let permissions = await Location.requestForegroundPermissionsAsync();
    if (permissions?.granted) {
      const location = await Location.getCurrentPositionAsync({});
      if (location) {
        onSend({
          location: {
            longitude: location.coords.longitude,
            latitude: location.coords.latitude,
          },
        });
      } else Alert.alert("Error occurred while fetching location");
    } else Alert.alert("Permissions haven't been granted.");
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onActionPress}>
      <View style={[styles.wrapper, wrapperStyle]}>
        <Text style={[styles.iconText, iconTextStyle]}>+</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: "#b2b2b2",
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    color: "#b2b2b2",
    fontWeight: "bold",
    fontSize: 16,
    backgroundColor: "transparent",
    textAlign: "center",
  },
});

export default CustomActions;
