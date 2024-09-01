# Chat-App
 
# With React Native 

## Objective
The goal of this project is to build a chat application for mobile devices using React Native. The app will provide users with a chat interface and options to share images and their location.

## Features and Requirements

### User Stories
- **Enter Chat Room:** As a new user, I want to easily enter a chat room so I can quickly start talking to my friends and family.
- **Send Messages:** As a user, I want to be able to send messages to my friends and family members to exchange the latest news.
- **Send Images:** As a user, I want to send images to my friends to show them what I’m currently doing.
- **Share Location:** As a user, I want to share my location with my friends to show them where I am.
- **Offline Reading:** As a user, I want to be able to read my messages offline so I can reread conversations at any time.
- **Accessibility:** As a user with a visual impairment, I want to use a chat app that is compatible with a screen reader so that I can engage with a chat interface.

### Key Features
- **Customizable Start Screen:** A page where users can enter their name and choose a background color for the chat screen before joining the chat.
- **Chat Screen:** A page displaying the conversation, along with an input field and a submit button.
- **Image and Location Sharing:** The chat allows users to send images and location data.
- **Offline Storage:** Data is stored both online and offline, ensuring accessibility without an internet connection.

## Technical Requirements
- **React Native:** The app is developed using React Native.
- **Expo:** The app is built using the Expo framework.
- **Screen Design:** The app is styled according to a specified screen design.
- **Google Firestore:** Chat conversations are stored in the Google Firestore Database.
- **Firebase Authentication:** The app uses Google Firebase authentication to authenticate users anonymously.
- **Local Storage:** Chat conversations are stored locally for offline access.
- **Image Sharing:** Users can pick and send images from their device's image library or take pictures using the device’s camera.
- **Firebase Cloud Storage:** Images are stored in Firebase Cloud Storage.
- **Location Data:** The app can read and send the user’s location data, which is displayed in a map view.
- **Gifted Chat Library:** The chat interface and functionality are built using the Gifted Chat library.
- **Code Documentation:** The app’s codebase includes comments for clarity and maintenance.


## Installation


### Clone the Repository

```bash
git clone https://github.com/yourusername/chatapp.git
cd chatapp
```

### Install Dependencies

```bash
npm install
```

### Setting Up an Android Emulator

1. **Install and Set Up Android Studio:**
   - Download and install Android Studio from the [official website](https://developer.android.com/studio).
   - Click on **Create Virtual Device** and choose a device model (e.g., Pixel 4).
   - Finish the setup by following the on-screen instructions and start the emulator.

2. **Run the App on the Emulator:**
   - In the project directory, run `npm start` and press `a` to open the app in the Android emulator.


## Firebase Configuration

To use Firebase for authentication, Firestore for data storage, and Firebase Storage for media uploads, you need to configure Firebase in your project.

1. Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
2. Add a new web app to your Firebase project.
3. Copy your Firebase configuration and paste it into the `App.js` file where the Firebase is initialized:

   ```javascript
   const firebaseConfig = {
     apiKey: 'YOUR_API_KEY',
     authDomain: 'YOUR_AUTH_DOMAIN',
     projectId: 'YOUR_PROJECT_ID',
     storageBucket: 'YOUR_STORAGE_BUCKET',
     messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
     appId: 'YOUR_APP_ID',
   };
   ```

4. Enable Firestore and Firebase Storage in the Firebase Console.

## Running the App

After setting up Firebase and installing dependencies, you can start the app using Expo:

```bash
npm start
```

This will open Expo Developer Tools in your browser. You can then run the app on an emulator or your physical device using the Expo Go app.

## Project Structure

```
├── components
│   ├── Start.js           # Start screen component
│   ├── Chat.js            # Chat screen component
│   ├── CustomActions.js   # Custom actions for media and location sharing
├── App.js                 # Main application entry point
├── README.md              # Project documentation
├── package.json           # Project metadata and dependencies
└── ...
```

## Components

### Start Screen

The `Start` component is the landing page where users can enter their name and select a background color for the chat screen.

### Chat Screen

The `Chat` component handles the core messaging functionality, including sending and receiving messages, displaying media, and handling location data. It uses the `GiftedChat` library for an enhanced chat UI.
