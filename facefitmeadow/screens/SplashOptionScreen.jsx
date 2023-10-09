//importining components and features
import { StyleSheet, Text, View, ImageBackground, Button, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import * as Font from 'expo-font';


const SplashOptionScreen = ({ navigation }) => {
  const [fontLoaded, setFontLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      'OneStory': require('../assets/fonts/OneStory.otf'),
    });
    setFontLoaded(true);
  };

  React.useEffect(() => {
    loadFonts();
  }, []);

  // return the rendering of views
  return (
    <ImageBackground
      source={require('../assets/backgrounds/splashTwo.jpg')}
      style={styles.backgroundImage}
    >

<View style={styles.logoContainer}>
                <Image 
                source={require('../assets/logo.png')}
                style={styles.logo}
                />
        </View>
      {fontLoaded ? (
        <>
        <Text style={styles.heading}>Lets Have Some Fun!</Text>
        <Text style={styles.body}>Let’s get those muscles moving and make your pet happy!</Text>

        <TouchableOpacity style={styles.button}   onPress={() => navigation.navigate('Login')}>
          <ImageBackground source={require('../assets/button3.png')} style={styles.btnBackground}>
            <Text style={styles.btnText}>Login</Text>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonSecondary} onPress={() => navigation.navigate('Register')}>
            <Text style={styles.btnTextSecondary}>Sign Up</Text>
        </TouchableOpacity>
        
        </>
      ) : null}

 

    </ImageBackground>
  );
}


export default SplashOptionScreen
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
    width: 195,
    height: 69,
    borderRadius: 20,
    flex: 1,
    paddingTop:40,
    paddingLeft:200,
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
    width: 195,
    height: 61,
    borderRadius: 20,
    padding:5,
    alignItems: 'center',
  },
  btnText:{
    fontFamily: 'OneStory', 
    fontSize: 24,
    color: 'white',
    width: 350,
    textAlign: 'center',
    alignItems: 'center',
    paddingTop:8,
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
    logo:{
     
      width: 497,  // Set your desired width
      height: 290, // Set your desired height
      resizeMode: "contain",
    },
    logoContainer:{
        marginTop:110,
        marginLeft:-30,

    },
});
