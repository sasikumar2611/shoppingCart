// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyA80zxYB3KABh87S7g2hXosv6ewKx0s35Y",
  authDomain: "shopycart-b85ca.firebaseapp.com",
  projectId: "shopycart-b85ca",
  storageBucket: "shopycart-b85ca.firebasestorage.app",
  messagingSenderId: "649686012348",
  appId: "1:649686012348:web:225f4ea960cac1ae3a1bb9",
  measurementId: "G-R3VL34F43F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
