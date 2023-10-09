//importining components and features
import { StyleSheet, Text, View, ImageBackground, Button, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import * as Font from 'expo-font';

const SplashScreen = ({ navigation }) => {
    const [fontLoaded, setFontLoaded] = useState(false);

    const loadFonts = async () => {
      await Font.loadAsync({
        'OneStory': require('../assets/fonts/OneStory.otf'),
      });
      setFontLoaded(true);
    };

    useEffect(() => {
        loadFonts();
        // Add a setTimeout to navigate to splashOptionScreen in 3 seconds
        const timeout = setTimeout(() => {
          navigation.navigate('SplashOption'); // Replace with the correct screen name
        }, 2500); // 3 seconds in milliseconds
        return () => clearTimeout(timeout); // Clear the timeout if the component unmounts
      }, [navigation]);

    React.useEffect(() => {
      loadFonts();
    }, []);
  
    // return the rendering of views
    return (
      <ImageBackground
        source={require('../assets/backgrounds/splashOne.png')}
        style={styles.backgroundImage}
      >

        <Image 
            source={require('../assets/logo.png')}
            style={styles.logo}
          />
   
  
      </ImageBackground>
    );
  }


export default SplashScreen
// styling component
const styles = StyleSheet.create({
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover', // or 'stretch' to stretch the image
      alignContent: 'center'
    },
  
      logo:{
        marginTop:300,
        //marginLeft:60
      }
  });
  