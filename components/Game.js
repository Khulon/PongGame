import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, PanResponder } from 'react-native';
import Paddle from './Paddle';
import Ball from './Ball';

const { width, height } = Dimensions.get('window');
const paddleSpeed = 10;

const Game = () => {
  const [paddlePosition, setPaddlePosition] = useState(height / 2);
  const [ballPosition, setBallPosition] = useState({ x: width / 2, y: height / 2 });
  const [ballVelocity, setBallVelocity] = useState({ x: -3, y: -3 });

  const movePaddle = (direction, updatePosition) => {
    updatePosition((prevPosition) => prevPosition + direction * paddleSpeed);
  };

  useEffect(() => {
    const gameLoop = setInterval(() => {
      const newBallX = ballPosition.x + ballVelocity.x;
      const newBallY = ballPosition.y + ballVelocity.y;
  
      if (newBallY >= height - 10 || newBallY <= 0) {
        setBallVelocity((prevVelocity) => ({ ...prevVelocity, y: -prevVelocity.y }));
      }
  
      if ((newBallX >= width - 10 && ballVelocity.x > 0) || (newBallX <= 10 && ballVelocity.x < 0)) {
        setBallVelocity((prevVelocity) => ({ ...prevVelocity, x: -prevVelocity.x }));
      }
  
      // Check for collision with the paddle
      if (
        newBallX <= width/2  && // Ensure the ball is within the horizontal range of the paddle
        newBallX + 10 >= width/2 && // Check if the ball's right edge is within the paddle's left edge
        newBallY + 10 >= paddlePosition - 40 && // Check if the ball's bottom edge is below the paddle's top edge
        newBallY - 10 <= paddlePosition + 40 // Check if the ball's top edge is above the paddle's bottom edge
      ) {
        console.log('asdasd')
        setBallVelocity((prevVelocity) => ({ ...prevVelocity, x: -prevVelocity.x }));
      }
  
      setBallPosition({ x: newBallX, y: newBallY });
    }, 16);
  
    return () => clearInterval(gameLoop);
  }, [ballPosition, ballVelocity, paddlePosition]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gestureState) => {
      movePaddle(gestureState.dy > 0 ? 1 : -1, setPaddlePosition); // Move paddle up or down based on gesture
    },
  });

  return (
    <View style={styles.container}>
      <Paddle position={paddlePosition} />
      <Ball position={ballPosition} />
      <View style={styles.touchArea} {...panResponder.panHandlers} /> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0,
  },
});

export default Game;
