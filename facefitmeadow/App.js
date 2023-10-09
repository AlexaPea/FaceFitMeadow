import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import SplashScreen from './screens/SplashScreen';
import SplashOptionScreen from './screens/SplashOptionScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeTab from './navigators/HomeTab';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import OnboardingOneScreen from './screens/Onboarding/OnboardingOneScreen';
import OnboardingTwoScreen from './screens/Onboarding/OnboardingTwoScreen';
import OnboardingThreeScreen from './screens/Onboarding/OnboardingThreeScreen';
import OnboardingFourScreen from './screens/Onboarding/OnboardingFourScreen';


//for each nav we have, we need to go create it
const Stack = createNativeStackNavigator();

export default function App() {


  
  const [loggedIn, setLoggedIn] = useState(false)

  //Check if user is logged in
  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("checking if logged In...")
      if(user){
        //user is logged in
        setLoggedIn(true)
      } else {
        //user doesn't exist, meaing they are logged out
        setLoggedIn(false)
      }

    })
    return unsubscribe;
    
  }, [])

  

  return (
    //Root for navigation
    <NavigationContainer style={styles.nav} theme={navigationTheme}>
          
      <Stack.Navigator  initialRouteName='Splash' screenOptions={{headerShown: false}}>
      {!loggedIn ? (
        //Show these screens when user isn't logged in
            <>
              <Stack.Screen
              name="Splash"
              component={SplashScreen} 
              />

              <Stack.Screen
              name="SplashOption"
              component={SplashOptionScreen} 
              />

              <Stack.Screen
              name="Login"
              component={LoginScreen} 
              />
              <Stack.Screen
              name="Register"
              component={RegisterScreen} />

              <Stack.Screen
              name="OnboardingOne"
              component={OnboardingOneScreen} />

              <Stack.Screen
              name="OnboardingTwo"
              component={OnboardingTwoScreen} />

              <Stack.Screen
              name="OnboardingThree"
              component={OnboardingThreeScreen} />

              <Stack.Screen
              name="OnboardingFour"
              component={OnboardingFourScreen} />
            </>
          ):(
            //Show these screens when user IS logged in
            <>
              <Stack.Screen 
              name="HomeTab" 
              component={HomeTab}/>

            </>

            

          )}



      </Stack.Navigator>

    </NavigationContainer>
   
  );
}

const navigationTheme = {
  colors: {
    background: "transparent",
  },
  bg:{
    backgroundColor: "transparent"
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nav:{
    height:0
  }
});
