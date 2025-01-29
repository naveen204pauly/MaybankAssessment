# React Native Google Place Autocomplete

## Introduction

This project is a React Native application that integrates Google Place Autocomplete to search for places and display them on a map. It uses **Redux Toolkit** for state management and **Redux Thunk** as middleware to handle asynchronous actions.

## Features

- Autocomplete search using Google Places API
- Displays search results on a map using React Native Maps
- Caches API responses from Google Places API for optimized performance
- Saves user search history in Redux store
- Implements Redux Thunk for handling API requests
- Follows best practices for scalable code structure

## Project demo

![Demo GIF](./ios_demo.gif)

## Technologies Used

- **React Native**
- **Redux Toolkit**
- **Redux Thunk** (Middleware)
- **Google Places API**
- **React Native Maps**
- **TypeScript**

## Installation

### Prerequisites

Ensure you have the following installed:

- Node.js (latest LTS version)
- React Native CLI / Expo CLI
- Android Studio (for Android development) / Xcode (for iOS development)

### Steps

1. Clone the repository:
   ```sh
   git clone https://github.com/naveen204pauly/MaybankAssessment.git
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Install the pod:
   ```sh
   cd ios && pod install
   ```
4. Add your Google API Key to `placeApi.ts` file:
   ```sh
   API_KEY=your_google_maps_api_key
   ```
5. To run android Add your API key to your manifest file (`android/app/src/main/AndroidManifest.xml`):
   ```sh
   <application>
   <!-- You will only need to add this meta-data tag, but make sure it's a child of application -->
   <meta-data
     android:name="com.google.android.geo.API_KEY"
     android:value="Your Google maps API Key Here"/>
   </application>
   ```
6. Run the application:
   ```sh
   npx react-native run-android  # For Android
   npx react-native run-ios      # For iOS
   ```

## Project Structure

```
📦 src
 ┣ 📂assets              # Assets for application
 ┣ 📂components          # Reusable UI components
 ┣ 📂constants           # Reusable UI components
 ┣ 📂screens             # Screens for the application
 ┣ 📂redux               # Redux store setup
 ┃ ┣ 📂features          # Redux slices
 ┃ ┣ hook.ts             # Custom hooks for Redux state management
 ┃ ┣ store.ts            # Redux store configuration
 ┣ 📂services            # API service calls
 ┣ 📂hooks               # hooks functions
 ┣ 📂utils               # Utility functions
 ┣ App.tsx               # Entry point
 ┗ index.ts              # Main file
```

## State Management

This project uses **Redux Toolkit** for state management. The following slices are included:

- **placesSlice.ts**: Handles place search results and search history.

## API Integration

Google Places API is used for autocomplete suggestions. API calls are handled using Redux Thunk.

## Best Practices Followed

- **Scalable folder structure**
- **ES6 and TypeScript** for better code maintainability
- **Redux Toolkit** for simplified state management
- **Environment variables** to store sensitive API keys
- **Debounce function** to optimize API requests
- **React Native best practices** for performance optimization

## License

This project is licensed under the MIT License.

---

Feel free to fork, improve, and contribute to the project!
