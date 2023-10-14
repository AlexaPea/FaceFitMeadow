import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Image, ScrollView } from 'react-native';
import * as Font from 'expo-font';
import { signOutUser } from '../../services/firebaseAuth';
import { getCurrentUser } from '../../services/firebaseAuth';
import { getUserRoleFromDatabase } from '../../services/firebaseDb';


const PlayScreen = ({ navigation }) => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const user = getCurrentUser();
  const [countdown, setCountdown] = useState('');
  const [showParagraph, setShowParagraph] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      'FuzzyBubbles-Regular': require('../../assets/fonts/FuzzyBubbles-Regular.ttf'),
      'FuzzyBubbles-Bold': require('../../assets/fonts/FuzzyBubbles-Bold.ttf'),
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


  return (
      <ImageBackground
        source={require('../../assets/backgrounds/Home.png')}
        style={styles.backgroundImage}
      >
        {fontLoaded ? (
          <>
            <Text style={styles.heading2}>It's</Text>
            <Text style={styles.heading1}>Playtime!</Text>
            <Text style={styles.body}>It's time for some fun!</Text>



                <View style={styles.mediumContainer}>
                <ImageBackground
                    source={require('../../assets/Container/gameStart.png')}
                    style={styles.mediumContainerBackground}
                >
                    <Text style={styles.subHeading2}>Flight Risk</Text>
                    <Text style={styles.text2}>Let’s go an adventure through FaceFit Meadow!</Text>



                </ImageBackground>
                </View>

                <TouchableOpacity style={styles.button}
                    onPress={() => navigation.navigate('InstructionScreen')} >
                      <ImageBackground source={require('../../assets/button.png')} style={styles.btnBackground}>
                          <Text style={styles.btnText}>Let's Play!</Text>
                      </ImageBackground>
                    </TouchableOpacity>

                <Image
                  source={require('../../assets/game/startScreen.png')}
                  style={styles.bottomImg}
                />

          </>
        ) : null}
      </ImageBackground>
  );
};

const styles = StyleSheet.create({
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
    justifyContent: 'center', // Center the content horizontally
    alignItems: 'center', // Center the content vertically
    marginLeft: 105,
    marginTop: -40
  },
  btnBackground:{
    width: 153,
    height: 61,
    resizeMode: 'contain',
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
    paddingTop: 65,
    marginLeft: -45
  },
  mediumContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 120,
    overflow: 'visible', // Remove overflow: 'hidden'
    backgroundColor: 'transparent',
    borderRadius: 20,
    width: '180%', // Use a relative width
    height: 'auto', // Allow the height to adjust to content
    marginLeft: -115, // Add margin to separate from the next content
  },

  mediumContainerBackground: {
    width: '78%', // Set the width to fill the container
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
    marginTop: 20,
    marginLeft: 100
  },
  bottomImg:{
    bottom:0,
    width: 418,
    height:402,
    marginLeft: -30,
    marginBottom:-55,
  }
});

export default PlayScreen;
