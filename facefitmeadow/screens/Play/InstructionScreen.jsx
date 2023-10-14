import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Image, ScrollView } from 'react-native';
import * as Font from 'expo-font';
import { getCurrentUser } from '../../services/firebaseAuth';

const InstructionScreen = ({ navigation }) => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [showFirstContainer, setShowFirstContainer] = useState(true);

  const loadFonts = async () => {
    await Font.loadAsync({
      'FuzzyBubbles-Regular': require('../../assets/fonts/FuzzyBubbles-Regular.ttf'),
    });
    setFontLoaded(true);
  };

  useEffect(() => {
    loadFonts();
  }, []);

  const handleButtonPress = () => {
    setShowFirstContainer(false); // Hide the first container when the button is pressed
  };


  return (
    <ImageBackground
      source={require('../../assets/backgrounds/Home.png')}
      style={styles.backgroundImage}
    >
      {fontLoaded ? (
        <>
          {showFirstContainer ? (
            <>
            <View style={styles.mediumContainer}>
              <ImageBackground
                source={require('../../assets/game/Instruction1.png')}
                style={styles.mediumContainerBackground}
              >
                <Text style={styles.subHeading1}>Step 1</Text>
                <Text style={styles.subHeading2}>Face the Camera</Text>
                <Text style={styles.text}>Make sure you have your face in front of your phone camera.</Text>

              </ImageBackground>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
            <ImageBackground source={require('../../assets/button.png')} style={styles.btnBackground}>
              <Text style={styles.btnText}>Ready!</Text>
            </ImageBackground>
          </TouchableOpacity>
          </>
          ) : (
            <>
            <View style={styles.mediumContainer}>
              <ImageBackground
                source={require('../../assets/game/Instruction2.png')}
                style={styles.mediumContainerBackground}
              >
                <Text style={styles.subHeading1}>Step 2</Text>
                <Text style={styles.subHeading2}>Smile Wide</Text>
                <Text style={styles.text2}>When you smile, you give your pet a boost which allows him to fly a little higher.</Text>

              </ImageBackground>
            </View>

            <TouchableOpacity style={styles.button}
                onPress={() => navigation.navigate('GameWithCamera')}>
                  <ImageBackground source={require('../../assets/button.png')} style={styles.btnBackground}>
                    <Text style={styles.btnText}>Let's Go!</Text>
                  </ImageBackground>
            </TouchableOpacity>
            </>
          )}
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
    fontFamily: 'FuzzyBubbles-Bold',
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
    marginLeft: 100,
    marginTop: -270
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
  subHeading1:{
    fontSize: 32,
    fontFamily: 'FuzzyBubbles-Bold',
    color: '#3E5F2A', 
    alignItems:'center',
    textAlign: 'center',
    paddingTop: 110,
    marginLeft: -225
  },
  subHeading2:{
    fontSize: 20,
    color: '#3E5F2A', 
    alignItems:'center',
    textAlign: 'center',
    paddingTop: 5,
    marginLeft: -215,
    fontWeight: 'bold'
  },
  mediumContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 420,
    overflow: 'visible', // Remove overflow: 'hidden'
    backgroundColor: 'transparent',
    borderRadius: 20,
    width: '320%', // Use a relative width
    height: 'auto', // Allow the height to adjust to content
    marginLeft: -275, // Add margin to separate from the next content
  },

  mediumContainerBackground: {
    width: '57%', // Set the width to fill the container
    aspectRatio: 3/2, // Maintain the aspect ratio of the image
    //height: '100%', // Set the height to fill the container
    position: 'absolute', // Position the background image absolutely
    marginTop: 50,
  },
  text: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: '#3E5F2A',
    width: 250,
    marginTop: 15,
    marginLeft: 90
  },
  text2: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: '#3E5F2A',
    width: 240,
    marginTop: 5,
    marginLeft: 90
  },
});

export default InstructionScreen;
