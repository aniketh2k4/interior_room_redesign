// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-room-redesign-9d5b4.firebaseapp.com",
  projectId: "ai-room-redesign-9d5b4",
  storageBucket: "gs://ai-room-redesign-9d5b4.firebasestorage.app",
  messagingSenderId: "849267426375",
  appId: "1:849267426375:web:5b1c6a19975b091c179d62",
  measurementId: "G-CG32GK2M3N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app)
