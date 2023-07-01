import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Paddle from './Paddle';
import Ball from './Ball';

const { width, height } = Dimensions.get('window');
const paddleSpeed = 10;

const Game = () => {
  const [paddlePosition, setPaddlePosition] = useState(height / 2);
  const [ballPosition, setBallPosition] = useState({ x: width / 2, y: height / 2 });
  const [ballVelocity, setBallVelocity] = useState({ x: 1, y: 1 });


  useEffect(() => {
    const gameLoop = setInterval(() => {
      const newBallX = ballPosition.x + ballVelocity.x;
      const newBallY = ballPosition.y + ballVelocity.y;

      if (newBallY >= height - 10 || newBallY <= 0) {
        setBallVelocity((prevVelocity) => ({ ...prevVelocity, y: -prevVelocity.y }));
      }

      if (
        (newBallX >= width - 10 && ballVelocity.x > 0) ||
        (newBallX <= 10 && ballVelocity.x < 0)
      ) {
        setBallVelocity((prevVelocity) => ({ ...prevVelocity, x: -prevVelocity.x }));
      }

      if (
        newBallX <= 20 &&
        newBallY + 10 >= paddlePosition &&
        newBallY - 10 <= paddlePosition 
      ) {
        setBallVelocity((prevVelocity) => ({ ...prevVelocity, x: -prevVelocity.x }));
      }

      //console.log(newBallX)
      setBallPosition({...ballPosition, x: newBallX, y: newBallY });
      //console.log(ballPosition)
      
    }, 500);

    return () => clearInterval(gameLoop);
  }, []);

  const movePaddle = (direction) => {
    setPaddlePosition((prevPosition) => prevPosition + direction * paddleSpeed);
  };

  return (
    <View style={styles.container}>
      <Paddle position={paddlePosition} />
      <Ball position={ballPosition} />
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
});

export default Game;
