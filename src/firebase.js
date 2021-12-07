// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore/lite';
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSepFfq0j06pNcNhIJkXjzye3VHBrdclU",
  authDomain: "challenge-5f414.firebaseapp.com",
  projectId: "challenge-5f414",
  storageBucket: "challenge-5f414.appspot.com",
  messagingSenderId: "356236727522",
  appId: "1:356236727522:web:6eaa91516fa8ce084bfabb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

export  { db, auth };