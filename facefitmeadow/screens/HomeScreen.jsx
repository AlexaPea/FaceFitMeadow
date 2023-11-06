import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Image, ScrollView } from 'react-native';
import * as Font from 'expo-font';
import { signOutUser } from '../services/firebaseAuth';
import { getCurrentUser } from '../services/firebaseAuth';
import { fetchTodaysScores } from '../services/firebaseDb';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect


const HomeScreen = ({ navigation }) => {
  const [todaysScores, setTodaysScores] = useState([]); // State to store today's scores
  const [totalScore, setTotalScore] = useState([]); // State to store today's scores
  const [fontLoaded, setFontLoaded] = useState(false);
  const user = getCurrentUser();
  const [imagePath, setImagePath] = useState(null);
  const [feelingText, setFeelingText] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const loadFonts = async () => {
    await Font.loadAsync({
      'FuzzyBubbles-Regular': require('../assets/fonts/FuzzyBubbles-Regular.ttf'),
      'FuzzyBubbles-Bold': require('../assets/fonts/FuzzyBubbles-Bold.ttf'),
    });
    setFontLoaded(true);
  };



  const [displayName, setDisplayName] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = getCurrentUser();
      console.log("Curent User: " + JSON.stringify(currentUser));
      if (currentUser) {
        setDisplayName(currentUser.displayName);
        console.log(displayName);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    loadFonts();
  }, []);


  // Use useFocusEffect to fetch today's scores when the component is focused
  useFocusEffect(
    React.useCallback(() => {
      fetchTodaysScores(user.uid) // Pass the user's ID to fetch their scores
        .then((scores) => {
          // Set the retrieved scores to the state
          setTodaysScores(scores);
          console.log(scores);
          // Calculate the total score
          const totalScore = scores.reduce((total, score) => total + score.score, 0);

          let imagePath = '';
          if (totalScore === 0) {
            imagePath = require('../assets/SpotIsland/0.png');
            setFeelingText('SAD');
          } else if (totalScore >= 1 && totalScore <= 3) {
            imagePath = require('../assets/SpotIsland/1.png');
            setFeelingText('ANNOYED');
          } else if (totalScore >= 4 && totalScore <= 6) {
            imagePath = require('../assets/SpotIsland/2.png');
            setFeelingText('OKAY');
          } else if (totalScore >= 7 && totalScore <= 9) {
            imagePath = require('../assets/SpotIsland/3.png');
            setFeelingText('HAPPY');
          } else {
            imagePath = require('../assets/SpotIsland/4.png');
            setFeelingText('LOVED');
          }

          setImagePath(imagePath);
          setTotalScore(totalScore);
          // Use setTimeout to hide the loader after 3 seconds
          setTimeout(() => {
            setIsLoading(false);
          }, 2000); 
        })
        .catch((error) => {
          console.error("Error fetching today's scores: " + error);
          setIsLoading(false);
        });
    }, [])
  );

  return (
    <>
      {isLoading && ( // Show loader while isLoading is true
        <View style={styles.loaderContainer}>
          <Image source={require('../assets/Loader1.gif')} style={styles.loader} />
        </View>
      )}
    <ScrollView contentContainerStyle={styles.scrollContainer}>

      <ImageBackground
        source={require('../assets/backgrounds/Home.png')}
        style={styles.backgroundImage}
      >

        

        {fontLoaded ? (
          <>
            <Text style={styles.heading2}>Hello,</Text>
            <Text style={styles.heading1}>{displayName ? displayName : 'Newbie'}!</Text>
            <Text style={styles.body}>Spot has missed you!</Text>


            <TouchableOpacity style={styles.logoutButton} onPress={signOutUser}>
              <Image source={require('../assets/icons/logout-icon.png')} style={styles.logoutIcon} />
            </TouchableOpacity>


            <View style={styles.spotIsland}>
              <Image source={imagePath} style={styles.spot} />
            </View>

            <View style={styles.feelingContainer}>
                <Text style={styles.feelingText}>Spot is feeling:</Text>
                <Text style={styles.feeling}>{feelingText}</Text>
            </View>


            <View style={styles.smallContainer}>
                <ImageBackground
                    source={require('../assets/Container/Small.png')}
                    style={styles.smallContainerBackground}
                >
                    <Text style={styles.subHeading}>Todays Mission:</Text>
                    <Text style={styles.text}>Help Spot leap over 10 obstacles to bring a big smile to his face!</Text>
                    <View style={styles.scoreContainer}>
                    <Text style={styles.score}>{totalScore}</Text>
                    <Text style={styles.scoreOutOf}>/10</Text>
                    </View>
                </ImageBackground>
                </View>


                <View style={styles.mediumContainer}>
                <ImageBackground
                    source={require('../assets/Container/Medium.png')}
                    style={styles.mediumContainerBackground}
                >
                    <Text style={styles.subHeading2}>It’s Playtime!</Text>
                    <Text style={styles.text2}>Time for some fun and bonding with your virtual pet! Playtime is the key to keeping your pet happy and healthy. </Text>
                    <TouchableOpacity style={styles.button} 
                     onPress={() => navigation.navigate('InstructionScreen')} >
                    <ImageBackground source={require('../assets/button.png')} style={styles.btnBackground}>
                        <Text style={styles.btnText}>Let's Play!</Text>
                    </ImageBackground>
                    </TouchableOpacity>
                </ImageBackground>
                </View>

          </>
        ) : null}
      </ImageBackground>
    </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    height: 1400
  },
  loaderContainer: {
    position: 'absolute',
    zIndex: 999, // Ensure the loader is on top of other UI components
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent white background
    width: '100%', // Take the full width of the screen
    height: '100%', // Take the full height of the screen
  },
  loader:{
    position: 'absolute',
    width: '100%', // Set the width to take the full screen width
    height: '100%', // Set the height to take the full screen height
  },
  backgroundImage: {
    flex: 1,
    // resizeMode: '',
    paddingTop: 0,
    paddingHorizontal: 30,
  },
  heading1: {
    fontFamily: 'FuzzyBubbles-Bold',
    fontSize: 42,
    color: '#3E5F2A',
    width: 350,
    paddingTop: 0,
    paddingLeft: 20,
    lineHeight: 50,
    textShadowColor: '#3E5F2A',  // Color of the outline
    textShadowOffset: { width: 2, height: 2 }, // Outline size and direction
  
  },
  heading2: {
    fontFamily: 'FuzzyBubbles-Regular',
    fontSize: 28,
    color: '#3E5F2A',
    width: 350,
    paddingTop: 65,
    paddingLeft: 20,
    lineHeight: 50,
  },
  button: {
    width: 153,
    height: 61,
    flex: 1,
    paddingTop: 20,
    justifyContent: 'center', // Center the content horizontally
    alignItems: 'center', // Center the content vertically
    marginLeft: 150,
    marginTop: -25
  },
  buttonSecondary: {
    width: 307,
    color: "#3E5F2A",
    height: 69,
    borderRadius: 20,
    flex: 1,
    marginTop:-10,
    paddingLeft:110,
    alignItems: 'center',
  },
  btnBackground:{
    resizeMode: 'cover', 
    width: 153,
    height: 61,
    borderRadius: 20,
    padding:5,
    alignItems: 'center',
  },
  btnText:{
    fontFamily: 'FuzzyBubbles-Regular', 
    fontSize: 18,
    color: 'white',
    width: 350,
    textAlign: 'center',
    alignItems: 'center',
    paddingTop:8,
  },
  body: {
    color: '#3E5F2A',
    width: 350,
    paddingLeft: 20,
    paddingTop: 5,
    paddingBottom: 40,
    // fontFamily: 'Open Sans'
  },
  logoutButton: {
    position: 'absolute',
    marginTop: 70,
    marginLeft: 340,
  },
  logoutIcon: {
    height: 40,
    width: 40,
  },
  compText:{
    fontFamily: 'FuzzyBubbles-Regular',
    fontSize: 32,
    color: '#3E5F2A',
    paddingTop: 10,
    // lineHeight: 50,
  },
  paragraph: {
    fontSize: 28,
    color: '#3E5F2A',
    paddingTop: 15,
    paddingLeft: 40,
    fontFamily: 'FuzzyBubbles-Regular',
  },
  iconContainer:{
    position:'absolute',
    marginTop: 20,
    right:20

  },
  spot:{
    width: 360,
    height: 479
  },
  spotIsland:{
    marginTop:-100
  },
  feelingContainer:{
    alignItems:'center',
    justifyContent:'center'
  },
  feelingText:{
    fontSize: 16,
    color: '#3E5F2A',
    fontWeight: '800',
    alignItems:'center',
    marginTop: -30
  },
  feeling:{
    fontSize: 64,
    fontFamily: 'FuzzyBubbles-Bold',
    color: '#3E5F2A', 
    alignItems:'center',
    marginBottom: 70
  },
  subHeading:{
    fontSize: 26,
    fontFamily: 'FuzzyBubbles-Bold',
    color: '#3E5F2A', 
    alignItems:'center',
    textAlign: 'center',
    paddingTop: 60,
    marginLeft: 35
  },
  subHeading2:{
    fontSize: 26,
    fontFamily: 'FuzzyBubbles-Bold',
    color: '#3E5F2A', 
    alignItems:'center',
    textAlign: 'center',
    paddingTop: 30,
    marginLeft: 55
  },
  smallContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
    overflow: 'visible', // Remove overflow: 'hidden'
    backgroundColor: 'transparent',
    borderRadius: 20,
    width: '115%', // Use a relative width
    height: 'auto', // Allow the height to adjust to content
    marginLeft: -40, // Add margin to separate from the next content
    marginBottom: 220, // Add margin to separate from the next content
  },

  smallContainerBackground: {
    width: '100%', // Set the width to fill the container
    aspectRatio: 3/2, // Maintain the aspect ratio of the image
    //height: '100%', // Set the height to fill the container
    position: 'absolute', // Position the background image absolutely
    marginTop: 0,
  },

  mediumContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
    overflow: 'visible', // Remove overflow: 'hidden'
    backgroundColor: 'transparent',
    borderRadius: 20,
    width: '115%', // Use a relative width
    height: 'auto', // Allow the height to adjust to content
    marginLeft: -50, // Add margin to separate from the next content
  },

  mediumContainerBackground: {
    width: '100%', // Set the width to fill the container
    aspectRatio: 3/2, // Maintain the aspect ratio of the image
    //height: '100%', // Set the height to fill the container
    position: 'absolute', // Position the background image absolutely
    marginTop: 0,
  },
  text: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: '#3E5F2A',
    width: 250,
    marginTop: 10,
    marginLeft: 95
  },
  text2: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: '#3E5F2A',
    width: 250,
    marginTop: 10,
    marginLeft: 105
  },
  scoreContainer: {
    flexDirection: 'row', // Display score and scoreOutOf side by side
    alignItems: 'center',
    justifyContent: 'center',
  },

  score: {
    fontSize: 50,
    color: '#3E5F2A',
    fontWeight: '600',
    textAlign: 'right',
    marginLeft: 150
  },

  scoreOutOf: {
    fontSize: 16, // Change the font size for scoreOutOf
    color: '#3E5F2A',
    textAlign: 'right',
  },
});

export default HomeScreen;
