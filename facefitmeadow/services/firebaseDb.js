//USER COLLECTION
//================================================================

import { query as createQuery, addDoc,limit, collection, doc, setDoc, getDocs, orderBy, query, where, getDoc, deleteDoc, updateDoc, Timestamp } from "firebase/firestore";
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

export const getUserScores = async (userId) => {
  try {
    // Fetch all scores for the user
    const allScoresQuery = query(
      collection(db, "scores"),
      where("userId", "==", userId),
      orderBy("date", "asc") // Order the scores in ascending order
    );

    const allScoresSnapshot = await getDocs(allScoresQuery);

    // Create a map to store scores by date
    const scoresByDate = new Map();

    allScoresSnapshot.forEach((doc) => {
      const scoreData = doc.data();
      const scoreDate = new Date(scoreData.date);

      // If a score already exists for this date, add the new score to the existing score
      if (scoresByDate.has(scoreDate.toDateString())) {
        scoresByDate.set(
          scoreDate.toDateString(),
          scoresByDate.get(scoreDate.toDateString()) + scoreData.score
        );
      } else {
        scoresByDate.set(scoreDate.toDateString(), scoreData.score);
      }
    });

    // Calculate the number of days since the user started playing
    const currentDate = new Date();
    const earliestDate = allScoresSnapshot.empty
      ? currentDate // If there are no scores, use the current date as the start date
      : new Date(allScoresSnapshot.docs[0].data().date);

    const daysSinceStart = Math.ceil((currentDate - earliestDate) / (1000 * 60 * 60 * 24));

    // Create an array to store the user's scores for each day, initializing all to 0
    let userScores = Array(daysSinceStart).fill(0);

    // Fill in the user's scores based on the map
    let currentDateCopy = new Date(earliestDate); // Create a copy to avoid modifying the original date
    for (let i = 0; i < daysSinceStart; i++) {
      const score = scoresByDate.get(currentDateCopy.toDateString());
      if (score !== undefined) {
        userScores[i] = score;
      }
      currentDateCopy.setDate(currentDateCopy.getDate() + 1);
    }

    // Return userScores here
    return userScores;
  } catch (error) {
    console.error("Error fetching user scores: " + error);
    return [];
  }
};

// Define a function to get the highscore of the user
export const getUserHighscore = async (userId) => {
  try {
    console.log("Fetching highest daily score for user: " + userId);

    // Fetch all scores for the user
    const allScoresQuery = query(
      collection(db, "scores"),
      where("userId", "==", userId),
      orderBy("date", "asc") // Order scores by date in ascending order
    );

    console.log("Querying all scores for the user");

    const querySnapshot = await getDocs(allScoresQuery);

    if (!querySnapshot.empty) {
      const scoresByDay = new Map();

      querySnapshot.forEach((doc) => {
        const scoreData = doc.data();
        const scoreDate = scoreData.date;

        if (!scoresByDay.has(scoreDate)) {
          // If the date is not in the map, add it with the score
          scoresByDay.set(scoreDate, scoreData.score);
        } else {
          // If the date is already in the map, add the score to the existing value
          scoresByDay.set(scoreDate, scoresByDay.get(scoreDate) + scoreData.score);
        }
      });

      console.log("Scores grouped by day:", scoresByDay);

      let highestDailyScore = 0;

      scoresByDay.forEach((score, date) => {
        if (score > highestDailyScore) {
          highestDailyScore = score;
        }
      });

      console.log("Highest daily score found: " + highestDailyScore);

      // Return the highest daily score
      return highestDailyScore;
    } else {
      console.log("No scores found for the user");
    }

    // Return 0 if there are no scores
    return 0;
  } catch (error) {
    console.error("Error fetching user highscore: " + error);
    return 0;
  }
};




// Define a function to calculate the current day streak
export const getCurrentDayStreak = async (userId) => {
  try {
    // Get the user's scores for today
    const todaysScores = await fetchTodaysScores(userId);

    console.log("Todays Scores:", todaysScores);

    if (todaysScores.length === 0) {
      // If there are no scores for today, the streak is broken
      console.log("No scores for today. Streak is broken.");
      return 0;
    }

    // Sort the scores by date in ascending order
    todaysScores.sort((a, b) => a.date - b.date);

    // Initialize the streak count and the expected date for the next score
    let streakCount = 0;
    let expectedDate = new Date(todaysScores[0].date);

    // Iterate through the scores for today
    for (const score of todaysScores) {
      const scoreDate = new Date(score.date);

      if (scoreDate.getTime() === expectedDate.getTime()) {
        // If the date matches the expected date, increment the streak count
        streakCount++;
      } else {
        // If there's a gap, consider the streak broken
        break;
      }

      // Update the expected date for the next score
      expectedDate.setDate(expectedDate.getDate() + 1);
    }

    return streakCount;
  } catch (error) {
    console.error("Error calculating current day streak: " + error);
    return 0;
  }
};
















  

 