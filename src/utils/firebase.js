// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKfdeNHl86fQoWq75UKQCZ7OOpLLfGgHk",
  authDomain: "netflixgpt-7c721.firebaseapp.com",
  projectId: "netflixgpt-7c721",
  storageBucket: "netflixgpt-7c721.appspot.com",
  messagingSenderId: "684304636895",
  appId: "1:684304636895:web:4521bc264ceac8d34cc26a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app)

export const auth = getAuth()