//importining components and features
import { StyleSheet, Text, View, ImageBackground, Image, Button, TouchableOpacity, TextInput, ScrollView, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import * as Font from 'expo-font';
import { globalStyles } from '../utils/GlobalStyles';
import { signInUser } from '../services/firebaseAuth';

const LoginScreen = ({ navigation }) => {
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
      const  [email, setEmail] = useState('');
      const  [password, setPassword] = useState('');
  
  
      const  [loading, setLoading] = useState(false);
  

      //logon function
      const logOn = async () => {
        if(!email || !password){
            //warning alert
            Alert.alert("Try again", "Please fill in your email and password.",[
                {text: 'Try Again', onPress: () => {setLoading(false)}}
              ])
        }else{
            setLoading(true)
            await signInUser(email,password)
          
         
        }
    }

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
        <Text style={styles.heading}>Hello Again!</Text>
        <Text style={styles.body}>Your pet is going to be so happy to see you!</Text>

        <View style={styles.inputContainer}>
            <TextInput 
            style={styles.input}
            keyboardType='email-address'
            placeholderTextColor="#3E5F2A"
            placeholder='Email'
            defaultValue={email}    
            onChangeText={newValue => setEmail(newValue)}
            keyboardAppearance="light" 
            />

            <TextInput 
            style={styles.input} 
            keyboardType='default'
            placeholderTextColor="#3E5F2A"
            secureTextEntry={true} //makes entry secure so you can't see it
            placeholder='Password'
            defaultValue={password}    
            onChangeText={newValue => setPassword(newValue)}
            />
        </View>

{!loading ? (
  <>
        <TouchableOpacity style={styles.button} onPress={logOn}>
          <ImageBackground source={require('../assets/button3.png')} style={styles.btnBackground}>
            <Text style={styles.btnText}>Login</Text>
          </ImageBackground>
        </TouchableOpacity>

        
        {/* Btn to navigate to register */}
        <TouchableOpacity style={styles.buttonSecondary} onPress={() => navigation.navigate('Register')}>
            <Text style={styles.btnTextTertiary}>
                Don't have an account?{' '}
                <Text style={{ fontWeight: 'bold', color: '#F38A43', height:150 }}>Sign Up</Text>
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

export default LoginScreen

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
    fontSize: 34,
    color: '#3E5F2A',
    width: 340,
    textAlign: 'center',
    paddingTop: 35,
    paddingLeft: 70,
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
    marginTop:-20,
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
    marginTop:55,
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
    paddingTop: 50,
}
});