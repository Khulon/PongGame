import React from 'react';
import { View } from 'react-native';

const Paddle = ({ position }) => {
  return (
    <View
      style={{
        position: 'absolute',
        width: 10,
        height: 70,
        backgroundColor: 'white',
        top: position - 35,
      }}
    />
  );
};

export default Paddle;