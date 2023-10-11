//importining components and features
import { StyleSheet, Text, View, ImageBackground, Button, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import * as Font from 'expo-font';


const OnboardingOneScreen = ({ navigation }) => {
  const [fontLoaded, setFontLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      'OneStory': require('../../assets/fonts/OneStory.otf'),
    });
    setFontLoaded(true);
  };

  React.useEffect(() => {
    loadFonts();
  }, []);

  // return the rendering of views
  return (
    <ImageBackground
    source={require('../../assets/backgrounds/Onboarding.png')}
      style={styles.backgroundImage}
    >

      <View style={styles.progressContainer}>
                <Image 
                source={require('../../assets/progress/1.png')}
                style={styles.progress}
                />
       </View>

       <View style={styles.imageContainer}>
                <Image 
                source={require('../../assets/SpotIsland/4.png')}
                style={styles.image}
                />
       </View>


      {fontLoaded ? (
        <>
        <Text style={styles.heading}>Hi, I'm Spot!</Text>
        <Text style={styles.body}>Hi, I'm Spot, your Giggly pet! Let's explore how to take care of me and have fun with this app.</Text>

        <TouchableOpacity style={styles.button}   onPress={() => navigation.navigate('OnboardingTwo')}>
          <ImageBackground source={require('../../assets/button2.png')} style={styles.btnBackground}>
            <Text style={styles.btnText}>Next</Text>
          </ImageBackground>
        </TouchableOpacity>

        
        </>
      ) : null}

 

    </ImageBackground>
  );
}


export default OnboardingOneScreen
// styling component
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch' to stretch the image
    alignContent: 'center'
  },
  heading: {
    fontFamily: 'OneStory', 
    fontSize: 40,
    color: '#3E5F2A',
    width: 330,
    textAlign: 'center',
    paddingTop: 70,
    paddingLeft: 60,
    lineHeight: 55
  },
  body: {
    color: '#3E5F2A',
    fontSize: 16,
    width: 350,
    textAlign: 'center',
    paddingLeft: 55,
    paddingTop: 20,
    // fontFamily: 'Open Sans Hebrew'
  },
  button: {
    width: 65,
    height: 63,
    borderRadius: 20,
    flex: 1,
    paddingTop:30,
    paddingLeft:340,
    alignItems: 'center',
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
    width: 65,
    height: 63,
    borderRadius: 20,
    padding:5,
    alignItems: 'center',
  },
  btnText:{
    fontFamily: 'OneStory', 
    fontSize: 22,
    color: 'white',
    width: 350,
    textAlign: 'center',
    alignItems: 'center',
    paddingTop:15,
  },
  btnTextSecondary:{
      fontFamily: 'OneStory', 
      fontSize: 24,
      color: '#3E5F2A',
      width: 350,
      textAlign: 'center',
      alignItems: 'center',
      paddingTop:8,
    },
    progress:{
      width: 80,  // Set your desired width
      height: 11, // Set your desired height
      alignItems: 'center'
    },
    progressContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 70
    },
    image:{
      width: 367,  // Set your desired width
      height: 504, // Set your desired height
      alignItems: 'center'
    },
    imageContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        marginBottom: -90
    },
});
