// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAYtfBuwAGJ4OWCkDNVtgWuwX3uDhcSq8",
  authDomain: "book-library-44e7c.firebaseapp.com",
  projectId: "book-library-44e7c",
  storageBucket: "book-library-44e7c.firebasestorage.app",
  messagingSenderId: "1017624913019",
  appId: "1:1017624913019:web:25cfd4e56bf8647584aede",
  measurementId: "G-6GS0809NYC"
};

//keeping track of whether the user is logged in or not
const userStateListener = (callback) => {
  getAuth(auth, (user) => {
    callback(user); // You can pass the user object or null
  });
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Authentication
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { auth, userStateListener, analytics };