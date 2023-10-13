//importining components and features
import { StyleSheet, Text, View, ImageBackground, Button, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import * as Font from 'expo-font';


const OnboardingFourScreen = ({ navigation, route }) => {
  const [fontLoaded, setFontLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      'FuzzyBubbles-Regular': require('../../assets/fonts/FuzzyBubbles-Regular.ttf'),
      'FuzzyBubbles-Bold': require('../../assets/fonts/FuzzyBubbles-Bold.ttf'),
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
                source={require('../../assets/progress/3.png')}
                style={styles.progress}
                />
       </View>

       <View style={styles.imageContainer}>
                <Image 
                source={require('../../assets/Onboarding/4.png')}
                style={styles.image}
                />
       </View>


      {fontLoaded ? (
        <>
        <Text style={styles.heading}>Join Us on a <Text style={styles.boldText}>Special Mission!</Text></Text>
        <Text style={styles.body}>Our mission: Make therapy fun with FaceFit Play, turning exercises into a delightful adventure. Let's have a blast together!</Text>

        <TouchableOpacity style={styles.button}   onPress={() => navigation.navigate('HomeTab')}>
          <ImageBackground source={require('../../assets/button2.png')} style={styles.btnBackground}>
            <Text style={styles.btnText}>Let's Go!</Text>
          </ImageBackground>
        </TouchableOpacity>

        
        </>
      ) : null}

 

    </ImageBackground>
  );
}


export default OnboardingFourScreen
// styling component
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'contain', // or 'stretch' to stretch the image
  },
  heading: {
    fontFamily: 'FuzzyBubbles-Regular', 
    fontSize: 34,
    color: '#3E5F2A',
    width: 380,
    textAlign: 'center',
    paddingTop: 70,
    paddingLeft: 30,
    lineHeight: 50
  },
  boldText: {
    fontFamily: 'FuzzyBubbles-Bold',
    fontSize: 34,
    color: '#3E5F2A',
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
    fontFamily: 'FuzzyBubbles-Regular', 
    fontSize: 16,
    color: 'white',
    width: 50,
    textAlign: 'center',
    alignItems: 'center',
    paddingTop:2,
  },
  btnTextSecondary:{
      fontFamily: 'FuzzyBubbles-Regular', 
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
      width: 334,  // Set your desired width
      height: 293, // Set your desired height
      alignItems: 'center'
    },
    imageContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 130,
        marginBottom: -50
    },
});
