//USER COLLECTION
//================================================================

import {query as createQuery, addDoc, collection, doc, setDoc, getDocs, orderBy, query, where, getDoc, deleteDoc, updateDoc } from "firebase/firestore";

import { db } from "../firebase"
// import { uploadToStorage } from "./firebaseStorage";


//Create user in db
export const createUserInDb = async (username, email, userId) => {
  try {
    // Create a user object with the provided data
    const user = {
      username: username,
      email: email,
      userId: userId,
    };

    // Save the user object to the "users" collection in Firestore
    const userRef = doc(collection(db, "users"), userId);
    await setDoc(userRef, user);

    console.log("User created in the database successfully");
  } catch (error) {
    console.log("Something went wrong during user creation: " + error);
  }
};


//Score COLLECTION
//================================================================


export const addScoreToCollection = async (score) => {
  try {
    const docRef = await addDoc(collection(db, 'scores'), score);
    console.log('Added score successfully...' + docRef.id);
    return true;
  } catch (error) {
    console.log('Something went wrong: ' + error);
    return false;
  }
};















  

 