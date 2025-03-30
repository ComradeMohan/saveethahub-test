// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDM-EVFmMyWfbCb0QcT4N2cwTZ-aP0rXks",
  authDomain: "saveethahub.firebaseapp.com",
  projectId: "saveethahub",
  storageBucket: "saveethahub.firebasestorage.app",
  messagingSenderId: "750163172041",
  appId: "1:750163172041:web:1328c0c6d315d4ac7fcb18",
  measurementId: "G-THE06YGDJS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };