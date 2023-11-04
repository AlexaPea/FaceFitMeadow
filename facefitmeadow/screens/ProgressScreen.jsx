import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Image, ScrollView, Dimensions, ProgressBarAndroid } from 'react-native';
import * as Font from 'expo-font';
import { signOutUser } from '../services/firebaseAuth';
import { getCurrentUser } from '../services/firebaseAuth';
import { getUserRoleFromDatabase } from '../services/firebaseDb';
import { LineChart} from "react-native-chart-kit";
import { getUserScores,getCurrentDayStreak,getUserHighscore  } from '../services/firebaseDb'; 
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';


const ProgressScreen = ({ navigation }) => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const user = getCurrentUser();
  const [countdown, setCountdown] = useState('');
  const [showParagraph, setShowParagraph] = useState(false);
  const [userScores, setUserScores] = useState([]); // State to store user scores
  const [highScore, setHighScore] = useState(0); // State to store user's high score
  const [dayStreak, setDayStreak] = useState(0); // State to store user's day streak
  const [selectedTab, setSelectedTab] = useState('stats');

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
      console.log("Current User: " + JSON.stringify(currentUser));
      if (currentUser) {
        setDisplayName(currentUser.displayName);
        console.log(displayName);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    // Fetch user scores when the component mounts
    const fetchUserScores = async () => {
      const userId = getCurrentUser().uid; // Get the user's UID
      const scores = await getUserScores(userId); // Fetch user scores
      console.log(scores);
      setUserScores(scores); // Update the state with user scores
    };

    fetchUserScores();
  }, []);

  useEffect(() => {
    // Fetch user's high score when the component mounts
    const fetchHighScore = async () => {
      const userId = getCurrentUser().uid; // Get the user's UID
      const highscore = await getUserHighscore(userId); // Fetch user's high score
      console.log(highScore);
      setHighScore(highscore); // Update the state with user's high score
    };

    fetchHighScore();
  }, []);

  useEffect(() => {
    // Fetch user's day streak when the component mounts
    const fetchDayStreak = async () => {
      const userId = getCurrentUser().uid; // Get the user's UID
      const streak = await getCurrentDayStreak(userId); // Fetch user's day streak
      setDayStreak(streak); // Update the state with user's day streak
    };

    fetchDayStreak();
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
          <Text style={styles.heading2}>Track Your</Text>
          <Text style={styles.heading1}>Progress!</Text>
          <Text style={styles.body}>Time to take a look at our mission progress!</Text>

          <View style={styles.tabContainer}>
          <Text
            style={[
              styles.tabText,
              selectedTab === 'stats' ? { opacity: 1 } : { opacity: 0.4 },
            ]}
            onPress={() => setSelectedTab('stats')}
          >
            Stats
          </Text>
          <Text
            style={[
              styles.tabText,
              selectedTab === 'badges' ? { opacity: 1 } : { opacity: 0.4 },
            ]}
            onPress={() => setSelectedTab('badges')}
          >
            Badges
          </Text>
          </View>
          <View style={styles.scrollViewContainer}>
  <ScrollView>
    {selectedTab === 'stats' ? (
      <View>
        <View style={styles.tinyContainer}>
          <ImageBackground
            source={require('../assets/Container/Tiny1.png')}
            style={styles.tinyContainerBackground}>
            <View style={styles.trophyContainer}>
              <Image source={require('../assets/Icon/Trophy.png')} style={styles.trophyImage} />
              <Text style={styles.subHeading}>{highScore}</Text>
              <Text style={styles.text}>High Score</Text>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.tinyContainer2}>
          <ImageBackground
            source={require('../assets/Container/Tiny2.png')}
            style={styles.tinyContainerBackground}>
            <View style={styles.streakContainer}>
              <Image source={require('../assets/Icon/Streak.png')} style={styles.streakImage} />
              <Text style={styles.subHeading2}>{dayStreak}</Text>
              <Text style={styles.text2}>Day Streak</Text>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.tinyContainer3}>
          <ImageBackground
            source={require('../assets/Container/Tiny2.png')}
            style={styles.tinyContainerBackground}>
            <View style={styles.trophyContainer}>
              <Image source={require('../assets/Icon/Trophy.png')} style={styles.trophyImage} />
              <Text style={styles.subHeading}>{highScore}</Text>
              <Text style={styles.text}>High Score</Text>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.tinyContainer4}>
          <ImageBackground
            source={require('../assets/Container/Tiny1.png')}
            style={styles.tinyContainerBackground}>
            <View style={styles.streakContainer}>
              <Image source={require('../assets/Icon/Streak.png')} style={styles.streakImage} />
              <Text style={styles.subHeading2}>{dayStreak}</Text>
              <Text style={styles.text2}>Day Streak</Text>
            </View>
          </ImageBackground>
        </View>

        <View>
          <Text style={styles.mission}>Mission Timeline</Text>
          <Text style={styles.missionText}>This graph depicts how your mission is going based on your daily scores!</Text>
          {userScores.length > 0 ? ( // Check if userScores is available
            <View style={styles.graph}>
              <LineChart
                style={styles.graph}
                data={{
                  // labels: ["January", "February", "March", "April", "May", "June"],
                  datasets: [
                    {
                      data: userScores,
                    },
                  ],
                }}
                width={330}
                height={210}
                yAxisLabel=""
                yAxisSuffix=""
                yAxisInterval={1}
                chartConfig={{
                  backgroundColor: "#FEE08C",
                  backgroundGradientFrom: "#FEE08C",
                  backgroundGradientTo: "#FEE08C",
                  decimalPlaces: 2,
                  color: (opacity = 5) => `rgba(91, 140, 62, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(62, 95, 42, ${opacity})`,
                  style: {
                    borderRadius: 0,
                  },
                  propsForDots: {
                    r: "0",
                    strokeWidth: "2",
                    stroke: "#5B8C3E",
                  },
                }}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                }}
              />
            </View>
          ) : (
            <Text>Loading...</Text>
          )}
        </View>
      </View>
    ) : (
      <View style={styles.badges}>
      <View style={styles.badgeContainer}>
        <Image
          source={require('../assets/Badges/GoldStar.png')}
          style={styles.badgeImage}
        />
        <View style={styles.badgeInfoContainer}>
          <View style={styles.badgeTextContainer}>
            <Text style={styles.badgeHeading}>FaceFit Master</Text>
            <Text style={styles.badgeText}>Reach a total score of 150</Text>
          </View>
          <View style={styles.progressBarContainer}>
  <View style={{ width: 210, height: 12, backgroundColor: '#FFF1CB', borderRadius: 20 }}>
    <View style={{ width: '60%', height: '100%', backgroundColor: '#88A660', borderRadius: 20 }}>
      {/* Adjust the inner view's width (60%) to control progress */}
    </View>
  </View>
</View>

        </View>
      </View>
    </View>
  )}
  </ScrollView>
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
    fontFamily: 'FuzzyBubbles-Bold',
    fontSize: 42,
    color: '#3E5F2A',
    width: 350,
    paddingTop: 0,
    paddingLeft: 20,
    lineHeight: 50,
    textShadowColor: '#3E5F2A',
    textShadowOffset: { width: 2, height: 2 },
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
  subHeading:{
    fontSize: 28,
    fontFamily: 'FuzzyBubbles-Bold',
    color: '#3E5F2A', 
    alignItems:'center',
    textAlign: 'center',
    paddingTop: 0,
    marginLeft: -20
  },
  subHeading2:{
    fontSize: 28,
    fontFamily: 'FuzzyBubbles-Bold',
    color: '#3E5F2A', 
    alignItems:'center',
    textAlign: 'center',
    paddingTop: 0,
    marginLeft: -120
  },
  tinyContainerRow: {
    flexDirection: 'row', // Display tinyContainers in a row
    justifyContent: 'space-between', // Add space between containers
    marginTop: 0,
    paddingHorizontal: 0, // Add horizontal padding to separate containers
    marginBottom: 0,
  },
  tinyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 85,
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
    marginTop: 0,
    overflow: 'visible', // Remove overflow: 'hidden'
    backgroundColor: 'transparent',
    borderRadius: 20,
    width: '90%', // Use a relative width
    height: 'auto', // Allow the height to adjust to content
    marginLeft: 130, // Add margin to separate from the next content
    marginBottom: 20, // Add margin to separate from the next content
  },
  tinyContainer4: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -37,
    overflow: 'visible', // Remove overflow: 'hidden'
    backgroundColor: 'transparent',
    borderRadius: 20,
    width: '83%', // Use a relative width
    height: 'auto', // Allow the height to adjust to content
    marginLeft: 135, // Add margin to separate from the next content
    marginBottom: 20, // Add margin to separate from the next content
  },
  tinyContainer3: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 130,
    overflow: 'visible', // Remove overflow: 'hidden'
    backgroundColor: 'transparent',
    borderRadius: 20,
    width: '90%', // Use a relative width
    height: 'auto', // Allow the height to adjust to content
    marginLeft: -45, // Add margin to separate from the next content
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
    width: 33, // Set the size of the trophy image
    height: 33,  
    marginLeft: -20
  },
  streakImage: {
    width: 30, // Set the size of the trophy image
    height: 30,  
    marginLeft: 40,
    marginTop: 20,
  },
  mission: {
    fontFamily: 'FuzzyBubbles-Bold',
    fontSize: 28,
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
  graph:{
    marginTop: -20,
    marginLeft: 20,
    paddingBottom: 380
  },
  badgeContainer:{
    height: 170,
    width:350,
    backgroundColor:"#FDE5A2",
    borderRadius: 20,
    marginTop: 20
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 120,
    marginTop: -20
  },
  tabText: {
    color: '#3E5F2A',
    fontWeight: '600',
    fontSize: 18
  },
  badgeImage:{
    width: 80,
    height: 80,
    marginTop: 20,
    marginLeft: 20,
  },
  badgeInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  badgeTextContainer: {
    flex: 1,
    marginRight: 10,
  },
  progressBarContainer: {
    flex: 1,
    marginTop: 45
  },
  progressBar: {
    marginTop: 30,
    width: 180,
    //height: 20, // Change the height as needed
    color: '#88A660', // Change the color to your desired color
  },
  badgeHeading:{
    fontSize: 25,
    fontFamily: 'FuzzyBubbles-Bold',
    color: '#3E5F2A', 
    alignItems:'center',
    textAlign: 'center',
    paddingTop: 0,
    marginLeft: -20
  },
  badgeText: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: '#3E5F2A',
    width: 250,
    marginTop: 15,
    marginBottom:10,
    marginLeft: 25
  },
  badgeContainer: {
    flexDirection: 'row', // Use a row layout to align items horizontally
    alignItems: 'center', // Vertically center items within the container
    height: 140,
    width: 350,
    backgroundColor: "#FDE5A2",
    borderRadius: 20,
    marginTop: 20,
  },
  badgeImage: {
    width: 80,
    height: 80,
    marginLeft: 20,
    marginTop: -20
  },
  badgeInfoContainer: {
    flex: 1, // Allow the text to expand and take available space
    paddingLeft: 20, // Add some padding to separate the image and text
  },
  badgeHeading: {
    fontSize: 24,
    fontFamily: 'FuzzyBubbles-Bold',
    color: '#3E5F2A',
    marginLeft: 0, 
    marginTop: 15
    //paddingBottom: 20
  },
  badgeText: {
    color: '#3E5F2A',
    marginTop: 10,
    marginBottom: 10
  },
  
});

export default ProgressScreen;
