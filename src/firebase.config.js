import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKvkYhWG61EJF-zyBznThpGhqYW3cMDqw",
  authDomain: "react-big-shop.firebaseapp.com",
  projectId: "react-big-shop",
  storageBucket: "react-big-shop.appspot.com",
  messagingSenderId: "265631966964",
  appId: "1:265631966964:web:3b3f2c8948b15ed282a0a1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore()