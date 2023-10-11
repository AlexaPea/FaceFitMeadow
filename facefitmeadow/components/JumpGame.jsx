import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

class JumpGame extends Component {
  constructor() {
    super();
    this.state = {
      characterBottom: 0,
      isJumping: false,
      obstacleRight: screenWidth,
      score: 0,
    };
  }

  jump = () => {
    if (!this.state.isJumping) {
      this.setState({ isJumping: true });
      const jumpHeight = 100;
      this.jumpInterval = setInterval(() => {
        const { characterBottom } = this.state;
        if (characterBottom < jumpHeight) {
          this.setState({
            characterBottom: characterBottom + 5,
          });
        } else {
          clearInterval(this.jumpInterval);
          this.fall();
        }
      }, 20);
    }
  };

  fall = () => {
    this.fallInterval = setInterval(() => {
      const { characterBottom } = this.state;
      if (characterBottom > 0) {
        this.setState({
          characterBottom: characterBottom - 5,
        });
      } else {
        clearInterval(this.fallInterval);
        this.setState({ isJumping: false });
      }
    }, 20);
  };

  moveObstacle = () => {
    this.obstacleInterval = setInterval(() => {
      const { obstacleRight, characterBottom, score } = this.state;
      if (obstacleRight > -50) {
        this.setState({
          obstacleRight: obstacleRight - 10,
        });
        if (
          obstacleRight > screenWidth / 2 - 30 &&
          obstacleRight < screenWidth / 2 + 30 &&
          characterBottom < 60
        ) {
          clearInterval(this.obstacleInterval);
          alert('Game Over! Your score: ' + score);
        }
      } else {
        clearInterval(this.obstacleInterval);
        this.setState({
          obstacleRight: screenWidth,
          score: score + 1,
        });
      }
    }, 100);
  };

  restart = () => {
    clearInterval(this.jumpInterval);
    clearInterval(this.fallInterval);
    clearInterval(this.obstacleInterval);

    this.setState({
      characterBottom: 0,
      isJumping: false,
      obstacleRight: screenWidth,
      score: 0,
    });

    this.moveObstacle();
  };

  componentDidMount() {
    this.moveObstacle();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.gameContainer}>
          <TouchableOpacity
            style={styles.character}
            activeOpacity={1}
            onPress={this.jump}
          />
          <View
            style={[
              styles.obstacle,
              {
                right: this.state.obstacleRight,
              },
            ]}
          />
        </View>
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>Score: {this.state.score}</Text>
        </View>
        <TouchableOpacity style={styles.restartButton} onPress={this.restart}>
          <Text style={styles.restartText}>Restart</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'skyblue',
  },
  gameContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  character: {
    width: 50,
    height: 50,
    backgroundColor: 'red',
    position: 'absolute',
    bottom: 0,
  },
  obstacle: {
    width: 30,
    height: 30,
    backgroundColor: 'green',
    position: 'absolute',
    bottom: 0,
  },
  scoreContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  scoreText: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
  },
  restartButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  restartText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default JumpGame;
