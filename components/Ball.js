import React from 'react';
import { View } from 'react-native';

const Ball = ({ position }) => {
  return (
    <View
      style={{
        position: 'absolute',
        width: 10,
        height: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        top: position.y,
        left: position.x,
      }}
    />
  );
};

export default Ball;