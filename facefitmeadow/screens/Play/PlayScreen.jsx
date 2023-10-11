import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { Camera } from "expo-camera";
import * as FaceDetector from "expo-face-detector";

import Bird from '../../components/Bird'
import Obstacles from '../../components/Obstacles'

export default function GameWithCamera() {
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
  const gravity = 3;
  let obstacleWidth = 152;
  let obstacleHeight = 352;
  let gap = 200;
  let gameTimerId;
  let obstaclesTimerId;
  let obstaclesTimerIdTwo;

    //function to restart the game
    const restartGame = () => {
      // Reset all game-related states
      setBirdBottom(screenHeight / 2);
      setObstaclesLeft(screenWidth);
      setObstaclesLeftTwo(screenWidth + screenWidth / 2 + 30);
      setObstaclesNegHeight(0);
      setObstaclesNegHeightTwo(0);
      setIsGameOver(false);
      setScore(0);
  
      // Start the game again
      setIsPlaying(true);
    };

  // Start bird falling
  useEffect(() => {
    if (birdBottom > 0) {
      gameTimerId = setInterval(() => {
        setBirdBottom(birdBottom => birdBottom - gravity);
      }, 30);

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
        setObstaclesLeft(obstaclesLeft => obstaclesLeft - 5)
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
        setObstaclesLeftTwo(obstaclesLeftTwo => obstaclesLeftTwo - 5)
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
      console.log(obstaclesLeft)
      console.log(screenWidth/2)
      console.log(obstaclesLeft > screenWidth/2)
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
      clearInterval(gameTimerId)
      clearInterval(obstaclesTimerId)
      clearInterval(obstaclesTimerIdTwo)
      setIsGameOver(true)
    }
  

    const handleFacesDetected = ({ faces }) => {
      if (faces.length > 0 && !isGameOver) {
        const smilingScore = faces[0].smilingProbability;
        if (smilingScore > 0.7) {
          jump();
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
          minDetectionInterval: 500,
          tracking: true,
        }}
      >
        <ImageBackground
          source={require('../../assets/backgrounds/GameBack.png')}
          style={{ ...styles.backgroundImage, zIndex: 0 }}  // Lower zIndex for the background image
        >
          <Text style={styles.scoreText}>Current Score:</Text>
          <Text style={styles.score}>{score}</Text>
                    {/* Render a "Restart" button when the game is over */}
                    {!isPlaying && (
            <TouchableOpacity onPress={restartGame} style={styles.restartButton}>
              <Text style={styles.restartButtonText}>Restart</Text>
            </TouchableOpacity>
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
    fontFamily: 'OneStory',
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
    marginTop: 150,
    zIndex: 1,
  },
  restartButton: {
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: '#3E5F2A',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    zIndex: 99,
  },
  restartButtonText: {
    color: 'white',
    fontSize: 20,
  },
});