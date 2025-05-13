// firebase-config.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyACGJoKwWfVUMKxqgmhzcvNaubOiryvEjE",
  authDomain: "stores-map-27340.firebaseapp.com",
  projectId: "stores-map-27340",
  storageBucket: "stores-map-27340.firebasestorage.app",
  messagingSenderId: "308717289530",
  appId: "1:308717289530:web:8c33b9e00a3335eeb53503",
  measurementId: "G-JFWPRWS4MK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
