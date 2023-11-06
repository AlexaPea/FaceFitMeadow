import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import React from 'react'

const LoadingScreen = () => {
  return (
    <View>
      <ImageBackground
        source={require('../assets/Loader1.gif')}
        style={styles.backgroundImage}
      >
        </ImageBackground>
    </View>
  )
}

export default LoadingScreen

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        // resizeMode: '',
        paddingTop: 0,
        paddingHorizontal: 30,
      },
})