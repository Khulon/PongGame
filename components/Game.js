import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, PanResponder,ScrollView } from 'react-native';
import Paddle from './Paddle';
import Ball from './Ball';

const { width, height } = Dimensions.get('window');

const Game = () => {

  const [paddlePosition, setPaddlePosition] = useState(width / 2);
  const [ballPosition, setBallPosition] = useState({ x: width / 2, y: height / 2 });
  const [ballVelocity, setBallVelocity] = useState({ x: -10, y: -10 });

  const movePaddle = (direction, paddleSpeed, updatePosition) => {
    const newPaddlePosition = paddlePosition + direction * paddleSpeed
    if (newPaddlePosition > 0 && newPaddlePosition < width) {
      updatePosition((prevPosition) => prevPosition + direction * paddleSpeed);
    } 

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
        newBallY <= height/2  && // Ensure the ball is within the horizontal range of the paddle
        newBallY >= height/2 && // Check if the ball's right edge is within the paddle's left edge
        newBallX >= paddlePosition - 40 && // Check if the ball's bottom edge is below the paddle's top edge
        newBallX <= paddlePosition + 40 // Check if the ball's top edge is above the paddle's bottom edge
      ) {
        setBallVelocity((prevVelocity) => ({ ...prevVelocity, y: -prevVelocity.y }));
      } 
  
      setBallPosition({ x: newBallX, y: newBallY });
    }, 16);
  
    return () => clearInterval(gameLoop);
  }, [ballPosition, ballVelocity]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gestureState) => {
      event.preventDefault(); // Prevent default touch gestures, including scrolling
      if (gestureState.dx != 0) {
        movePaddle(gestureState.dx, 5, setPaddlePosition); // Move paddle up or down based on gesture
      }
    },
  });

  return (
    <ScrollView style={{width:'100%', height:'100%', borderWidth:'1px'}} scrollEnabled={false} showsVerticalScrollIndicator={false}>
    <View scrollEnabled={false} style={styles.container}>
      <Paddle position={paddlePosition} />
      <Ball position={ballPosition} />
      <View style={styles.touchArea} {...panResponder.panHandlers} /> 
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width:width,
    height:height,
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


