// Import Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";
import {
  getFirestore, collection, getDocs, addDoc, setDoc, doc, query, where, orderBy, serverTimestamp 
} from "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// 🔹 Your Firebase Configuration (Replace with actual values)
const firebaseConfig = {
  apiKey: "AIzaSyC_I05eW6R3He8Xj_ByGVi_xSsD5J-DAyw",
  authDomain: "saveethahub-cb3a9.firebaseapp.com",
  projectId: "saveethahub-cb3a9",
  storageBucket: "saveethahub-cb3a9.firebasestorage.app",
  messagingSenderId: "747596429747",
  appId: "1:747596429747:web:2f6edd084d4d2bb28933c6",
  measurementId: "G-DQ9G839TL4"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

// ✅ Initialize Firebase Messaging (with error handling)
let messaging;
try {
  messaging = getMessaging(app);
} catch (error) {
  console.error("Firebase Messaging not supported in this environment:", error);
}

// ✅ Function to Request Notification Permission & Store Token in Firestore
const requestNotificationPermission = async (userId) => {
  try {
    const permission = await Notification.requestPermission();
    console.log("Notification Permission:", permission);

    if (permission === "granted") {
      const token = await getToken(messaging, { vapidKey: "BGtV6Fv6gTgcTybr5q7yckKYeUyl5qDPTzCBoGXbd9hH5AftO3NgRyQt1mTPQIoD7hvpyciOHFepsJnqydyFxbA" });
      if (token) {
        console.log("FCM Token:", token);

        // 🔹 Save token to Firestore (so we can send notifications)
        if (userId) {
          await setDoc(doc(db, "user_tokens", userId), { fcmToken: token }, { merge: true });
        }
      } else {
        console.warn("No token received. Request permission.");
      }
    } else {
      console.warn("Notification permission denied.");
    }
  } catch (error) {
    console.error("Error getting FCM token:", error);
  }
};

// ✅ Handle Incoming Messages (Foreground)
if (messaging) {
  onMessage(messaging, (payload) => {
    console.log("Message received:", payload);
    
    // 🔹 Show a notification instead of alert (better UX)
    new Notification(payload.notification.title, {
      body: payload.notification.body,
      icon: "/logo.png",
    });
  });
}
const generateToken = async () => {
  
  const permission = await Notification.requestPermission();
  console.log("Notification Permission:", permission);
};

// ✅ Export Firebase Services
export { 
  auth, provider, signInWithPopup, createUserWithEmailAndPassword, db, 
  messaging, requestNotificationPermission, addDoc, collection, getDocs, 
  query, where, orderBy, serverTimestamp
};
