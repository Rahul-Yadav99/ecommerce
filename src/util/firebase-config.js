// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCjL032ojcy1u6YFvZcNcPZPoZcOFgb3U4',
  authDomain: "ecom-f3bcb.firebaseapp.com",
  projectId: "ecom-f3bcb",
  storageBucket: "ecom-f3bcb.firebasestorage.app",
  messagingSenderId: "643716415317",
  appId: "1:643716415317:web:39ed261fdd8852f7eeb9dc",
  measurementId: "G-KXX1XWD6GC"
};

// Initialize Firebase
const firebaseAppConfig = initializeApp(firebaseConfig);
export default firebaseAppConfig