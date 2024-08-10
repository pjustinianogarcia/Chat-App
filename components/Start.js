// Start.js
import { useState } from 'react';
import { ImageBackground, StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';

const Start = ({ navigation }) => {
  const [name, setName] = useState('');
  const [bgColor, setBgColor] = useState('');

  const colors = ['#090C08', '#474056', '#8A95A5', '#B9C6AE'];

  const image = require('../img/bgimg.png');

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <Text style={styles.title}>Chat App</Text>
      <View style={styles.formContainer}>
      <TextInput
        style={styles.textInput}
        value={name}
        onChangeText={setName}
        placeholder="Type your username here"
        placeholderTextColor="#757083"
      />
      <Text style={styles.subtitle}>Choose Background Color:</Text>
      <View style={styles.colorContainer}>
        {colors.map((color) => (
          <TouchableOpacity
            key={color}
            style={[styles.colorCircle, { backgroundColor: color }]}
            onPress={() => setBgColor(color)}
          />
        ))}
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Chat', { name: name, bgColor: bgColor })}
      >
        <Text style={styles.buttonText}>Go to Chat</Text>
      </TouchableOpacity>
      </View>
     </ImageBackground>

    </View>
 
  );
};

const styles = StyleSheet.create({


  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  
  },

  title: {
    fontSize: 45,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 300, // Spacing between title and other elements
    marginTop: 20,
  },

  formContainer: {
    width: '88%',
    backgroundColor: '#FFFFFF', // White background
    padding: 20,
    alignItems: 'center',
    marginTop: 20,
  },

  textInput: {
    width: '88%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#757083', // Border color to match the text color
    marginTop: 15,
    marginBottom: 15,
    fontSize: 16,
    fontWeight: '300',
    color: '#757083', // Text color inside the input
  },

  subtitle: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    marginBottom: 15,
  },

  colorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
    marginBottom: 20,
    width: '88%',
  },
  colorCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  button: {
    backgroundColor: '#757083',
    padding: 15,
    borderRadius: 5,
    width: '88%', // Make button width consistent with input and color options
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default Start;

