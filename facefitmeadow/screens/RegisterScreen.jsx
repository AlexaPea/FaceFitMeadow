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
      'OneStory': require('../assets/fonts/OneStory.otf'),
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

  const registerUser = () => {
    console.log("Registering...");
    registerNewUser(username, email, password);
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
    fontFamily: 'OneStory', 
    fontSize: 40,
    color: '#3E5F2A',
    width: 380,
    textAlign: 'center',
    paddingTop: 0,
    paddingLeft: 25,
    lineHeight: 55
  },
  body: {
    color: '#3E5F2A',
    fontSize: 16,
    width: 350,
    textAlign: 'center',
    paddingLeft: 55,
    paddingTop: 10,
    paddingBottom: 20,
    // fontFamily: 'Open Sans Hebrew'
  },
  button: {
    width: 197,
    height: 61,
    flex: 1,
    paddingTop: 20,
    justifyContent: 'center', // Center the content horizontally
    alignItems: 'center', // Center the content vertically
    marginLeft: 110
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
    width: 197,
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
    borderWidth: 4,
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
    paddingTop: 50,
}
});