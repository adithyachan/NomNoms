// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBiPgJU4iIuRvkFd4hMk045FQbot2vkUXc",
  authDomain: "nomnoms-0000.firebaseapp.com",
  projectId: "nomnoms-0000",
  storageBucket: "nomnoms-0000.appspot.com",
  messagingSenderId: "540374266661",
  appId: "1:540374266661:web:74da45f80e57a3eb1620cc",
  measurementId: "G-L87RM20545"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();