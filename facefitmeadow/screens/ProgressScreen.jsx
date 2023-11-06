import React, { useState, useEffect  } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Image, ScrollView, Dimensions, ProgressBarAndroid } from 'react-native';
import * as Font from 'expo-font';
import { signOutUser } from '../services/firebaseAuth';
import { getCurrentUser } from '../services/firebaseAuth';
import { getUserRoleFromDatabase } from '../services/firebaseDb';
import { LineChart} from "react-native-chart-kit";
import { getUserScores,getCurrentDayStreak,getUserHighscore, getUserTotalScore, getHighestScore, getHighestDayStreak  } from '../services/firebaseDb'; 
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';


const ProgressScreen = ({ navigation }) => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const user = getCurrentUser();
  const [userScores, setUserScores] = useState([]); // State to store user scores
  const [highScore, setHighScore] = useState(0); // State to store user's high score
  const [dayStreak, setDayStreak] = useState(0); // State to store user's day streak
  const [selectedTab, setSelectedTab] = useState('stats');
  const [totalObstacles, setTotalObstacles] = useState(0);
  const [highestAttempt, setHighestAttempt] = useState(0);
  const [highestDayStreak, setHighestDayStreak] = useState(0);
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
      console.log("Current User: " + JSON.stringify(currentUser));
      if (currentUser) {
        setDisplayName(currentUser.displayName);
        console.log(displayName);
      }
    };

    fetchUserData();
    //Use setTimeout to hide the loader after 3 seconds
    setTimeout(() => {
      setIsLoading(false);
    }, 2500); 

  }, []);

  useFocusEffect(
    React.useCallback(() => {
      // This code will run when the screen gains focus
  
      // You can fetch data or perform other actions here
  
      // Example:
      const fetchUserData = async () => {
        const currentUser = getCurrentUser();
        console.log("Current User: " + JSON.stringify(currentUser));
        if (currentUser) {
          setDisplayName(currentUser.displayName);
          console.log(displayName);
        }
    
      };
      fetchUserData();
  
    }, []) // Empty dependency array means this effect only runs once when the component mounts
  );
  

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
    // Fetch user's highest attempt when the component mounts
    const fetchHighestAttempt = async () => {
      const userId = getCurrentUser().uid; // Get the user's UID
      const highestAttempt = await getHighestScore(userId); // Fetch user's highest attempt
      setHighestAttempt(highestAttempt); // Update the state with user's highest attempt
    };

    fetchHighestAttempt();
  }, []);

  useEffect(() => {
    // Fetch user's total obstacles when the component mounts
    const fetchTotalObstacles = async () => {
      const userId = getCurrentUser().uid; // Get the user's UID
      const obstacles = await getUserTotalScore(userId); // Fetch user's total obstacles
      setTotalObstacles(obstacles); // Update the state with user's total obstacles
    };

    fetchTotalObstacles();
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

  useEffect(() => {
    const fetchHighestDayStreak = async () => {
      const userId = getCurrentUser().uid; // Get the user's UID
      const streak = await getHighestDayStreak(userId); // Call the function
      setHighestDayStreak(streak); // Update the state with the highest day streak
      console.log("Highest day streak" + highestDayStreak);
    };

    fetchHighestDayStreak();
  }, []); 

   // Badge styles
   const badgeOpacity = 0.4; // Set the opacity to 40%

  //Rocket Rider:
  const obstaclesNeededForRocketRider = 50; // Number of obstacles needed to achieve the badge
  const RocketRiderprogressPercentage = (totalObstacles / obstaclesNeededForRocketRider) * 100;
  const cappedProgress = Math.min(RocketRiderprogressPercentage, 100); // Cap progress at 100%
  const RocketRiderInnerWidth = `${cappedProgress}%`;
  const rocketBadgeOpacity = RocketRiderprogressPercentage < 100 ? badgeOpacity : 1; // Adjust badge opacity


  //Adventurer
  const streakNeededForAdventurer = 7; // Number of obstacles needed to achieve the badge
  let AdventurerprogressPercentage;
  if (highestDayStreak >= streakNeededForAdventurer) {
    // If the highest streak is 7 or greater, set progress to 100%
    AdventurerprogressPercentage = 100;
  } else {
    // Calculate progress based on the actual day streak
    AdventurerprogressPercentage = (highestDayStreak / streakNeededForAdventurer) * 100;
  }
  const AdventurercappedProgress = Math.min(AdventurerprogressPercentage, 100); // Cap progress at 100%
  const AdventurerInnerWidth = `${AdventurercappedProgress}%`;
  const adventurerBadgeOpacity = AdventurerprogressPercentage < 100 ? badgeOpacity : 1; // Adjust badge opacity


  //High Flyer
  const obstaclesNeededForHighFlyer = 70; // Number of obstacles needed to achieve the badge
  const HighFlyerprogressPercentage = (highScore / obstaclesNeededForHighFlyer) * 100;
  const cappedProgressHighFlyer = Math.min(HighFlyerprogressPercentage, 100); // Cap progress at 100%
  const HighFlyerInnerWidth = `${cappedProgressHighFlyer}%`;
  const highFlyerBadgeOpacity = cappedProgressHighFlyer < 100 ? badgeOpacity : 1; // Adjust badge opacity


  //Smile Hero
  const obstaclesNeededForSmileHero = 30; // Number of obstacles needed to achieve the badge
  const SmileHeroprogressPercentage = (highestAttempt / obstaclesNeededForSmileHero) * 100;
  const cappedProgressSmileHero = Math.min(SmileHeroprogressPercentage, 100); // Cap progress at 100%
  const SmileHeroInnerWidth = `${cappedProgressSmileHero}%`;
  const smileHeroBadgeOpacity = SmileHeroprogressPercentage < 100 ? badgeOpacity : 1; 

  //Facefit master
  const obstaclesNeededForFaceFitMaster = 1000; // Number of obstacles needed to achieve the badge
  const FaceFitMasterprogressPercentage = (totalObstacles / obstaclesNeededForFaceFitMaster) * 100;
  const cappedProgressFaceFitMaster = Math.min(FaceFitMasterprogressPercentage, 100); // Cap progress at 100%
  const FaceFitMasterInnerWidth = `${cappedProgressFaceFitMaster}%`;
  const faceFitMasterBadgeOpacity = FaceFitMasterprogressPercentage < 100 ? badgeOpacity : 1; 


  
  // Define styles for tabs
  const tabStyle = (tab) => ({
    fontSize: 18,
    fontWeight: '600',
    paddingTop: 10,
    paddingLeft: 45,
    paddingRight: 0,  
    color: selectedTab === tab ? '#FFF3D8' : '#3E5F2A', // Set text color
    backgroundColor: selectedTab === tab ? '#89A354' : 'rgba(253, 229, 162, 0.57)', // Set background color
    borderRadius:25,
    width: 150,
    marginLeft: -30
  });

  return (
    <>
      {isLoading && ( // Show loader while isLoading is true
        <View style={styles.loaderContainer}>
          <Image source={require('../assets/Loader1.gif')} style={styles.loader} />
        </View>
      )}
 
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
              style={tabStyle('stats')} // Apply tabStyle for 'stats' tab
              onPress={() => setSelectedTab('stats')}
            >
              Stats
            </Text>
            <Text
              style={tabStyle('badges')} // Apply tabStyle for 'badges' tab
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
              <Image source={require('../assets/Icon/Medal.png')} style={styles.medalImage} />
              <Text style={styles.subHeading3}>{highestAttempt}</Text>
              <Text style={styles.text3}>Highest Attempt</Text>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.tinyContainer4}>
          <ImageBackground
            source={require('../assets/Container/Tiny1.png')}
            style={styles.tinyContainerBackground}>
            <View style={styles.streakContainer}>
              <Image source={require('../assets/Icon/Tree.png')} style={styles.treeImage} />
              <Text style={styles.subHeading4}>{totalObstacles}</Text>
              <Text style={styles.text4}>Total Obstacles</Text>
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
          source={require('../assets/Badges/RocketRider.png')}
          style={[styles.badgeImage, { opacity: rocketBadgeOpacity }]} // Adjust badge opacity here
        />
        <View style={styles.badgeInfoContainer}>
          <View style={styles.badgeTextContainer}>
            <Text style={styles.badgeHeading}>Rocket Rider</Text>
            <Text style={styles.badgeText}>Fly over 50 obstacles</Text>
          </View>
          <View style={styles.progressBarContainer}>
          <View style={{ width: '100%', height: 12, backgroundColor: '#FFF1CB', borderRadius: 20 }}>
            <View style={{ width: RocketRiderInnerWidth, height: '100%', backgroundColor: '#88A660', borderRadius: 20 }}>
              {/* Adjust the inner view's width (60%) to control progress */}
            </View>
          </View>
        </View>
        </View>
      </View>

      <View style={styles.badgeContainer}>
        <Image
          source={require('../assets/Badges/Adventurer.png')}
          style={[styles.badgeImage, { opacity: adventurerBadgeOpacity}]} // Adjust badge opacity here
        />
        <View style={styles.badgeInfoContainer}>
          <View style={styles.badgeTextContainer}>
            <Text style={styles.badgeHeading}>Adventurer</Text>
            <Text style={styles.badgeText}>Fly 7 days in a row</Text>
          </View>
          <View style={styles.progressBarContainer}>
          <View style={{ width: '100%', height: 12, backgroundColor: '#FFF1CB', borderRadius: 20 }}>
            <View style={{ width: AdventurerInnerWidth, height: '100%', backgroundColor: '#88A660', borderRadius: 20 }}>
              {/* Adjust the inner view's width (60%) to control progress */}
            </View>
          </View>
        </View>
        </View>
      </View>

      <View style={styles.badgeContainer}>
        <Image
          source={require('../assets/Badges/HighFlyer.png')}
          style={[styles.badgeImage, { opacity: highFlyerBadgeOpacity}]} // Adjust badge opacity here
        />
        <View style={styles.badgeInfoContainer}>
          <View style={styles.badgeTextContainer}>
            <Text style={styles.badgeHeading}>High Flyer</Text>
            <Text style={styles.badgeText}>Have a high score of 70</Text>
          </View>
          <View style={styles.progressBarContainer}>
          <View style={{ width: '100%', height: 12, backgroundColor: '#FFF1CB', borderRadius: 20 }}>
            <View style={{ width: HighFlyerInnerWidth, height: '100%', backgroundColor: '#88A660', borderRadius: 20 }}>
              {/* Adjust the inner view's width (60%) to control progress */}
            </View>
          </View>
        </View>
        </View>
      </View>

      <View style={styles.badgeContainer}>
        <Image
          source={require('../assets/Badges/SmileHero.png')}
          style={[styles.badgeImage, { opacity: smileHeroBadgeOpacity}]} // Adjust badge opacity here
        />
        <View style={styles.badgeInfoContainer}>
          <View style={styles.badgeTextContainer}>
            <Text style={styles.badgeHeading}>Smile Hero</Text>
            <Text style={styles.badgeText}>Score 30 in one fly</Text>
          </View>
          <View style={styles.progressBarContainer}>
          <View style={{ width: '100%', height: 12, backgroundColor: '#FFF1CB', borderRadius: 20 }}>
            <View style={{ width: SmileHeroInnerWidth, height: '100%', backgroundColor: '#88A660', borderRadius: 20 }}>
              {/* Adjust the inner view's width (60%) to control progress */}
            </View>
          </View>
        </View>
        </View>
      </View>

      <View style={styles.badgeContainer}>
        <Image
          source={require('../assets/Badges/FaceFitMaster.png')}
          style={[styles.badgeImage, { opacity: faceFitMasterBadgeOpacity}]} // Adjust badge opacity here

        />
        <View style={styles.badgeInfoContainer}>
          <View style={styles.badgeTextContainer}>
            <Text style={styles.badgeHeading}>FaceFit Master</Text>
            <Text style={styles.badgeText}>Fly over 1000 obstacles</Text>
          </View>
          <View style={styles.progressBarContainer}>
          <View style={{ width: '100%', height: 12, backgroundColor: '#FFF1CB', borderRadius: 20 }}>
            <View style={{ width: FaceFitMasterInnerWidth, height: '100%', backgroundColor: '#88A660', borderRadius: 20 }}>
              {/* Adjust the inner view's width (60%) to control progress */}
            </View>
          </View>
        </View>
        </View>



      </View>

      <View style={styles.space}>
          <Text>  </Text>
        </View>
      
    </View>
  )}
  </ScrollView>
</View>
    </>
  ) : null}
    </ImageBackground>
    </>
  );
};
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    paddingTop: 0,
    paddingHorizontal: 30,
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
    marginLeft: -20,
    zIndex:99
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
  subHeading3:{
    fontSize: 28,
    fontFamily: 'FuzzyBubbles-Bold',
    color: '#3E5F2A', 
    alignItems:'center',
    textAlign: 'center',
    paddingTop: 0,
    marginLeft: -40
  },
  subHeading4:{
    fontSize: 28,
    fontFamily: 'FuzzyBubbles-Bold',
    color: '#3E5F2A', 
    alignItems:'center',
    textAlign: 'center',
    paddingTop: 0,
    marginLeft: -87
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
  text3: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: '#3E5F2A',
    width: 250,
    marginTop: -5,
    marginLeft: 40
  },
  text4: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: '#3E5F2A',
    width: 250,
    marginTop: -5,
    marginLeft: -25
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
    marginLeft: 50,
    marginTop: 20,
  },
  medalImage: {
    width: 33, // Set the desired width
    height: 33, // Set the desired height
    marginLeft: -45, // Adjust the positioning if needed
    marginTop: -10, // Adjust the positioning if needed
},
treeImage: {
    width:33, // Set the desired width
    height: 33, // Set the desired height
    marginLeft: 45, // Adjust the positioning if needed
    marginTop: 30, // Adjust the positioning if needed
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
    paddingBottom: 410
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
    paddingLeft: 30,
    marginRight: 30,
    marginTop: -20,
    backgroundColor: 'rgba(253, 229, 162, 0.57)',
    height: 50,
    borderRadius: 20,
    marginBottom: 15,
    marginLeft: 15,
  },
  tabText: {
    color: '#3E5F2A',
    fontWeight: '600',
    fontSize: 18,
    paddingTop: 10,
    paddingLeft: 0,
  },
  badgeImage:{
    width: 80,
    height: 80,
    marginTop: 20,
    marginLeft: 20,
  },
  badgeTextContainer: {
    flex: 1,
    marginRight: 10,
  },
  progressBarContainer: {
    flex: 1,
    marginTop: 45,
    width: 200
  },
  badgeContainer: {
    flexDirection: 'row', // Use a row layout to align items horizontally
    alignItems: 'center', // Vertically center items within the container
    height: 140,
    width: 340,
    backgroundColor: "#FDE5A2",
    borderRadius: 25,
    marginTop: 20,
    marginLeft: 10,
  },
  badgeImage: {
    width: 100,
    height: 100,
    marginLeft: 10,
    marginTop: 0
  },
  badgeInfoContainer: {
    flex: 1, // Allow the text to expand and take available space
    paddingLeft: 15, // Add some padding to separate the image and text
  },
  badgeHeading: {
    fontSize: 24,
    fontFamily: 'FuzzyBubbles-Bold',
    color: '#3E5F2A',
    marginLeft: 0, 
    marginTop: 15,
    zIndex: 99,
    overflow: 'visible',
    height: 40
    
  },
  badgeText: {
    color: '#3E5F2A',
    paddingTop: 3,
    marginBottom: 10,
    zIndex: 150,
  },
  space:{
    height: 430,
  }
  
});

export default ProgressScreen;
