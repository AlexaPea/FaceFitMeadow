import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { Camera } from "expo-camera";
import * as FaceDetector from "expo-face-detector";
import { addScoreToCollection } from '../../services/firebaseDb';
import { getCurrentUser } from '../../services/firebaseAuth';
import { Audio } from 'expo-av';
import Bird from '../../components/Bird'
import Obstacles from '../../components/Obstacles'
import { Icon, Button } from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';


export default function GameWithCamera({navigation}) {
  const [isPlaying, setIsPlaying] = useState(true);
  const screenWidth = Dimensions.get("screen").width;
  const screenHeight = Dimensions.get("screen").height;
  const birdLeft = screenWidth / 2;
  const [birdBottom, setBirdBottom] = useState(screenHeight / 2);
  const [obstaclesLeft, setObstaclesLeft] = useState(screenWidth);
  const [obstaclesLeftTwo, setObstaclesLeftTwo] = useState(screenWidth + screenWidth / 2 + 30);
  const [obstaclesNegHeight, setObstaclesNegHeight] = useState(0);
  const [obstaclesNegHeightTwo, setObstaclesNegHeightTwo] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const gravity = 5;
  let obstacleWidth = 152;
  let obstacleHeight = 352;
  let gap = 200;
  let gameTimerId;
  let obstaclesTimerId;
  let obstaclesTimerIdTwo;
  const [isSmiling, setIsSmiling] = useState(false);
  const jumpCooldownDuration = 1000; // 1 second
  let lastJumpTimestamp = 0;
  const [sound, setSound] = useState(null);
  const [isSoundPlaying, setIsSoundPlaying] = useState(false);

  const playAudio = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('../../assets/Music/GameMusic.mp3')
    );
    setSound(sound);
    await sound.setIsLoopingAsync(true);
    await sound.playAsync();
    setIsSoundPlaying(true);
  };

  const stopAudio = async () => {
    if (sound) {
      await sound.unloadAsync();
    }
  };

  useEffect(() => {
    playAudio();

    // Clean up the audio when the component unmounts
    return () => {
      stopAudio();
    };
  }, []); // Only call playAudio when the component mounts

  useFocusEffect(
    React.useCallback(() => {
      // Screen is focused, you can handle other actions here
      return () => {
        // Screen is blurred, you can handle other actions here
      };
    }, [])
  );


  
  const toggleAudio = async () => {
    if (isSoundPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
    setIsSoundPlaying(!isSoundPlaying);
  };
  

    //function to restart the game
    const restartGame = () => {
      // Reset all game-related states
      createScoreData()
      setBirdBottom(screenHeight / 2);
      setObstaclesLeft(screenWidth);
      setObstaclesLeftTwo(screenWidth + screenWidth / 2 + 30);
      setObstaclesNegHeight(0);
      setObstaclesNegHeightTwo(0);
      setIsGameOver(false);
      setScore(0);
  
      // Start the game again
      setIsPlaying(true);
      playAudio();
    };

    const GoBack = () => {
      stopAudio();
      setIsPlaying(false);
      createScoreData();
      navigation.navigate('HomeTab');
    }

  // Start bird falling
  useEffect(() => {
    if (birdBottom > 0) {
      gameTimerId = setInterval(() => {
        setBirdBottom(birdBottom => birdBottom - gravity);
      }, 10);

      return () => {
        clearInterval(gameTimerId);
      };
    }
  }, [birdBottom]);

  const jump = () => {
    if (!isGameOver && birdBottom < screenHeight) {
      setBirdBottom(birdBottom => birdBottom + 50);
      console.log('jumped');
    }
  }


  //start first obstacle
  useEffect(() => {
    if (obstaclesLeft > -60) {
      obstaclesTimerId = setInterval(() => {
        setObstaclesLeft(obstaclesLeft => obstaclesLeft - 10)
      }, 30)
      return () => {
        clearInterval(obstaclesTimerId)
      }
    } else {
      setScore(score => score +1)
      setObstaclesLeft(screenWidth)
      setObstaclesNegHeight( - Math.random() * 100)
    }
  }, [obstaclesLeft])

  //start second obstacle
  useEffect(() => {
    if (obstaclesLeftTwo > -60) {
      obstaclesTimerIdTwo = setInterval(() => {
        setObstaclesLeftTwo(obstaclesLeftTwo => obstaclesLeftTwo - 10)
      }, 30)
        return () => {
          clearInterval(obstaclesTimerIdTwo)
        }
      } else {
          setScore(score => score +1)
          setObstaclesLeftTwo(screenWidth)
          setObstaclesNegHeightTwo( - Math.random() * 100)
        }
  }, [obstaclesLeftTwo])

    //check for collisions
    useEffect(() => {
      //console.log(obstaclesLeft)
      //console.log(screenWidth/2)
      //console.log(obstaclesLeft > screenWidth/2)
      if (
        ((birdBottom < (obstaclesNegHeight + obstacleHeight + 30) ||
        birdBottom > (obstaclesNegHeight + obstacleHeight + gap -30)) &&
        (obstaclesLeft > screenWidth/2 -30 && obstaclesLeft < screenWidth/2 + 30 )
        )
        || 
        ((birdBottom < (obstaclesNegHeightTwo + obstacleHeight + 30) ||
        birdBottom > (obstaclesNegHeightTwo + obstacleHeight + gap -30)) &&
        (obstaclesLeftTwo > screenWidth/2 -30 && obstaclesLeftTwo < screenWidth/2 + 30 )
        )
        ) 
        {
        console.log('game over')
        gameOver()
        setIsPlaying(false);
      }
    })

    const gameOver = () => {
      stopAudio();
      clearInterval(gameTimerId)
      clearInterval(obstaclesTimerId)
      clearInterval(obstaclesTimerIdTwo)
      setIsGameOver(true)
    }

    const createScoreData = async () => {
      if (score > 0) {
        var creatorInfo = getCurrentUser();
        console.log(creatorInfo);
    
        var ScoreData = {
          score: score,
          userId: creatorInfo.uid,
        };
    
        console.log(ScoreData);
    
        const success = await addScoreToCollection(ScoreData);
    
        if (success) {
          console.log("Added score successfully");
        } else {
          console.log("Did not add score");
        }
      } else {
        console.log("Oops! Please add all the score info");
      }
    };
    
  

    const handleFacesDetected = ({ faces }) => {
      if (faces.length > 0 && !isGameOver) {
        const smilingScore = faces[0].smilingProbability;
    
        if (smilingScore > 0.7) {
          if (!isSmiling) {
            // Start a jump if not already smiling
            setIsSmiling(true);
    
            // Check if a jump is allowed based on the cooldown
            const currentTimestamp = Date.now();
            if (currentTimestamp - lastJumpTimestamp >= jumpCooldownDuration) {
              jump();
              lastJumpTimestamp = currentTimestamp;
            }
          }
        } else {
          // Reset the smile state
          setIsSmiling(false);
        }
      }
    };

    return (
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.front}
        ratio="16:9"
        onFacesDetected={(faceData) => handleFacesDetected(faceData)}
        faceDetectorSettings={{
          mode: FaceDetector.FaceDetectorMode.accurate,
          detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
          runClassifications: FaceDetector.FaceDetectorClassifications.all,
          minDetectionInterval: 100,
          tracking: true,
        }}
      >
        <ImageBackground
          source={require('../../assets/backgrounds/GameBack.png')}
          style={{ ...styles.backgroundImage, zIndex: 0 }}  // Lower zIndex for the background image
        >
          <Button
          icon={
            <Icon
              name={isSoundPlaying ? 'volume-up' : 'volume-off'}
              type="font-awesome"
              size={30}
              color="white"
            />
          }
          onPress={toggleAudio}
          buttonStyle={styles.soundButton}
          containerStyle={styles.soundButtonContainer}
        />

          <Text style={styles.scoreText}>Current Score:</Text>
          <Text style={styles.score}>{score}</Text>

            {/* Render a "Restart" button when the game is over */}
            {!isPlaying && (
              <>
             
              <View style={styles.restartContainer}>
                <ImageBackground
                  source={require('../../assets/Container/restart.png')}
                  style={styles.restartContainerBackground}
                >
                  <Text style={styles.heading1}>Restart</Text>

                </ImageBackground>
              </View>
            
              <View style={styles.buttonsContainer}>
            <TouchableOpacity onPress={restartGame} style={styles.button}>
              <ImageBackground source={require('../../assets/button.png')} style={styles.btnBackground}>
                <Text style={styles.btnText}>Play Again</Text>
              </ImageBackground>
            </TouchableOpacity>

            <TouchableOpacity onPress={GoBack} style={styles.buttonSecondary}>
              <Text style={styles.btnTextSecondary}>Home</Text>
            </TouchableOpacity>
          </View>
             
              </>

          )}

          <Bird birdBottom={birdBottom} birdLeft={birdLeft} />
          <Obstacles
            obstacleWidth={obstacleWidth}
            obstacleHeight={obstacleHeight}
            randomBottom={obstaclesNegHeight}
            gap={gap}
            obstaclesLeft={obstaclesLeft}
          />
          <Obstacles
            obstacleWidth={obstacleWidth}
            obstacleHeight={obstacleHeight}
            randomBottom={obstaclesNegHeightTwo}
            gap={gap}
            obstaclesLeft={obstaclesLeftTwo}
            style={{ zIndex: 90 }}
          />
          <Image style={styles.ground} source={require('../../assets/game/ground.png')} />
          

        </ImageBackground>
      </Camera>
    );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
  },
  scoreText: {
    fontSize: 16,
    color: '#3E5F2A',
    width: 350,
    paddingLeft: 150,
    paddingTop: 85,
    paddingBottom: 0,
    zIndex: 99,
  },
  score: {
    fontFamily: 'FuzzyBubbles-Regular',
    fontSize: 64,
    color: '#3E5F2A',
    width: 350,
    paddingTop: 35,
    paddingLeft: 190,
    lineHeight: 50,
    zIndex: 99,
  },
  ground: {
    width: 430,
    height: 562,
    marginTop: 400,
    zIndex: 1,
    position: 'absolute'
  },
  restartContainer:{
    width: 399,
    height: 216,
    zIndex: 99,
    marginLeft: -15,
    marginTop: 320,
    position: "absolute",
  },
  restartContainerBackground:{
    width: 399,
    height: 216,
  },
  buttonsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  
  
  button: {
    width: 132,
    height: 53,
    top: 60, // Adjust this value for vertical positioning
    left: -50, // Adjust this value for horizontal positioning
    zIndex: 110,
  },
  buttonSecondary: {
    width: 50,
    height: 69,
    borderRadius: 20,
    top: 10, // Adjust this value for vertical positioning
    left: 70, // Adjust this value for horizontal positioning
    zIndex: 110,
  },
  btnBackground:{
    resizeMode: 'contain',
    width: 135,
    height: 53,
    borderRadius: 20,
    padding:5,
    alignItems: 'center',
  },
  btnText:{
    fontFamily: 'FuzzyBubbles-Regular', 
    fontSize: 18,
    color: 'white',
    width: 150,
    textAlign: 'center',
    alignItems: 'center',
    paddingTop:5,
  },
  btnTextSecondary:{
      fontFamily: 'FuzzyBubbles-Regular', 
      fontSize: 20,
      color: '#3E5F2A',
      width: 80,
      textAlign: 'center',
      alignItems: 'center',
      paddingTop:5,
    },
    heading1: {
      fontFamily: 'FuzzyBubbles-Regular',
      fontSize: 38,
      color: '#3E5F2A',
      width: 350,
      paddingTop: 45,
      paddingLeft: 160,
      lineHeight: 50,
      alignItems:'center',
      justifyContent: 'center'
    },
    soundButton: {
      backgroundColor: 'transparent', // Set button background to transparent
    },
    soundButtonContainer: {
      position: 'absolute',
      top: 20, // Adjust this for vertical positioning
      right: 20, // Adjust this for horizontal positioning
      borderRadius: 50, // Make it circular
      width: 50, // Set width equal to height for a perfect circle
      height: 50, // Set height equal to width for a perfect circle
      zIndex: 100, // Adjust this if needed
    },
});