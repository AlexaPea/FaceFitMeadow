//USER COLLECTION
//================================================================

import { query as createQuery, addDoc, collection, doc, setDoc, getDocs, orderBy, query, where, getDoc, deleteDoc, updateDoc, Timestamp } from "firebase/firestore";
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


// Score COLLECTION
export const addScoreToCollection = async (score) => {
  try {
    // Add the current date rounded to midnight to the score before saving it
    const scoreWithDate = {
      ...score,
      date: roundToMidnight(new Date()).toISOString(), // This adds the current date rounded to midnight in ISO 8601 format
    };

    const docRef = await addDoc(collection(db, "scores"), scoreWithDate);
    console.log("Added score successfully..." + docRef.id);
    return true;
  } catch (error) {
    console.log("Something went wrong: " + error);
    return false;
  }
};

// Define the roundToMidnight function
function roundToMidnight(date) {
  const roundedDate = new Date(date);
  roundedDate.setHours(0, 0, 0, 0);
  return roundedDate;
}

export const fetchTodaysScores = async (userId) => {
  try {
    // Get the start and end dates for today
    const currentDate = new Date();
    const startOfToday = roundToMidnight(new Date());
    const endOfToday = new Date(currentDate);
    endOfToday.setHours(23, 59, 59, 999);

    // Create a query to filter scores for the current day and the specific user
    const scoresQuery = query(
      collection(db, "scores"),
      where("date", ">=", startOfToday.toISOString()),
      where("date", "<=", endOfToday.toISOString()),
      where("userId", "==", userId) // Filter scores by user
    );

    // Execute the query
    const querySnapshot = await getDocs(scoresQuery);

    const todaysScores = [];
    querySnapshot.forEach((doc) => {
      todaysScores.push(doc.data());
    });

    console.log("Today's scores:", todaysScores);

    return todaysScores;
  } catch (error) {
    console.error("Error fetching today's scores: " + error);
    return [];
  }
};












  

 