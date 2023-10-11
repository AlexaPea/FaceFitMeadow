import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import * as Font from 'expo-font';
import { signOutUser } from '../services/firebaseAuth';
import { getCurrentUser } from '../services/firebaseAuth';
import { getUserRoleFromDatabase } from '../services/firebaseDb';

const ProgressScreen = ({ navigation }) => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const user = getCurrentUser();
  const [countdown, setCountdown] = useState('');
  const [showParagraph, setShowParagraph] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      'OneStory': require('../assets/fonts/OneStory.otf'),
    });
    setFontLoaded(true);
  };

  const [displayName, setDisplayName] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = getCurrentUser();
      console.log("Current User: " + JSON.stringify(currentUser));
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

  return (
    <ImageBackground
      source={require('../assets/backgrounds/Progress.png')}
      style={styles.backgroundImage}
    >
      {fontLoaded ? (
        <>
          <Text style={styles.heading2}>Track Our</Text>
          <Text style={styles.heading1}>Progress!</Text>
          <Text style={styles.body}>Time to take a look at our mission progress!</Text>
          <View style={styles.tinyContainerRow}>
            <View style={styles.tinyContainer}>
              <ImageBackground
                source={require('../assets/Container/Tiny1.png')}
                style={styles.tinyContainerBackground}
              >
                <View style={styles.trophyContainer}>
                  <Image source={require('../assets/Icon/Trophy.png')} style={styles.trophyImage} />
                  <Text style={styles.subHeading}>15</Text>
                  <Text style={styles.text}>High Score</Text>
                </View>
              </ImageBackground>
            </View>

            <View style={styles.tinyContainer2}>
              <ImageBackground
                source={require('../assets/Container/Tiny2.png')}
                style={styles.tinyContainerBackground}
              >
                <View style={styles.streakContainer}>
                  <Image source={require('../assets/Icon/Streak.png')} style={styles.streakImage} />
                  <Text style={styles.subHeading2}>20</Text>
                  <Text style={styles.text2}>Day Streak</Text>
                </View>
              </ImageBackground>
            </View>
          </View>
          <View>
              <Text style={styles.mission}>Mission Timeline</Text>
              <Text style={styles.missionText}>This graph depicts how your mission is going based on your daily scores!</Text>
            </View>
        </>
      ) : null}
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    paddingTop: 0,
    paddingHorizontal: 30,
  },
  heading1: {
    fontFamily: 'OneStory',
    fontSize: 48,
    color: '#3E5F2A',
    width: 350,
    paddingTop: 0,
    paddingLeft: 20,
    lineHeight: 50,
    textShadowColor: '#3E5F2A',
    textShadowOffset: { width: 2, height: 2 },
  },
  heading2: {
    fontFamily: 'OneStory',
    fontSize: 32,
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
    fontFamily: 'OneStory', 
    fontSize: 20,
    color: 'white',
    width: 350,
    textAlign: 'center',
    alignItems: 'center',
    paddingTop:10,
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
    fontFamily: 'OneStory',
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
    fontFamily: 'OneStory',
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
    fontFamily: 'OneStory',
    color: '#3E5F2A', 
    alignItems:'center',
    marginBottom: 70
  },
  subHeading:{
    fontSize: 32,
    fontFamily: 'OneStory',
    color: '#3E5F2A', 
    alignItems:'center',
    textAlign: 'center',
    paddingTop: 5,
    marginLeft: -20
  },
  subHeading2:{
    fontSize: 32,
    fontFamily: 'OneStory',
    color: '#3E5F2A', 
    alignItems:'center',
    textAlign: 'center',
    paddingTop: 5,
    marginLeft: -120
  },
  tinyContainerRow: {
    flexDirection: 'row', // Display tinyContainers in a row
    justifyContent: 'space-between', // Add space between containers
    marginTop: -20,
    paddingHorizontal: 0, // Add horizontal padding to separate containers
    marginBottom: 0,
  },
  tinyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
    overflow: 'visible', // Remove overflow: 'hidden'
    backgroundColor: 'transparent',
    borderRadius: 20,
    width: '83%', // Use a relative width
    height: 'auto', // Allow the height to adjust to content
    marginLeft: -40, // Add margin to separate from the next content
    marginBottom: 20, // Add margin to separate from the next content
  },
  tinyContainer2: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
    overflow: 'visible', // Remove overflow: 'hidden'
    backgroundColor: 'transparent',
    borderRadius: 20,
    width: '90%', // Use a relative width
    height: 'auto', // Allow the height to adjust to content
    marginLeft: -120, // Add margin to separate from the next content
    marginBottom: 20, // Add margin to separate from the next content
  },

  tinyContainerBackground: {
    width: '81%', // Set the width to fill the container
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
    marginTop: -5,
    marginLeft: 25
  },
  text2: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: '#3E5F2A',
    width: 250,
    marginTop: -5,
    marginLeft: -40
  },
  trophyContainer: {
    alignItems: 'center',
    marginTop: 30,
    marginLeft: -90
  },
  trophyImage: {
    width: 35, // Set the size of the trophy image
    height: 35,  
    marginLeft: -20
  },
  streakImage: {
    width: 35, // Set the size of the trophy image
    height: 35,  
    marginLeft: 40,
    marginTop: 20,
  },
  mission: {
    fontFamily: 'OneStory',
    fontSize: 32,
    color: '#3E5F2A',
    width: 350,
    paddingTop: 70,
    paddingLeft: 20,
    lineHeight: 50,
    textShadowColor: '#3E5F2A',
    textShadowOffset: { width: 2, height: 2 },
  },
  missionText: {
    color: '#3E5F2A',
    width: 350,
    paddingLeft: 20,
    paddingTop: 5,
    paddingBottom: 40,
    // fontFamily: 'Open Sans'
  },
});

export default ProgressScreen;
