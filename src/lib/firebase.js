// src/lib/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics"; // Optional

const firebaseConfig = {
  apiKey: "AIzaSyB2lu6Z9HUlKKvUIOMJttumS2kPv05qwug",
  authDomain: "to-do-app-7df7c.firebaseapp.com",
  projectId: "to-do-app-7df7c",
  storageBucket: "to-do-app-7df7c.firebasestorage.app",
  messagingSenderId: "337641229153",
  appId: "1:337641229153:web:dc53eb20d913598cc79320",
  measurementId: "G-M7LSQ4L9DV"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
// const analytics = getAnalytics(app); // Optional

// ✅ Export the required services
export { auth, db };
