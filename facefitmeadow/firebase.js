// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDsnZoPUp9ZErXh_F_xwvuvuy8BxRnx4xQ",
  authDomain: "facefitmeadow.firebaseapp.com",
  projectId: "facefitmeadow",
  storageBucket: "facefitmeadow.appspot.com",
  messagingSenderId: "853921629933",
  appId: "1:853921629933:web:3a0d2384702d8ff59aaee4",
  measurementId: "G-B59TF09F97"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Authentication Functionality
export const auth = getAuth(app);
export const db = getFirestore(app);