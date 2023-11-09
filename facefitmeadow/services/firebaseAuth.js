import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { Alert } from "react-native";
import { useState } from "react";
import {createUserInDb} from "./firebaseDb";


//Register a user
export const registerNewUser = async (username, email, password) => {
  try {
    // Register the user using the provided email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update the user's display name
    await updateProfile(user, {
      displayName: username
    });

    await createUserInDb(username, email, user.uid);

    // Update the display name in the authentication profile
    updateAuthProfile(username);

    console.log("User registered successfully");
  } catch (error) {
    console.log("Something went wrong during registration: " + error);
  }
};



//TODO: Sign In functionality
export const signInUser = (email, password) =>{
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log("User: " + user.email)
        // Success Alert
        // Alert.alert("You're in!", "You have successfully logged in.",[
        //     {text: 'Thanks', onPress: () => {}}
        //   ])
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + ": " + errorMessage)

    });
};

//TODO: Sign Out functionality
export const signOutUser = () =>{
    signOut(auth)
    .then(() => {
        console.log("Logged Out successfully")
    }).catch((error) => {
        console.log(error.errorMessage)
    })
}

//Get current user
export const getCurrentUser = () => {
    return auth.currentUser;
}

const updateAuthProfile = (username) => {
  updateProfile(auth.currentUser, {
    displayName: username
  })
    .then(() => {
      console.log("Profile updated successfully");
    })
    .catch((error) => {
      console.log("An error occurred while updating the profile: " + error);
    });
};
