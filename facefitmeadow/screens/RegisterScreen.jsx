//importining components and features
import { StyleSheet, Text, View, ImageBackground, Image, Button, TouchableOpacity, TextInput, ScrollView, Alert, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import * as Font from 'expo-font';
import { globalStyles } from '../utils/GlobalStyles';
import { registerNewUser } from '../services/firebaseAuth';

const RegisterScreen = ({ navigation }) => {
  const [fontLoaded, setFontLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      'FuzzyBubbles-Regular': require('../assets/fonts/FuzzyBubbles-Regular.ttf'),
      'FuzzyBubbles-Bold': require('../assets/fonts/FuzzyBubbles-Bold.ttf'),
    });
    setFontLoaded(true);
  };

  React.useEffect(() => {
    loadFonts();
  }, []);
  
  //input state values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  const registerUser = async () => {
    console.log("Registering...");
  
    try {
      // Call the registration function, e.g., registerNewUser(username, email, password);
      await registerNewUser(username, email, password);
  
      // If registration is successful, navigate to the OnboardingOne screen
      navigation.navigate('OnboardingOne');
    } catch (error) {
      // Handle any registration errors here
      console.error('Registration failed:', error);
    }
  };

  useEffect(() => {
    loadFonts();
  }, []);

  


  // return the rendering of views
  return (
    <ImageBackground
    source={require('../assets/backgrounds/Login.png')}
    style={styles.backgroundImage}
  >
<ScrollView>

        <View style={styles.logoContainer}>
                <Image 
                source={require('../assets/logo.png')}
                style={styles.logo}
                />
        </View>

      {fontLoaded ? (
        <>
        <Text style={styles.heading}>Nice to Meet You!</Text>
        <Text style={styles.body}>We’re so glad one of our pets are getting a loving home!</Text>

        <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input} 
          keyboardType='default'
          placeholderTextColor="#3E5F2A"
          placeholder='Username'
          defaultValue={username}    
          onChangeText={newValue => setUsername(newValue)}
          />

        <TextInput
            style={styles.input}
            keyboardType='email-address'
            placeholderTextColor="#3E5F2A"
            placeholder='Email'
            defaultValue={email}
            onChangeText={setEmail}
          />

          <TextInput 
          style={styles.input} 
          keyboardType='default'
          placeholderTextColor="#3E5F2A"
          secureTextEntry={true}
          placeholder='Password'
          defaultValue={password}    
          onChangeText={newValue => setPassword(newValue)}
          />

        </View>

{!loading ? (
  <>
        <TouchableOpacity style={styles.button} onPress={registerUser}>
          <ImageBackground source={require('../assets/button3.png')} style={styles.btnBackground}>
            <Text style={styles.btnText}>Sign Up</Text>
          </ImageBackground>
        </TouchableOpacity>

        
        {/* Btn to navigate to register */}
        <TouchableOpacity style={styles.buttonSecondary} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.btnTextTertiary}>
                Already have an account?{' '}
                <Text style={{ fontWeight: 'bold', color: '#F38A43', height:150 }}>Login</Text>
            </Text>
        </TouchableOpacity>
        
        </>
           ): <ActivityIndicator animating={loading} size={40} /> }
             </>
      ) : null}

 

   
  </ScrollView>
  </ImageBackground>
  )
}

export default RegisterScreen

// styling component
const styles = StyleSheet.create({
  ScrollView:{
    height:100,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover', // or 'stretch' to stretch the image
    alignContent: 'center',   
  },
  heading: {
    fontFamily: 'FuzzyBubbles-Regular', 
    fontSize: 32,
    color: '#3E5F2A',
    width: 400,
    textAlign: 'center',
    paddingTop: 0,
    paddingLeft: 0,
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
    paddingLeft: 75,
    paddingTop: 20,
    paddingBottom: 20,
  },
  button: {
    width: 195,
    height: 69,
    borderRadius: 20,
    flex: 1,
    paddingTop:10,
    paddingLeft:200,
    alignItems: 'center',
  },
  buttonSecondary: {
    width: 307,
    color: "#3E5F2A",
    height: 69,
    borderRadius: 20,
    flex: 1,
    marginTop:0,
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
    fontFamily: 'FuzzyBubbles-Regular', 
    fontSize: 20,
    color: 'white',
    width: 350,
    textAlign: 'center',
    alignItems: 'center',
    paddingTop:5,
  },
logo:{
    width: 497,  // Set your desired width
    height: 290, // Set your desired height
    resizeMode: "contain",
    },
logoContainer:{
    marginTop:10,
    marginLeft:-30,
},
inputContainer:{
    paddingTop: 15,
    paddingLeft: 45
},
input:{
    width: 325,
    height: 60,   
    borderWidth: 3,
    borderColor: '#3E5F2A',
    borderRadius: 20,
    paddingLeft: 20,
    marginBottom:28,
    marginLeft:0,
    color: '#3E5F2A',
    },
btnTextTertiary:{
    color: '#3E5F2A',
    width: 500,
    textAlign: 'center',
    paddingTop: 30,
}
});