import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDbCedcNQrHIuMJ2Wm89i-kAsZgsP4EGKg",
  authDomain: "actual-c598a.firebaseapp.com",
  projectId: "actual-c598a",
  storageBucket: "actual-c598a.firebasestorage.app",
  messagingSenderId: "1070976607964",
  appId: "1:1070976607964:web:66ef92f83db318e6eaf619",
  measurementId: "G-NR9T5PERF0",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db = getFirestore(app);
// const provider = new GoogleAuthProvider();
export { app, auth };
