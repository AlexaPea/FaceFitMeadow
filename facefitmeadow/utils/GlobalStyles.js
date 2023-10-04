import { StyleSheet } from "react-native";

// Global styling that can apply to all components
export const globalStyles = StyleSheet.create({
    ScrollView:{
      height:100
    },
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover', // or 'stretch' to stretch the image
      alignContent: 'center',
     
    },
    heading: {
      fontFamily: 'Hensa', 
      fontSize: 52,
      color: 'white',
      width: 350,
      textAlign: 'center',
      paddingTop: 385,
      paddingLeft: 0,
      lineHeight: 50
    },
    body: {
      color: 'white',
      width: 350,
      paddingLeft:40,
      paddingTop: 10,
      paddingBottom: 40,
      fontFamily: 'Open Sans'
    },
    button: {
      width: 307,
      height: 69,
      borderRadius: 20,
      flex: 1,
      paddingTop:20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonSecondary: {
      width: 307,
      height: 69,
      borderRadius: 20,
      flex: 1,
      marginTop:-0,
      paddingLeft:110,
      alignItems: 'center',
    },
    btnBackground:{
      resizeMode: 'cover', 
      width: 307,
      height: 69,
      borderRadius: 20,
      padding:10,
      alignItems: 'center',
    },
    btnText:{
      fontFamily: 'Hensa', 
      fontSize: 28,
      color: 'white',
      width: 350,
      textAlign: 'center',
      alignItems: 'center',
      paddingTop:8
    },
    input:{
      width: 330,
      height: 60,
      backgroundColor: 'rgba(230, 232, 230, 0.24)',
      borderWidth: 5,
      borderColor: 'rgba(130, 94, 49, 0.94)',
      borderRadius: 20,
      paddingLeft: 20,
      marginBottom:28,
      marginLeft:35,
      color: 'white'
    },
    btnTextTertiary:{
      color: 'white',
      width: 500,
      textAlign: 'center',
      paddingTop: 15
    }
  });